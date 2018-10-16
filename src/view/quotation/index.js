import React, {Component} from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Button,Image} from 'react-native'
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
            selectedIndex: 3,
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

    renderHeader(){
        return(
            <View style={[commonStyles.fillStyle,styles.listHeaderRoot]}>
                <View style={[commonStyles.rowStyle,{paddingBottom:10}]}>
                    <View style={commonStyles.fillStyle}>
                        <Text style={[commonStyles.centerView,styles.listHeaderText]}>{lang('Variety name')}</Text>
                    </View>
                    <View style={commonStyles.fillStyle}>
                        <Text style={[commonStyles.centerView,styles.listHeaderText]}>{lang('Current Price')}</Text>
                    </View>
                    <View style={commonStyles.fillStyle}>
                        <Text style={[commonStyles.centerView,styles.listHeaderText]}>{lang('Quote change')}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:GRID_LINE_COLOR,width:'100%',height:10}}/>
            </View>
        );
    }

    renderItem(item){
        let priceBackgroundColor = item.isUp ? RAISE : FALL;
        // let rateBackgroundColor = item.isOpen ? (item.isUp ? RAISE:FALL) : null;
        // let rateTextColor = rateBackgroundColor === null ? '#000' : HEADER_FONT_COLOR;
        let rateTextColor = item.isUp ? RAISE : FALL;

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
                        <Text style={[styles.priceText,{backgroundColor:'#fff',color:rateTextColor}]}>{item.isOpen ? item.rate : '休市'}11</Text>
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
            // case 1:
            //     newItems = this.state.foreignArray && [].concat(this.state.foreignArray);
            //     break;
            case 2:
             let newItems1 = this.state.foreignArray && [].concat(this.state.foreignArray);
             let newItems2 = this.state.stockArray && [].concat(this.state.stockArray);
             newItems= newItems1.concat(newItems2)
                break;
            case 3:
                newItems = this.state.selfArray && [].concat(this.state.selfArray);
                break;
        }


        // return(
        //     <View style={commonStyles.fillStyle}>
        //         <Header title={'自选'}/>
        //         <FlatList data={newItems}
        //           renderItem={obj=>this.renderItem(obj.item)}
        //           keyExtractor={(item, index) => index}
        //           ItemSeparatorComponent={this.renderSeparator}
        //           ListHeaderComponent={()=>this.renderHeader()}/>
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
        let total = [];
      total = this.state.stockArray.concat(this.state.foreignArray)

        return(
            <View style={quoStyle.topbar}>
                {/*<View style={quoStyle.topbarInsideBar}>*/}
                    {/*<View backgroundColor={this.state.selectedIndex===1?RAISE:'white'}>*/}
                        {/*<Button*/}
                            {/*onPress={()=>{this.setState({*/}
                                {/*selectedIndex:1,*/}
                                {/*items:this.state.foreignArray,*/}
                            {/*})}}*/}
                            {/*color={this.state.selectedIndex===1?'white':'black'}*/}
                            {/*title={'国际期货'}*/}
                        {/*/>*/}
                    {/*</View>*/}
                    {/*<View backgroundColor={this.state.selectedIndex===2?RAISE:'white'}>*/}
                        {/*<Button*/}
                            {/*onPress={()=>{this.setState({*/}
                                {/*selectedIndex:2,*/}
                                {/*items:this.state.stockArray,*/}
                            {/*})}}*/}
                            {/*color={this.state.selectedIndex===2?'white':'black'}*/}
                            {/*title={'股指期货'}*/}
                        {/*/>*/}
                    {/*</View>*/}
                    {/*<View backgroundColor={this.state.selectedIndex===3?RAISE:'white'}>*/}
                        {/*<Button*/}
                            {/*onPress={()=>{this.setState({*/}
                                {/*selectedIndex:3,*/}
                                {/*items:this.state.domesticArray,*/}
                            {/*})}}*/}
                            {/*color={this.state.selectedIndex===3?'white':'black'}*/}
                            {/*title={'自选'}*/}
                        {/*/>*/}
                    {/*</View>*/}
                {/*</View>*/}

                <View style={quoStyle.first}>
                    <TouchableOpacity
                        onPress={()=>{ this.props.navigation.navigate('Server');}}
                    >
                        <Image source={require('../../images/xiaoxi.png')}  style={quoStyle.xiaoxi} />
                    </TouchableOpacity>

                    <View style={quoStyle.finside}>

                            <TouchableOpacity
                                onPress={()=>{
                                    this.setState({
                                        selectedIndex:3,
                                        items:this.state.domesticArray,
                                    })

                                }}
                                style={this.state.selectedIndex == 3 ? quoStyle.btn :quoStyle.unbtn}

                            >
                                <Text style={this.state.selectedIndex == 3 ? quoStyle.choose : quoStyle.unchoose}>自选</Text>
                            </TouchableOpacity>



                            <TouchableOpacity
                                onPress={()=>{

                                    this.setState({
                                        selectedIndex:2,
                                        items:total,
                                    })}}
                                style={this.state.selectedIndex == 2 ? quoStyle.btn : quoStyle.unbtn}

                            >
                                <Text style={this.state.selectedIndex == 2 ? quoStyle.choose : quoStyle.unchoose}>行情</Text>
                            </TouchableOpacity>



                    </View>




                </View>
            </View>
        )
    }
    renderText(){
        if(this.state.selectedIndex === 2){
            return(
                <Text style={quoStyle.topbarText}>名称</Text>
            )
        }
        if(this.state.selectedIndex === 3){
            return(
                <View>
                    <TouchableOpacity
                        onPress={()=>{}}
                        style={quoStyle.edit}
                    >
                        <Image source={require('../../images/collect.png')} style={quoStyle.collect} />
                        <Text style={{color:'#fff',fontSize:14}}>编辑</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    renderSecondTopBar(){
        return(
            <View style={quoStyle.secondTopBar}>
                {this.renderText()}


                <Text style={quoStyle.topbarText}>价格</Text>
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
                        {/*{this.renderHotText(Contracts.isHot(item.code))}*/}
                        {/*{this.renderNewText(Contracts.isNew(item.code))}*/}
                        {/*<Text>HOT</Text>*/}
                    </View>
                    <View style = {quoStyle.leftPartBottom}>
                        <Text style={quoStyle.code}>{item.code}</Text>
                    </View>
                </View>
                <View style = {quoStyle.centerPart}>
                    <Text style={{color:'#000',fontWeight:'600'}}>{item.price}</Text>
                </View>
                <View style = {[quoStyle.rightPart,{backgroundColor:'#fff'}]}>
                    <Text style={{color:rateBackgroundColor,fontSize:16,paddingHorizontal:10}}>{item.isOpen ? item.rate : '休市'}</Text>
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
        paddingTop: 20,
    },

    first:{
        display: 'flex',
        backgroundColor:'#DF3031',
        flexDirection:'row',
        paddingHorizontal: 20,
        alignItems:'center',
        height:43,


    },
    finside:{
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        marginLeft:70,
        borderWidth:1,
        borderColor: '#fff',
        borderRadius: 4





    },
    xiaoxi:{
      height:22,
      width:22,

    },
    btn:{
        height:27,
        backgroundColor:'#F2CDC9',
        width:80,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 3



    },
    unbtn:{
        height:27,
        backgroundColor:'#DF3031',
        width:79,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 4

    },

    choose:{
        color:'#DF3031',
        fontSize:16,
    },
    unchoose:{
        color:'#fff',
        fontSize:16,
    },
    code:{
        color:'#ADADAD'
    },


    collect:{
        height:10,
        width:10,
        marginRight: 6
    },
    edit:{
        height:26,
        width:85,
        backgroundColor:'#FC636D',
        position: 'absolute',
        left:-50,
        top:10,
        borderTopRightRadius:13,
        borderBottomRightRadius:13,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'


    },











    //
    // topbarInsideBar:{
    //     flexDirection:'row',
    //     width:SCREEN_WIDTH*0.7,
    //     borderRadius:10,
    //     borderWidth:0.5,
    //     borderColor:'gray',
    //     height:40,
    //     overflow:'hidden'
    // },
    topbarText:{
        fontSize:14,
        marginTop:16,
        color:'#737373'
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
//     leftPart:{
//
//     },
    leftPartTop:{
        flexDirection:'row',
    },
//     leftPartBottom:{
//
//     },
//     centerPart:{
//
//     },
    rightPart:{
        // backgroundColor:RAISE,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        // borderRadius:5,
    },
});