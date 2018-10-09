import React, {Component} from 'react';
import {TabNavigator, TabBarBottom} from 'react-navigation';

import {Text, ImageBackground, NetInfo, Alert, Platform,ActivityIndicator} from 'react-native';

import {lang} from './lang/index'

import Icons from 'react-native-vector-icons/Ionicons';

import codePush from 'react-native-code-push';

import extend from './lib/extend';

extend();

import Home from './view/home';
import Trade from './view/trade';
import Login from './view/login';
import Account from './view/account';
import Broadcast from './view/broadcast/index'
import Position from './view/position'
import Quotation from './view/quotation/index'
import Information from './view/information'
import Mine from './view/mine/index'
import TouchID from 'react-native-touch-id'
import {Contracts, Cache, Schedule, Data} from "./module";
import {getLanguage} from "./lang";
import {BACKGROUND_COLOR, HEADER_BACKGROUND, HEADER_FONT_COLOR, FOOTER_BACKGROUND_COLOR,RAISE} from "./lib/color";
import styles from './style/app'
import {SCREEN_HEIGHT,SCREEN_WIDTH} from "./lib/adjust";
import cache from './module/cache';
import crypto from 'crypto'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev men' + 'u'
});

const Tab = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarLabel: lang('Home'),
            tabBarIcon: ({focused, tintColor}) => (<Icons
                name={`ios-home`}
                size={30}
                color={tintColor}/>)
        })
    },
    Quotation: {
        screen: Quotation,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarLabel: lang('Quotation'),
            tabBarIcon: ({focused, tintColor}) => (<Icons
                name={`ios-briefcase`}
                size={30}
                color={tintColor}/>)
        })
    },
    Broadcast: {
        screen: Broadcast,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarLabel: '资讯',
            tabBarIcon: ({focused, tintColor}) => (<Icons
                name={`ios-list-box`}
                size={35}
                color={tintColor}/>)
        })
    },
    Mine:{
        screen: Mine,
        navigationOptions: ({navigation}) => ({
            header: null,
            tabBarLabel: lang('Mine'),
            tabBarIcon: ({focused, tintColor}) => (<Icons
                // name={`ios-information-circle${focused
                //     ? ''
                //     : '-outline'}`}
                name = {`ios-information-circle`}
                size={30}
                color={tintColor}/>)
        })
    }
}, {
    tabBarOptions: {
        activeTintColor: RAISE,
        inactiveTintColor: HEADER_FONT_COLOR,
        style:{
            backgroundColor: FOOTER_BACKGROUND_COLOR,
        },
        labelStyle: {
            fontSize: 14
        }
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    initialRouteName: 'Home'
});

class App extends Component {
    installed = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            step: 0,
            isUpdateFinished:false,
            updateText:'Loading...',
            isDownload:false,
            update:false
        };
        this._process = 0;
        this._start = new Date().getTime();
        this.netChange = this
            .netChange
            .bind(this);

            this.sync();

            TouchID.isSupported()
            .then(biometryType=>{
                if (biometryType === 'FaceID') {
                    console.log('spp FaceID is supported.');
                } else {
                    console.log('spp TouchID is supported.');
                }
            })
            .catch(e=>{
                console.log(`spp ${e}`);
            })
    }

    // 监听更新状态
    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({updateText: '检查更新.'});
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({isDownload: true, updateText: '下载更新包.'});
                break;
            case codePush.SyncStatus.AWAITING_USER_ACTION:
                this.setState({updateText: 'Awaiting user action.'});
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                this.setState({updateText: '正在安装更新.'});
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                this.setState({updateText: '应用已是最新版本.'}, () => {
                    setTimeout(() => this.setState({isUpdateFinished: true}), 100)
                });
                break;
            case codePush.SyncStatus.UPDATE_IGNORED:
                this.setState({updateText: 'Update cancelled by user.'});
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({updateText: '更新已安裝,将会在下次启动应用時启用.'}, () => this.setState({isUpdateFinished: true}));
                break;
            case codePush.SyncStatus.UNKNOWN_ERROR:
                this.setState({updateText: '更新失败.'}, () => this.setState({isUpdateFinished: true}));
                break;
        }
    }

    /** Update is downloaded silently, and applied on restart (recommended) 自动更新，一键操作 */
    sync() {
        codePush.sync({
            installMode: codePush.InstallMode.IMMEDIATE
        }, this.codePushStatusDidChange.bind(this));
    }

    /** Update pops a confirmation dialog, and then immediately reboots the app 一键更新，加入的配置项 */
    syncImmediate() {
        codePush.sync({
            installMode: codePush.InstallMode.IMMEDIATE,
            updateDialog: true
        }, this.codePushStatusDidChange.bind(this));
    }

    render() {
       if(this.state.isUpdateFinished && !this.state.loading && !this.state.isDownload){
           return (<Tab/>)
       }else{
           return (
               <ImageBackground source={require('./images/loading.jpg')} style={styles.imageBackground}>
                   {
                       (this.state.update || !this.state.isUpdateFinished) ? <ActivityIndicator size={'large'} style={{
                           alignItems: 'center',
                           flex: 1,
                           position: 'absolute',
                           zIndex: 1,
                           width: SCREEN_WIDTH,
                           height: SCREEN_HEIGHT
                       }}/> : null
                   }
                   <Text style={styles.text}>{this.state.updateText}</Text>
               </ImageBackground>
           )

       }
    }

    componentDidMount() {
        Schedule.addEventListener('updateLanguage', this.loadingFinish, this);
        Schedule.addEventListener('loadLanguage', this.loadingFinish, this);
        getLanguage().catch();
        setTimeout(() => this.loadingText(), 2000)
    }

    loadingFinish() {
        NetInfo
            .isConnected
            .addEventListener('connectionChange', this.netChange);
        Schedule.removeEventListeners(this);
        this._process++;
        if (this.state.loading) {
            if (this._process === 2) {
                this.setState({loading: false});
            }
        }
        if (Platform.OS === 'android') {
            NetInfo
                .isConnected
                .fetch()
                .done((isConnected) => {
                    this.netChange(isConnected);
                });
        }
    }

    loadingText() {
        if (this.state.loading) {
            this.setState({
                step: ~ this.state.step
            });
            setTimeout(() => this.loadingText(), 2000)
        }
    }

    netChange(isConnected) {
        if (!isConnected) {
            Alert.alert(lang('Reminder'), lang('Please connect internet first.'));
            if (!this.state.loading) {
                this.setState({loading: true});
            }
        }
        if (this.state.loading) {
            if (isConnected) {
                if (!Data.initial) {
                    Contracts.init();
                    Cache.init();
                }
                this._process++;
                if (this._process >= 2) {
                    let now = new Date().getTime();
                    let keep = now - this._start;
                    if (keep >= 2000) {
                        this.setState({loading: false});
                    } else {
                        setTimeout(() => this.setState({loading: false}), 2000 - keep)
                    }
                }
            }
        }
    }
}

// let codePushOptions = {checkFrequency:
// codePush.CheckFrequency.ON_APP_RESUME,updateDialog:true,installMode:
// codePush.InstallMode.IMMEDIATE};

//远程服务器
let codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME || codePush.CheckFrequency.ON_APP_START
};
app = codePush(codePushOptions)(App);
export default app;

//本地服务器
// export default App;
