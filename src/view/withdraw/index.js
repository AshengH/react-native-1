import React, {Component} from 'react';

import {
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    StyleSheet,
    Image,
    TextInput,
    Alert
} from 'react-native'

import {RATIO, SCREEN_WIDTH} from "../../lib/adjust";

import {SafeBody} from "../../lib/adjust";

import {Header} from "../../common";
import Icons from 'react-native-vector-icons/Ionicons'
import {Type} from "../../common";
import {lang} from "../../lang";
import {UI_ACTIVE_COLOR, BACKGROUND_COLOR, LINE_COLOR} from "../../lib/color";
import WithdrawAddress from "./withdrawalAddress";
import req from "../../lib/req";
import {Assets, Schedule} from "../../module";
import {HAS_CRYPTO} from '../../config';
import styles from './../../style/withdraw/index'
/*Select  模块*/
class Select extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableHighlight
                style={[
                styles.typeStyle, this.props.select === this.props.type
                    ? styles.bg
                    : null
            ]}
                underlayColor={LINE_COLOR}
                onPress={() => {
                this
                    .props
                    .onPress(this.props.type)
            }}>
                <View>
                    <Image style={styles.imageStyle} source={this.props.url}/>
                    <Text
                        style={styles.selectText}>{lang(this.props.title)}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

/*主模块*/
export default class App extends Component {

    _password = '';
    constructor(props) {
        super(props);
        this.state = {
            paymentType: 'fiat',
            type: 'BTC',
            num: 1233,
            address: '',
            lessNum: '0.001',
            withdrawAmount: Assets.BTC.money,
            btc: '',
            eth: '',
            usdt: '',
            money: ''
        };
    }

    //渲染选项卡
    renderOptionCard() {
        if (HAS_CRYPTO) {
            {/*选项卡*/
            }
            return (
                <View style={styles.tab}>
                    <View style={styles.touchStyle}>
                        <Type
                            title={"Fiat Withdraw"}
                            type='fiat'
                            select={this.state.paymentType}
                            onPress={(type) => {
                            this.setState({paymentType: type});
                        }}/>
                    </View>
                    <View style={styles.touchStyle}>
                        <Type
                            title={"Cryptos Withdraw"}
                            type='Cryptos'
                            select={this.state.paymentType}
                            onPress={(type) => {
                            this.setState({paymentType: type});
                        }}/>
                    </View>
                </View>
            );
        } else {
            return (
                <View></View>
            );
        }
    }

    renderContent() {
        if (HAS_CRYPTO) {

            {
                this.state.paymentType === 'fiat'
                    ? (null)
                    : (
                        <View>
                            {/*币种选择*/}
                            <View style={styles.typeBox}>
                                <Select
                                    title='BTC'
                                    type='BTC'
                                    url={require('../../images/BTC.png')}
                                    select={this.state.type}
                                    onPress={(type) => {
                                    this.setState({type: type, withdrawAmount: this.state.btc});
                                }}/>
                                <Select
                                    title='ETH'
                                    type='ETH'
                                    url={require('../../images/ETH.png')}
                                    select={this.state.type}
                                    onPress={(type) => {
                                    this.setState({type: type, withdrawAmount: this.state.eth});
                                }}/>
                                <Select
                                    title='USDT'
                                    type='USDT'
                                    url={require('../../images/USDT.png')}
                                    select={this.state.type}
                                    onPress={(type) => {
                                    this.setState({type: type, withdrawAmount: this.state.usdt});
                                }}/>
                            </View>

                            <View style={styles.assetsBox}>
                                <Text style={styles.assetTitle}>{lang('Withdrawal assets')}</Text>
                                <View
                                    style={styles.withdrawAmountWrapper}>
                                    <Text style={styles.assetMain}>{this.state.withdrawAmount}</Text>
                                    {/*<Text style={styles.about}>≈ ${this.state.num}</Text>*/}
                                </View>
                            </View>

                            <View style={styles.addressBox}>
                                <View>
                                    <Text style={styles.addressTitle}>{lang('Withdrawal address')}</Text>
                                    <View
                                        style={styles.withdrawAmountWrapper}>
                                        <Text style={styles.addressMain}>{this.state.address}</Text>
                                    </View>
                                </View>
                                <TouchableHighlight
                                    style={styles.touchable}
                                    underlayColor={LINE_COLOR}
                                    onPress={() => {
                                    this
                                        .props
                                        .navigation
                                        .navigate('WithdrawAddress')
                                }}>
                                    <Icons
                                        name={`ios-arrow-forward`}
                                        size={25}
                                        style={styles.touchIcon}/>
                                </TouchableHighlight>
                            </View>

                            <View>
                                <View style={styles.amount}>
                                    <Text
                                        style={styles.withdrawalAmount}>{lang('Withdrawal amount')}</Text>
                                    <TextInput
                                        placeholder={lang('Enter withdrawal amount')}
                                        style={{
                                        
                                    }}
                                        onChangeText={(text) => this.setState({money: text})}
                                        value={this.state.money}/>
                                    <TouchableHighlight
                                        underlayColor={LINE_COLOR}
                                        onPress={() => {
                                        this.setState({
                                            money: `${this
                                                .state
                                                .withdrawAmount
                                                .toString()}`
                                        })
                                    }}>
                                        <Text style={styles.amountAll}>{lang('All')}</Text>
                                    </TouchableHighlight>
                                </View>
                                {/*<View style={styles.amount}>*/}
                                {/*<Text style={{width: 130 * RATIO, lineHeight: 30}}>{lang('Miner Fee')}</Text>*/}
                                {/*<Text style={{*/
                            }
                            {/*width: 160 * RATIO,*/
                            }
                            {/*paddingLeft: 15,*/
                            }
                            {/*color: '#C7C7CC',*/
                            }
                            {/*lineHeight: 30*/
                            }
                            {/*}}>${this.state.lessNum} BTC</Text>*/}
                                {/*</View>*/}
                                <View style={styles.amount}>
                                    <Text
                                        style={styles.withdrawalAmount}>{lang('Fund Password')}</Text>
                                    <TextInput
                                        style={styles.withdrawInput}
                                        placeholder={lang('Fund Password')}
                                        secureTextEntry={true}
                                        onChangeText={(text) => this._password = text}/>
                                </View>
                            </View>

                            <TouchableHighlight
                                underlayColor={LINE_COLOR}
                                onPress={() => this.withdrawMoney()}>
                                <Text style={styles.submit}>{lang('Confirm')}</Text>
                            </TouchableHighlight>
                        </View>
                    )
            }
        }else{
            return(<View></View>);
        }
    }

    render() {
        return (
            <SafeBody>
                {/*头部*/}
                <Header
                    title="Withdraw"
                    button={{
                    name: 'Records',
                    forward: 'WithdrawRecords'
                }}
                    navigation={this.props.navigation}/>
                <ScrollView
                    style={{
                    backgroundColor: BACKGROUND_COLOR
                }}>
                </ScrollView>
            </SafeBody>
        )
    }

    componentDidMount() {
        this.getAddressList();
        Schedule.addEventListener('sendAddress', this.sendAddress, this);
        if (Assets.initial) {
            this.updateAssets();
        }
    }
    
    componentWillUnmount() {
        Schedule.removeEventListeners(this)
    }

    updateAssets() {
        this.setState({usd: Assets.USD.money, btc: Assets.BTC.money, usdt: Assets.USDT.money, eth: Assets.ETH.money})
    }
    sendAddress(address) {
        this.setState({address})
    }

    /*获取钱包地址*/
    async getAddressList() {
        try {
            let result = await req({url: '/mine/coinAddressList.htm', type: 'POST'});
            result['coins'].map((o) => {
                o['defaultCoint']
                    ? this.setState({address: o.address})
                    : null

            })

        } catch (err) {
            Alert.alert('Error', err['errorMsg'])
        }
    }

    /*提款*/
    async withdrawMoney() {
        if (this.state.money > this.state.withdrawAmount) 
            return Alert.alert(lang('Reminder'), '输入金额超过可提现金额')

        try {
            await req({
                url: '/pay/withdraw.htm',
                data: {
                    action: 'apply',
                    type: 2,
                    currency: this.state.type,
                    bankCard: this.state.address,
                    money: this.state.money,
                    password: this._password
                }
            })
        } catch (err) {
            Alert.alert(lang('Error'), err['errorMsg'])
        }
    }

}