import React, {Component} from 'react';

import {View, ScrollView, TouchableHighlight, Text, Alert} from 'react-native';

import {StackNavigator} from 'react-navigation';

import {RATIO, SafeBody} from "../../lib/adjust";

import {Li} from "../../common";
import {Assets, Cache, Schedule} from "../../module";
import {lang} from "../../lang";
import styles from './../../style/account/index'

import AccountHeader from './accountHeader'
import SignUp from "../signUp";
import Login from "../login";
import Language from "../signUp/language";
import Deposit from "../deposit/index";
import Withdraw from "../withdraw/index";
import ForgotPassword from "../login/forgotPassword";
import LanguageSet from "../account/accountSet/languageSet";
import Setting from "../account/accountSet/index";
import PhoneBinding from './accountSet/phoneBinding'
import LoginPassword from "../account/accountSet/loginPassword";
import FundPassword from "../account/accountSet/fundPassword";
import FundDetails from "../account/accountSet/fundDetails";
import WithdrawAddress from "../withdraw/withdrawalAddress/index";
import DepositRecords from "../deposit/depositRecords/depositRecords";
import RechargeDetail from "../deposit/rechargeDetail/rechargeDetail";
import BankList from "../deposit/bankList/bankList";
import WithdrawRecords from "../withdraw/withdrawRecords/withdrawRecords";
import EditAddress from "../withdraw/withdrawalAddress/editAddress";
import DetailList from "../account/accountSet/detialList";
import Rules from "../rules";
import Icons from 'react-native-vector-icons/Ionicons'
import Info from '../info';


export default class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogin: Cache.isLogin(),
            label:'Account setting'
        };
    }

    render() {
        return (
            <SafeBody>
                <ScrollView style={styles.scrollViewBackground}>
                    <AccountHeader navigation={this.props.navigation}/>
                    {/*类似Li 组件*/}
                    <View style={styles.list}>
                        <Li title={'Account Settings'} onPress={() => {
                            this.state.isLogin === 1 ? this.props.navigation.navigate('Setting') : this.props.navigation.navigate('Login')
                        }}
                            icon={() => {
                                return (
                                    <Icons
                                        name={'ios-settings-outline'}
                                        size={35}
                                        style={[styles.functionStyle]}
                                    />
                                )
                            }}
                        />

                        <Li title={'Fund Details'} onPress={() => {
                            this.state.isLogin === 1 ? this.props.navigation.navigate('FundDetails') : this.props.navigation.navigate('Login')
                        }}
                            icon={() => {
                                return (
                                    <Icons
                                        name={'ios-list-box-outline'}
                                        size={35}
                                        style={[styles.functionStyle]}
                                    />
                                )
                            }}
                        />
                    </View>

                    {/*退出按钮*/}
                    {
                        this.state.isLogin === 1 ?
                            <TouchableHighlight style={styles.buttonWrapper}
                                                onPress={() => (this.logout())}>
                                <Text style={styles.doneStyle}>{lang('Logout')}</Text>
                            </TouchableHighlight>
                            :
                            null
                    }
                    {/*<Text style={{textAlign:'center',fontSize:12*RATIO,marginTop:30,marginBottom:10}}>{lang('IM Futures belongs to HongKong ZhiYuan Futures Co., Ltd.')}</Text>*/}
                </ScrollView>
            </SafeBody>
        )
    }

    componentDidMount() {
        if (Cache.initial) {
            this.loginCallback()
        } else {
            Schedule.addEventListener('cacheInitial', this.loginCallback, this)
        }
        Schedule.addEventListener('loginCallback', this.loginCallback, this);
        Schedule.addEventListener('updateLanguage',this.updateLabel,this);
    }

    loginCallback() {
        this.setState({isLogin: Cache.isLogin()})
    }

    logout() {
        Alert.alert(lang('Reminder'), lang('Please double check if logout ?'), [{
            text: lang('OK'), onPress: () => {
                Cache.setLogout();
                this.props.navigation.navigate('Home')
            }
        }, {text: lang('Cancel')}])
    }
    updateLabel(){
        this.setState({
            label:'Account setting'
        })
    }
}

/**主枝路由*/
// export default StackNavigator({
//     Account: {
//         screen: Account,
//         navigationOptions: {
//             header: null
//         }
//     },
//     Login: {
//         screen: Login,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     SignUp: {
//         screen: SignUp,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     Language: {
//         screen: Language,
//         navigationOptions: {
//             header: null
//         }
//     },
//     Deposit: {
//         screen: Deposit,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     Withdraw: {
//         screen: Withdraw,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     ForgotPassword: {
//         screen: ForgotPassword,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     LanguageSet: {
//         screen: LanguageSet,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     LoginPassword: {
//         screen: LoginPassword,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     FundPassword: {
//         screen: FundPassword,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     FundDetails: {
//         screen: FundDetails,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     DetailList: {
//         screen: DetailList,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     DepositRecords: {
//         screen: DepositRecords,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     RechargeDetail:{
//         screen: RechargeDetail,
//         navigationOptions: {
//         header: null,
//         tabBarVisible: false
//         }
//     },
//     BankList:{
//         screen: BankList,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     WithdrawRecords: {
//         screen: WithdrawRecords,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     Rules: {
//         screen: Rules,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     Info: {
//         screen: Info,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     WithdrawAddress: {
//         screen: WithdrawAddress,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     EditAddress: {
//         screen: EditAddress,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     },
//     PhoneBinding:{
//         screen: PhoneBinding,
//         navigationOptions: {
//             header: null,
//             tabBarVisible: false
//         }
//     }
// })
