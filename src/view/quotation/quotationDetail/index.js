import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    WebView,
    Image,
    TouchableOpacity,
    Platform,
    Button
} from 'react-native';

import {
    StackNavigator
} from 'react-navigation'

import {
    LIB
} from "../../../css";

import {
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
    PAGE_HEIGHT,
    SafeBody, RATIO,
} from "../../../lib/adjust";

import {GMT, HAS_CRYPTO} from "../../../config";

import {
    lang
} from "../../../lang";

import WKWebView from 'react-native-wkwebview-reborn';
import login from '../../login';
import order from '../../trade/order';
import position from '../../position';
import rules from '../../rules';
import signUp from '../../signUp/index';
import language from "../../signUp/language";

import Footer from './tradeFooter';
import Header from '../../../common/header';
import ChartTab from '../../trade/chartTab'
// import Controller from './controller';
import DropDown from '../../trade/ui/dropdown';
import {FALL, LINE_COLOR, RAISE, UI_ACTIVE_COLOR, BASIC_FONT_COLOR, HEADER_FONT_COLOR, DATE_FONT_COLOR} from "../../../lib/color";
import {Contracts, Schedule, Data, Quotes} from "../../../module";
import {CHART_URL} from "../../../config";
import {Cache} from "../../../module";
import {Type} from "../../../common";
import stopPL from "../../position/setStopProfit";
import styles from '../../../style/trade/index';
import commonStyles from '../../../style/variable';


class quotationDetail extends Component {
    _chart = null;
    minuteLine = {
        'min 1': 'M1',
        'min 3': 'M3',
        'min 5': 'M5',
        'min15': 'M15'
    };

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            left: 0,
            minuteLine: 'M3',
            selectMinute: 'min 3',
            url: `${CHART_URL}?timezone=${GMT}`,
            contract: '',
            dynamic: false,
            dynamicHeight: 0,
            open: lang('Open'),  //开盘--openData 1
            prevClosePx: lang('Prev Close'), //昨收2
            price: lang('Chg'), //涨跌1
            change: lang('%Chg'), //涨幅、跌幅2
            Highest: lang('High'), //最高1
            Lowest: lang('Low'),   //最低2
            up: lang('Limit-up'),  //1
            down: lang('Limit-down'), //2
            settlement: lang('Settlement Today'), //1
            last: lang('Last Settlement'), //2
            position: lang('Position'), //1
            lots: lang('Total Lots'), //2
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
            selectedIndex: null,
            selectedLineIndex: null,
        };
    }


    renderWebview(){
        if (Platform.OS === 'ios') {
            return(
                <WKWebView
                    ref={(c) => this._chart = c}
                    source={{uri: this.state.url}}
                    style={myTradeStyle.webView}
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
                    style={myTradeStyle.webView}
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


    render(){
        return(
            <SafeBody>
                <Header button={{name:'Position',isText:true,forward:'Rules',take:'Trade'}}/>
                <View style = {myTradeStyle.topBar}>
                    {this.renderTopBar()}
                </View>
                    {this.renderWebview()}
                {this.renderDropDown()}
                {this.renderHandicapInformationPage()}
                <View style={myTradeStyle.bottomView}>
                    <Footer onPress={(type) => {
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
                    } navigation={this.props.navigation} contract={this.state.contract}/>
                </View>
            </SafeBody>
        )
    }


    renderTopBar(){
        return(
            <View style={myTradeStyle.topBar}>
                <TouchableOpacity onPress={()=>this.setSelectIndex(1)}>
                    <View style={[myTradeStyle.butttonOne,{borderColor: this.state.selectedIndex === 1 ? 'red':'gray'}]}>
                        <Text style={myTradeStyle.butttonOneText}>分时</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setSelectIndex(2)}>
                    <View style={[myTradeStyle.butttonTwo,{borderColor: this.state.selectedIndex === 2 ? 'red':'gray'}]}>
                        <Text style={myTradeStyle.butttonTwoText}>K线</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setSelectIndex(3)}>
                    <View style={[myTradeStyle.butttonThree,{borderColor: this.state.selectedIndex === 3 ? 'red':'gray'}]}>
                        <Text style={myTradeStyle.butttonThreeText}>盘口</Text>
                    </View>
                </TouchableOpacity>

                <Text style={myTradeStyle.numberOne}>75</Text>
                <Text style={myTradeStyle.numberTwo}>66</Text>
                <Text style={myTradeStyle.numberThree}>77</Text>
            </View>
        )
    }

    setSelectIndex(index){
        this.setState({
            selectedIndex: index,
        })
    }

    renderDropDown(){
        const itemList = [ 'min 1', 'min 3', 'min 5', 'min15'];
        return(
            <DropDown show={this.state.selectedIndex === 2} style={myTradeStyle.dropdown} select={this.state.selectMinute}
                      itemStyle={myTradeStyle.dropItem} textStyle={myTradeStyle.dropItemText}
                      activeStyle={myTradeStyle.dropItemTextActive} triangle={BASIC_FONT_COLOR} top={28}
                      left={this.state.left} item={itemList} onPress={(select) => {
                this.closeSubType();
                this.setState({
                    minuteLine: this.minuteLine[select],
                    selectMinute: select
                });
                let line = select.replace('min', '');
                line = line.replace(' ', '');
                this.changeType(line);
            }}/>
        );
    }

    renderHandicapInformationPage(){
        return(
            <View style={{display:this.state.selectedIndex === 3 ? 'flex':'none'}}>
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
        )
    }


    startWebView() {
        const o = Contracts.totalArray.find((n)=>{
            return n.contract !== undefined;
        });
        // const code = o.code;
        const code = this.props.navigation.state.params.code;
        this.setState({url: `${CHART_URL}?code=${code}&timezone=${GMT}`, contract: o.contract});

        /*获取到所有的信息 根据币种不同进行区分*/
        for (let o of Contracts.totalArray) {
            if (o.currency === 'ETH') {
                this.state.ETH.push(o)
            } else if (o.currency === 'BTC') {
                this.state.BTC.push(o)
            } else if (o.currency === 'USD') {
                this.state.USD.push(o)
            }
        }
        Quotes.start('quoteUpdate', o.contract);
    }

    changeCode(code) {
        // const c = Contracts.total[code].code;
        const c = this.props.navigation.state.params.code;
        if(!!this._chart){
            if (Platform.OS === 'ios') {
                this._chart.evaluateJavaScript(`this.swapCode('${c}')`);
            }else{
                this._chart.injectJavaScript(`this.swapCode('${c}')`);
            }
        }
        // this._chart.injectJavaScript(`this.swapCode('${c}')`);
        this.setState({contract: code});
        Quotes.switch(code)
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
                    this._chart.injectJavaScript(`this.swap('${type}')`)
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
        if (Data.initial) {
            this.startWebView();
        } else {
            Schedule.addEventListener('contractsInitial', this.startWebView, this);
        }
        Schedule.addEventListener('openTrade', this.changeCode, this);
        Schedule.addEventListener('quoteUpdate', this.getInfo, this);
    }

    getInfo(data){
        const {priceDigit} = Contracts.total[data.code];
        const q = Data.total[data.code];
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
            isUp: q.isUp
        })
    }
}

// export default StackNavigator({
//         Trade: {
//                 screen: quotationDetail,
//                 navigationOptions: {
//                     header: null
//                 }
//             },
//             Order: {
//             screen: order,
//             navigationOptions: {
//                 header: null
//             }
//         },
//         Login: {
//             screen: login,
//             navigationOptions: {
//                 header: null
//             }
//         },
//         SignUp: {
//             screen: signUp,
//             navigationOptions: {
//                 header: null
//             }
//         },
//         Language: {
//             screen: language,
//             navigationOptions: {
//                 header: null
//             }
//         },
//         Position: {
//             screen: position,
//             navigationOptions: {
//                 header: null
//             }
//         },
//         StopPL:{
//             screen:stopPL,
//             mode:'modal',
//             navigationOptions: {
//                 header: null
//             }
//         },
//         Rules: {
//             screen: rules,
//             navigationOptions: {
//                 header: null
//             }
//         }
//     }
// );

const myTradeStyle = StyleSheet.create({
    topBar:{
        height:50,
        flexDirection:'row',
        alignItems:'center',
    },
    webView:{
        // height:500,
        // width:SCREEN_WIDTH,
        flex:1
    },
    butttonOne:{
        height:30,
        width: SCREEN_WIDTH*0.16,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
    },
    butttonTwo:{
        height:30,
        width: SCREEN_WIDTH*0.16,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
    },
    butttonThree:{
        height:30,
        width: SCREEN_WIDTH*0.16,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
    },
    butttonOneText:{

    },
    butttonTwoText:{

    },
    butttonThreeText:{

    },


    numberOne:{
        marginLeft:10,
        fontSize:16,
        color:'red',

    },
    numberTwo:{
        marginLeft:10,
        fontSize:16,
        color:'red',
    },
    numberThree:{
        marginLeft:10,
        fontSize:16,
        color:'red',
    },
    dropdown: {
        left:SCREEN_WIDTH*0.24,
        top:100,
        width: 61,
        height: 170,
        backgroundColor: BASIC_FONT_COLOR,
        borderRadius: 4,
        paddingTop: 15
    },
    dropItem: {
        height: 34
    },
    dropItemText: {
        alignSelf: 'center',
        color: DATE_FONT_COLOR,
        fontSize: 16,
        height: 34,
        lineHeight: 34
    },
    dropItemTextActive: {
        color: UI_ACTIVE_COLOR
    },
    dynamic: {
        flex: 1,
        position: 'absolute',
        backgroundColor: HEADER_FONT_COLOR,
        zIndex: 1,
        width: SCREEN_WIDTH,
        paddingHorizontal: 5,
        paddingVertical: 10
    },
});