import React, {Component} from 'react'

import {
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native';

import req from '../../../lib/req';
import {Slider} from 'react-native-elements'
import Icons from 'react-native-vector-icons/Ionicons'
import {RATIO, SafeBody} from "../../../lib/adjust";
import {Header} from "../../../common";
import {lang} from "../../../lang";
import {RAISE, FALL, UI_ACTIVE_COLOR, UI_ACTIVE_HOVER_COLOR} from "../../../lib/color";
import {Contracts, Scheme, Data, Schedule} from "../../../module";
import styles from './../../../style/position/setStopProfit/index'
import commonStyles from './../../../style/variable'
export default class App extends Component {
    constructor(props) {
        super(props);
        let reference = this._reference = this.props.navigation.state.params;
        let contract = this._contract = Contracts.total[reference.contract];
        this._unit = contract.priceChange.mul(reference.volume).mul(Scheme.total[reference.contract].priceUnit);
        let [,_float] = this._unit.toString().split('.');
        this._float = _float !== undefined?_float.length:0;
        let priceUnit = this._priceUnit = Scheme.total[reference.contract].priceUnit;
        let quote = Data.total[contract.contract];
        let income,current = Number(quote.price);
        if(reference.isBuy){
            income = current.sub(reference.opPrice).mul(reference.volume).mul(priceUnit);
        }else{
            income = reference.opPrice.sub(current).mul(reference.volume).mul(priceUnit);
        }
        this.state = {
            income: income,
            price: current,
            profitValue: reference.stopProfit,
            lossValue: reference.stopLoss
        };
        priceUnit = null;
        quote = null;
        income = null;
        current = null;
        reference = null;
        contract = null;
    }

    render() {

        let incomeColor = this.state.income>0?RAISE:FALL

        return (
            <SafeBody>
                <Header title={'Set Stop Profit/Loss'} navigation={this.props.navigation}/>
                <ScrollView>
                    <View style={styles.topBox}>
                        <View style={styles.firstViewWrapper}>
                            <Text style={styles.contractName}>{this._contract.name}</Text>
                            <Text style={[{color: incomeColor},styles.income]}>{this.state.income}</Text>
                            {/* <Text style={styles.contractCurrency}>{this._contract.currency}</Text> */}
                        </View>
                        <View style={styles.secondViewWrapper}>
                            <Text style={styles.latestPrice}>{lang('Latest Price')}</Text>
                            <Text style={styles.price}>{this.state.price}</Text>
                            {/* <Text>{this._contract.currency}</Text> */}
                        </View>
                        <View style={commonStyles.rowStyle}>
                            <Text style={styles.buyText}>{this._reference.isBuy?lang('Buy'):lang('Sell')}</Text>
                            <Text style={styles.volumeText}>{this._reference.volume}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomBox}>
                        {/*赢进度条*/}
                        <View style={styles.winProgressBarRoot}>
                            <View style={styles.sliderWrapper}>
                                <Icons
                                    name={`md-remove-circle`}
                                    size={30}
                                    style={styles.winImage}
                                />
                                <Slider
                                    style={styles.sliderStyle}
                                    thumbStyle={styles.sliderThumbStyle}
                                    value={this.state.profitValue}
                                    maximumValue={this._reference.stopProfitBegin}
                                    minimumValue={this._unit}
                                    step={this._unit}
                                    onValueChange={(value) => {
                                        this.setState({profitValue: Number(value.toFixed(this._float))});
                                    }}
                                />
                                <Icons
                                    name={`md-add-circle`}
                                    size={30}
                                    style={styles.winImage}
                                />
                            </View>
                            <View style={styles.profitWrapper}>
                                <Text style={commonStyles.fillStyle}>{lang('Stop-Profit')}</Text>
                                <Text style={styles.profitValue}>{this.state.profitValue}</Text>
                                {/* <Text style={styles.winProgressBarContractCurrency}>{this._contract.currency}</Text> */}
                            </View>
                        </View>
                        {/*损 进度条*/}
                        <View style={styles.winProgressBarRoot}>
                            <View style={styles.sliderWrapper}>
                                <Icons
                                    name={`md-remove-circle`}
                                    size={30}
                                    style={styles.winImage}
                                />
                                <Slider
                                    style={styles.sliderStyle}
                                    thumbStyle={styles.sliderThumbStyle}
                                    value={Math.abs(this.state.lossValue)}
                                    maximumValue={Math.abs(this._reference.stopLossBegin)}
                                    minimumValue={this._unit}
                                    step={this._unit}
                                    onValueChange={(value) => {this.setState({lossValue:-(Number(value.toFixed(this._float)))})}}
                                />
                                <Icons
                                    name={`md-add-circle`}
                                    size={30}
                                    style={styles.winImage}
                                />
                            </View>
                            <View style={styles.profitWrapper}>
                                <Text style={commonStyles.fillStyle}>{lang('Stop-Loss')}</Text>
                                <Text style={styles.profitValue}>{this.state.lossValue}</Text>
                                {/* <Text style={styles.winProgressBarContractCurrency}>{this._contract.currency}</Text> */}
                            </View>
                        </View>

                        <TouchableHighlight style={commonStyles.centerView} activeOpacity={1} underlayColor={UI_ACTIVE_HOVER_COLOR} onPress={()=>this.submit()}>
                            <Text style={styles.doneStyle}>{lang('Confirm')}</Text>
                        </TouchableHighlight>

                        {/*提示*/}
                        <Text style={styles.tipsOne}>{lang('Reminder')}</Text>
                        <Text style={styles.tipsTwo}>{lang('Stop-Profit')}</Text>
                        <Text style={styles.tipsThree}>{lang('When this profit us higher than this amount,the position is automatically closed by this system')}</Text>
                        <Text style={styles.tipsFour}>{lang('Stop-Loss')}</Text>
                        <Text style={styles.tipsThree}>{lang('When ths lss is higher than this amount,the position is automatically closed by the system')}</Text>
                    </View>
                </ScrollView>
            </SafeBody>
        )
    }

    componentDidMount(){
        Schedule.addEventListener('updateAll', this.update, this);
    }
    componentWillUnmount(){
        Schedule.removeEventListeners(this);
    }
    update(){
        let quote = Data.total[this._contract.contract];
        let income,current = Number(quote.price);
        if(this._reference.isBuy){
            income = current.sub(this._reference.opPrice).mul(this._reference.volume).mul(this._priceUnit);
        }else{
            income = this._reference.opPrice.sub(current).mul(this._reference.volume).mul(this._priceUnit);
        }
        this.setState({income:income,price:current});
        quote = null;
        income = null;
        current = null;
    }
    async submit(){
        try{
            await req({
                url: '/trade/spsl.htm',
                type:'POST',
                data: {
                    bettingId: this._reference.id,
                    tradeType: 1,
                    stopProfit: this.state.profitValue,
                    stopLoss: this.state.lossValue > 0 ? -this.state.lossValue : this.state.lossValue,
                    source: '设置止盈止损'
                },
                animate:true
            });
            Alert.alert('',lang('Setting Successfully'));
            this.props.navigation.goBack();
        }catch (err){
            Alert.alert(lang('Error'),err.errorMsg || err);
        }
    }
}

