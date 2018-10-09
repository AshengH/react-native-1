import React, {Component} from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import {
    View,
    ScrollView,
    TouchableHighlight,
    Text,
    StyleSheet,
    Alert
} from 'react-native';

import { SafeBody} from "../../../lib/adjust";
import {Header} from "../../../common";

import {Type} from "../../../common";
import {lang} from "../../../lang";
import {FALL, RAISE, UI_ACTIVE_HOVER_COLOR} from "../../../lib/color";
import {Select} from "../../../common";
import {Assets} from "../../../module";
import req from '../../../lib/req'
import {formatDate} from "../../../lib/tool";
import {HAS_CRYPTO} from '../../../config';
import styles from './../../../style/account/accountSet/fundDetail'

export default class App extends Component {
    constructor(props) {
        super(props);

        /*从 Assets 获取货币种类*/
        this._currency = Assets
            .currency
            .map((o) => {
                return {name: o, value: o}
            });

        this._deposit = {};
        this._withdraw = {};
        this._trading = {};

        for (let o of Assets.currency) {
            if (this._deposit[o] === undefined) 
                this._deposit[o] = [];
            if (this._withdraw[o] === undefined) 
                this._withdraw[o] = [];
            if (this._trading[o] === undefined) 
                this._trading[o] = [];
            }
        
        this.state = {
            paymentType: 'deposit',
            name: 'USD',
            show: false,
            type: {}
        }
    }

    renderDigitalCurrencyButton() {
        if (HAS_CRYPTO) {
            return (
                <View
                    style={styles.cryptoSelectionRoot}>
                    <TouchableHighlight
                        style={styles.cryptoTouchable}
                        onPress={() => {
                        this.setState({show: true})
                    }}>
                        <View
                            style={styles.selectionWrapper}>
                            <Text
                                style={styles.name}>{this.state.name}</Text>
                            <View style={styles.triangle}></View>
                        </View>
                    </TouchableHighlight>
                </View>
            );
        } else {
            return (
                <View></View>
            );
        }
    }

    render() {
        return (
            <SafeBody>
                <Select
                    data={this._currency}
                    show={this.state.show}
                    onPress={({name, value}) => {
                    this.setState({show: false, name: name})
                }}/> 
                {/* 头部 */}
                <Header title={'Fund Details'} navigation={this.props.navigation}/>
                <View style={styles.selectBox}>
                    <Type
                        style={styles.selectionItem}
                        title='Deposit'
                        type='deposit'
                        select={this.state.paymentType}
                        onPress={(type) => {
                        this.setState({paymentType: type, type: this._deposit});
                    }}/>
                    <Type
                        style={styles.selectionItem}
                        title='Withdraw'
                        type='withdraw'
                        select={this.state.paymentType}
                        onPress={(type) => {
                        this.setState({paymentType: type, type: this._withdraw});
                    }}/>
                    <Type
                        style={styles.selectionItem}
                        title='Trading'
                        type='trading'
                        select={this.state.paymentType}
                        onPress={(type) => {
                        this.setState({paymentType: type, type: this._trading});
                    }}/>
                </View>
                {/* 样式*/}
                <View
                    style={styles.amountRoot}>
                    <Text
                        style={styles.amount}>0.00</Text>
                    <Text
                        style={styles.amountBalance}>{lang('Game Balance')}</Text>
                    {this.renderDigitalCurrencyButton()}
                </View>
                <ScrollView
                    style={styles.scrollViewBackground}>
                    {/* 明细*/}
                    <View style={styles.list}>

                        {(this.state.type[this.state.name] && this.state.type[this.state.name].length > 0)
                            ? this.state.type[this.state.name].map(({
                                currency,
                                detail,
                                explain,
                                time,
                                money,
                                type
                            }) => {

                                let moneyColor = this.state.type === this._deposit
                                                        ? RAISE
                                                        : FALL
                                return (
                                    <TouchableHighlight
                                        style={styles.cellTouchable}
                                        activeOpacity={1}
                                        underlayColor={UI_ACTIVE_HOVER_COLOR}
                                        onPress={() => {
                                        this
                                            .props
                                            .navigation
                                            .navigate('DetailList', {
                                                currency,
                                                detail,
                                                explain,
                                                time,
                                                money,
                                                type
                                            })
                                    }}>
                                        <View
                                            style={styles.cellRoot}>
                                            <View
                                                style={styles.textWrapper}>
                                                <Text
                                                    style={styles.explain}>{explain}</Text>
                                                <Text
                                                    style={styles.date}>{formatDate('y-m-d  h:i', {date: time})}</Text>
                                            </View>
                                            <View
                                                style={styles.textWrapper}>
                                                <Text
                                                    style={styles.currency}>{currency}</Text>
                                                <Text
                                                    style={[{color: moneyColor},styles.money]}>{this.state.type === this._deposit
                                                        ? '+'
                                                        : '-'} {money}</Text>
                                            </View>
                                            <Icons
                                                name={`ios-arrow-forward`}
                                                size={25}
                                                style={styles.icon}/>
                                        </View>
                                    </TouchableHighlight>
                                );
                            })
                            : (
                                <Text style={styles.none}>{lang('No Records')}</Text>
                            )}
                    </View>
                </ScrollView>
            </SafeBody>
        )
    }

    componentDidMount() {
        this.getInfo(1);
        this.getTrading(2);
    }

    componentWillUnmount() {
        this._deposit = {};
        this._withdraw = {};
    }

    async getInfo(data) {
        try {
            let result = await req({
                url: '/mine/funds.htm',
                type: 'GET',
                data: {
                    action: 'more',
                    type: data
                }
            });

            let a = [],
                b = [];
            // 首先返回是所有充 提， 需要先区分
            for (let o of result.data) {
                if (o.type === 100) {
                    a.push(o);
                } else if (o.type === 200) {
                    b.push(o)
                }
            }
            // 充值
            for (let o of a) {
                if (this._deposit[o.currency] !== undefined) {
                    this
                        ._deposit[o.currency]
                        .push(o);
                    console.warn(o)

                }
            }
            // 提款
            for (let o of b) {
                if (this._withdraw[o.currency] !== undefined) {
                    this
                        ._withdraw[o.currency]
                        .push(o);
                    console.warn(o)
                }
            }

            a = null;
            b = null;

            this.setState({type: this._deposit})
        } catch (err) {
            Alert.alert('Error', err['errorMsg'])
        }

    }

    async getTrading(data) {
        try {
            let result = await req({
                url: '/mine/funds.htm',
                type: 'GET',
                data: {
                    action: 'more',
                    type: data
                }
            });

            for (let o of result.data) {
                if (this._trading[o.currency] !== undefined) {
                    this
                        ._trading[o.currency]
                        .push(o)
                }
            }
        } catch (err) {
            Alert.alert('Error', err['errorMsg'])
        }
    }
}