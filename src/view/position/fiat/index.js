import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    RefreshControl,
    Alert
} from 'react-native';

import {
    withNavigation
} from 'react-navigation';

import {
    Type,
    Currency
} from "../../../common";

import {lang} from "../../../lang";

import {
    PAGE_HEIGHT,
    SCREEN_WIDTH
} from "../../../lib/adjust";

import {
    RAISE,
    BASIC_FONT_COLOR,
    UI_ACTIVE_COLOR, FALL, BASIC_COLOR, SCHEME_THREE_BACKGROUND_COLOR, FALL_HIGHLIGHT,
} from "../../../lib/color";

import req from "../../../lib/req";

import {Assets, Data, Schedule, Scheme} from "../../../module";

import OrderList from '../ui/orderList';
import commonStyles from './../../../style/variable'
import styles from './../../../style/position/fiat/index'
import { contentVersion } from '../../../config';
class Hold extends Component {
    _keepUpdate = null;
    _isFocused = true;

    constructor(props) {
        super(props);
        this.state = {
            position: [],
            settlement: [],
            failure: [],
            onLoading: false,
            dropDown: lang('drop down'),
            income: 0,
            currency: 'USD'
        };
        this.props.navigation.addListener('didFocus', () => {
            this._isFocused = true;
        });
        this.props.navigation.addListener('didBlur', () => {
            this._isFocused = false;
        })
    }

    componentWillMount() {
        this._initial = true;
        this._keepUpdate = null;
    };

    render() {
        if (this.props.schemeSort === 1) {

            let incomeTextColor = this.state.income >= 0 ? RAISE : FALL

            return (
                <View style={{flex:1}}>
                    <View style={[styles.rowSeparate]}>
                            <View>
                                <Text style={[styles.mid,styles.usd]}>{'浮动总盈亏'}</Text>
                                <Text style={[styles.income, styles.mid,{color:incomeTextColor}]}>{this.state.income}</Text>
                            </View>
                            <TouchableHighlight
                                style={[styles.closeAll]}
                                onPress={() => {
                                    if (this.state.position.length > 0) {
                                        Alert.alert(lang('Reminder'), lang('Please double check,if you want close all position'), [
                                            {text: lang('Cancel')},
                                            {text: lang('OK'), onPress: () => this.closeAll().catch()}
                                        ])
                                    }
                                }}>
                                <Text style={styles.closeAllText}>{lang('Close All Positions')}</Text>
                        </TouchableHighlight>
                    </View>
                    {/* <ScrollView style={{height: PAGE_HEIGHT - 219}} showsVerticalScrollIndicator={false}> */}
                        <OrderList schemeSort={this.props.schemeSort} list={this.state.position} navigation={this.props.navigation}
                                   close={(id) => this.close(id)} currency={this.state.currency}/>
                    {/* </ScrollView> */}
                </View>
            )
        } else if (this.props.schemeSort === 2) {
            return (
                <View>
                    <ScrollView style={styles.schemeTwoRoot} showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.onLoading}
                                        title={this.state.dropDown}
                                        titleColor={BASIC_COLOR}
                                        onRefresh={() => this.updateStore()}
                                    />
                                }>
                        <OrderList schemeSort={this.props.schemeSort} list={this.state.settlement}
                                   currency={this.state.currency}/>
                    </ScrollView>
                </View>
            )
        } else if (this.props.schemeSort === 3) {
            return (
                <View>
                    <ScrollView style={styles.schemeThreeRoot} showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.onLoading}
                                        title={this.state.dropDown}
                                        titleColor={BASIC_COLOR}
                                        onRefresh={() => this.updateStore()}
                                    />
                                }>
                        <OrderList schemeSort={this.props.schemeSort} list={this.state.failure}
                                   currency={this.state.currency}/>
                    </ScrollView>
                </View>
            )
        } else {
            return null;
        }
    }

    componentDidMount() {
        this._keepUpdate = true;
        this.updatePosition();
        console.log('jkjkjkj');
        console.log(this.props.navigation);
    }

    componentWillUnmount() {
        clearTimeout(this._keepUpdate);
        this._keepUpdate = null;
    }

    async close(id) {
        try {
            await req({
                url: '/trade/close.htm',
                type: 'POST',
                data: {
                    bettingId: id,
                    tradeType: contentVersion === 'standard' ? 1 : 2,
                    source: '撤单'
                },
                animate: true
            });
            Assets.update();
            Alert.alert('', lang('Close Successfully'));
        } catch (err) {
            Alert.alert(lang('Error'), err.errorMsg || err);
        }
    }

    async closeAll() {
        try {
            let t = this.state.position.map((o)=>{
                return o.id;
            });
            const str = t.join(',');
            let result = await req({
                url: '/trade/close.htm',
                type: 'POST',
                data: {
                    bettingList: str,
                    tradeType: contentVersion === 'standard' ? 1 : 2,
                    source: '撤单'
                },
                animate:true
            });
            Assets.update();
            Alert.alert('',`${lang('Close Order')} ${result.successNumber},${lang('Failure Order')} ${result.failNumber}`);
            result = null;
            t = null;
        } catch (err) {
            Alert.alert(lang('Error'), err.errorMsg || err);
        }
    }

    componentWillUpdate({schemeSort}) {
        if (this.props.schemeSort !== schemeSort) {
            if (schemeSort === 1) {
                this._keepUpdate = true;
                this.updatePosition();
            } else if (schemeSort === 2) {
                clearTimeout(this._keepUpdate);
                this._keepUpdate = null;
                if (this.state.settlement.length === 0) {
                    this.updateStore(2);
                }
            } else if (schemeSort === 3) {
                clearTimeout(this._keepUpdate);
                this._keepUpdate = null;
                if (this.state.failure.length === 0) {
                    this.updateStore(3);
                }
            }
        }
    }

    /**
     * 更新结算和流单
     * @param sort
     * @returns {Promise<void>}
     */
    async updateStore(sort) {
        try {
            this.setState({onLoading: true, dropDown: `${lang('loading')}...`});
            let {data} = await req({
                url: '/trade/scheme.htm',
                data: {
                    schemeSort: sort !== undefined ? sort : this.props.schemeSort,
                    tradeType: contentVersion === 'standard' ? 1 : 2,
                    beginTime: '',
                    currency: 'USD',
                    _: new Date().getTime()
                }
            });

            if (sort !== undefined) {
                if (sort === 2) {
                    this.setState({settlement: data});
                } else if (sort === 3) {
                    this.setState({failure: data});
                }
            } else {
                if (this.props.schemeSort === 2) {
                    this.setState({settlement: data});
                } else if (this.props.schemeSort === 3) {
                    this.setState({failure: data});
                }
            }
        } catch (err) {
            Alert.alert('Error',err['errorMsg'] || err)
        } finally {
            this.setState({onLoading: false});
            setTimeout(() => {
                this.setState({dropDown: lang('drop down')})
            }, 1000);
        }
    }

    /**
     * 更新持仓
     */
    async updatePosition() {
        try {
            if (this._isFocused) {
                let {data} = await req({
                    url: '/trade/scheme.htm',
                    data: {
                        schemeSort: 1,
                        tradeType: contentVersion === 'standard' ? 1 : 2,
                        beginTime: '',
                        currency: 'USD',
                        _: new Date().getTime()
                    }
                });
                this.dealPosition(data);
            }
        } catch (err) {
            alert(err['errorMsg'] || err)
        } finally {
            if (this._keepUpdate !== null) {
                this._keepUpdate = setTimeout(() => this.updatePosition(), 1000);
            }
        }
    }

    /**
     * 更新持仓数据
     */
    dealPosition(data) {
        let quote, scheme;
        let income = 0;
        // console.log(data);

        let position = data.map((e) => {
            quote = Data.total[e.contract];
            scheme = Scheme.total[e.contract];
            if (quote) {
                e.unit = scheme.priceUnit.mul(scheme.priceChange).mul(e.moneyType === 0 ? 1 : 0.1);
                e.current = Number(quote.price) || 0;
                if (quote.price !== 0 && e.opPrice !== 0) {
                    if (e.isBuy) {
                        e.income = e.current.sub(e.opPrice).mul(e.volume).mul(scheme.priceUnit).mul(e.moneyType === 0 ? 1 : 0.1);
                    } else {
                        e.income = e.opPrice.sub(e.current).mul(e.volume).mul(scheme.priceUnit).mul(e.moneyType === 0 ? 1 : 0.1);
                    }
                    income = income.add(e.income);
                    return e;
                } else {
                    e.income = 0;
                    return e;
                }
            } else {
                return null;
            }
        });
        this.setState({position: position, income: income});
        scheme = null;
        quote = null;
        income = null;
        position = null;
    }
}

const HoldView = withNavigation(Hold);

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schemeSort: 1
        }
    }

    render() {
        return (
            <View style={commonStyles.fillStyle}>
                {/*选项卡*/}
                {/* <View style={styles.tab}>
                    <Type
                        title="Position"
                        type={1}
                        select={this.state.schemeSort}
                        onPress={() => {
                            this.setState({schemeSort: 1});
                        }}/>
                    <Type
                        title="Settlement"
                        type={2}
                        select={this.state.schemeSort}
                        onPress={() => {
                            this.setState({schemeSort: 2});
                        }}/>
                    <Type
                        title="Failure"
                        type={3}
                        select={this.state.schemeSort}
                        onPress={() => {
                            this.setState({schemeSort: 3});
                        }}/>
                </View> */}
                <HoldView navigation={this.props.navigation} schemeSort={this.state.schemeSort}/>
            </View>
        )
    }

    componentWillReceiveProps() {
        this.props.navigation.navigate('cryptos')
    }
}

