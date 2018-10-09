import React,{Component} from 'react'
import {View,Text,TextInput,TouchableOpacity,ScrollView,Alert} from 'react-native'
import styles from './../../../style/account/accountSet/nameVerified'
import commonStyles from './../../../style/variable'
import { Header } from '../../../common';
import { lang } from '../../../lang';
import { Cache, Schedule } from '../../../module';
import {nameMask,idMask} from './../../../lib/tool'
import { LINE_COLOR, UI_ACTIVE_COLOR } from '../../../lib/color';
import req from './../../../lib/tool'

export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            name:'',
            idNumber:'',
            isLogin:Cache.isLogin(),
            already: false,
        }
    }

    componentDidMount() {
        if (Cache.initial) {
            this.loginCallback()
        } else {
            Schedule.dispatchEvent('cacheInitial', this.loginCallback, this)
        }
        Schedule.dispatchEvent('getUserInfo', this.getUserCallback, this)
    }

    componentWillUnmount(){
        Schedule.removeEventListeners(this)
    }

    renderInputView(title,value,placeholder,onChangeTextCallback){
        return(
            <View style={styles.inputViewRoot}>
                <Text style={styles.title}>{title}</Text>
                <TextInput style={styles.textInput} value={value} placeholder={placeholder} onChangeText={text=>onChangeTextCallback(text)}/>
            </View>
        );
    }

    render(){

        let buttonText = this.state.already ? lang('Verification already') : lang('Verification');
        let buttonEnable = this.state.already;
        let submitButtonBackgroundColor = this.state.already ? LINE_COLOR:UI_ACTIVE_COLOR;
        return(
            <View style={commonStyles.fillStyle}>
                <Header title={'Real Name Verify'} navigation={this.props.navigation}/>
                <ScrollView>
                    {this.renderInputView(lang('Real Name'),this.state.name,lang('Please input your real name'),this.onChangeNameText.bind(this))}
                    {this.renderInputView(lang('Identity Number'),this.state.idNumber,lang('Please input your identity number'),this.onChangeIdNumberText.bind(this))}
                    <TouchableOpacity style={[styles.submitButtonTouchable,{backgroundColor:submitButtonBackgroundColor}]} disabled={buttonEnable}>
                        <Text style={styles.submitButtonText}>{buttonText}</Text>
                    </TouchableOpacity>
                    <View style={styles.noticeRoot}>
                        <Text>{'如遇问题，请'}</Text>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Server')}>
                            <Text style={styles.noticeButtonText}>{'联系客服'}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    //todo 更新用户数据信息
    getUserCallback() {
        this.setState({
            name: nameMask(Cache.realName),
            idNumber: idMask(Cache.idNumber),
            already: Cache.realName !== ''
        });
    }

    loginCallback() {
        this.setState({
            isLogin: Cache.isLogin()
        });
        this.getUserCallback()
    }

    onChangeNameText(text){
        this.setState({
            name:text
        });
    }

    onChangeIdNumberText(text){
        this.setState({
            idNumber:text
        });
    }

    async submit(){
        try {
            if(this.state.name.length === 0) return Alert('警告','请输入真实姓名');
            if(!/^[\u4e00-\u9fa5]{0,}$/.test(this.state.name)) return Alert('警告','请输入正确的真实姓名');
            if(this.state.idNumber.length === 0) return Alert('警告','请输入身份证号');
            if(this.state.idNumber.length !== 18) return Alert('警告','请输入正确身份证号');
            await req({
                url: '/mine/profileAuth.htm',
                type: "POST",
                data: {
                    action:'authIdentity',
                    name: this.state.name,
                    identityNumber: this.state.idNumber
                },
                animate:true
            });
            Alert.alert('提示','实名认证成功');
            this.props.navigation.goBack()
            Cache.getUserInfo();
        } catch (e) {
            Alert.alert('错误',e.errorMsg);
        }
    }
}