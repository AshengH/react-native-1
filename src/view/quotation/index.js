import React, {Component} from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Button} from 'react-native'
import styles from './../../style/quotation/index'
import commonStyles from './../../style/variable'
import { Header } from '../../common';
import { UI_ACTIVE_COLOR, HEADER_COLOR, HEADER_FONT_COLOR, RAISE, LINE_COLOR, GRID_LINE_COLOR, FALL, GREEN_POINT_COLOR } from '../../lib/color';
import { Contracts, Data, Schedule } from '../../module';
import { lang } from '../../lang';
import NewsDetail from "../information/petrolGoldDetail";
import QuotationDetail from './quotationDetail/index'
import Order from './../trade/order/index'
import Trade from './../trade/index'
import Position from '../position/index'
import {StackNavigator} from "react-navigation";
import Rule from './../rules/index'
import {SafeBody, SCREEN_WIDTH} from "../../lib/adjust";


class QuotationHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            foreignArray: [],
            stockArray: [],
            domesticArray: [],
            selectedIndex: 1,
            selfArray:[],
        };

        if (Contracts.initial) {
            let items = [].concat(Data.foreignBrief);
            // items = items.concat(Data.stockBrief);
            // items = items.concat(Data.domesticBrief);
            this.state.items = items;

            this.state.foreignArray = Data.foreignBrief;
            this.state.stockArray = Data.stockBrief;
            this.state.domesticArray = Data.domesticBrief;
            this.state.selfArray = Data.selfBrief;

            let [o] = Contracts.foreignArray;
            this.state.contract = o.contract;
            this.state.hot = Contracts.hot;
            this.state.news = Contracts.new;
            Data.start('updateBrief');
        } else {
            Schedule.addEventListener('contractsInitial', this.updateContracts, this);
            Schedule.dispatchEvent({event:'contractsInitial',eventData:true});
        }
    }

    componentDidUpdate(){
        // this.setState({
        //     selectedIndex: this.props.navigation.state.params && this.props.navigation.state.params.sIndex || 1
        // })
    }

    componentDidMount() {
        Schedule.addEventListener('updateBrief', this.updateBrief, this);
        Schedule.addEventListener('typeSelect',(value)=>{
            console.log(value);
            this.setState({selectedIndex:value})
        },this)
        // console.log(this.props.navigation.state.params,'牛批牛批')
        // this.setState({
        //     selectedIndex: this.props.navigation.state.params && this.props.navigation.state.params.type
        // });
    }

    componentWillUnmount() {
        Schedule.removeEventListeners(this);
        Data.end('updateBrief');
    }

    renderSeparator(){
        return(
            <View style={styles.listSeparator}/>
        );
    }

    renderNewText(isNew){
        if (isNew) {
            return(
                <View style={{overflow:'hidden'}}>
                    <Text style={[styles.cellLeftHotText,{backgroundColor:GREEN_POINT_COLOR,}]}>{'NEW'}</Text>
                </View>
            );
        } else {

        }
    }

    renderHotText(isUp){
        if (isUp) {
            return(
                <View style={{overflow:'hidden'}}>
                    <Text style={[styles.cellLeftHotText,{backgroundColor:UI_ACTIVE_COLOR}]}>{'HOT'}</Text>
                </View>
            );
        } else {

        }
    }

    // renderHeader(){
    //     return(
    //         <View style={[commonStyles.fillStyle,styles.listHeaderRoot]}>
    //             <View style={[commonStyles.rowStyle,{paddingBottom:10}]}>
    //                 <View style={commonStyles.fillStyle}>
    //                     <Text style={[commonStyles.centerView,styles.listHeaderText]}>{lang('Variety name')}</Text>
    //                 </View>
    //                 <View style={commonStyles.fillStyle}>
    //                     <Text style={[commonStyles.centerView,styles.listHeaderText]}>{lang('Current Price')}</Text>
    //                 </View>
    //                 <View style={commonStyles.fillStyle}>
    //                     <Text style={[commonStyles.centerView,styles.listHeaderText]}>{lang('Quote change')}</Text>
    //                 </View>
    //             </View>
    //             <View style={{backgroundColor:GRID_LINE_COLOR,width:'100%',height:10}}/>
    //         </View>
    //     );
    // }

    renderItem(item){
        let priceBackgroundColor = item.isUp ? RAISE : FALL;
        let rateBackgroundColor = item.isOpen ? (item.isUp ? RAISE:FALL) : null;
        let rateTextColor = rateBackgroundColor === null ? '#000' : HEADER_FONT_COLOR;

        return(
            <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('Trade', {
                    code: item.code,navigation:this.props.navigation
                })}
                style={[commonStyles.rowStyle,styles.cellRoot]}>
                <View style={styles.cellLeftWrapper}>
                    <View style={[commonStyles.centerView,commonStyles.rowStyle]}>
                        <Text style={styles.cellLeftTitleText}>{item.name}</Text>
                        {this.renderHotText(Contracts.isHot(item.code))}
                        {this.renderNewText(Contracts.isNew(item.code))}
                    </View>
                    <Text style={commonStyles.centerView}>{item.code}</Text>
                </View>
                <View style={styles.cellMiddleWrapper}>
                    <View style={[commonStyles.rowStyle]}>
                        <Text style={[styles.priceText,{backgroundColor:priceBackgroundColor,color:HEADER_FONT_COLOR}]}>{item.price || '- -'}</Text>
                    </View>
                </View>
                <View style={styles.cellRightWrapper}>
                    <View style={commonStyles.rowStyle}>
                        <Text style={[styles.priceText,{backgroundColor:rateBackgroundColor,color:rateTextColor}]}>{item.isOpen ? item.rate : '休市'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }


    render(){
        // let items = this.state.foreignArray && [].concat(this.state.foreignArray);
        // items = this.state.stockArray && items.concat(this.state.stockArray);
        // items = this.state.domesticArray && items.concat(this.state.domesticArray);

        let newItems = [];
        switch (this.state.selectedIndex){
            case 1:
                newItems = this.state.foreignArray && [].concat(this.state.foreignArray);
                break;
            case 2:
                newItems = this.state.stockArray && [].concat(this.state.stockArray);
                break;
            case 3:
                newItems = this.state.selfArray && [].concat(this.state.selfArray);
                break;
        }

        //
        // return(
        //     <View style={commonStyles.fillStyle}>
        //         <Header title={"Quotation"}/>
        //         <FlatList data={items} renderItem={obj=>this.renderItem(obj.item)} keyExtractor={(item, index) => index} ItemSeparatorComponent={this.renderSeparator} ListHeaderComponent={()=>this.renderHeader()}/>
        //     </View>
        // );

        return(
            <SafeBody>
                {this.renderTopBar()}
                {this.renderSecondTopBar()}
                <FlatList
                    data={newItems}
                    renderItem={obj=>this.renderCell(obj.item)}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </SafeBody>
        )
    }


    renderTopBar(){
        return(
            <View style={quoStyle.topbar}>
                <View style={quoStyle.topbarInsideBar}>
                    <View backgroundColor={this.state.selectedIndex===1?RAISE:'white'}>
                        <Button
                            onPress={()=>{this.setState({
                                selectedIndex:1,
                                items:this.state.foreignArray,
                            })}}
                            color={this.state.selectedIndex===1?'white':'black'}
                            title={'国际期货'}
                        />
                    </View>
                    <View backgroundColor={this.state.selectedIndex===2?RAISE:'white'}>
                        <Button
                            onPress={()=>{this.setState({
                                selectedIndex:2,
                                items:this.state.stockArray,
                            })}}
                            color={this.state.selectedIndex===2?'white':'black'}
                            title={'股指期货'}
                        />
                    </View>
                    <View backgroundColor={this.state.selectedIndex===3?RAISE:'white'}>
                        <Button
                            onPress={()=>{this.setState({
                                selectedIndex:3,
                                items:this.state.domesticArray,
                            })}}
                            color={this.state.selectedIndex===3?'white':'black'}
                            title={'自选期货'}
                        />
                    </View>
                </View>
            </View>
        )
    }

    renderSecondTopBar(){
        return(
            <View style={quoStyle.secondTopBar}>
                <Text style={quoStyle.topbarText}>品种名称</Text>
                <Text style={quoStyle.topbarText}>当前价格</Text>
                <Text style={quoStyle.topbarText}>涨跌幅</Text>
            </View>
        )
    }

    renderCell(item){
        let priceBackgroundColor = item.isUp ? RAISE : FALL;
        let rateBackgroundColor = item.isOpen ? (item.isUp ? RAISE:FALL) : null;
        let rateTextColor = rateBackgroundColor === null ? '#000' : 'white';
        return(
            <TouchableOpacity style={quoStyle.cellContainer} onPress={()=>this.props.navigation.navigate('Trade',{code:item.code})}>
                <View style = {quoStyle.leftPart}>
                    <View style = {quoStyle.leftPartTop}>
                        <Text>{item.name}</Text>
                        {this.renderHotText(Contracts.isHot(item.code))}
                        {this.renderNewText(Contracts.isNew(item.code))}
                        {/*<Text>HOT</Text>*/}
                    </View>
                    <View style = {quoStyle.leftPartBottom}>
                        <Text textColor='gray'>{item.code}</Text>
                    </View>
                </View>
                <View style = {quoStyle.centerPart}>
                    <Text style={{color:priceBackgroundColor}}>{item.price}</Text>
                </View>
                <View style = {[quoStyle.rightPart,{backgroundColor:rateBackgroundColor}]}>
                    <Text style={{color:rateTextColor,fontSize:16,paddingHorizontal:10}}>{item.isOpen ? item.rate : '休市'}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    updateContracts() {
        let [o] = Contracts.totalArray;
        // let items = [].concat(Data.foreignBrief);
        // items = items.concat(Data.stockBrief);
        // items = items.concat(Data.domesticBrief);

        // let newItems = [];
        // switch (this.state.selectedIndex){
        //     case 1:
        //         newItems = Data.foreignBrief;
        //         break;
        //     case 2:
        //         newItems = Data.stockBrief;
        //         break;
        //     case 3:
        //         newItems = Data.domesticBrief;
        //         break;
        // }

        this.setState({
            // items:newItems,
            // contract: o.contract,
            foreignArray: Data.foreignBrief,
            stockArray: Data.stockBrief,
            domesticArray: Data.domesticBrief,
            selfArray: Data.selfBrief,
            // hot: Contracts.hot
        });
        Data.start('updateBrief');
    }

    updateBrief() {
        // let newItems = [];
        // switch (this.state.selectedIndex){
        //     case 1:
        //         newItems = Data.foreignBrief;
        //         break;
        //     case 2:
        //         newItems = Data.stockBrief;
        //         break;
        //     case 3:
        //         newItems = Data.domesticBrief;
        //         break;
        // }
        this.setState({
            // items:newItems,
            foreignArray: Data.foreignBrief,
            stockArray: Data.stockBrief,
            domesticArray: Data.domesticBrief,
            selfArray: Data.selfBrief,
        });
        // console.log(this.state.selfArray,'在quotation打印selfArray')
    }
}

export default StackNavigator({
    Quotation: {
        screen: QuotationHome,
        navigationOptions: {
            header: null,

        }
    },
    Order:{
        screen: Order,
        navigationOptions: {
            header: null,

        }
    },
    Trade:{
        screen: Trade,
        navigationOptions: {
            header: null,
            tabBarVisible: false,

        }
    },
    Rule:{
        screen:Rule,
        navigationOptions: {
            header: null,
            // tabBarVisible: false,
        }
    },
    Position: {
            screen: Position,
            navigationOptions: {
                header: null
            }
        }
})

const quoStyle = StyleSheet.create({
    topbar:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:50,
        borderBottomWidth:0.5,
        marginTop:15,
        borderColor:'gray',
        alignItems:'center'
    },
    topbarInsideBar:{
        flexDirection:'row',
        width:SCREEN_WIDTH*0.7,
        borderRadius:10,
        borderWidth:0.5,
        borderColor:'gray',
        height:40,
        overflow:'hidden'
    },
    topbarText:{
        fontSize:16,
        marginTop:16,
    },
    secondTopBar:{
        height:46,
        flexDirection:'row',
        justifyContent:'space-around',
        borderBottomWidth:0.5,
        borderColor:'gray',
    },
    cellContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:50,
        alignItems:'center',
    },
    leftPart:{

    },
    leftPartTop:{
        flexDirection:'row',
    },
    leftPartBottom:{

    },
    centerPart:{

    },
    rightPart:{
        backgroundColor:RAISE,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
    },
});