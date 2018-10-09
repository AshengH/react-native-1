import React, {Component} from 'react';

import {Button} from 'react-native-elements'

import {
    View,
    StyleSheet,
    Text,
    Image
} from 'react-native';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

import {ACCOUNT_COLOR, UI_ACTIVE_COLOR, BASIC_COLOR} from "../../lib/color";

import {Assets, Cache, Schedule} from "../../module";

import {lang} from "../../lang/index";
import {RATIO} from "../../lib/adjust";
import { HAS_CRYPTO } from '../../config';
import styles from './../../style/account/accountHeader'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: Cache.isLogin(),
            // usd: '',
            // btc: '',
            // eth: '',
            // usdt: '',
            amount: '',
            userName: ''
        };
        Schedule.addEventListener('loginCallback', this.loginCallback, this);
        Schedule.addEventListener('cacheInitial', this.loginCallback, this);
    }

    renderMultiDigitalCurrency(){
        if (HAS_CRYPTO) {
            return(
                <View>
                    <View style={styles.cryptoRowRoot}>
                        <View style={[styles.typeBox,{borderBottomWidth:1,borderRightWidth:1}]}>
                            <View style={styles.typeStyle}>
                                <Image
                                    source={require('../../images/usd.png')}
                                    style={styles.cryptoImage}
                                />
                                <Text
                                    style={styles.functionStyle}
                                >USD</Text>
                            </View>
                            <View style={styles.typeAmount}>
                                <Text>{this.state.usd}</Text>
                            </View>
                        </View>
                        <View style={styles.typeBox}>
                            <View style={styles.typeStyle}>
                                <Image
                                    source={require('../../images/btc1.png')}
                                    style={styles.cryptoImage}
                                />
                                <Text
                                    style={styles.functionStyle}
                                >BTC</Text>
                            </View>
                            <View style={styles.typeAmount}>
                                <Text>{this.state.btc}</Text>
                                {/*<Text style={{color: '#C7C7CC'}}>≈${this.state.num} </Text>*/}
                            </View>
                        </View>
                    </View>
                    <View style={styles.cryptoRowRoot}>
                        <View style={styles.typeBox}>
                            <View style={styles.typeStyle}>
                                <Image
                                    source={require('../../images/eth1.png')}
                                    style={styles.cryptoImage}
                                />
                                <Text
                                    style={styles.functionStyle}
                                >ETH</Text>
                            </View>
                            <View style={styles.typeAmount}>
                                <Text>{this.state.eth}</Text>
                                {/*<Text style={{color: '#C7C7CC'}}>≈${this.state.num} </Text>*/}
                            </View>
                        </View>
                        <View style={[styles.typeBox,{borderLeftWidth:1,borderTopWidth:1}]}>
                            <View style={styles.typeStyle}>
                                <Image
                                    source={require('../../images/usdt1.png')}
                                    style={styles.cryptoImage}
                                />
                                <Text
                                    style={styles.functionStyle}
                                >USDT</Text>
                            </View>
                            <View style={styles.typeAmount}>
                                <Text>{this.state.usdt}</Text>
                                {/*<Text style={{color: '#C7C7CC'}}>≈${this.state.num} </Text>*/}
                            </View>
                        </View>
                    </View>
                </View>
            );
        }else{
            return(
                <View></View>
            );
        }
    }

    render() {
        return (
            <View>
                <View style={styles.topBox}>
                    <View style={styles.top}>

                    </View>
                    <View style={styles.header}>
                        <Icons name={`account-circle`} style={styles.headerIcon}/>
                        <Text style={styles.userName}>
                            {
                                this.state.isLogin === 1? this.state.userName:null
                            }

                            </Text>
                        <Icons name={`bell-ring-outline`} style={styles.ling}/>
                    </View>
                    <View style={styles.amountRoot}>
                        <Text style={styles.amountTotalText}>Total($)</Text>
                        <Text style={styles.amount}>00.00</Text>
                    </View>
                    <View style={styles.buttonBox}>
                        {
                            this.state.isLogin !== 1 ? (
                                <View style={styles.buttonBox_root}>
                                    <Button
                                        containerViewStyle={styles.buttonStyle}
                                        buttonStyle={styles.buttonColor}
                                        title={lang('Login')}
                                        color={BASIC_COLOR}
                                        fontSize={14}
                                        onPress={() => {
                                            this.props.navigation.navigate('Login')
                                        }}
                                    />
                                    <Button
                                        containerViewStyle={styles.buttonStyle}
                                        buttonStyle={styles.buttonColor}
                                        title={lang('Sign Up')}
                                        color={BASIC_COLOR}
                                        fontSize={14}
                                        onPress={() => {
                                            this.props.navigation.navigate('SignUp')
                                        }}
                                    />
                                </View>
                            ) : (
                                <View style={styles.buttonBox_root}>
                                    <Button
                                        containerViewStyle={styles.buttonStyle}
                                        buttonStyle={styles.buttonColor}
                                        title={lang('Deposit')}
                                        color={BASIC_COLOR}
                                        fontSize={14}
                                        onPress={() => {
                                            this.props.navigation.navigate('Deposit')
                                        }}
                                    />
                                    <Button
                                        containerViewStyle={styles.buttonStyle}
                                        buttonStyle={styles.buttonColor}
                                        title={lang('Withdraw')}
                                        color={BASIC_COLOR}
                                        fontSize={14}
                                        onPress={() => {
                                            this.props.navigation.navigate('Withdraw')
                                        }}
                                    />
                                </View>
                            )
                        }
                    </View>
                </View>
                {/*多币种*/}
                {this.renderMultiDigitalCurrency()}
            </View>
        )
    }

    componentDidMount() {
        if (Cache.initial) {
            this.loginCallback()
        } else {
            Schedule.addEventListener('cacheInitial', this.loginCallback, this)
        }

        if (Assets.initial) this.updateAssets();

        Schedule.addEventListener('loginCallback', this.loginCallback, this);
        Schedule.addEventListener('updateAssets', this.updateAssets, this);
    }

    componentWillUnmount() {
        Schedule.removeEventListener(this)
    }


    loginCallback() {
        this.setState({isLogin: Cache.isLogin()});
    }

    updateAssets() {
        this.setState({
            userName: Assets.username,
            usd: Assets.USD.money,
            btc: Assets.BTC.money,
            usdt: Assets.USDT.money,
            eth: Assets.ETH.money
        })
    }
}