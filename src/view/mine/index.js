import React, {Component} from 'react';

import {Button} from 'react-native-elements'

import req from '../../lib/req'
import {
    Header
} from "../../common";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert
} from 'react-native'

import {
    RATIO,
    SCREEN_WIDTH
} from "../../lib/adjust";

import Icons from 'react-native-vector-icons/Ionicons'

import {
    SafeBody
} from "../../lib/adjust";

import {
    Cache, Schedule
} from "../../module";

import styles from './../../style/login/index'
import { NOTICE_CONTENT_FONT_COLOR, BASIC_COLOR, ACTIVITY_FONT_COLOR,LINE_COLOR } from '../../lib/color';
import commonStyles from './../../style/variable'


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: Cache.isLogin(),
            name: '',
            bankCardCount: '',
            aLiPay: '',
            phone: '',
            withdrawPass: '',
            userLevel: Cache.userLevel,
            userName: '',
            userId: Cache.userId,
            balance: Cache.gameBalance,
            shareShow:false
        };
    }

    render(){
        let item4 = {};
        item4.image='https://nf.hot7h.com/static/media/logo.38ad0527.png';
        item4.title='分享好友';
        // item4.description='好东西记得分享哦';
        let item5 = {};
        item5.image='https://nf.hot7h.com/static/media/logo.38ad0527.png';
        item5.title='阅读历史';
        // item5.description='这里有我们全部消息哦';
        item5.onPress=()=>this.goNotice();
        let item2 = {};
        item2.image='https://nf.hot7h.com/static/media/logo.38ad0527.png';
        item2.title='联系客服';
        // item2.description='客服全天候在线';
        item2.onPress=()=>this.goServer();
        let item1 = {};
        item1.image='https://nf.hot7h.com/static/media/logo.38ad0527.png';
        item1.title='我的公告';
        // item1.description='这里有我们全部消息哦';
        item1.onPress=()=>this.goNotice();

        let item3 = {};
        item3.image='https://nf.hot7h.com/static/media/logo.38ad0527.png';
        item3.title='修改密码';

        // item3.description='设置您的登录密码';
        item3.onPress=()=>this.goChangePassword();

        let item6 = {};
        item6.image='https://nf.hot7h.com/static/media/logo.38ad0527.png';
        item6.title='退出登录';
        // item6.description='退出登入';
        item6.onPress=()=>this.logout();


        return(
            <SafeBody>
                <Header title={'个人中心'}/>
                <ScrollView>
                    <View style={minePageStyle.topView}>
                        <Image style={minePageStyle.topImage}
                               source={{uri:'https://nf.hot7h.com/static/media/logo.38ad0527.png'}}
                        />
                        <TouchableOpacity onPress={()=>this.goAccountCenter()}>
                            {Cache.isLogin() ? null : <Text style={{fontSize:16}}>登录 / 注册</Text>}
                        </TouchableOpacity>
                    </View>
                    {/*{Cache.isLogin() ? this.renderBlanceBar() : null}*/}
                    {this.renderSperateLine()}
                    {this.renderRow(item4)}
                    {this.renderSperateLine()}
                    {this.renderRow(item5)}
                    {this.renderSperateLine()}
                    {this.renderRow(item2)}
                    {this.renderSperateLine()}
                    {this.renderRow(item1)}
                    {this.renderSperateLine()}
                    {this.renderRow(item3)}
                    {this.renderSperateLine()}

                    {this.renderRow(item6)}
                    {this.renderSperateLine()}
                </ScrollView>
            </SafeBody>
        );
    }

    renderBlanceBar(){
        return(
            <View style={{marginHorizontal:20,height:120,marginTop:20,marginBottom:10,borderRadius:10,overflow:'hidden'}}>
                <View style={{backgroundColor:'orange',height:'65%',justifyContent:'flex-end'}}>
                    <Text style={{fontSize:16,color:LINE_COLOR,alignSelf:'center'}}>账户余额</Text>
                    <Text style={{fontSize:22,color:'white',alignSelf:'center',marginBottom:5}}>{this.state.balance}元</Text>
                </View>
                <TouchableOpacity onPress={()=> this.addSimBalance()}
                                  style={{backgroundColor:'red',alignItems:'center',height:'35%',justifyContent:'center'}}
                >
                    <Text style={{fontSize:17,color:'white',alignSelf:'center'}}>自主加币</Text>
                </TouchableOpacity>
            </View>
        )
    }

    // renderLogout(){
    //     return(
    //         <TouchableOpacity onPress={()=>this.logout()}>
    //             <View style={{marginHorizontal:40,height:50,borderRadius:8,backgroundColor:'orange',justifyContent:'center',alignItems:'center',marginTop:40}}>
    //                 <Text style={{color:'white',fontSize:22,alignSelf:'center'}}>退出登录</Text>
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

    renderSperateLine(){
        return(
            <View style={{marginLeft: 58,height:0.5,backgroundColor:LINE_COLOR}}/>
        )
    }

    renderRow(item){
        return(
            <TouchableOpacity onPress={item.onPress}>
                <View style={minePageStyle.cellView}>
                    <View style={minePageStyle.box}>
                        <Image style={minePageStyle.cellImage}
                               source={{uri:'https://nf.hot7h.com/static/media/logo.38ad0527.png'}}
                        />
                        <View style={minePageStyle.txt}>
                            <Text style={{fontSize:16,marginBottom:5}}>{item.title}</Text>
                            {/*<Text style={{fontSize:15,color:NOTICE_CONTENT_FONT_COLOR}}>{item.description}</Text>*/}
                        </View>
                    </View>

                </View>
            </TouchableOpacity>

        )
    }

    goAccountCenter(){
            this.props.navigation.navigate('Login');
    }

    componentDidMount() {
        if (Cache.initial) {
            this.loginCallback();
        } else {
            Schedule.addEventListener('cacheInitial', this.loginCallback, this);
        }
        Schedule.addEventListener('getUserInfo', this.getInfoCallback, this);
    }

    componentWillUnmount() {
        Schedule.removeEventListeners(this)
    }


    //todo 退出
    logout() {
        Alert.alert('警告','是否退出账号？',[
            {text: '取消', style: 'cancel'},
            {text: '确定', onPress: () => {Cache.setLogout();this.setState({isLogin:Cache.isLogin()})}}
        ]);
    }

    loginCallback() {
        this.setState({
            isLogin: Cache.isLogin()
        });
        this.getInfoCallback();
    }

    //todo 一键加币功能
    async addSimBalance() {
        console.log('来了啊。。。');
        try {
            const result = await req({
                url: '/trade/addScore.htm',
                animate: true
            });
            Cache.getUserInfo();
            Alert.alert(
                '提示',
                result.resultMsg,
                [
                    {text: '确定', style: 'cancel'},
                ],
                { cancelable: false }
            )

            // AlertFunction({title: '提示', msg: result.resultMsg});
        } catch (err) {

            // console.log(err.resultMsg,'打印错误信息');
            // AlertFunction({title: '错误', msg: err.resultMsg});

            Alert.alert(
                '错误',
                err.resultMsg,
                [
                    {text: '确定', style: 'cancel'},
                ],
                { cancelable: false }
            )
        }
    }

    getInfoCallback() {
        this.setState({
            name: Cache.realName,
            bankCardCount: Cache.bankCardCount,
            phone: Cache.phone,
            withdrawPass: Cache.withdrawPass,
            userLevel: Cache.userLevel,
            userName: Cache.username,
            userId: Cache.idNumber,
            balance: Cache.gameBalance
        });
        console.log(this.state.gameBalance,'打印余额')
    }

    goNotice(){
        this.props.navigation.navigate('Notice');
    }
    goServer(){
        this.props.navigation.navigate('Server');
    }
    goChangePassword(){
        this.props.navigation.navigate('ForgotPassword');
    }
}

const minePageStyle = StyleSheet.create({
    topView:{
        marginVertical:10,
        alignItems:'center',
    },
    topImage:{
        height:70,
        width:70,
    },
    box:{
      display: 'flex',
      flexDirection: 'row',
      alignItems:'center'
    },
    cellView:{
        flexDirection:'row',
        // justifyContent:'space-between',
        height:53,
        justifyContent:'space-between',
        alignItems:'center'
    },

    cellImage:{
        height:18,
        width:18,
        marginHorizontal:20,
    },
    txt:{
        marginTop: 5
    },
});


