import React, {Component} from 'react'

import {Text, View, ScrollView, RefreshControl,Alert} from 'react-native'

import {
    StackNavigator
} from 'react-navigation'

import {RATIO, SafeBody} from "../../../lib/adjust";

import {BtnHeader} from "../../../common";
import {lang} from "../../../lang";
import req from '../../../lib/req'
import {formatDate} from "../../../lib/tool";
import {HAS_CRYPTO} from './../../../config'
import {Header} from './../../../common'
import styles from './../../../style/withdraw/withdrawRecords/withdrawRecords'
import commonStyles from './../../../style/variable'
import { BASIC_COLOR } from '../../../lib/color';
/* 币币模块 */
class Crypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            onLoading: false,
        }
    }

    render() {
        return (
            <ScrollView
                style={styles.crypto_root}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.onLoading}
                        title={lang('Loading...')}
                        titleColor={BASIC_COLOR}
                        onRefresh={() => this.updateCode()}
                    />
                }>
                {
                    !this.state.list ?
                        (this.state.list.map((item) => {
                                return (
                                    <View style={styles.crypto_cellRoot}>
                                        <View style={styles.crypto_cellTopWrapper}>
                                            <Text style={styles.crypto_topWrapperText}>{item['explain']}</Text>
                                            <View style={commonStyles.fillStyle}/>
                                            <Text style={styles.crypto_topWrapperText}>{item.currency}</Text>
                                            <Text style={styles.crypto_topWrapperText}>{item.money}</Text>
                                        </View>
                                        <View style={styles.crypto_cellBottomWrapper}>
                                            <Text style={styles.crypto_bottomWrapperText}>{item.remark}</Text>
                                            <Text style={styles.crypto_date}>{formatDate('y-m-d        h:i:s ', {date: item['disposeTime']['time']})}</Text>
                                        </View>
                                    </View>
                                )
                            }))
                        :
                        (<Text style={styles.crypto_noRecord}>{lang('No Records')}</Text>)
                }
            </ScrollView>
        )
    }

    componentDidMount() {
        (
            async () => {
                try {
                    let result = await req({
                        url: '/pay/withdrawHistory.htm',
                        data: {
                            currency: 'ETH'
                        }
                    });
                    this.setState({list: result['inouts']});
                } catch (err) {
                    Alert.alert(lang('Error'),err['errorMsg'])
                }
            }
        )()

    }

    componentWillReceiveProps(nextProps) {
        this.props.navigation.goBack();
    }

    async updateCode() {
        try {
            this.setState({onLoading: true});
            let result = await req({
                url: '/pay/withdrawHistory.htm',
                data: {
                    currency: 'ETH'
                }
            });
            this.setState({onLoading: false});
            this.setState({list: result['inouts']});
        } catch (err) {
            this.setState({onLoading: false});
            Alert.alert(lang('Error'),err['errorMsg'])
        }
    }
}

/* 法币模块 */
class Fiat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            onLoading: false,
        }
    }

    render() {
        return (
            <ScrollView
                style={commonStyles.whiteBackground}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.onLoading}
                        title={lang('Loading...')}
                        titleColor={BASIC_COLOR}
                        onRefresh={() => this.updateCode()}
                    />
                }>
                {
                    !this.state.list ?
                        (this.state.list.map((item) => {
                            return (
                                <View style={styles.crypto_cellRoot}>
                                    <View style={styles.crypto_cellTopWrapper}>
                                        <Text style={styles.crypto_topWrapperText}>{item['explain']}</Text>
                                        <View style={commonStyles.fillStyle}/>
                                        <Text style={styles.crypto_topWrapperText}>{item.currency}</Text>
                                        <Text style={styles.crypto_topWrapperText}>{item.money}</Text>
                                    </View>
                                    <View style={styles.crypto_cellBottomWrapper}>
                                        <Text style={styles.crypto_bottomWrapperText}>{item.remark}</Text>
                                        <Text style={styles.crypto_bottomWrapperText}>{formatDate('y-m-d        h:i:s ', {date: item['disposeTime']['time']})}</Text>
                                    </View>
                                </View>
                            )
                        }))
                        :
                        (<Text style={styles.crypto_noRecord}>{lang('No Records')}</Text>)
                }
            </ScrollView>
        )
    }

    componentDidMount() {
        (
            async () => {
                try {
                    let result = await req({
                        url: '/pay/withdrawHistory.htm',
                        data: {
                            currency: 'USD'
                        }
                    });
                    this.setState({list: result['inouts']});
                } catch (err) {
                    Alert.alert(lang('Error'),err['errorMsg'])
                }
            }
        )()

    }

    componentWillReceiveProps() {
        this.props.navigation.navigate('cryptos');
    }

    async updateCode() {
        try {
            this.setState({onLoading: true});
            let result = await req({
                url: '/pay/withdrawHistory.htm',
                data: {
                    currency: 'USD'
                }
            });
            this.setState({onLoading: false});
            this.setState({list: result['inouts']});
        } catch (err) {
            this.setState({onLoading: false});
            Alert.alert(lang('Error'),err['errorMsg'])
        }
    }
}

/* 切换路由导航 */
const Record = new StackNavigator({
    fiat: {
        screen: Fiat,
        navigationOptions: {
            header: null
        }
    },
    cryptos: {
        screen: Crypto,
        navigationOptions: {
            header: null
        }
    }
});

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currency: 'ETH',
            showType: 'fiat'
        }
    }

    renderHeader(){
        if (HAS_CRYPTO) {
            return(
                <BtnHeader btnName={[{name: 'Fiat Order', type: 'fiat'}, {name: 'Cryptos Order', type: 'cryptos'}]}
                           showType={this.state.showType} onPress={(type) => {
                    this.setState({showType: type});
                }} navigation={this.props.navigation}/>
            );
        }else{
            return(
                <Header title={'Records'}/>
            );
        }
    }

    render() {
        return (
            <SafeBody  style={styles.root}>
                {this.renderHeader()}
                <Record screenProps={this.state.showType}/>
            </SafeBody>
        )
    }
}