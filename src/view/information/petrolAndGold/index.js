import React, {Component} from 'react';


import {
    StyleSheet,
    Text,
    FlatList,
    Alert,
    View,
    Image,
    ActivityIndicator,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';


import {
    SafeBody
} from "../../../lib/adjust";
import req from "../../../lib/req"
import {SCREEN_WIDTH} from "../../../lib/adjust";
import commonStyles from "./../../../style/variable";
// class home extends Component

export default class News extends Component {
    constructor(props) {
        super(props);
        this.config = {
            pageNo: 1,
            totalPage:1,
        };
        this.state = {
            list: [],
            onLoading: false,
            refreshing: false,
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            error: false,
        };
        // this._onEndReached.bind(this);
    }

    render() {
        if (this.state.onLoading === true) {
            return this.renderLoadingView();
        }
        return this.renderData();
    }


    _renderItemView({item}) {
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('NewsDetail', {
                itemId: item.id
            })}>
                <View style={petrolAndGoldStyle.contentView}>
                    <View style={petrolAndGoldStyle.leftView}>
                        <Text style={petrolAndGoldStyle.title}>
                            {item.title}
                        </Text>
                        <View style={[commonStyles.rowStyle,{justifyContent:'space-between',marginTop:10}]}>
                            <Text style={petrolAndGoldStyle.time}>
                                {item.date}
                            </Text>
                            <Text>...</Text>
                        </View>
                    </View>
                    <View style={petrolAndGoldStyle.rightView}>
                        <Image
                            style={petrolAndGoldStyle.rightImage}
                            source={{uri: item.thumb}}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    // gotoDetail() {
    //     this.props.navigation.navigate('NewsDetail')
    // }

    _onRefresh () {
        this.config.pageNo=1;
        this.fetchData(1)
    }

    renderData() {
        return (
            <FlatList 
                data={this.state.list}
                renderItem={this._renderItemView.bind(this)}
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                onLoading={this.state.onLoading}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={0.05}
                ListFooterComponent={this._renderFooter.bind(this)}
                keyExtractor = {(item,index)=>index}
            />
        )
    }

     async fetchData(pageNo) {

        try {
            let result = await req({
                url: '/news/newsList.htm',
                data: {
                    type: 1,
                    page: pageNo,
                    size: 15,
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

            // console.warn(result)
        } catch (err) {
            Alert.alert('Error', err['errorMsg'] || err)
        }
    }

    componentDidMount() {
        this.fetchData(1);
    }

    //加载等待页
    renderLoadingView() {
        return (
            <View style={petrolAndGoldStyle.container}>
                <ActivityIndicator
                    animating={true}
                    color='red'
                    size="large"
                />
            </View>
        );
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
                <View style={petrolAndGoldStyle.footer}>
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
}


const petrolAndGoldStyle = StyleSheet.create({
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
    contentView: {
        // height: SCREEN_WIDTH * 0.33,
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 0.5,
        borderColor: 'gray'
    },
    leftView: {
        width: SCREEN_WIDTH * 0.6,
        marginRight:10
    },
    rightView: {
        width: SCREEN_WIDTH * 0.3
    },
    rightImage: {
        height: SCREEN_WIDTH * 0.21,
        width: SCREEN_WIDTH * 0.3,
    },
    redpot: {
        backgroundColor: 'red',
        width: 5,
        height: 5,
        borderRadius: 2.5,
    },
    redline: {
        backgroundColor: 'red',
        width: 20,
        height: 1.5,
    },
    titleText: {
        backgroundColor: '#ffe6e5',
        color: 'red'
    },
    contentText: {
        fontSize: 15,
    }
});

