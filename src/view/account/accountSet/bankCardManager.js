import React,{Component} from 'react'
import {View,Text,TextInput,TouchableOpacity,FlatList,Alert,Image} from 'react-native'
import styles from './../../../style/account/accountSet/bankCardManager'
import { Header } from '../../../common';
import req from './../../../lib/req'
import commonStyles from './../../../style/variable'
import { idMask } from '../../../lib/tool';
import LinearGradient from 'react-native-linear-gradient';
import { Cache } from '../../../module';


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

export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            bankCardList : []
        }
        this.getAllCard = this.getAllCard.bind(this)
    }

    componentDidMount(){
        this.getAllCard();
    }

    componentWillUnmount(){
        
    }

    //todo 获取银行卡信息
    async getAllCard() {
        try {
            let result = await req({
                url: '/mine/bankCard.htm',
                type: 'GET'
            });
            if (result && result.code === 200) {
                this.setState({
                    bankCardList: result.bankCards
                });
            }
        } catch (e) {
            Alert.alert('警告',e);
        }
    }

    renderFunctionButton(id,buttonText,buttonCallback){
        if (buttonText) {
            return(
                <TouchableOpacity onPress={buttonCallback.bind(this,id)} style={styles.cardFunctionButtonTouchable}>
                    <Text style={styles.cardFunctionButtonText}>{buttonText}</Text>
                </TouchableOpacity>
            );
        } else {
            return(
                <Text style={[styles.cardFunctionButtonTouchable,{borderWidth:0,marginLeft:20}]}>  </Text>
            )
        }
    }

    renderCell(item){

        let defaultText = item.defaultCard === 1 ? '默认' : ''
        let defaultTextStyle = item.defaultCard === 1 ? styles.defaultText : null
        let defaultButtonType = item.defaultCard === 1 ? null : '默认'

        return (
            <LinearGradient colors={this.cardColor(item.bank)} start={{x: 0, y: 0}} end={{x: 1, y: 0}} to style={styles.cardRoot}>
                <TouchableOpacity onPress={()=>this.editCardInfo(item)}>
                    <View style={[commonStyles.rowStyle]}>
                        <Image source={this.bankIcon(item.bank)} style={styles.cardImage}/>
                        <View style={[commonStyles.fillStyle,styles.cardInfoTextWrapper]}>
                            <Text style={styles.bankName}>{item.bank}</Text>
                            <Text style={styles.cardType}>储蓄卡</Text>
                            <Text style={styles.cardNumber}>{idMask(item.cardNumber)}</Text>
                        </View>
                        <Text style={defaultTextStyle}>{defaultText}</Text>
                    </View>
                    <View style={styles.cardFunctionButtonRoot}>
                        {/*默認按鈕/刪除按鈕*/}
                        {this.renderFunctionButton(item.id,defaultButtonType,this.setDefault)}
                        {this.renderFunctionButton(item.id,'删除',this.deleteCard)}
                    </View>
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    render(){
        return(
            <View style={commonStyles.fillStyle}>
                <Header title={'Bank Card List'} navigation={this.props.navigation} button={{isText:false,forward:'AddCard',take:()=>this.getAllCard()}}/>
                <FlatList data={this.state.bankCardList} renderItem={obj=>this.renderCell(obj.item)}/>
                <TouchableOpacity style={styles.withdrawButtonTouchable}>
                    <Text style={styles.withdrawButtonText}>{'我要出金'}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    setDefault(id) {
        try {
            req({
                url: '/mine/bankCardUpdate.htm',
                type: 'POST',
                data: {
                    action: 'setDefault',
                    id: id
                },
                animate:true
            }).then((data) => {
                Alert.alert('错误',data.errorMsg,[{text:'确定',onPress:this.getAllCard}])
            });
        } catch (err) {
            Alert.alert('错误',err.errorMsg);
        }
    }

    //todo 删除银行卡
    deleteCard(id) {
        Alert.alert('警告','您确定要删除该银行卡？',[
            {
                text:'确定',
                onPress:()=>{
                    req({
                        url: '/mine/bankCardUpdate.htm',
                        type: 'POST',
                        data: {
                            action: 'del',
                            id: id
                        },
                        animate:true
                    }).then((data) => {
                        Alert.alert('提示',data.errorMsg,[{text:'确定',onPress:()=>this.getAllCard()}])
                        Cache.getUserInfo();
                    })
                }
            },
            {
                text:'取消',
                onPress:()=>{

                }
            }
        ])
    }

    editCardInfo(item){
        this.props.navigation.navigate('EditCard',{item:item});
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