import React,{Component} from 'react';


import {
    StyleSheet,
    Text,
    FlatList,
    Alert,
    View,
    ActivityIndicator,
    Image
} from 'react-native';


import {
    SafeBody
} from "../../../lib/adjust";
import req from "../../../lib/req"
import HTML from 'react-native-render-html';
import commonStyles from './../../../style/variable'
import { FALL, RAISE, UI_ACTIVE_COLOR, HEADER_FONT_COLOR } from '../../../lib/color';

const oneStar = require('./../../../images/1.png');
const twoStar = require('./../../../images/2.png');
const threeStar = require('./../../../images/3.png');
const fourStar = require('./../../../images/4.png');
const fiveStar = require('./../../../images/5.png');

export default class App extends Component {
    constructor(props){
        super(props);
        this.config = {
            pageNo: 1,
            totalPage:1,
        };
        this.state = {
            list:[],
            onLoading:false,
            refreshing: false,
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2：显示加载中
        }
    }
    render(){
        if (this.state.onLoading === true) {
            return this.renderLoadingView();
        }
        return (
                <View style={liveInformationStyle.bgView}>
                    <FlatList style={liveInformationStyle.listView}
                        data={this.state.list}
                        renderItem={({item}) => this.renderRow(item)}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        onLoading={this.state.onLoading}
                        onEndReached={this._onEndReached.bind(this)}
                        onEndReachedThreshold={0.05}
                        ListFooterComponent={this._renderFooter.bind(this)}
                    >
                    </FlatList>
                    <View style={liveInformationStyle.dateRoot}>
                        <Text style={liveInformationStyle.dateText}>{this.state.date && this.state.date.day}</Text>
                        <Text style={[liveInformationStyle.dateText,{fontSize:8}]}>{this.state.date && this.state.date.month + '月'}</Text>
                    </View>
                </View>
        )
    }

    renderRow(item){
        let spliceResult = item.split('#');
        let obj = null;
        if (spliceResult.length === 12) {
            obj = {
                origin: item,
                date: spliceResult[2],
                content: spliceResult[3],
                id: spliceResult[spliceResult.length - 1]
            }
        } else if (spliceResult.length === 14) {
            obj = {
                origin: item,
                date: spliceResult[8],
                content: spliceResult[2],
                id: spliceResult[spliceResult.length - 2],
                qz: '前值：' + spliceResult[3],
                yq: '预期：' + spliceResult[4],
                sj: '实际：' + spliceResult[5],
                tag: spliceResult[7],
                star: spliceResult[6],
                country: 'https://res.6006.com/jin10/flag/' + spliceResult[9].substr(0, 2) + '.png'
            }
        }

        if (spliceResult.length === 12) {
            return(
                <View>
                    <View style={liveInformationStyle.titleView}>
                        <View style={liveInformationStyle.redpot}/>
                        <View style={liveInformationStyle.redline}/>
                        <Text style={liveInformationStyle.titleText}>
                            {item.substring(4,23)}
                        </Text>
                    </View>
                    <View style={liveInformationStyle.contentView}>
                        {/* <Text style={liveInformationStyle.contentText}>
                            {item.substring(24,item.toString().length-29)}
                        </Text> */}
                        <HTML html={item.substring(24,item.toString().length-29)}/>
                    </View>
                </View>
            )
        }else{

            let liduoStyle = obj.tag === '利多' ? liveInformationStyle.liduo : liveInformationStyle.likong

            return(
                <View>
                    <View style={liveInformationStyle.titleView}>
                        <View style={liveInformationStyle.redpot}/>
                        <View style={liveInformationStyle.redline}/>
                        <Text style={liveInformationStyle.titleText}>
                            {obj.date}
                        </Text>
                    </View>
                    <View style={[liveInformationStyle.contentView,{paddingVertical:10}]}>
                        <View>
                            <Text>{obj.content}</Text>
                        </View>
                        <View style={commonStyles.rowStyle}>
                            <View style={[commonStyles.fillStyle,{paddingVertical:5}]}>
                                <View style={[commonStyles.rowStyle,{justifyContent:'space-between',marginRight:10,marginBottom:5}]}>
                                    <Text style={{fontSize:14}}>{obj.qz}</Text>
                                    <Text style={{fontSize:14}}>{obj.yq}</Text>
                                    <Text style={{fontSize:14}}>{obj.sj}</Text>
                                </View>
                                <View style={commonStyles.rowStyle}>
                                    <Image source={this.getStarImageFrom(obj.star)}/>
                                    <View style={[commonStyles.fillStyle,{alignItems:'center'}]}>
                                        <Text style={liduoStyle}>{obj.tag}</Text>
                                    </View>
                                </View>
                            </View>
                            <Image style={{width:30,height:30}} source={{uri:obj.country}}/>
                        </View>
                    </View>
                </View>
            );
        }
    }

    _onRefresh () {
        this.config.pageNo=1;
        this.fetchData(1)
    }

    renderLoadingView() {
        return (
            <View style={liveInformationStyle.container}>
                <ActivityIndicator
                    animating={true}
                    color='red'
                    size="large"
                />
            </View>
        );
    }

    async fetchData(pageNo) {

        try {
            let result = await req({
                url: '/news/expressList.htm',
                data: {
                    page: pageNo,
                    size: 25,
                }
            });
            if(this.state.list.length>1 && this.config.pageNo!==1){
                let newList = this.state.list.concat(result.newsList[0].list);
                this.setState({
                    list:newList,
                    onLoading:false,
                    showFoot:0,
                });
                this.config.pageNo+=1;
            }else {
                let maxPage = Math.ceil(result.newsList[0].count / 15);
                this.config.totalPage = maxPage;
                this.config.pageNo = 2;

                this.setState({
                    list: result.newsList[0].list,
                    onLoading: false,
                });
            }

            let spliceResult = result.newsList[0].list[0].split('#')
            let date = null
            if (spliceResult.length === 12) {
                date = spliceResult[2];
            }else{
                date = spliceResult[8];
            }
                
            if (date) {
                let objDate = date;
                let tempDate = objDate.split(' ')[0];
                let dateArr = tempDate.split('-');
                let month = dateArr[1];
                let day = dateArr[2];

                this.setState({
                    date:{
                        month:month,
                        day:day
                    }
                });
            }

        } catch (err) {
            Alert.alert('Error', err['errorMsg'] || err)
        }
    }

    componentDidMount(){
        this.fetchData(1);
    }

    _onEndReached() {
        //如果是正在加载中或没有更多数据了，则返回
        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if((this.config.pageNo!==1) && (this.config.pageNo>=this.config.totalPage)){
            return;
        }
        else {
            if (this.config.pageNo!==1){
                this.fetchData( this.config.pageNo );
            }
            this.setState({
                showFoot:2,
                // refreshing: false
            });
        }
    }


    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <View style={{height:30,alignItems:'center',justifyContent:'flex-start',}}>
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if(this.state.showFoot === 2) {
            return (
                <View style={liveInformationStyle.footer}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text/>
                </View>
            );
        }
    }

    getStarImageFrom(level) {
        if (level === 1) {
            return oneStar;
        } else if (level === 2) {
            return twoStar;
        } else if (level === 3) {
            return threeStar;
        } else if (level === 4) {
            return fourStar;
        } else if (level === 5) {
            return fiveStar;
        }
    }

}

const  liveInformationStyle = StyleSheet.create({
    bgView:{
        backgroundColor:'white'
    },
    listView:{
        marginLeft:10,
        backgroundColor:'white',
        borderLeftWidth:1.5,
        borderColor:'red',
        position:'relative'
        // marginBottom:44
        // flex:1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    titleView:{
        flexDirection:'row',
        alignItems:'center',
    },
    contentView:{
        marginLeft:30,
        marginRight:15,
        paddingVertical:10
    },
    redpot:{
        backgroundColor:'red',
        width:5,
        height:5,
        borderRadius:2.5,
    },
    redline:{
        backgroundColor:'red',
        width:30,
        height:1.5,
    },
    titleText:{
        backgroundColor:'#ffe6e5',
        color:'red',
        padding:5,
        borderRadius:4,
        overflow:'hidden'
    },
    contentText:{
        fontSize:15,
    },
    liduo:{
        borderColor:RAISE,
        color:RAISE,
        borderWidth:1,
        flex:1,
        textAlign:'center',
        fontSize:12,
        maxWidth:50
    },
    likong:{
        borderColor:FALL,
        color:FALL,
        borderWidth:1,
        flex:1,
        textAlign:'center',
        fontSize:12,
        maxWidth:50
    },
    dateRoot:{
        borderColor:UI_ACTIVE_COLOR,
        width:40,
        height:40,
        position:'absolute',
        left:5,
        top:10,
        // zIndex:99,
        borderWidth:1,
        backgroundColor:HEADER_FONT_COLOR,
        justifyContent:'center'
    },
    dateText:{
        color:UI_ACTIVE_COLOR,
        alignSelf:'center'
    }
});