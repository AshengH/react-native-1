import React,{Component} from 'react'
import {TextInput,View,Text,TouchableOpacity,ScrollView,FlatList,Image,Alert,Keyboard} from 'react-native'
import styles from './../../../style/account/accountSet/addCard'
import commonStyles from './../../../style/variable'
import req from './../../../lib/req'
import { Header } from '../../../common';
import { Schedule, Cache } from '../../../module';
import { nameMask } from '../../../lib/tool';
import { bankList } from '../../../config';
import { provinceData, cityData } from '../../../lib/address';
import { lang } from '../../../lang';

//todo 图片的路径
let ICBC = require('./../../../images/bankIcon/icbc.png')
let CMB = require('./../../../images/bankIcon/cmb.png')
let CCB = require('./../../../images/bankIcon/ccb.png')
let ABC = require('./../../../images/bankIcon/abc.png')
let BOC = require('./../../../images/bankIcon/boc.png')
let COMM = require('./../../../images/bankIcon/comm.png')
let CMBC = require('./../../../images/bankIcon/cmbc.png')
let SPDB = require('./../../../images/bankIcon/spdb.png')
let CITIC = require('./../../../images/bankIcon/citic.png')
let GDB = require('./../../../images/bankIcon/gdb.png')
let SZPAB = require('./../../../images/bankIcon/szpab.png')
let CIB = require('./../../../images/bankIcon/cib.png')
let HXB = require('./../../../images/bankIcon/hxb.png')
let CEB = require('./../../../images/bankIcon/ceb.png')
let PSBC = require('./../../../images/bankIcon/psbc.png')

export default class App extends Component{

    constructor(props){
        super(props);

        this.state = {
            isLogin:Cache.isLogin(),
            realName:'',
            formType:'addCard',
            selectedBank:null,
            selectedProvince:null,
            selectedCity:null,
            bankButtonText:'请选择银行',
            provinceButtonText:'请选择开户省份',
            cityButtonText:'请选择开户城市',
            cardNumber:null,
            cfmCardNumber:null,
            subbranch:''
        }
    }

    componentDidMount() {
        if (Cache.initial) {
            this.loginCallback()
        } else {
            Schedule.addEventListener('cacheInitial', this.loginCallback, this)
        }
    }

    componentWillUnmount() {
        Schedule.removeEventListeners(this)
    }

    renderContentComponent({showText,placeholder,callback,onChangeTextCallback}){
        if (callback) {
            return(
                <TouchableOpacity style={commonStyles.fillStyle} onPress={callback}>
                    <Text style={styles.textInput}>{showText}</Text>
                </TouchableOpacity>
            );
        }
    
        if (placeholder !== undefined) {
            return(
                <TextInput style={styles.textInput} value={showText} placeholder={placeholder} onChangeText={text=>onChangeTextCallback(text)}/>
            );
        } else {
            return(
                <TextInput style={styles.textInput} style={{flex:1}} editable={false} value={showText}/>
            );
        }

        return null
    }

    renderInputView(title,param){
        return(
            <View style={styles.inputViewRoot}>
                <Text style={styles.title}>{title}</Text>
                {this.renderContentComponent(param)}
            </View>
        );
    }

    renderBankItem(item){
        return(
            <View style={commonStyles.fillStyle}>
                <TouchableOpacity onPress={()=>this.selectBank(item.name,0)} style={styles.bankButtonTouchable}>
                    <Image style={styles.bankImage} source={this.bankIcon(item.name)}/>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderProvinceItem(item){
        return (
            <TouchableOpacity onPress={()=>this.selectLocation(item.value)} style={styles.selectLocationTouchable}>
                <Text>{item.value}</Text>
                <Text style={styles.arrowText}>></Text>
            </TouchableOpacity>
        );
    }

    render(){
        if (this.state.formType === 'addCard') {
            return(
                <View>
                    <Header title={'Add Bank Card'}/>
                    <Text style={styles.warningText}>{'为确保资金安全，只能添加"'+ nameMask(this.state.realName) +'"的银行卡'}</Text>
                    <ScrollView>
                        {this.renderInputView('开户姓名',{showText:nameMask(this.state.realName)})}
                        {this.renderInputView('开户银行',{showText:this.state.bankButtonText,callback:()=>this.openBankSelector()})}
                        {this.renderInputView('开户省份',{showText:this.state.provinceButtonText,callback:()=>this.openProvinceSelector()})}
                        {this.renderInputView('开户城市',{showText:this.state.cityButtonText,callback:()=>this.openCitySelector()})}
                        {this.renderInputView('开户支行',{placeholder:'请输入开户支行',showText:this.state.subbranch,onChangeTextCallback:this.onChangeSubbranchText.bind(this)})}
                        {this.renderInputView('银行卡号',{placeholder:'请输入银行卡号',showText:this.state.cardNumber,onChangeTextCallback:this.onChangeCardNumberText.bind(this)})}
                        {this.renderInputView('确认卡号',{placeholder:'请输入确认卡号',showText:this.state.cfmCardNumber,onChangeTextCallback:this.onChangeCFMCardNumberText.bind(this)})}
                        <TouchableOpacity onPress={()=>this.submit()} style={styles.submitButtonTouchable}>
                            <Text style={styles.submitButtonText}>{lang('Confirm')}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            );
        } else if (this.state.formType === 'selectBank') {
            return(
                <View style={commonStyles.fillStyle}>
                    <Header title={'Add Bank Card'} customBack={()=>this.setState({formType:'addCard'})}/>
                    <FlatList data={bankList} renderItem={obj=>this.renderBankItem(obj.item)} numColumns={3} keyExtractor={(item, index) => index}/>
                </View>
            );
        } else if (this.state.formType === 'selectProvince' || this.state.formType === 'selectCity') {

            let data = this.state.formType === 'selectProvince' ? provinceData() : cityData(this.state.selectedProvince.name)
            return(
                <View style={commonStyles.fillStyle}>
                    <Header title={'Add Bank Card'} customBack={()=>this.setState({formType:'addCard'})}/>
                    <FlatList data={data} renderItem={obj=>this.renderProvinceItem(obj.item)} keyExtractor={(item, index) => index}/>
                </View>
            );
        }
    }

    loginCallback() {
        this.setState({isLogin: Cache.isLogin(), realName: Cache.realName})
    }

    submit(){
        Keyboard.dismiss();
        if(this.state.selectedBank === null) return Alert.alert('警告','请选择开户银行');
        if(this.state.selectedProvince === null) return Alert.alert('警告','请选择开户省份');
        if(this.state.selectedCity === null) return Alert.alert('警告','请选择开户城市');
        if(this.state.cardNumber === null || this.state.cardNumber.length === 0 || this.state.cardNumber.length < 16 ) return Alert.alert('警告','银行卡格式不正确');
        if(this.state.cfmCardNumber === null || this.state.cfmCardNumber.length === 0 || this.state.cfmCardNumber.length < 16 ) return Alert.alert('警告','银行卡格式不正确');
        if (!/^[\u4e00-\u9fa5_a-zA-Z]{0,}$/.test(this.state.subbranch) || this.state.subbranch.length === 0) return Alert.alert('警告','开户支行信息格式错误，请重新输入');
        req({
            url: '/mine/bankCardAdd.htm',
            type: 'POST',
            data: {
                action: 'add',
                bank: this.state.selectedBank.name,
                province: this.state.selectedProvince.name,
                city: this.state.selectedCity.name,
                subbranch: this.state.subbranch,
                cardNumber: this.state.cardNumber,
                cardNumberCfm: this.state.cfmCardNumber,
            },
            animate:true
        }).then((data) => {
            Alert.alert('提示',data.errorMsg,()=>{this.props.navigation.goBack();this.props.navigation.state.params.take()});
            Cache.getUserInfo()
        }).catch((err) => {
            Alert.alert('错误',err.errorMsg);
        })

    }

    openBankSelector(){
        this.setState({
            formType:'selectBank'
        });
    }

    openProvinceSelector(){
        this.setState({
            formType:'selectProvince'
        })
    }

    openCitySelector(){

        if (this.state.selectedProvince === null) {
            return Alert.alert('警告','请先选择省份');
        }

        this.setState({
            formType:'selectCity'
        })
    }

    selectBank(name,type){
        this.setState({
            selectedBank:{
                name:name,
                type:type
            },
            bankButtonText:name
        },()=>{
            this.setState({
                formType:'addCard'
            });
        });
    }

    selectLocation(value){
        if (this.state.formType === 'selectProvince') {
            this.setState({
                selectedProvince:{
                    name:value
                },
                provinceButtonText:value
            },()=>{
                this.setState({
                    formType:'addCard'
                });
            });
        } else {
            this.setState({
                selectedCity:{
                    name:value
                },
                cityButtonText:value
            },()=>{
                this.setState({
                    formType:'addCard'
                });
            });
        }
    }

    onChangeSubbranchText(text){
        this.setState({
            subbranch:text
        });
    }

    onChangeCardNumberText(text){
        this.setState({
            cardNumber:text
        });
    }

    onChangeCFMCardNumberText(text){
        this.setState({
            cfmCardNumber:text
        });
    }

    bankIcon(name) {
        switch (name) {
            case '工商银行':
                return ICBC;
            case '招商银行':
                return CMB;
            case '建设银行':
                return CCB;
            case '农业银行':
                return ABC;
            case '中国银行':
                return BOC;
            case '交通银行':
                return COMM;
            case '民生银行':
                return CMBC;
            case '浦发银行':
                return SPDB;
            case '中信银行':
                return CITIC;
            case '广发银行':
                return GDB;
            case '平安银行':
                return SZPAB;
            case '兴业银行':
                return CIB;
            case '华夏银行':
                return HXB;
            case '光大银行':
                return CEB;
            case '邮政储蓄':
                return PSBC;
        }
    }
}