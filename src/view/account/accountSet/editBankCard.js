import React,{Component} from 'react'
import {View,Text,TextInput,TouchableOpacity,Image,FlatList,Alert} from 'react-native'
import styles from './../../../style/account/accountSet/editBankCard'
import commonStyles from './../../../style/variable'
import LinearGradient from 'react-native-linear-gradient';
import req from './../../../lib/req'
import { idMask, nameMask } from '../../../lib/tool';
import { Header } from '../../../common';
import { provinceData, cityData } from '../../../lib/address';
import { Cache, Schedule } from '../../../module';
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

const greenCard = ['#03b4a4','#0ca3a3','#1988a4'];
const redCard = ['#e7704a','#d04535','#d03e35'];
const blueCard = ['#4f89b9','#426bac','#3c5ca5'];
const pinkCard = ['#fa8163','#fb726d','#fd557d'];

export default class App extends Component{
    constructor(props){
        super(props);
        let item = this.props.navigation.state.params.item;
        console.log(item);
        this.state = {
            provinceButtonText:item.province?item.province:'请选择开户省份',
            cityButtonText:item.city?item.city:'请选择开户城市',
            formType:'editCard',
            subbranch:item.subbranch,
            selectedProvince:item.province?{name:item.province}:null,
            selectedCity:item.city?{name:item.city}:null,
            realName:'',
            id:item.id
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

    renderProvinceItem(item){
        return (
            <TouchableOpacity onPress={()=>this.selectLocation(item.value)} style={styles.selectLocationTouchable}>
                <Text>{item.value}</Text>
                <Text style={styles.arrowText}>></Text>
            </TouchableOpacity>
        );
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

    renderBankCard(){
        let item = this.props.navigation.state.params.item;
        
        return (
            <LinearGradient colors={this.cardColor(item.bank)} start={{x: 0, y: 0}} end={{x: 1, y: 0}} to style={styles.cardRoot}>
                <TouchableOpacity onPress={()=>this.editCardInfo()}>
                    <View style={[commonStyles.rowStyle]}>
                        <Image source={this.bankIcon(item.bank)} style={styles.cardImage}/>
                        <View style={[commonStyles.fillStyle,styles.cardInfoTextWrapper]}>
                            <Text style={styles.bankName}>{item.bank}</Text>
                            <Text style={styles.cardNumber}>{idMask(item.cardNumber)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </LinearGradient>

        );
    }

    render(){
        if (this.state.formType === 'editCard') {
            return(
                <View>
                    <Header title={'Edit bank card'}/>
                    {this.renderBankCard()}
                    <View style={styles.textInputRoot}>
                        {this.renderInputView('开户姓名',{showText:nameMask(this.state.realName)})}
                        {this.renderInputView('开户省份',{showText:this.state.provinceButtonText,callback:()=>this.openProvinceSelector()})}
                        {this.renderInputView('开户城市',{showText:this.state.cityButtonText,callback:()=>this.openCitySelector()})}
                        {this.renderInputView('开户支行',{placeholder:'请输入开户支行',showText:this.state.subbranch,onChangeTextCallback:this.onChangeSubbranchText.bind(this)})}
                    </View>
                    <TouchableOpacity onPress={()=>this.submit()} style={styles.submitButtonTouchable}>
                            <Text style={styles.submitButtonText}>{lang('Confirm')}</Text>
                        </TouchableOpacity>
                </View>
            );
        } else if (this.state.formType === 'selectProvince' || this.state.formType === 'selectCity') {

            let data = this.state.formType === 'selectProvince' ? provinceData() : cityData(this.state.selectedProvince.name)
            return(
                <View style={commonStyles.fillStyle}>
                    <Header title={'Add Bank Card'} customBack={()=>this.setState({formType:'editCard'})}/>
                    <FlatList data={data} renderItem={obj=>this.renderProvinceItem(obj.item)} keyExtractor={(item, index) => index}/>
                </View>
            );
        }
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

    onChangeSubbranchText(text){
        this.setState({
            subbranch:text
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
                    formType:'editCard'
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
                    formType:'editCard'
                });
            });
        }
    }

    submit(){
        if (this.state.subbranch.length === 0) return Alert.alert('警告','请输入开户支行信息');
        if (!/^[\u4e00-\u9fa5_a-zA-Z]{0,}$/.test(this.state.subbranch)) return Alert.alert('警告','开户支行信息输入格式错误，请重新输入');
        req({
            url: '/mine/bankCardUpdate.htm',
            type: 'POST',
            data: {
                action: 'update',
                province: this.state.selectedProvince.name,
                city: this.state.selectedCity.name,
                subbranch: this.state.subbranch,
                id:this.state.id
            },
            animate:true
        }).then((data) => {
            Alert.alert('提示',data.errorMsg,()=>this.props.navigation.goBack());
            Cache.getUserInfo()
        }).catch((err) => {
            Alert.alert('错误',err.errorMsg);
        })

    }

    loginCallback() {
        this.setState({isLogin: Cache.isLogin(), realName: Cache.realName})
    }

    cardColor(name) {
        switch (name) {
            case '工商银行':
                return redCard;
            case '招商银行':
                return redCard;
            case '建设银行':
                return blueCard;
            case '农业银行':
                return greenCard;
            case '中国银行':
                return redCard;
            case '交通银行':
                return blueCard;
            case '民生银行':
                return greenCard;
            case '浦发银行':
                return blueCard;
            case '中信银行':
                return pinkCard;
            case '广发银行':
                return pinkCard;
            case '平安银行':
                return pinkCard;
            case '兴业银行':
                return blueCard;
            case '华夏银行':
                return pinkCard;
            case '光大银行':
                return pinkCard;
            case '邮政储蓄':
                return greenCard;
        }
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