import React, {Component} from 'react';

import QRCode from 'react-native-qrcode'

import {Button} from 'react-native-elements'

import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    Image,
    Clipboard,
    Alert,
    ScrollView,
    ListView,
    TouchableOpacity
} from 'react-native'

import Icons from 'react-native-vector-icons/Ionicons';

import {Header} from "../../common";

import {lang} from "../../lang";

import {RATIO, SafeBody} from "../../lib/adjust";

import req from '../../lib/req'

import {SCREEN_WIDTH} from "../../lib/adjust";

import {Type} from "../../common";
import {UI_ACTIVE_COLOR,BACKGROUND_COLOR} from "../../lib/color";
import {HAS_CRYPTO} from '../../config'


class Select extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <TouchableHighlight style={[styles.typeStyle, this.props.select === this.props.type ? styles.bg : null]}
                                underlayColor={'#ECECEC'} onPress={() => {
                this.props.onPress(this.props.type)
            }}>
                <View>
                    <Image
                        style={styles.imageStyle}
                        source={this.props.url}
                    />
                    <Text style={{textAlign: "center"}}>{lang(this.props.title)}</Text>
                </View>
            </TouchableHighlight>
        )
    }


}
let listData = require('./depositList').payList

export default class App extends Component {
    _amount = null;

    constructor(props) {
        super(props);
        this.state = {
            dataSource : new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            type: 'BTC',
            qrCode: '',
            address: null,
            paymentType: 'fiat',
            _amount:'',
        };

        this.sendData = this.sendData.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    //渲染选项卡
    renderOptionCard(){
        if (HAS_CRYPTO)  {
            return(
                    <View style={styles.tab}>
                        <Type
                            style={{paddingHorizontal: 15}}
                            title={"Fiat Deposit"}
                            type='fiat'
                            select={this.state.paymentType}
                            onPress={(type) => {
                                this.setState({paymentType: type});
                            }}/>
                        <Type
                            style={{paddingHorizontal: 15}}
                            title={"Cryptos Deposit"}
                            type='Cryptos'
                            select={this.state.paymentType}
                            onPress={(type) => {
                                this.setState({paymentType: type});
                            }}/>
                    </View>
            );
        }else{
            return (<View></View>);
        }
    }

    //选项卡下面的内容
    renderContent(){
        if (HAS_CRYPTO) {
            return(
                <ScrollView style={{backgroundColor:'#ffffff',flex:1}}>
                    {
                        this.state.paymentType === 'fiat' ?
                            (
                                /*支付渠道*/
                                <View  style={{backgroundColor:'#ffffff'}}>
                                    <View style={{padding: 10, flexDirection: 'row', backgroundColor: '#FFFFFF'}}>
                                        <Text
                                            style={[styles.paymentIcon, {backgroundColor: '#EC4747'}]}
                                        >支</Text>
                                        <View>
                                            <Text style={{fontWeight: 'bold', fontSize: 17}}>{lang('Alipay')}</Text>
                                            <Text style={{
                                                fontSize: 15,
                                                width: 262,
                                                fontWeight: '100'
                                            }}>{lang('100 dollar at least and 20,000 dollar at most in a single deposit. Receivable Instantly.')}</Text>
                                        </View>
                                        <Icons
                                            name={`ios-checkmark-circle`}
                                            size={26}
                                            color={'#EEC544'}
                                            style={{alignSelf: 'center', marginLeft: 10}}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', padding: 15, justifyContent: 'center'}}>
                                        <Text style={{fontWeight: '100'}}>{lang('If you need help,please ')}</Text>
                                        <TouchableHighlight>
                                            <Text style={{color: '#1D73C7'}}>{lang('contact the client service')}</Text>
                                        </TouchableHighlight>
                                    </View>
                                    <TouchableHighlight style={{alignSelf: 'center'}}>
                                        <Text style={styles.doneStyle}>{lang('Done')}</Text>
                                    </TouchableHighlight>
                                </View>
                            )
                            : (
                                /*扫码支付*/
                                <View style={{backgroundColor: "#FFFFFF", flex: 1}}>
                                    {/*金额框*/}
                                    <View style={styles.depositBox}>
                                        <View style={{width:'50%',alignSelf:'center'}}>
                                            <TextInput
                                                style={styles.iptStyle}
                                                placeholder={lang('Deposit')}
                                                onSubmitEditing={this.sendData}
                                                returnKeyType={'send'}
                                                value={this.state._amount}
                                                onChangeText={text=>this.setState({_amount:text})}
                                            />
                                        </View>
                                        <View style={{flexDirection: "row",borderLeftWidth: 1, borderLeftColor: '#ECECEC'}}>
                                            <Text style={styles.switchMoney}>≈ $</Text>
                                        </View>
                                    </View>
                                    {/*币种选择*/}
                                    <View style={styles.typeBox}>
                                        <Select title='BTC' type='BTC' url={require('../../images/BTC.png')}
                                                select={this.state.type}
                                                onPress={(type) => {
                                                    this.setState({type: type,_amount:'',qrCode:'',address:''});

                                                }}/>
                                        <Select title='ETH' type='ETH' url={require('../../images/ETH.png')}
                                                select={this.state.type}
                                                onPress={(type) => {
                                                    this.setState({type: type,_amount:'',qrCode:'',address:''});

                                                }}/>
                                        <Select title='USDT' type='USDT' url={require('../../images/USDT.png')}
                                                select={this.state.type}
                                                onPress={(type) => {
                                                    this.setState({type: type,_amount:'',qrCode:'',address:''});

                                                }}/>
                                    </View>

                                    {/*二维码*/}
                                    <View style={styles.QRBox}>
                                        <View style={styles.QRStyle}>
                                            {this.state.qrCode === '' ? null :
                                                <QRCode value={this.state.qrCode} size={228}/>}

                                        </View>
                                        <Text style={{
                                            color: '#000000',
                                            fontSize: 16,
                                            textAlign: 'center'
                                        }}>{lang(`${this.state.type} Deposit Address`)}</Text>
                                        {this.state.address == null ? null :
                                            <Text style={styles.orderCode}>{this.state.address}</Text>}
                                    </View>
                                    {/* 按钮*/}
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: "center",
                                        backgroundColor: '#FFFFFF'
                                    }}>
                                        <Button
                                            buttonStyle={{
                                                width: 150,
                                                backgroundColor: '#EEC544',
                                                borderRadius: 8,
                                                overflow: "hidden"
                                            }}
                                            color={'#000000'}
                                            fontSize={15}
                                            title={lang('Copy Address')}
                                            onPress={() => {
                                                Clipboard.setString(this.state.address)
                                            }}
                                        />
                                    </View>
                                </View>
                            )
                    }
                </ScrollView>
            );
        }else{
            return(<View></View>);
        }
    }

    renderRow(rowData,sectionID,rowID,highlightRow){
        let isBank = false;
        if (rowID==0){
            isBank = true;
        }
        return(
            <TouchableOpacity activeOpacity={0.5}
                              onPress={()=>{this.props.navigation.navigate('RechargeDetail',{
                                      balance:1000,
                                      isBank:isBank,
                                  }
                              )}}
            >
                <View style={styles.cellStyle}>
                    <Icons
                        name={`ios-Home`}
                        size={26}
                        color={'#EEC544'}
                        style={styles.rowImageStyle}
                    />

                    <Text style={styles.titleStyle}>
                        {rowData.name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }


    render() {
        return (
            <SafeBody style={{position: 'relative'}}>
                {/*头部*/}<Header title={'Deposit'} button={{name: 'Deposit', forward: 'DepositRecords'}}
                                navigation={this.props.navigation}/>

                {/*{this.renderOptionCard()}*/}
                {/*{this.renderContent()}*/}
                <ListView
                style={{width:kWidth}}
                dataSource={this.state.dataSource}
                renderRow = {this.renderRow}
                />
            </SafeBody>
        )
    }

    componentDidMount(){
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(
                listData
            )
        });
    }

    async requestData(){

        try{
            let result = await req({
                url:'/pay/recharge.htm',
                data:{
                    action:'getPayList',
                    switchType:1
                }
            });
            // this.setState({
            //     dataSource:result.paylist
            // });
            // console.log(result)
        }catch (e) {

        }


    }


    async sendData(event) {
        // if (!!event) {
        //     this._amount = event.nativeEvent.text;
        // }
        this._amount = this.state._amount;
        if (!this._amount) return;

        try {
            const result = await req({
                url: '/coinpayments/rechargeCoin.htm',
                type: 'POST',
                data: {
                    amount: this._amount,
                    currencyTransfer: this.state.type
                }
            });
            this.setState({qrCode: result.address, address: result.address});
            console.warn(result);
        } catch (err) {
            Alert.alert('Error', err['errorMsg'])
        }
    }

}

let kWidth = require('Dimensions').get('window').width;

const styles = StyleSheet.create({

    cellStyle:{
        height:88,
        width:kWidth,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'flex-start',
        borderBottomWidth:0.5,
        borderColor:'gray',
        paddingTop:10,
        paddingLeft:12,
    },
    rowImageStyle:{
        width:80,
        height:80,
    },
    titleStyle:{
        fontSize:18,
    },
    descriptionStyle:{
        width:kWidth*0.6,
    },
    bottomViewSytle:{
        width:kWidth,
        // textAlign: center,
    },


    line: {
        width: 3,
        height: 20,
        backgroundColor: "#8F8E94",
        marginTop: 5
    },
    tab: {
        flexDirection: "row",
        width: SCREEN_WIDTH,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#FFFFFF",
        paddingBottom: 7,
        justifyContent: 'center'
    },
    touchStyle: {
        width: 177,

    },
    touchBottom: {
        borderBottomWidth: 3,
        borderBottomColor: '#EEC544'
    },
    paymentIcon: {
        width: 43,
        height: 43,
        textAlign: 'center',
        lineHeight: 40,
        fontSize: 17,
        borderRadius: 21.5,
        overflow: 'hidden',
        color: "#FFFFFF",
        marginRight: 10, alignSelf: 'center'
    },
    doneStyle: {
        width: 356 * RATIO,
        backgroundColor: UI_ACTIVE_COLOR,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        fontWeight: '100',
        overflow: "hidden"
    },
    depositBox: {
        flexDirection: 'row',
        width: SCREEN_WIDTH,
        height: 50,
        borderWidth: 1,
        borderColor: '#ECECEC'
    },
    depositIpt: {
        flexDirection: "row",
        width: 182,
        height: 50,
        padding: 10,
    },
    iptStyle: {
        width: '100%',//150,
        // height: 50,
        paddingLeft: 10,

    },
    switchMoney: {
        width: 182,
        height: 50,
        lineHeight: 30,
        padding: 10,
        borderLeftWidth: 1,
        borderLeftColor: '#ECECEC'
    },
    typeBox: {
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#C7C7C7",
    },
    typeStyle: {
        flex: 1,
        width: 64,
        height: 63,
        borderRadius: 5,
        margin: 11
    },
    imageStyle: {
        width: 36,
        height: 36,
        alignSelf: 'center',
        marginTop: 5
    },
    QRBox: {
        width: SCREEN_WIDTH,
        padding: 20,
        backgroundColor: "#FFFFFF",
        marginBottom: 10
    },
    QRStyle: {
        width: 230,
        height: 230,
        alignSelf: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#000000'
    },
    orderCode: {
        color: '#8F8E94',
        fontSize: 15,
        textAlign: 'center',
        width: 280,
        alignSelf: 'center'
    },
    bg: {
        backgroundColor: "#ECECEC"
    }
});