import React,{Component} from 'react'

import {ScrollView,View,Image,TouchableOpacity,Text,Alert} from 'react-native'

import {SafeBody} from "../../../lib/adjust";
import Icons from 'react-native-vector-icons/Ionicons'
import {Li} from "../../../common";
import {Header} from "../../../common";
import {getCurrentlyLanguage, lang} from "../../../lang";
import styles from './../../../style/account/accountSet/index'
import { Cache, Schedule } from '../../../module';
import {mobileMask, nameMask, idMask} from "../../../lib/tool";
import { GRID_LINE_COLOR } from '../../../lib/color';
import { contentVersion } from '../../../config';
export default class App extends Component{
    constructor(props){
        super(props)

        this.state = {
            isLogin: Cache.isLogin(),
            name: '',
            bankCardCount: '',
            aLiPay: '',
            phone: '',
            withdrawPass: '',
            userLevel:Cache.userLevel,
            userName:'',
            userId:Cache.userId

        }
    }

    componentDidMount(){

        if (Cache.initial) {
            this.loginCallback();
        }else{
            Schedule.addEventListener('cacheInitial', this.loginCallback, this);
        }
        Schedule.addEventListener('getUserInfo', this.getInfoCallback, this);
    }

    componentWillUnmount() {
        Schedule.removeEventListeners(this)
    }

    renderNameVerify(){
        if (contentVersion === 'standard') {
            let nameVerifyRightMessage = this.state.name.length !== 0 ? nameMask(this.state.name) + '\n' + idMask(this.state.userId) :'未认证'
            return (
                <View>
                    <Li title={'Real Name Verify'} rightMsg={nameVerifyRightMessage} onPress={()=>this.props.navigation.navigate('NameVerify')}
                        icon={()=>{
                            return(
                                <Icons
                                    name={'ios-card-outline'}
                                    size={35}
                                    style={[styles.functionStyle]}
                                />
                            )
                        }}
                    />
                    <View style={{width:'100%',height:10,backgroundColor:GRID_LINE_COLOR}}/>
                </View>
            );
        }else{
            return (
                null
            );
        }
    }

    renderBankCard(){
        if (contentVersion === 'standard') {
            return(
                <View>
                    <Li title={'Withdrawal Bank Card'} rightMsg={this.state.bankCardCount} onPress={()=>this.props.navigation.navigate('BankCardManager')}
                        icon={()=>{
                            return(
                                <Icons
                                    name={'ios-card-outline'}
                                    size={35}
                                    style={[styles.functionStyle]}
                                />
                            )
                        }}
                    />
                    <View style={styles.line}>

                    </View>
                </View>
            );
        }else{
            return(
                null
            );
        }
    }

    renderFundPassword(){
        if (contentVersion === 'standard') {
            return(
                <View>
                    <Li title={'Set Fund Password'} rightMsg={lang('Not Set')} onPress={()=>this.props.navigation.navigate('FundPassword')}
                        icon={()=>{
                            return(
                                <Icons
                                    name={'ios-key-outline'}
                                    size={35}
                                    style={[styles.functionStyle]}
                                />
                            )
                        }}
                    />
                    <View style={styles.line}>

                    </View>
                </View>
            );
        } else {
            return(null);
        }
    }

    render(){
        return(
            <SafeBody>
                {/*头部*/}
                <Header title={'Account Settings'} navigation={this.props.navigation}/>
                <ScrollView style={styles.scrollViewBackground}>
                    <View style={{width:'100%',height:10,backgroundColor:GRID_LINE_COLOR}}/>
                    {this.renderNameVerify()}
                    <Li title={'Platform Nickname'} rightMsg={this.state.userName}
                        icon={()=>{
                            return(
                                <Icons
                                    name={'ios-card-outline'}
                                    size={35}
                                    style={[styles.functionStyle]}
                                />
                            )
                        }}
                    />
                    <View style={styles.line}>

                    </View>
                   {this.renderBankCard()}
                    <Li title={'Phone binding'} rightMsg={this.state.phone === undefined?lang('Not Set'):mobileMask(this.state.phone)} onPress={()=>this.props.navigation.navigate('PhoneBinding')}
                        icon={()=>{
                            return(
                                <Icons
                                    name={'ios-key-outline'}
                                    size={35}
                                    style={[styles.functionStyle]}
                                />
                            )
                        }}
                    />
                    <View style={styles.line}>

                    </View>
                    {this.renderFundPassword()}
                    <Li title={'Set Login Password'} rightMsg={lang('Set')} onPress={()=>this.props.navigation.navigate('LoginPassword')}
                        icon={()=>{
                            return(
                                <Icons
                                    name={'ios-card-outline'}
                                    size={35}
                                    style={[styles.functionStyle]}
                                />
                            )
                        }}
                    />
                    <View style={styles.line}>

                    </View>
                    <Li title={'Language'} rightMsg={lang(getCurrentlyLanguage().des)} onPress={()=>{this.props.navigation.navigate('LanguageSet')}}
                        icon={()=>{
                            return(
                                // <Icons
                                //     name={'logo-googleplus'}
                                //     size={35}
                                //     style={[styles.functionStyle]}
                                // />
                                <Image style={[styles.functionStyle,{width:35,height:35}]} source={require('../../../images/yuyan.png')}/>
                            )
                        }}
                    />

                    <TouchableOpacity onPress={()=>this.logout()} style={styles.logoutTouchable}>
                        <Text style={styles.logoutButtonText}>{lang('Logout')}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeBody>
        )
    }

    getInfoCallback() {
        this.setState({
            name: Cache.realName,
            bankCardCount: Cache.bankCardCount,
            phone: Cache.phone,
            withdrawPass: Cache.withdrawPass,
            userLevel : Cache.userLevel,
            userName:Cache.nickname,
            userId:Cache.idNumber
        })
    }

    loginCallback() {
        this.setState({
            isLogin: Cache.isLogin()
        });
        this.getInfoCallback();
    }

    logout() {
        Alert.alert(lang('Reminder'), lang('Please double check if logout ?'), [{
            text: lang('OK'), onPress: () => {
                Cache.setLogout();
                this.props.navigation.navigate('Home')
            }
        }, {text: lang('Cancel')}])
    }

}