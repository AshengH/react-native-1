import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    Animated,
    ScrollView
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation'

import {
    LIB
} from "../../css";

import {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    PAGE_HEIGHT,
    SafeBody, RATIO,
} from "../../lib/adjust";

import {GMT, HAS_CRYPTO} from "../../config";

import {
    lang
} from "../../lang";

import Icons from 'react-native-vector-icons'
import WKWebView from 'react-native-wkwebview-reborn';
import login from '../login';
import position from '../position';

import Header from './header';
import ChartTab from './chartTab'
import Controller from './controller';
import DropDown from './ui/dropdown';
import {FALL, LINE_COLOR, RAISE, UI_ACTIVE_COLOR, BASIC_FONT_COLOR, HEADER_FONT_COLOR,GRAY_SVG_COLOR,ACTIVITY_FONT_COLOR,SCHEME_THREE_BACKGROUND_COLOR} from "../../lib/color";
import {Contracts, Schedule, Data, Quotes} from "../../module";
import {CHART_URL} from "../../config";
import {Cache} from "../../module";
import {Type} from "../../common";
import stopPL from "../position/setStopProfit";
import styles from './../../style/trade/index'
import commonStyles from './../../style/variable'
import quotes from "../../module/quotes";
class Foreign extends Component {
    constructor(props) {
        super(props);
        console.log(GMT);
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.usdQuoteImageWrapper}>
                    <Image
                        source={require('../../images/USD-quote.png')}
                        style={commonStyles.centerView}
                    />
                    <Text style={commonStyles.centerView}>USD</Text>
                </View>
                <View style={styles.cellWrapper}>
                    {
                        this.props.list.map(({name, contract}) => {
                            return (
                                <TouchableHighlight style={styles.touchableStyle}
                                      onPress={()=>this.props.changeCode(contract)}
                                >
                                    <Text style={styles.touchableText}>{name}</Text>
                                </TouchableHighlight>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

class Digital extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                {
                    this.props.list.map((currency,index) => {
                        let imgAddress;
                        if(currency.name === 'ETH'){
                            imgAddress = require('../../images/ETH-quote.png');
                        }else if(currency.name === 'BTC'){
                            imgAddress = require('../../images/BTC-quote.png');
                        }else if(currency.name === 'USDT'){
                            imgAddress = require('../../images/USDT-quote.png');
                        }

                        let borderWidth = index!==0?1:0;

                        return (
                            <View style={[{borderTopWidth:borderWidth},styles.digitalRoot]}>
                                <View style={commonStyles.rowStyle}>
                                    <View style={styles.currencyDataWrapper}>
                                        <Image source={imgAddress} style={styles.centerView}/>
                                        <Text style={commonStyles.centerView}>{currency.name}</Text>
                                    </View>
                                    <View style={styles.currencyWrapper}>
                                        {
                                            currency['value'].map(({name, contract}) => {
                                                return (
                                                    <TouchableHighlight style={styles.touchableStyle}
                                                        onPress={()=>{this.props.changeCode(contract)}}
                                                    >
                                                        <Text style={styles.touchableText}>{name}</Text>
                                                    </TouchableHighlight>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}

export default class trade extends Component {
    _chart = null;
    minuteLine = {
        'day 1': '1D',
        'min 1': 'M1',
        'min 3': 'M3',
        'min 5': 'M5',
        'min15': 'M15'
    };

    constructor(props) {
        super(props);
        this.config = {
            passCode:this.props.navigation.state.params.code
        };
        let c = Contracts.total[this.props.navigation.state.params.code].code;
        // console.log(`${CHART_URL}?code=${c}&timezone=${GMT}`);
        this.state = {
            show: false,
            left: 0,
            minuteLine: '1D',
            selectMinute: 'day 1',
            url: `${CHART_URL}?code=${c}`,
            contract: '',
            dynamic: false,
            dynamicHeight: 0,
            open: lang('Open'),
            prevClosePx: lang('Prev Close'),
            price: lang('Chg'),
            change: lang('%Chg'),
            Highest: lang('High'),
            Lowest: lang('Low'),
            up: lang('Limit-up'),
            down: lang('Limit-down'),
            settlement: lang('Settlement Today'),
            last: lang('Last Settlement'),
            position: lang('Position'),
            lots: lang('Total Lots'),
            openData: null,
            prevClosePxData: null,
            priceData: null,
            changeData: null,
            HighestData: null,
            LowestData: null,
            upData: null,
            downData: null,
            settlementData: null,
            lastData: null,
            positionData: null,
            lotsData: null,
            isUp: true,
            paymentType: 'fiat',
            switch: 0,
            ETH: [],
            BTC: [],
            USD: [],
            coverShow:false,
            title:Contracts.total[this.props.navigation.state.params.code].name,
        };
    }

    renderCurrencySelector(){
        if (HAS_CRYPTO) {
            return(
                <View style={styles.selectorRoot}>
                            <Type
                                title={'Fiat Futures'}
                                type='fiat'
                                select={this.state.paymentType} 
                                onPress={(type) => {
                                    this.setState({paymentType: type, switch: 0})
                                }}
                            />
                            <Type
                                title={'Crypto Futures'}
                                type='cryptos'
                                select={this.state.paymentType}
                                onPress={(type) => {
                                    this.setState({paymentType: type, switch: 1})
                                }}
                            />
                        </View>
            );
        }else{
            return(
                <View></View>
            );
        }
    }

    renderWebview(){
        if (Platform.OS === 'ios') {
            return(
                <WKWebView
                    ref={(c) => this._chart = c}
                    source={{uri: this.state.url}}
                    style={styles.webview}
                    onNavigationStateChange={() => {
                        this._chart.evaluateJavaScript('history.back()');
                    }}
                />
            );
        } else {
            return(
                <WebView
                    ref={(c) => this._chart = c}
                    source={{uri: this.state.url}}
                    style={styles.webview}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                    mixedContentMode='always'
                    domStorageEnabled={true}
                    onNavigationStateChange={() => {
                        this._chart.injectJavaScript('history.back()')
                    }}
                />
            );
        }
    }

    renderMiddleButton(navigation,contract){
        return(
            <TouchableOpacity onPress={()=>{
                // this.setState({
                //     coverShow:!this.state.coverShow
                // });
                    navigation.navigate('Rule',{contract:contract});
                }} style={{width:20,height:20,backgroundColor:HEADER_FONT_COLOR,borderRadius:20,alignSelf:'center',marginLeft:10,justifyContent:'center'}}>
                <Text style={{color:UI_ACTIVE_COLOR,alignSelf:'center'}}>?</Text>
            </TouchableOpacity>
        );
    }

    renderCover(){

        return(
            <View style={styles.HUD}>
                <ScrollView>
                    <View style={{height:30,alignItems:'center'}}>
                        <Text style={{fontSize:18,marginLeft:10, alignSelf:'flex-start'}}>国际期货</Text>
                    </View>
                    <View style={{flex:1,height:0.5,backgroundColor:GRAY_SVG_COLOR}}/>
                    <View style={{flexDirection:'row', flex:1,flexWrap:true}}>
                        {Contracts.foreignArray.map((item,index)=>{
                            return(
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.config.passCode = item.contract;
                                        Quotes.end('quoteUpdate', this.config.passCode);
                                    this.setState({
                                        url: `${CHART_URL}?code=${Contracts.total[item.contract].code}`,
                                        contract:item.contract,
                                        coverShow:false
                                });
                                        Quotes.start('quoteUpdate', this.config.passCode);
                                }}
                                >
                                    <View style={{width:(SCREEN_WIDTH - 41)/3,height:30,marginLeft:10,marginTop:10,justifyContent:'center',alignItems:'center',backgroundColor:SCHEME_THREE_BACKGROUND_COLOR}}>
                                        <Text style={{fontSize:17,color:ACTIVITY_FONT_COLOR}}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={{flex:1,height:15,marginVertical:10,backgroundColor:SCHEME_THREE_BACKGROUND_COLOR}}/>

                    <View style={{height:30,alignItems:'center'}}>
                        <Text style={{fontSize:18,marginLeft:10, alignSelf:'flex-start'}}>股指期货</Text>
                    </View>
                    <View style={{flex:1,height:0.5,backgroundColor:GRAY_SVG_COLOR}}/>
                    <View style={{flexDirection:'row', flex:1,flexWrap:true}}>
                        {Contracts.stockArray.map((item,index)=>{
                            return(
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.config.passCode = item.contract;
                                        Quotes.end('quoteUpdate', this.config.passCode);
                                        this.setState({
                                            url: `${CHART_URL}?code=${Contracts.total[item.contract].code}`,
                                            contract:item.contract,
                                            coverShow:false
                                        });
                                        Quotes.start('quoteUpdate', this.config.passCode);
                                    }}
                                >
                                    <View style={{width:(SCREEN_WIDTH - 41)/3,height:30,marginLeft:10,marginTop:10,justifyContent:'center',alignItems:'center',backgroundColor:SCHEME_THREE_BACKGROUND_COLOR}}>
                                        <Text style={{fontSize:17,color:ACTIVITY_FONT_COLOR}}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={{flex:1,height:15,marginVertical:10,backgroundColor:SCHEME_THREE_BACKGROUND_COLOR}}/>

                    <View style={{height:30,alignItems:'center'}}>
                        <Text style={{fontSize:18,marginLeft:10, alignSelf:'flex-start'}}>国内期货</Text>
                    </View>
                    <View style={{flex:1,height:0.5,backgroundColor:GRAY_SVG_COLOR}}/>
                    <View style={{flexDirection:'row', flex:1,flexWrap:true}}>
                        {Contracts.domesticArray.map((item,index)=>{
                            return(
                                <TouchableOpacity
                                    onPress={()=>{
                                        this.config.passCode = item.contract;
                                        Quotes.end('quoteUpdate', this.config.passCode);
                                        this.setState({
                                            url: `${CHART_URL}?code=${Contracts.total[item.contract].code}`,
                                            contract:item.contract,
                                            coverShow:false
                                        });
                                        Quotes.start('quoteUpdate', this.config.passCode);
                                    }}
                                >
                                    <View style={{width:(SCREEN_WIDTH - 41)/3,height:30,marginLeft:10,marginTop:10,justifyContent:'center',alignItems:'center',backgroundColor:SCHEME_THREE_BACKGROUND_COLOR}}>
                                        <Text style={{fontSize:17,color:ACTIVITY_FONT_COLOR}}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                </ScrollView>
            </View>
        )
    }



    render() {
        const itemList = ['day 1','min 1','min 3', 'min 5', 'min15'];

        return (
            <SafeBody>
                 <Header commodity={this.state.contract} onPress={(back) => {
                    if(back){
                        this.setState({coverShow:false})
                    }else{
                        this.setState({coverShow:!this.state.coverShow})
                    }
                }} navigation={this.props.navigation}/>
                {/*<Header*/}
                    {/*midButton={(navigation,contract)=>this.renderMiddleButton(navigation,contract)}*/}
                    {/*customTitle={{title:this.state.title,contract:this.state.contract,code:Contracts.total[this.props.navigation.state.params.code].code}}*/}
                    {/*navigation={this.props.navigation}*/}
                    {/*button={{name:'Position',isText:true,forward:'Position',take:'Trade'}}*/}
                {/*/>*/}
                <View style={LIB.container}>
                    {/*遮罩层*/}
                    {/*{this.state.coverShow? <View style={styles.HUD}>*/}
                        {/*{this.renderCurrencySelector()}*/}
                        {/*{*/}
                            {/*this.state.switch === 0 ?*/}
                                {/*<Foreign changeCode={(code)=>{*/}
                                    {/*this.changeCode(code);*/}
                                    {/*this.setState({coverShow:false})*/}
                                {/*}} list={this.state.USD}/>*/}
                                {/*:*/}
                                {/*<Digital changeCode={(code)=>{*/}
                                    {/*this.changeCode(code);*/}
                                    {/*this.setState({coverShow:false})*/}
                                {/*}*/}
                                {/*} list={[{name: 'ETH', value: this.state.ETH}, {*/}
                                    {/*name: 'BTC',*/}
                                    {/*value: this.state.BTC*/}
                                {/*}]}/>*/}
                        {/*}*/}
                    {/*</View> :null}*/}
                    {this.state.coverShow ? this.renderCover() : null}

                    <DropDown show={this.state.show}
                              style={styles.dropdown}
                              select={this.state.selectMinute}
                              itemStyle={styles.dropItem}
                              textStyle={styles.dropItemText}
                              activeStyle={styles.dropItemTextActive}
                              triangle={BASIC_FONT_COLOR}
                              top={28}
                              left={this.state.left}
                              item={itemList}
                              onPress={(select) => {this.closeSubType();
                              this.setState({
                                  minuteLine: this.minuteLine[select],
                                  selectMinute: select
                              });
                              let line = select.replace('min', '');
                              line = line.replace(' ', '');
                              this.changeType(line);
                              }}
                    />

                    <ChartTab tend={this.state.tend}
                              price={this.state.priceData}
                              rate={this.state.rate}
                              percent={this.state.percent}
                              style={styles.chartTab}
                              min={this.state.minuteLine}
                              onPress={(o) => {this.changeType(o)}}
                              expand={(position) => {this.expandSubType(position)}}
                              close={() => this.closeSubType()}
                              position={(px, width) => this.getSubTypePosition(px, width)}
                              opening={this.state.openData}
                              highest={this.state.HighestData}
                              yesterday={this.state.lastData}
                              lowest={this.state.LowestData}
                    />

                    <View style={{flex: 1}} ref={(c) => this._view = c}>
                        {this.state.dynamic ? (
                            <View style={[styles.dynamic, {height: PAGE_HEIGHT}]}>
                                <View>
                                    <View style={commonStyles.rowStyle}>
                                        <View style={[styles.box, {borderRightWidth: 0, borderBottomWidth: 0}]}>
                                            <Text style={styles.name}>{this.state.open}</Text>
                                            <Text style={commonStyles.centerView}>{this.state.openData}</Text>
                                        </View>
                                        <View style={[styles.box, {borderBottomWidth: 0}]}>
                                            <Text style={styles.name}>{this.state.prevClosePx}</Text>
                                            <Text style={commonStyles.centerView}>{this.state.prevClosePxData}</Text>
                                        </View>
                                    </View>
                                    <View style={commonStyles.rowStyle}>
                                        <View style={[styles.box, {borderRightWidth: 0, borderBottomWidth: 0}]}>
                                            <Text style={styles.name}>{this.state.price}</Text>
                                            <Text
                                                style={[{color: this.state.isUp ? RAISE : FALL},commonStyles.centerView]}>{this.state.priceData}</Text>
                                        </View>
                                        <View style={[styles.box, {borderBottomWidth: 0}]}>
                                            <Text style={styles.name}>{this.state.change}</Text>
                                            <Text
                                                style={[{color: this.state.isUp ? RAISE : FALL},commonStyles.centerView]}>{this.state.changeData}</Text>
                                        </View>
                                    </View>
                                    <View style={commonStyles.rowStyle}>
                                        <View style={[styles.box, {borderRightWidth: 0, borderBottomWidth: 0}]}>
                                            <Text style={styles.name}>{this.state.Highest}</Text>
                                            <Text
                                                style={[{color: this.state.isUp ? RAISE : FALL},commonStyles.centerView]}>{this.state.HighestData}</Text>
                                        </View>
                                        <View style={[styles.box, {borderBottomWidth: 0}]}>
                                            <Text style={styles.name}>{this.state.Lowest}</Text>
                                            <Text
                                                style={[{color: this.state.isUp ? RAISE : FALL},commonStyles.centerView]}>{this.state.LowestData}</Text>
                                        </View>
                                    </View>
                                    <View style={commonStyles.rowStyle}>
                                        <View style={[styles.box, {borderRightWidth: 0, borderBottomWidth: 0}]}>
                                            <Text style={styles.name}>{this.state.up}</Text>
                                            <Text style={commonStyles.centerView}>{this.state.upData}</Text>
                                        </View>
                                        <View style={[styles.box, {borderBottomWidth: 0}]}>
                                            <Text style={styles.name}>{this.state.down}</Text>
                                            <Text style={commonStyles.centerView}>{this.state.downData}</Text>
                                        </View>
                                    </View>
                                    <View style={commonStyles.rowStyle}>
                                        <View style={[styles.box, {borderRightWidth: 0, borderBottomWidth: 0}]}>
                                            <Text style={styles.name}>{this.state.settlement}</Text>
                                            <Text style={commonStyles.centerView}>{this.state.settlementData}</Text>
                                        </View>
                                        <View style={[styles.box, {borderBottomWidth: 0}]}>
                                            <Text style={styles.name}>{this.state.last}</Text>
                                            <Text style={commonStyles.centerView}>{this.state.lastData}</Text>
                                        </View>
                                    </View>
                                    <View style={commonStyles.rowStyle}>
                                        <View style={[styles.box, {borderRightWidth: 0}]}>
                                            <Text style={styles.name}>{this.state.position}</Text>
                                            <Text style={commonStyles.centerView}>{this.state.positionData}</Text>
                                        </View>
                                        <View style={[styles.box]}>
                                            <Text style={styles.name}>{this.state.lots}</Text>
                                            <Text style={commonStyles.centerView}>{this.state.lotsData}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ) : null}
                        {this.renderWebview()}
                    </View>
                    <Controller onPress={(type) => {
                        if (!Cache.isLogin()) {
                            this.props.navigation.navigate('Login');
                        } else {
                            if (this.state.contract === '') {
                                alert(`${lang('Scheme is loading')}...`)
                            } else {
                                this.props.navigation.navigate('Order', {isBuy: type, contract: this.state.contract})
                            }
                        }
                    }
                    } navigation={this.props.navigation} contract={this.state.contract}
                    />
                </View>
            </SafeBody>
        )
    }

    startWebView() {
        const o = Contracts.totalArray.find((n)=>{
            // if (n.contract === this.props.navigation.state.params.code) {
            //     return n
            // }
            if (n.contract === this.config.passCode) {
                return n
            }
            // return n.contract !== undefined;
        });
        const code = o.code;
        this.setState({contract: o.contract});

        /*获取到所有的信息 根据币种不同进行区分*/
        // for (let o of Contracts.totalArray) {
        //     if (o.currency === 'ETH') {
        //         this.state.ETH.push(o)
        //     } else if (o.currency === 'BTC') {
        //         this.state.BTC.push(o)
        //     } else if (o.currency === 'USD') {
        //         this.state.USD.push(o)
        //     }
        // }
        Quotes.start('quoteUpdate', o.contract);
    }

    changeCode(code) {
        // const c = Contracts.total[code].code;
        // console.log(c);
        // if(!!this._chart){
        //     if (Platform.OS === 'ios') {
        //         this._chart.evaluateJavaScript(`this.swapCode('${c}')`);
        //     }else{
        //         this._chart.injectJavaScript(`this.swapCode('${c}')`);
        //     }
        // }
        // this._chart.injectJavaScript(`this.swapCode('${c}')`);
        // this.setState({contract: code});
        // Quotes.switch(code)
    }

    changeType(type) {
        if (type === 'Live') {
            this.setState({dynamic: true});
        } else {
            this.setState({dynamic: false});
            if(!!this._chart){
                if (Platform.OS === 'ios') {
                    this._chart.evaluateJavaScript(`this.swap('${type}')`)
                }else{
                    this._chart.evaluateJavaScript(`this.swap('${type}')`)
                }
            }
        }
    }

    closeSubType() {
        this.setState({show: false})
    }

    expandSubType() {
        if (this.state.show) {
            let line = this.state.selectMinute.replace('min', '');
            line = this.state.selectMinute.replace('day', '');
            line = line.replace(' ', '');
            this.changeType(line);
        }
        this.setState({show: !this.state.show})
    }

    getSubTypePosition(px, width) {
        if (this.state.left === 0) {
            if(Platform.OS === 'android'){
                this.setState({left: (Math.abs(px).sub(91)).sub(width)})
            }else{
                this.setState({left: px - (61 - width) / 2})
            }
        }
    }

    componentDidMount() {
        Quotes.end();
        Schedule.removeEventListeners(this);

        if (Data.initial) {
            this.startWebView();
        } else {
            Schedule.addEventListener('contractsInitial', this.startWebView, this);
        }
        Schedule.addEventListener('openTrade', this.changeCode, this);
        Schedule.addEventListener('quoteUpdate', this.getInfo, this);
    }

    componentWillUnmount() {
        Quotes.end();
        Schedule.removeEventListeners(this);
    }

    // refreshWholePage(){
    //     if (Data.initial) {
    //         this.startWebView();
    //     } else {
    //         Schedule.addEventListener('contractsInitial', this.startWebView, this);
    //     }
    //     Schedule.addEventListener('openTrade', this.changeCode, this);
    //     Schedule.addEventListener('quoteUpdate', this.getInfo, this);
    // }

    getInfo(data) {
        // console.log(data);
        const {priceDigit} = Contracts.total[data.code];
        const q = Data.total[data.code];

        const prev = data.settle_price_yes || data.close;
        let rate = data.price.sub(prev);
        let percent = rate.div(prev);
        let tend = rate >=0?RAISE:FALL;
        rate = `${rate >= 0 ? '+' : ''}${rate.toFixed(priceDigit)}`;
        percent = `${rate >= 0 ? '+' : ''}${percent.mul(100).toFixed(2)}%`;

        // console.log(data.code,'打印整个Data');
        this.setState({
            openData: data.open.toFixed(priceDigit),
            prevClosePxData: data.close.toFixed(priceDigit),
            priceData: data.price.toFixed(priceDigit),
            changeData: q.rate,
            HighestData: data.max.toFixed(priceDigit),
            LowestData: data.min.toFixed(priceDigit),
            upData: data.high_limit.toFixed(priceDigit),
            downData: data.low_limit.toFixed(priceDigit),
            settlementData: data.settle_price.toFixed(priceDigit),
            lastData: data.settle_price_yes.toFixed(priceDigit),
            positionData: data.hold_volume,
            lotsData: data.volume,
            isUp: q.isUp,
            rate:rate,
            percent:percent,
            tend:tend,
            contract:data.code
        })
    }
}



