import React,{Component} from 'react'
import {View,TextInput,Text,TouchableOpacity,ScrollView,Keyboard,Alert} from 'react-native'
import { lang } from '../../../lang';
import { SafeBody } from '../../../lib/adjust';
import { Header } from '../../../common';
import  req  from './../../../lib/req'
import styles from './../../../style/account/accountSet/phoneBinding'
import Verify from './../../../view/signUp/verify'
export default class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            mobileNumber:'',
            mobileVerifyCode:''
        }
    }

    render(){
        return(
            <SafeBody>
                {/*头部*/}
                <Header title={'Phone binding'} navigation={this.props.navigation}/>
                <ScrollView style={styles.scrollViewBackground}>
                    <View>
                        <View style={styles.liStyle}>
                            <Text style={styles.inputText}>{lang('Mobile number')}</Text>
                            <TextInput
                                placeholder={lang('Your new password')}
                                clearButtonMode={'while-editing'}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({mobileNumber:text})}
                            />
                        </View>

                        <View style={styles.liStyle}>
                            <Text style={styles.inputText}>{lang('Verification Code')}</Text>
                            <TextInput
                                placeholder={lang('Confirm new password')}
                                clearButtonMode={'while-editing'}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({mobileVerifyCode:text})}
                            />
                            <TouchableOpacity onPress={()=>this.getVerify()} style={styles.verifyTouchable}>
                                <Text style={styles.verifyText}>{lang('Get Verification Code')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => this.submit()}>
                        <Text style={styles.doneStyle}>{lang('Done')}</Text>
                    </TouchableOpacity>

                    <View style={styles.descRoot}>
                        <Text style={styles.descBlackText}>{lang('If you need help,please')}</Text>
                        <TouchableOpacity>
                            <Text style={styles.descBlueText}>{lang('contact the client service')}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Verify ref={view=>this.verify = view}/>
            </SafeBody>
        );
    }

    getVerify(){
        Keyboard.dismiss()
        if (this.state._signAccount === null || this.state._signAccount === '') return alert(lang('Please input your mobile number'));
        let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; ///^[a-z0-9]+([A._\\-]*[a-z0-9]*)*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (!reg.test(this.state.mobileNumber)) return alert(lang('Mobile number format is incorrect'));
        this.verify.showVerify();
    }

    async submit(){
        Keyboard.dismiss()
        if (this.state._signAccount === null || this.state._signAccount === '') return alert(lang('Please input your mobile number'));
        let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; ///^[a-z0-9]+([A._\\-]*[a-z0-9]*)*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
        if (!reg.test(this.state.mobileNumber)) return alert(lang('Mobile number format is incorrect'));

        req({
            url: "/mine/mobile.htm",
            type: 'POST',
            data: {
                action: 'verify',
                type: 2,
                verifyCode: this.state.mobileVerifyCode
            },
            animate: true
        }).then(date=>{
            Alert.alert('警告',date.errorMsg);
        }).catch(err=>{
            Alert.alert('警告',err.errorMsg);
        })

    }
} 