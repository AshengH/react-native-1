import React, {Component} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Alert,
    ScrollView,
    FlatList,
    Button
} from 'react-native'

import Icons from 'react-native-vector-icons/Ionicons';

import {Header,Type} from "../../../common";

import {lang} from "../../../lang";

import {RATIO, SafeBody, SCREEN_WIDTH} from "../../../lib/adjust";

import Req from '../../../lib/req'

import {UI_ACTIVE_COLOR,BACKGROUND_COLOR} from "../../../lib/color";
import {HAS_CRYPTO} from './../../../config'

import Verify from '../../../common/verify'

import Input from '../../../common/input'

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bankName:"请选择充值银行",
        };

        this.config = {
            title: '快捷支付',
            bank: false,
            url: '/api/pay/general/pay.htm',
            param: {
                /**
                 * type 数据源类型 input-输入  select-选择  fixed-定值
                 * placeholder 占位符
                 * style input-only 输入框的类型 number tel text password
                 * length input-only 输入的长度限制  仅 text password tel生效
                 * float input-only 限制输入的内容是否包含小数点
                 * nonzero input-only 限制输入的内容最后一位是否不为0
                 * min input-only number-tel only 限制输入的数字的最小值
                 * max input-only number-tel only 限制输入的数字的最大值
                 * chn 中文限制 true-只能中文  false-非中文
                 */
                money: {
                    type: 'input',
                    title: '充值金额',
                    placeholder: '请输入金额',
                    value: '',
                    style: 'tel',
                    float: true,
                    nonzero: true,
                    min: 101,
                    max: 1000,
                    length: 5
                },
                bankName: {
                    type: 'select',
                    title: '充值银行',
                    placeholder: '请选择充值银行',
                    value: '',
                    store: 'bank'
                },
                payType: {
                    type: 'fixed',
                    value: 'wxwap'
                },
                callbackUrl: {
                    type: 'fixed',
                    value: 'origin'
                }
            },
            des: [
                '实时到账，0手续费',
                '单笔最低充值101元，最高1000元，申请金额请加小数点',
                '每日总额无上限，充值时间为7:00-23:00',
                '如需帮助请联系人工客服 QQ:800837618'
            ]
        };

        this.submit = this.submit.bind(this);
    }

    render() {
        return (
            <SafeBody>
                <Header
                    title={this.config.title} {...this.props}
                />
                <ScrollView style={rechargeDetailstyles.containerView}>
                    <View style={rechargeDetailstyles.topView}>
                        <Text style={rechargeDetailstyles.titleLabel}>账户余额</Text>
                        <Text style={rechargeDetailstyles.amountLabel}>100000</Text>
                    </View>
                    <View style={rechargeDetailstyles.centerView}>
                        {Object.entries(this.config.param).map(([key, o]) => {
                            if (o.type === 'input') {
                                return <Input {...o} callback={(e) => this.config.param[key].value = e}/>
                            }
                            else if (o.type === 'select') {
                                return this.renderBankView()
                            }
                            else {
                                return null
                            }
                        })}
                        <TouchableHighlight onPress={this.submit}>
                            <View style={rechargeDetailstyles.nextButton}>
                                <Text style={{fontSize:16,color:'white',fontWeight:'200'}}>下一步</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={rechargeDetailstyles.bottomView}>
                        <Text style={{fontSize:19}}>温馨提示：</Text>
                        <FlatList
                            data={this.config.des}
                            renderItem={({item}) => <Text>{item}</Text>}
                        />
                    </View>
                </ScrollView>
            </SafeBody>
        )
    }

    gotoChooseBank(){
        this.props.navigation.navigate('BankList',{
            balance:1000,
            isBank:false,
            getBankName: (backBankName) => {
                this.setState({
                    bankName:backBankName
                });
                this.config.param.bankName.value = backBankName;
            }
        });
    }

    componentDidMount(){
        if (this.config.param.bankName.title != null){
            this.setState({
                bankName:this.config.param.bankName.title,
            });
        }

    }

    renderBankView(){
            return (
            <View style={rechargeDetailstyles.bankView}>
                <Text style={{fontSize:18,marginLeft:15,alignSelf:'center'}}>{this.config.param.bankName.title}</Text>
                <TouchableHighlight style={{alignSelf:'center'}} onPress={()=>this.gotoChooseBank()}>
                    <Text style={{fontSize:18,marginLeft:10}}>{this.state.bankName}</Text>
                </TouchableHighlight>
            </View>
            )
    }

    submit() {
        if (Verify(this.config.param)) {
            let o = {};
            for(let [key,{value}] of Object.entries(this.config.param)){
                if(key === 'money'){
                    o[key] = Number(value);
                }else{
                    if(value === 'origin') value = '';//window.location.origin;
                    o[key] = value
                }
            }
            Req({
                url: this.config.url,
                type: 'POST',
                data: o,
                animate: true
            }).then((data) => {
                if(data.html){
                    document.write(data.html)
                }else if(data.redirectURL){
                    window.location.href = data.redirectURL
                }
            }).catch((err) => {
                Alert.alert('错误',err.resultMsg || err.errorMsg || '未知错误')
            })
        }
    }

}
const rechargeDetailstyles = StyleSheet.create({
    containerView:{
      backgroundColor:'white',
    },
    topView:{
        justifyContent:'center',
        alignItems:'center',
        height:80,
        borderBottomWidth:0.5,
        borderColor:'gray',
    },
    titleLabel:{
        // marginTop:10,
    },
    amountLabel:{
        fontSize:30,
    },
    alarmLabel:{
        marginTop:15,
        color:'red',
        fontSize:14,
        marginBottom:10,
    },

    centerView:{
        alignItems:'center',
        width:SCREEN_WIDTH,
        // height:200,
    },
    bankView:{
        height:35,
        marginTop:10,
        width:SCREEN_WIDTH*0.9,
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderColor:'gray',
    },
    rechargeView:{
        height:35,
        marginTop:10,
        width:SCREEN_WIDTH*0.9,
        flexDirection:'row',
        borderBottomWidth:1,
    },
    nextButton:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
        height:40,
        width:SCREEN_WIDTH*0.9,
        borderRadius:5,
        backgroundColor:'red',
    },
    bottomView:{
        marginLeft:15,
        marginTop:10,
    },
    serverView:{
        marginTop:5,
        flexDirection:'row',
        alignItems:'center',
    }
});