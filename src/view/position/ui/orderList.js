import React,{Component} from 'react';
import {
    View,
    Image,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native';
import {ViewRow} from "../../../basicComponent";
import {RATIO} from "../../../lib/adjust";
import {Schedule, Data} from "../../../module";
import {FALL, LINE_COLOR, RAISE, UI_ACTIVE_COLOR, UI_ACTIVE_HOVER_COLOR} from "../../../lib/color";
import {lang} from "../../../lang";
import {formatDate} from "../../../lib/tool";
import commonStyles from './../../../style/variable'
import styles from './../../../style/position/ui/orderList'
import Icons from 'react-native-vector-icons/Ionicons';
class BasicButton extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableHighlight style={[styles.btn, commonStyles.centerView, this.props.button]} activeOpacity={1}
                                underlayColor={UI_ACTIVE_HOVER_COLOR} onPress={() => {
                this.props.onPress()
            }}>
                <Text style={[styles.buttonTitle, this.props.text]}>
                    {lang(this.props.title)}
                </Text>
            </TouchableHighlight>
        )
    }
}

export default class App extends Component{
    constructor(props){
        super(props);
    }

    renderArrow(o){
        if (o.opPrice.toFixed(o.priceDigit) > Data.total[o.contract].price) {
            return(
                <Icons style={{marginLeft:5}} size={22} name={'ios-arrow-down'} color={FALL}/>
            );
        } else {
            return(
                <Icons style={{marginLeft:5}} size={22} name={'ios-arrow-up'} color={RAISE}/>
            );
        }
    }

    renderItem(o){
        let buyText = o.isBuy?lang('Buy Long'):lang('Sell Short');
        let volumeText = o.volume+'手';
        let moneyTypeText = o.moneyType === 0 ? '标准' : '迷你';
        let buyInfoColor = o.isBuy?RAISE:FALL

        let cellBorderColor = o.income >= 0 ? RAISE : FALL

        return (
            <View style={[styles.cellRoot,{borderColor:cellBorderColor}]}>
                <View style={styles.contractWrapper}>
                    <Text style={styles.contract}>{o.commodity+'('+o.contract+')'}</Text>
                    {/* <Text style={styles.idText}>ID{o.id}</Text> */}
                    <Text style={[styles.contract,{color:buyInfoColor}]}>{buyText+volumeText+moneyTypeText}</Text>
                </View>

                <View style={styles.contractWrapper}>
                    <View style={commonStyles.rowStyle}>
                        <Text style={commonStyles.centerView}>{o.opPrice.toFixed(o.priceDigit)}</Text>
                        <Image source={require('./../../../images/arrow-right.png')} style={styles.arrowImage}/>
                        <Text style={commonStyles.centerView}>{Data.total[o.contract].price}</Text>
                        {/* <Image style={styles.arrowImage}/> */}
                        {this.renderArrow(o)}
                    </View>
                    <Text style={{color:cellBorderColor}}>{o.income > 0 ?`+${o.income}`:o.income}</Text>
                </View>

                <View style={styles.contractWrapper}>
                    <Text>{o.stopProfit+'止盈'}</Text>
                    <Text>{o.stopLoss+'止损'}</Text>
                </View>

                <View style={[styles.cellSettingRoot,{backgroundColor:cellBorderColor}]}>
                    <Text style={[commonStyles.centerView,commonStyles.fillStyle,styles.cellSettingTextColor]}>{'ID ' + o.id}</Text>
                    <TouchableOpacity onPress={()=>{
                         //this.props.navigation.navigate('Stop',o);
                         Schedule.dispatchEvent({event:'toStopPL',eventData:Object.assign({},o)})
                    }} style={styles.cellSettingTouchable}>
                        <Text style={styles.cellSettingTextColor}>{'设置止盈止损'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.close(o.id)} style={styles.cellSettingTouchable}>
                        <Text style={styles.cellSettingTextColor}>{'平仓'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render(){
        if(this.props.list.length === 0){
            return(
                <View style={styles.emptyRoot}>
                    <Image source={require('../../../images/order.png')}
                           style={styles.emptyImage}/>
                    <BasicButton title={'Order Now'} onPress={() => Schedule.dispatchEvent({event:'toOrder'})}/>
                </View>
            )
        }else{

            return(
                <FlatList data={this.props.list} renderItem={obj=>this.renderItem(obj.item)} keyExtractor={(item,index)=>index}/>
            );
            // return(
            //     this.props.list.map((o) => {
            //         if(this.props.schemeSort === 1){
            //             return (
            //                 <View style={styles.cellRoot}>
            //                     <View style={styles.contractWrapper}>
            //                         <Text style={styles.contract}>{o.contract}</Text>
            //                         <Text style={styles.idText}>ID{o.id}</Text>
            //                     </View>
            //                     <View style={styles.line}/>
            //                     <ViewRow style={styles.cellViewRowRoot}>
            //                         <ViewRow style={[{flex: 1},commonStyles.centerView]}>
            //                             <Text>{o.isBuy?lang('Buy Long'):lang('Sell Short')}</Text>
            //                             <Text style={styles.leftOffset}>{o.volume}</Text>
            //                         </ViewRow>
            //                         <ViewRow style={[{flex: 3},commonStyles.centerView]}>
            //                             <Text>{o.currency||this.props.currency}</Text>
            //                             <Text style={[{color:o.income>0?RAISE:FALL},styles.leftOffset]}>{o.income}</Text>
            //                         </ViewRow>
            //                     </ViewRow>
            //                     <ViewRow style={styles.cellViewRowRoot}>
            //                         <Text
            //                             style={[{flex: 1},commonStyles.centerView]}>{lang('Stop-Profit')}</Text>
            //                         <ViewRow style={[{flex: 1.3},commonStyles.centerView]}>
            //                             <Text>{o.currency||this.props.currency}</Text>
            //                             <Text style={styles.leftOffset}>{o.stopProfit}</Text>
            //                         </ViewRow>
            //                         <ViewRow style={[{flex: 1.7},commonStyles.centerView]}>
            //                             <Text style={{minWidth:30}}>{lang('Buy')}</Text>
            //                             <Text style={styles.leftOffset}>{o.opPrice}</Text>
            //                         </ViewRow>
            //                     </ViewRow>
            //                     <ViewRow style={styles.cellViewRowRoot}>
            //                         <Text style={[{flex: 1},commonStyles.centerView]}>{lang('Stop-Loss')}</Text>
            //                         <ViewRow style={[{flex: 1.3},commonStyles.centerView]}>
            //                             <Text>{o.currency||this.props.currency}</Text>
            //                             <Text style={styles.leftOffset}>{o.stopLoss}</Text>
            //                         </ViewRow>
            //                         <ViewRow style={[{flex: 1.7},commonStyles.centerView]}>
            //                             <Text style={{minWidth:30}}>{lang('Now')}</Text>
            //                             <Text style={[{color:o.isBuy?(o.opPrice<o.current?RAISE:FALL):(o.opPrice>o.current?RAISE:FALL)},styles.leftOffset]}>{o.current}</Text>
            //                         </ViewRow>
            //                     </ViewRow>
            //                     <ViewRow
            //                         style={styles.setStopRoot}>
            //                         <TouchableHighlight style={styles.stopPL} onPress={()=>{
            //                             if(o.opPrice !== 0){
            //                                 Schedule.dispatchEvent({event:'toStopPL',eventData:Object.assign({},o)})
            //                             }
            //                         }} activeOpacity={1} underlayColor={'transparent'}>
            //                             <Text style={styles.stopPLText}>
            //                                 {lang('Set stop P/L')}
            //                             </Text>
            //                         </TouchableHighlight>
            //                         <BasicButton button={styles.cellViewRowRoot} title={'Close Position'} onPress={()=>{
            //                             this.props.close(o.id);
            //                         }}/>
            //                     </ViewRow>
            //                 </View>
            //             )
            //         }
            //         else if(this.props.schemeSort === 2){
            //             return(
            //                 <View style={styles.cellRoot}>
            //                     <View style={styles.contractWrapper}>
            //                         <Text style={styles.contract}>{o.contract}</Text>
            //                         <Text style={styles.idText}>ID{o.id}</Text>
            //                         <Text style={styles.date}>{formatDate('m-d h:i:s',{date:o.tradeTime.time})}</Text>
            //                     </View>
            //                     <View style={styles.line}/>
            //                     <ViewRow style={styles.cellViewRowRoot}>
            //                         <ViewRow style={[{flex: 1},commonStyles.centerView]}>
            //                             <Text>{o.isBuy?lang('Buy Long'):lang('Sell Short')}</Text>
            //                             <Text style={styles.leftOffset}>{o.volume}</Text>
            //                         </ViewRow>
            //                         <ViewRow style={[{flex: 3},commonStyles.centerView]}>
            //                             <Text>{o.currency||this.props.currency}</Text>
            //                             <Text style={[{color:o.income>0?RAISE:FALL},styles.leftOffset]}>{o.income}</Text>
            //                         </ViewRow>
            //                     </ViewRow>
            //                     <ViewRow style={styles.cellViewRowRoot}>
            //                         <Text
            //                             style={[{flex: 1},commonStyles.centerView]}>{lang('Stop-Profit')}</Text>
            //                         <ViewRow style={[{flex: 1.3},commonStyles.centerView]}>
            //                             <Text>{o.currency||this.props.currency}</Text>
            //                             <Text style={styles.leftOffset}>{o.stopProfit}</Text>
            //                         </ViewRow>
            //                         <ViewRow style={[{flex: 1.7},commonStyles.centerView]}>
            //                             <Text style={{minWidth:30}}>{lang('Buy')}</Text>
            //                             <Text style={styles.leftOffset}>{o.opPrice}</Text>
            //                         </ViewRow>
            //                     </ViewRow>
            //                     <ViewRow style={styles.cellViewRowRoot}>
            //                         <Text style={[{flex: 1},commonStyles.centerView]}>{lang('Stop-Loss')}</Text>
            //                         <ViewRow style={[{flex: 1.3},commonStyles.centerView]}>
            //                             <Text>{o.currency||this.props.currency}</Text>
            //                             <Text style={styles.leftOffset}>{o.stopLoss}</Text>
            //                         </ViewRow>
            //                         <ViewRow style={[{flex: 1.7},commonStyles.centerView]}>
            //                             <Text style={{minWidth:30}}>{lang('Sell')}</Text>
            //                             <Text style={styles.cpPrice}>{o.cpPrice}</Text>
            //                         </ViewRow>
            //                     </ViewRow>
            //                     <ViewRow style={styles.setStopRoot}>
            //                         <View style={styles.tradeStatusWrapper}>
            //                             <Text style={styles.tradeStatus}>{o.tradeStatus === 14?lang('Settled'):lang('Waiting')}</Text>
            //                         </View>
            //                     </ViewRow>
            //                 </View>
            //             )
            //         }else if(this.props.schemeSort === 3){
            //             return(
            //                 <View style={styles.cellRoot}>
            //                     <View style={styles.contractWrapper}>
            //                         <Text style={styles.contract}>{o.contract}</Text>
            //                         <Text style={styles.idText}>ID{o.id}</Text>
            //                         <Text style={styles.date}>{formatDate('m-d h:i:s',{date:o.tradeTime.time})}</Text>
            //                     </View>
            //                     <View style={styles.line}/>
            //                     <ViewRow style={styles.cellViewRowRoot}>
            //                         <ViewRow style={[{flex: 1},commonStyles.centerView]}>
            //                             <Text>{o.isBuy?lang('Buy Long'):lang('Sell Short')}</Text>
            //                             <Text style={styles.leftOffset}>{o.volume}</Text>
            //                         </ViewRow>
            //                     </ViewRow>
            //                     <ViewRow style={styles.cellViewRowRoot}>
            //                         <Text
            //                             style={[{flex: 1},commonStyles.centerView]}>{lang('Stop-Profit')}</Text>
            //                         <ViewRow style={[{flex: 3},commonStyles.centerView]}>
            //                             <Text>{o.currency||this.props.currency}</Text>
            //                             <Text style={styles.leftOffset}>{o.stopProfit}</Text>
            //                         </ViewRow>
            //                     </ViewRow>
            //                     <ViewRow style={styles.cellViewRowRoot}>
            //                         <Text style={[{flex: 1},commonStyles.centerView]}>{lang('Stop-Loss')}</Text>
            //                         <ViewRow style={[{flex: 3},commonStyles.centerView]}>
            //                             <Text>{o.currency||this.props.currency}</Text>
            //                             <Text style={styles.leftOffset}>{o.stopLoss}</Text>
            //                         </ViewRow>
            //                     </ViewRow>
            //                         <View style={styles.orderFailureWrapper}>
            //                             <Text style={styles.tradeStatus}>{lang('Order failure')}</Text>
            //                         </View>
            //                 </View>
            //             )
            //         }
            //     })
            // )
        }
    }
}


