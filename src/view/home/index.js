import React, {Component} from 'react';
import {
    Alert,
    ScrollView,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import futures from '../futures'

import {
    StackNavigator
} from 'react-navigation';

import Server from '../server/index'

import {
    SafeBody, SCREEN_WIDTH
} from "../../lib/adjust";

import {BACKGROUND_COLOR, RAISE} from './../../lib/color'
import quotation from '../quotation/index'
import HeadPart from './headPart';
import QuotePart from './quotePart';
import Guide from './guide';
import SignUp from './../signUp/index'
import Notice from '../notice'
import Activity from './../activity/index'
import PhoneBinding from './../account/accountSet/phoneBinding'
import AccountCenter from "../account/accountSet/index";
import ForgotPassword from "../login/forgotPassword";
import LanguageSet from "../account/accountSet/languageSet";
import FundPassword from "../account/accountSet/fundPassword";
import LoginPassword from "../account/accountSet/loginPassword";
import BankCardManager from './../account/accountSet/bankCardManager'
import AddCard from './../account/accountSet/addCard'
import EditCard from './../account/accountSet/editBankCard'
import NameVerify from './../../view/account/accountSet/nameVerified'
import Login from './../login/index'
import PromoteDetail from './../promote/index'
import UserList from './../promote/userList'
import Broadcast from '../broadcast/index'
import NoticeDetail from './../notice/noticeDetail'
import TopList from '../topList/index'

import {lang} from "../../lang";
import styles from './../../style/home/index'
import commonStyles from './../../style/variable'
import { Cache, Schedule } from '../../module';

import { createIconSet } from 'react-native-vector-icons';
import Trade from "../trade";
import {ViewRow} from "../../basicComponent";
import {GRID_LINE_COLOR} from "../../lib/color";
const glyphMap = { 'fcg': 1234, test: '∆' };
const Icon = createIconSet(glyphMap, 'arrow-up');

class HomePage extends Component {
    scrollView = null;
    constructor(props) {
        super(props);
        this.props.navigation.addListener('didFocus',()=>{
            this.scrollView.scrollTo({y:1})
        });
        this.props.navigation.addListener('didBlur',()=>{
            this.scrollView.scrollTo({y:2})
        });

        this.state = {
            isLogin:Cache.isLogin()
        }
    }

    componentDidMount(){
        if (Cache.initial) {
            this.loginCallback()
        } else {
            Schedule.addEventListener('cacheInitial', this.loginCallback, this)
        }
        Schedule.addEventListener('loginCallback', this.loginCallback, this);
    }

    renderLoginButtons(){
        if (this.state.isLogin) {
            return null;
        } else {
            return(
                <View style={[commonStyles.rowStyle,styles.loginButtonsRoot]}>
                    <View style={[commonStyles.fillStyle,commonStyles.rowStyle,{justifyContent:'flex-end'}]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}} style={[styles.loginButtonTouchable]}>
                            <Text style={styles.loginButtonText}>马上登录</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[commonStyles.fillStyle,commonStyles.rowStyle]}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('SignUp')}} style={styles.loginButtonTouchable}>
                            <Text style={styles.loginButtonText}>极速开户</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }

    render() {
        return (
            <SafeBody>

                <ScrollView style={styles.scrollViewBackground} ref={(c)=>this.scrollView = c}>

                    <HeadPart/>
                    <QuotePart/>
                </ScrollView>
            </SafeBody>
        );
    }

    loginCallback() {
        this.setState({isLogin: Cache.isLogin()})
    }
}

export default StackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },

    GotoTrade:{
        screen: Trade,

        navigationOptions: {
            header: null,
            tabBarVisible: false,
        }
    },

    Futures:{
        screen: futures,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    Server:{
        screen:Server,
        navigationOptions:{
            header:null,
            tabBarVisible:false
        }
    },
    Notice:{
        screen:Notice,
        navigationOptions:{
            header:null,
            tabBarVisible:false
        }
    },
    SignUp:{
        screen:SignUp,
        navigationOptions:{
            header:null,
            tabBarVisible:false
        }
    },
    Activity:{
        screen:Activity,
        navigationOptions:{
            header:null,
            tabBarVisible:false
        }
    },
    AccountCenter:{
        screen:AccountCenter,
        navigationOptions:{
            header:null,
            tabBarVisible:false
        }
    },
    Broadcast:{
        screen:Broadcast,
        navigationOptions:{
            header:null,
            tabBarVisible:false
        }
    },
    PhoneBinding:{
        screen: PhoneBinding,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    LanguageSet: {
        screen: LanguageSet,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    FundPassword: {
        screen: FundPassword,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    LoginPassword: {
        screen: LoginPassword,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    BankCardManager:{
        screen: BankCardManager,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    AddCard:{
        screen:AddCard,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    NameVerify:{
        screen:NameVerify,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    PromoteDetail:{
        screen:PromoteDetail,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    Login:{
        screen:Login,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    EditCard:{
        screen:EditCard,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    UserList:{
        screen:UserList,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    Guide:{
        screen:Guide,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    NoticeDetail:{
        screen:NoticeDetail,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    },
    TopList:{
        screen:TopList,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        }
    }
});

