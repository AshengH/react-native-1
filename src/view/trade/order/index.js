import React, {Component} from 'react';

import {
    ScrollView,
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Platform,
    Alert
} from 'react-native';

import {
    RATIO,
    SafeBody
} from "../../../lib/adjust";

import {
    Header,
    Currency
} from "../../../common/index";

import {Assets, Contracts, Schedule, Scheme} from "../../../module";

import {
    lang
} from "../../../lang";

import {
    BASIC_FONT_COLOR,
    GRID_LINE_COLOR,
    RAISE,
    UI_ACTIVE_COLOR,
    UI_ACTIVE_HOVER_COLOR,
    FALL,
    HEADER_FONT_COLOR,
    NOTICE_CONTENT_FONT_COLOR
} from "../../../lib/color";

import req from '../../../lib/req';
import {formatDate, getIdentity} from "../../../lib/tool";
import styles from './../../../style/trade/order/index'
import commonStyles from './../../../style/variable'
export default class App extends Component {

    _isBuy = null;
    _contract = null;
    _currency = null;
    _volumeList = null;
    _stopProfitList = null;
    _stopProfitListUpdate = null;
    _stopLossList = null;
    _stopLossIndex= 0;
    _chargeUnit = null;

    constructor(props) {
        super(props);
        const {params: {isBuy, contract}} = this.props.navigation.state;
        const scheme = Scheme.total[contract];
        // this._close = formatDate('h:i:s',{date:scheme.closeTime[0]});
        this._isBuy = isBuy;
        this._contract = contract;
        this._currency = scheme.currency;
        this._volumeList = scheme.volumeList;
        this._chargeUnit = scheme.chargeUnit;
        this._stopProfitList = scheme.stopProfitList;
        this._stopProfitListUpdate = scheme.stopProfitList;
        this._stopLossList = scheme.stopLossList;

        this.state = {
            balance: Assets.game,//Assets[scheme.currency].money,
            stopProfit: scheme.stopProfitList[0],
            stopLossList: scheme.stopLossList,
            stopLoss: scheme.stopLossList[0],
            chargeUnit:scheme.chargeUnit,
            volume: 1,
            price:0.00
        };
    }

    render() {

        let submitButtonColor = this._isBuy ? RAISE : FALL;

        return (
            <SafeBody>
                <Header title="Simulated transaction" navigation={this.props.navigation}/>
                <ScrollView style={commonStyles.whiteBackground}>
                    <View style={[commonStyles.rowStyle,{paddingVertical:10}]}>
                        <Text style={[styles.rowLeft, styles.accountBalance]}>
                            {lang('Game Balance')}
                        </Text>
                        <Text style={[styles.rowLeft, styles.balance]}>
                            {this.state.balance}
                        </Text>
                    </View>
                    
                    <View style={[styles.grid, styles.rowDes]}>
                        <Text style={[styles.rowLeft, styles.contract]}>
                            {this._contract}
                        </Text>
                        <Text style={[styles.rowRight, styles.close]}>
                            {lang('Position will be automatically closed at')} {this._close}
                        </Text>
                    </View>
                    <View style={styles.grid}>
                        <Text style={[styles.rowLeft,styles.tradingLots]}>
                            {lang('Trading Lots')}
                        </Text>
                        <View style={[styles.row, styles.tradingLotsButtonsWrapper]}>
                            {this._volumeList.map((o) => {
                                return (
                                    <TouchableHighlight onPress={()=>this.selectVolume(o)} activeOpacity={1} underlayColor={'transparent'}
                                        style={[styles.btn, this.state.volume === o ? styles.active : null]}>
                                        <Text style={[commonStyles.centerView,{color:this.state.volume === o ? HEADER_FONT_COLOR : NOTICE_CONTENT_FONT_COLOR}]}>
                                            {o}
                                        </Text>
                                    </TouchableHighlight>
                                )
                            })}
                        </View>
                    </View>
                    
                    <View style={[styles.grid, styles.rowDes]}>
                        <Text style={[styles.rowLeft, styles.stopProfitTitle]}>
                            {lang('Stop-Loss')} 
                        </Text>
                        <View style={[styles.row, styles.stopLossButtonsWrapper]}>
                            {
                                this.state.stopLossList.map((o, i) => {
                                    return (
                                        <TouchableHighlight onPress={()=>this.selectStopLoss(i)} activeOpacity={1} underlayColor={'transparent'}
                                            style={[styles.btn, {minWidth: 70}, this.state.stopLoss === o ? styles.active : null, this.state.stopLossList.length === i + 1 ? {marginRight: 0} : null]}>
                                            <Text style={[commonStyles.centerView,{color:this.state.stopLoss === o ? HEADER_FONT_COLOR : NOTICE_CONTENT_FONT_COLOR}]}>
                                                {o}
                                            </Text>
                                        </TouchableHighlight>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View style={[styles.grid, styles.rowDes]}>
                        <Text style={[styles.rowLeft, styles.stopProfitTitle]}>
                            {lang('Stop-Profit')} 
                        </Text>
                        <View style={[styles.rowRight, styles.stopProfitValueWrapper]}>
                            <Text style={styles.stopProfitValue}>
                                {this.state.stopProfit}
                            </Text>
                        </View>
                    </View>
                    {/* <View style={[styles.grid, styles.rowDes]}>
                        <Text style={[styles.rowLeft, styles.stopProfitTitle]}>
                            {lang('No Transaction Fee')}
                        </Text>
                        <View style={[styles.rowRight, styles.stopProfitValueWrapper]}>
                            <Text style={[styles.stopProfitValue,{color: FALL }]}>
                                {this.state.chargeUnit}
                            </Text>
                        </View>
                    </View> */}
                    {/* <View style={[styles.grid, styles.rowDes]}>
                        <Text style={[styles.rowLeft, styles.stopProfitTitle]}>
                            {lang('Freeze')} > {lang('Margin')} 
                        </Text>
                        <View style={[styles.rowRight, styles.stopProfitValueWrapper]}>
                            <Text style={[styles.stopProfitValue,{color: RAISE }]}>
                                {this.state.stopLoss}
                            </Text>
                        </View>
                    </View> */}
                    {/* <View style={[styles.grid,styles.theLatestPriceWrapper]}>
                        <Text style={[styles.rowLeft, styles.theLatestPriceText]}>
                            {lang('Buy Now')}
                        </Text>
                        <Text style={[styles.rowLeft, styles.theLatestPriceText]}>
                            (
                            {lang('The latest price')} {this.state.price}
                            )
                        </Text>
                    </View> */}
                    <TouchableHighlight style={[styles.submit,{backgroundColor:submitButtonColor}]} onPress={()=>this.submit()} activeOpacity={1} underlayColor={UI_ACTIVE_HOVER_COLOR}>
                        <Text style={[{color:HEADER_FONT_COLOR},styles.stopProfitTitle]}>
                            {this._isBuy ? lang('Buy Long') : lang('Sell Short')}
                        </Text>
                    </TouchableHighlight>
                    <View style={{height:10}}></View>
                </ScrollView>
            </SafeBody>
        )
    }

    componentDidMount() {
        Schedule.addEventListener('quoteUpdate',this.priceUpdate,this);
    }

    componentWillUnmount(){
        Schedule.removeEventListeners(this);
    }

    selectStopLoss(i){
        this._stopLossIndex = i;
        this.setState({stopLoss:this.state.stopLossList[i],stopProfit:this._stopProfitListUpdate[i]});
    }

    selectVolume(o){
        let stopLoss = this._stopLossList.map((e)=>{
            return e.mul(o)
        });
        let stopProfit = this._stopProfitList.map((e)=>{
           return e.mul(o)
        });
        this._stopProfitListUpdate = stopProfit;

        this.setState({volume:o,stopLossList:stopLoss,stopLoss:stopLoss[this._stopLossIndex],stopProfit:stopProfit[this._stopLossIndex],chargeUnit:this._chargeUnit.mul(o)})
    }

    priceUpdate(data){
        if(this._isBuy){
            this.setState({price:data.wt_sell_price});
        }else{
            this.setState({price:data.wt_buy_price});
        }
    }

    async submit(){
        try{
            await req({
                url:'/trade/open.htm',
                type:'POST',
                data:{
                    identity:getIdentity(16),
                    tradeType:2,
                    source:'下单',
                    commodity:Contracts.total[this._contract].code,
                    contract:this._contract,
                    isBuy:this._isBuy,
                    price:0,
                    stopProfit: this.state.stopProfit,
                    stopLoss: this.state.stopLoss,
                    serviceCharge: this.state.chargeUnit,
                    eagleDeduction: 0,
                    volume: this.state.volume,
                    moneyType: 0,
                    platform: Platform.OS
                },
                animate:true
            });
            Assets.update();
            Alert.alert(lang('Congratulations'),lang('Order Successfully'));
            this.props.navigation.navigate('Position');
        }catch (err){
            Alert.alert(lang('Error'),err['errorMsg'])
        }
    }

}

