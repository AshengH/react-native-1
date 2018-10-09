import React, {Component} from 'react'

import {Text, View,  ScrollView, StyleSheet, RefreshControl, Alert,ListView} from 'react-native'

import {
    StackNavigator
} from 'react-navigation'

import {RATIO, SafeBody} from "../../../lib/adjust";

import {BtnHeader} from "../../../common";
import {lang} from "../../../lang";
import req from '../../../lib/req'
import {formatDate} from "../../../lib/tool";
import {BACKGROUND_COLOR} from './../../../lib/color'
import Header from './../../../common/header'
import {HAS_CRYPTO} from './../../../config'

/* 币币模块 */
class Crypto extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            onLoading:false,
        }
    }

    render(){
        return(
            <ScrollView
                style={{backgroundColor:BACKGROUND_COLOR}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.onLoading}
                        title={lang('Loading...')}
                        titleColor={'#000000'}
                        onRefresh={()=>this.updateCode()}
                    />
                }>
                {
                    this.state.list.map((item)=>{
                        return(
                            <View style={{backgroundColor: "#FFFFFF",paddingVertical:10,paddingHorizontal:5, marginBottom:10}}>
                                <View style={{flexDirection:'row', marginBottom:2}}>
                                    <Text style={{flex: 1,textAlign:'center'}}>{item['explain']}</Text>
                                    <View style={{flex: 1}} />
                                    <Text style={{flex: 1,textAlign:'center'}}>{item.currency}</Text>
                                    <Text style={{flex: 1,textAlign:'center'}}>{item.money}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{flex: 1, color: "#C7C7CC"}}>{item.remark}</Text>
                                    <Text style={{flex: 1, color: "#C7C7CC",textAlign:'center'}}>{formatDate('y-m-d        h:i:s ',{date:item['disposeTime']['time']})}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        )
    }

    componentDidMount() {
        (
            async()=>{
                try {
                    let result = await req({
                        url: '/pay/rechargeHistory.htm',
                        data: {
                            currency: 'ETH'
                        }
                    });
                    this.setState({list:result['inouts']});
                    console.warn(result)
                } catch (err) {
                    Alert.alert('Error',err['errorMsg'])
                }
            }
        )()

    }

    componentWillReceiveProps(nextProps){
        this.props.navigation.goBack();
    }

    async updateCode(){
        try {
            this.setState({onLoading:true});
            let result = await req({
                url: '/pay/rechargeHistory.htm',
                data: {
                    currency: 'ETH'
                }
            });
            this.setState({onLoading:false});
            this.setState({list:result['inouts']});
        } catch (err) {
            this.setState({onLoading:false});
            Alert.alert('Error',err['errorMsg'])
        }
    }
}

/* 法币模块 */
class Fiat extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            onLoading:false,
        }
    }
    render(){
        return(
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.onLoading}
                        title={lang('Loading...')}
                        titleColor={'#000000'}
                        onRefresh={()=>this.updateCode()}
                    />
                }>
                {
                    this.state.list.map((item)=>{
                        return(
                            <View style={{backgroundColor: "#FFFFFF",paddingVertical:10,paddingHorizontal:5, marginBottom:10}}>
                                <View style={{flexDirection:'row', marginBottom:2}}>
                                    <Text style={{flex: 1,textAlign:'center'}}>{item['explain']}</Text>
                                    <View style={{flex: 1}} />
                                    <Text style={{flex: 1,textAlign:'center'}}>{item.currency}</Text>
                                    <Text style={{flex: 1,textAlign:'center'}}>{item.money}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{flex: 1, color: "#C7C7CC"}}>{item.remark}</Text>
                                    <Text style={{flex: 1, color: "#C7C7CC",textAlign:'center'}}>{formatDate('y-m-d        h:i:s ',{date:item['disposeTime']['time']})}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        )
    }
    componentDidMount() {
        (
            async()=>{
                try {
                    let result = await req({
                        url: '/pay/rechargeHistory.htm',
                        data: {
                            currency: 'USD'
                        }
                    });
                    this.setState({list:result['inouts']});
                } catch (err) {
                    Alert.alert('Error',err['errorMsg'])
                }
            }
        )()

    }

    componentWillReceiveProps(){
            this.props.navigation.navigate('cryptos');
    }

    async updateCode(){
        try {
            this.setState({onLoading:true});
            let result = await req({
                url: '/pay/rechargeHistory.htm',
                data: {
                    currency: 'USD'
                }
            });
            this.setState({onLoading:false});
            this.setState({list:result['inouts']});
        } catch (err) {
            this.setState({onLoading:false});
            Alert.alert('Error',err['errorMsg'])
        }
    }
}

/* 切换路由导航 */
const Record =  StackNavigator({
    fiat:{
        screen: Fiat,
        navigationOptions: {
            header: null
        }
    },
    cryptos:{
        screen: Crypto,
        navigationOptions: {
            header: null
        }
    }
});

let listData = require('./depositRecords.json').inouts;

let kWidth = require('Dimensions').get('window').width;

export default class App extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            currency: 'ETH',
            showType:'fiat',
            dataSource: ds,
        }
    }

    renderHeader(){
        if (HAS_CRYPTO) {
            return(
                <BtnHeader btnName={[{name:'Fiat Order',type:'fiat'},{name:'Cryptos Order' ,type:'cryptos'}]}  showType={this.state.showType} onPress={(type)=>{
                    this.setState({showType:type});
                }}  navigation={this.props.navigation}/>
            );
        }else{
            return(
                <Header title={'Records'}/>
            );
        }
    }

    render() {
        return (
            <SafeBody>
                {this.renderHeader()}
                {/*<Record screenProps={this.state.showType} />*/}
                <ListView
                    renderRow={this.renderRow}
                    dataSource={this.state.dataSource}
                />
            </SafeBody>
        )
    }

    renderRow(rowData,sectionID,rowID,highlightRow){
        return(
            <View style={styles.cellStyle}>
                <View style={styles.topHalf}>
                    <Text style={styles.titleText}>{rowData.explain}</Text>
                    <Text style={styles.amountText}>{rowData.money+'.00'}</Text>
                </View>
                <View style={styles.bottomHalf}>
                    <Text style={styles.statusText}>{rowData.status === 1 ? '处理成功' : '未处理'}</Text>
                    <Text style={styles.dateText}>{rowData.disposeTime.time}</Text>
                </View>
                <View style={styles.line}>
                </View>
            </View>
        );
    }

    componentDidMount(){
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(listData)
        })
    }
}
const styles = StyleSheet.create({
        cellStyle:{
            height:65,
            width:kWidth,
            backgroundColor:'white',
        },
        line:{
            height:1,
            backgroundColor:'gray',
            width:kWidth,
        },
        topHalf:{
            height:35,
            width:kWidth,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
        },
        bottomHalf:{
            height:35,
            width:kWidth,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
        },
        titleText:{
            marginLeft:10,
            width:kWidth*0.4,
            flex:1,
            fontSize:18,
        },
        statusText:{
            marginLeft:10,
            color:'gray',
            width:kWidth*0.4,
            flex:1,
        },
        amountText:{
            textAlign:'right',
            marginRight:10,
            width:kWidth*0.6,
            flex:1,
            fontSize:18,
        },
        dateText:{
            textAlign:'right',
            marginRight:10,
            color:'gray',
            width:kWidth*0.6,
            flex:1,
        }
});