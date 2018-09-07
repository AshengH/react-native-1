import React, {Component} from 'react';
import Cache from './../../module/cache'
import {Button} from 'react-native-elements';

import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ImageBackground,
    Alert,
    Keyboard
} from 'react-native';

import {
    RATIO,
    SCREEN_WIDTH
} from "../../lib/adjust";

import {
    SafeBody
} from "../../lib/adjust";

import Icons from 'react-native-vector-icons/Ionicons'

import req from '../../lib/req'
import {lang} from '../../lang';
import Verify from './../signUp/verify'
import styles from './../../style/signUp/index'
import { NOTICE_CONTENT_FONT_COLOR, LINE_COLOR } from '../../lib/color';
import commonStyles from './../../style/variable'
import { Header } from '../../common';
export default class App extends Component {
    _countdown = 0;
    _signAccount = null;
    _code = null;
    _name = null;
    _password = null;

    constructor(props) {
        super(props);

        this.state = {
            next: true,
            buttonState: true,
            reqAgain: `get after ${this._countdown} s`,
            password: '',
            showVerify:false,
            _signAccount:null
        };

        this.sendCode = this.sendCode.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.submit = this.submit.bind(this);
    }

    render() {
        return (
            <SafeBody>
                <View style={{width: SCREEN_WIDTH, flex: 1,}}>
                    <View>
                        {/* <View style={commonStyles.heightOffset}>

                        </View> */}
                        {/* <View>
                            <Icons
                                name={`ios-arrow-dropleft-circle-outline`}
                                size={30}
                                style={styles.backIcon}
                                onPress={() => this.props.navigation.goBack()}
                            />
                        </View> */}
                        <Header title={'Sign Up'}/>

                        <View style={{marginHorizontal:20}}>
                            <Text
                                style={styles.loginTitle}
                            >{lang('Please input your mobile number')}</Text>
                            <Text style={{color:NOTICE_CONTENT_FONT_COLOR}}>{lang("We won't leak your number anywhere")}</Text>
                        </View>

                        {/*根据状态不同显示不同样式*/}
                        {this.state.next ? (
                            /*注册信息：邮箱  验证码*/
                            <View>
                                <Text style={{marginTop:10,marginLeft:20,fontSize:18,color:NOTICE_CONTENT_FONT_COLOR}}>{lang('Mobile number')}</Text>
                                <View style={styles.inputBox}>
                                    {/* <Icons
                                        name={`md-person`}
                                        size={25}
                                        style={styles.userIdInputImage}
                                    /> */}
                                    
                                    <TextInput
                                        placeholder={lang('Mobile number')}
                                        style={styles.textInput}
                                        onChangeText={(text) => this.setState({_signAccount:text})}
                                        autoCapitalize="none"
                                        keyboardType={'numbers-and-punctuation'}
                                        returnKeyType={'done'}
                                    />
                                </View>
                                {/*发送验证码*/}
                                {this.state.buttonState ? (
                                    <View style={[styles.inputBox, {marginBottom: 100}]}>
                                        <Button
                                            buttonStyle={[styles.loginBtn, {backgroundColor: NOTICE_CONTENT_FONT_COLOR}]}
                                            title={lang('Get Verification Code')}
                                            onPress={this.sendCode}
                                        />
                                    </View>
                                ) : (
                                    <View style={[styles.inputBox, {marginBottom: 100}]}>
                                        <TextInput
                                            placeholder={lang('Enter Here')}
                                            style={[styles.textInput, {width: 124, marginLeft: 45}]}
                                            onChangeText={(text) => this._code = text}
                                        />
                                        <Button
                                            buttonStyle={[styles.loginBtn, {
                                                backgroundColor: NOTICE_CONTENT_FONT_COLOR,
                                                width: 140,
                                                height: 26,
                                                margin: 6,
                                                marginRight: 13
                                            }]}
                                            title={this.state.reqAgain}
                                            onPress={this.sendCode}
                                        />
                                    </View>
                                )}
                                {/*下一步按钮*/}
                                <Button
                                    buttonStyle={[styles.loginBtn]}
                                    title={lang('Confirm')}
                                    onPress={this.nextStep}
                                />
                            </View>
                        ) : (
                            /* 注册信息：姓名  密码*/
                            <View>
                                <View style={styles.inputBox}>
                                    <TextInput
                                        placeholder={lang('Name')}
                                        style={styles.textInput}
                                        autoFocus={true}
                                        onChangeText={(text) => this._name = text}
                                    />
                                </View>

                                <View style={[styles.inputBox, {marginBottom: 100}]}>
                                    <TextInput
                                        placeholder={lang('Password')}
                                        secureTextEntry={true}
                                        style={styles.textInput}
                                        value={this.state.password}
                                        onChangeText={(text) => this.setState({password: text})}
                                    />
                                </View>
                                {/*注册按钮*/}
                                <Button
                                    buttonStyle={[styles.loginBtn]}
                                    title={lang('Confirm')}
                                    onPress={this.submit}
                                />
                            </View>
                        )}

                    </View>
                </View>
                <Verify ref={view=>this.alert = view} mobileNumber={this.state._signAccount} submit={({mobile,code})=>this.submitVerifyCode({mobile,code})}/>
            </SafeBody>
        )
    }

    /*发送邮箱验证码*/
    sendCode() {
        Keyboard.dismiss()
        if (this._countdown !== 0) return;
        if (this.state._signAccount === null || this.state._signAccount === '') return alert(lang('Please input your mobile number'));
        let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; ///^[a-z0-9]+([A._\\-]*[a-z0-9]*)*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (!reg.test(this.state._signAccount)) return alert(lang('Mobile number format is incorrect'));
        this.alert.showVerify();
    }

    async submitVerifyCode({mobile,code}){
        try {
            let result = await req({
                url:'/sso/register.htm',
                data:{
                    action: 'sendCode',
                    mobile: this.props.mobileNumber,
                    code: this.state.code
                },
                type:'POST',
                animate:true
            });
            this.setState({buttonState: false});

            this._countdown = 60;
            this.countTime()
        } catch (e) {
            Alert.alert('Error', e['errorMsg'])
        }
    }

    /*倒计时*/
    countTime() {
        if (this._countdown <= 0) {
            this.setState({reqAgain: 'Get Again'})
        } else {
            this._countdown--;
            this.setState({reqAgain: `get after ${this._countdown} s`})
        }

        if (this._countdown >= 0) {
            setTimeout(() => {
                this.countTime()
            }, 1000)
        }
    }

    /*下一步*/
    async nextStep() {
        if (this.state._signAccount == null) return alert(lang('Please input your Email address'));
        if (this._code == null) return alert(lang('Please input your verify code from your Email'));

        if (this.state._signAccount != null && this._code != null) {
            try {
                await req({
                    url: '/sso/register.htm',
                    type: 'POST',
                    data: {
                        action: 'verifyCode',
                        verifyCode: this._code
                    }
                });
                /*成功后切换页面，改变状态*/
                this.setState({next: false, buttonState: true});
            } catch (err) {
                Alert.alert('Reminder', err['errorMsg'])
            }
        }

    }

    /*注册*/
    async submit() {
        if (this._name == null) return alert('请填写用户姓名');
        if (this.state.password == null) return alert('请填写密码');
        try {
            await req({
                url: '/sso/register.htm',
                type: 'POST',
                data: {
                    action: 'register',
                    username: this._name,
                    password: this.state.password,//this._password
                }
            });
            this.props.navigation.navigate('Language');
            Cache.setLogin(this._name, this.state.password)
        } catch (err) {
            Alert.alert('Error', err['errorMsg'])
        }
    }
}

