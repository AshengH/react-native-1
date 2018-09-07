import {
    AsyncStorage
} from 'react-native'

import {
    Assets,
    Scheme,
    Schedule
} from "./index";

import req from '../lib/req';
import JPushModule from "jpush-react-native/index";

export default {
    initial:false,
    //0-未登录,1-已登录
    status:false,
    username:'',
    realBalance:0,
    gameBalance:0,
    account: '',
    password: '',
    jpush:null,
    realName:'',
    phone:null,
    bankCardCount:0,
    idNumber:0,
    nickname:'',
    userId:'',
    async init() {
        try {
            this.jpush = await AsyncStorage.getItem('jpush');
            if(!this.jpush){
                Schedule.addEventListener('jpushToken',function (token) {
                    this.jpush = token;
                    if(!!this.account)
                        this.resumeLogin();
                    AsyncStorage.setItem('jpush',token)
                },this);
                JPushModule.getRegistrationID(function(token){
                    Schedule.dispatchEvent({event:'jpushToken',eventData:token,clearAfterDispatch:true});
                });
            }
            const [account, password] = await this.getUserFromCache();
            if (!account || !password)
                throw '';
            this.account = account;
            this.password = password;
            await this.resumeLogin();
            this.status = 1;
            Assets.update();
            Scheme.init();
            this.getUserInfo();
        } catch (err) {
            AsyncStorage.removeItem('account');
            AsyncStorage.removeItem('password');
        } finally {
            this.initial = true;
            Schedule.dispatchEvent({event: 'cacheInitial',clearAfterDispatch:true});
        }
    },
    resumeLogin() {
        return req({
            url: '/sso/user_login_check',
            type: 'POST',
            data: {
                mobile: this.account,
                password: this.password,
                jpush:this.jpush
            }
        });
    },
    isLogin() {
        return this.status;
    },
    async getUserFromCache() {
        const account = await AsyncStorage.getItem('account');
        const password = await AsyncStorage.getItem('password');
        return new Promise((resolve,reject)=>{
            resolve([account,password])
        })
    },

    /*设置登录状态*/
    setLogin(account,password){
        AsyncStorage.setItem('account',account);
        AsyncStorage.setItem('password',password);
        Assets.update();
        Scheme.init();
        this.getUserInfo();
        this.status = 1;
        Schedule.dispatchEvent({event:'loginCallback'})
    },

    /*设置登出状态*/
    setLogout(){
        AsyncStorage.removeItem('account');
        AsyncStorage.removeItem('password');
        this.status = 0;
        Assets.reset();
        Schedule.dispatchEvent({event:'loginCallback'})
    },
    async getUserInfo(){
        try {
            await req({
                url: '/mine/index.htm',
            }).then((data)=>{
                this.username = data.user.username;
                this.userId = data.user.id;
                this.realBalance = data.asset.money;
                this.gameBalance = data.asset.game;
                this.hello = data.hello;
            });

            await req({
                url:'/mine/profile.htm'
            }).then((data)=>{
                this.bankCardCount = data.bankCardCount;
                this.realName = data.info.name;
                this.phone = data.info.mobile;
                this.idNumber = data.info.identityNumber;
                this.nickname = data.user.username;
                this.idNumberValid = data.info.identityNumberValid;
                this.withdrawPass = data.user.withdrawPw;
                this.userLevel = data.level;
            });
        }catch (e){

        }finally {
            Schedule.dispatchEvent({event:'getUserInfo'})
        }
    }

}