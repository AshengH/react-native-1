import React,{Component} from 'react';

import {
    StyleSheet,
    Text,
    FlatList,
    Alert,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native';


import {
    SafeBody, SCREEN_WIDTH
} from "../../../lib/adjust";
import Config from '../../../config'
import req from "../../../lib/req"
import HTML from 'react-native-render-html';
import commonStyles from './../../../style/variable'
import { FALL, RAISE, UI_ACTIVE_COLOR, HEADER_FONT_COLOR, LINE_COLOR, DATE_FONT_COLOR } from '../../../lib/color';
import {completeNum} from "../../../lib/tool";


export default class App extends Component {
    today = null;
    month = null;
    length = null;

    constructor(props){
        super(props);
        this.state = {
            list:[],
            refreshing: false,
            // selectedIndex:7,
            show: this.diff(0).show
        }
    }

    componentDidMount(){
        this.today = this.diff(0).val;
        this.month = this.diff(0).show;
        this.getNewsInfo(this.today);
        this.getWeekTime()
    }

    componentWillUnmount() {

    }

    async getNewsInfo(time) {
        let result = await req({
            url: '/news/calendar.htm?date=' + time,
            type: 'GET',
            animate: time
        });
        this.setState({
            list: result.news.newsData
        })
    }

    render(){
        return(
            <View>
                <FlatList style={financeStyle.listView}
                          data={this.state.list}
                          renderItem={(item)=>this._renderRow(item)}
                          onLoading={this.state.onLoading}
                          // onEndReached={this._onEndReached.bind(this)}
                          onEndReachedThreshold={0.05}
                          ListHeaderComponent={this._renderTableHeader.bind(this)}>
                </FlatList>
            </View>
        )
    }


    _renderTableHeader(){
        return(
            <View style={financeStyle.weekBar}>
                {this.getWeekTime().map((item, key)=>{
                    return(
                        <TouchableOpacity onPress={
                            ()=>{this.getNewsInfo(item.val);
                            this.setState({
                                show : item.show
                            })
                        }}>
                            <View style={financeStyle.weekBarItemView}>
                                <Text style={{color:this.state.show === item.show ? 'red':'black',
                                textAlign:'center',fontSize:16
                                }}>{item.show}</Text>
                                <Text style={{color:this.state.show === item.show ? 'red':'black',flexWrap:true,fontSize:16,textAlign:'center'}}>{item.week}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
    _renderRow(item){
        let imgUrl = `https://res.6006.com/jin10/flag/${item && item.item && item.item.country.substr(0,2)}.png`;
        return(
            <View style={financeStyle.cellContainer}>
                <View style={financeStyle.leftView}>
                    <Image
                        style={financeStyle.imageView}
                        // this.state.date && this.state.date.month
                        source={{uri: imgUrl}}
                    />
                    <Text style={{textAlign:'center',width:40}}>{item.item.datename}</Text>
                </View>
                <View style={financeStyle.rightView}>
                    <Text style={[financeStyle.conditionText,
                        {borderColor:item.item.status_name === '利空' ? FALL : RAISE,color:item.item.status_name === '利空' ? FALL : RAISE}
                    ]}>{
                        item.item.status_name === '利空' ? '利空 金银 原油' : '利多 金银 原油'
                    }</Text>
                    <Text style={financeStyle.contentText}>{item && item.item.title}</Text>
                    <View style={financeStyle.rightBottomView}>
                        <Text style={financeStyle.beforeValue}>{item && `前值：${item.item.previous===null ? '--' : item.item.previous}`}</Text>
                        <Text style={financeStyle.preValue}>{item && `预计：${item.item.consensus===null ? '--' : item.item.consensus}`}</Text>
                        <Text style={{color:RAISE}}>{item && `实际：${item.item.actual===null ? '--' : item.item.actual}`}</Text>
                    </View>
                </View>
            </View>
        )
    }

    //todo 获取当天日期
    diff(v) {
        let now = new Date();
        let date = new Date(now.getTime() + v * 24 * 3600 * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        month = completeNum(month);
        let day = date.getDate();
        day = completeNum(day);
        //todo 计算当前月的时常

        let obj = {};
        obj.show = day;
        obj.val = year.toString() + month.toString() + day.toString();
        let week = ["日", "一", "二", "三", "四", "五", "六"];
        obj.week = '星期' + week[date.getDay()];
        obj.today = v === 0;
        obj.monthLength = new Date(year, month, 0).getDate();
        obj.month = month;
        return obj;
    }

    //todo 获取一周内数据
    getWeekTime(){
        let ary = [], num = -7;
        for(let i =0 ;i < 7; i++){
            num ++;
            ary.push(this.diff(num))
        }
        return ary
    }

}

const financeStyle = StyleSheet.create({
    weekBar:{
        height:70,
        flexDirection:'row',
        justifyContent:'space-around',
        borderBottomWidth:6,
        borderColor:LINE_COLOR
    },
    weekBarItemView:{
        marginTop:10,
        width:(SCREEN_WIDTH-20)/7,
        alignContent:'center',
    },
    imageView:{
        height:40,
        width:40
    },
    listView:{},
    cellContainer:{
        flexDirection:'row',
        height:90,
        marginLeft:15,
        marginRight:10,
        borderBottomWidth:0.5,
        borderColor:LINE_COLOR
    },
    leftView:{
        marginTop:12,
        width:55,
    },
    rightView:{
        marginTop:12,
        flex:1,
    },
    conditionText:{
        width:110,
        textAlign:'center',
        borderWidth:1,
    },
    contentText:{
        marginTop:5,
        color:DATE_FONT_COLOR,
    },
    rightBottomView:{
        marginTop:5,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    beforeValue:{},
    preValue:{},
    actualValue:{}
});