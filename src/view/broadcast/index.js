import React,{Component} from 'react'
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Button} from 'react-native'
import styles from './../../style/quotation/index'
import commonStyles from './../../style/variable'
import { Header } from '../../common';
import { UI_ACTIVE_COLOR, GRAY_SVG_COLOR, HEADER_FONT_COLOR, RAISE, LINE_COLOR, GRID_LINE_COLOR, FALL, GREEN_POINT_COLOR } from '../../lib/color';
import { Contracts, Data, Schedule } from '../../module';
import { lang } from '../../lang';
import NewsDetail from "../information/petrolGoldDetail";
import {StackNavigator} from "react-navigation";
import {SafeBody, SCREEN_WIDTH} from "../../lib/adjust";
import Live from './live/index'
import News from './news/index'
import Finance from './finance/index'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedIndex:1,
            showLive:false,
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         showLive:this.props.navigation.state.params && this.props.navigation.state.params.showLive
    //     })
    // }

    componentWillUnmount() {

    }

    render(){
        return(
            <View>
                <Header title={'直播/资讯'}/>
                {this.renderSeprater()}
                {this.renderTopBar()}
                {this.renderSeprater()}
                {this.renderContentView()}
            </View>

        )
    }

    renderContentView(){

        if(this.state.selectedIndex == 2){
            return (
                <News/>
            )
        }
        if(this.state.selectedIndex === 1){
            return (
                <Finance/>
            )
        }
        if(this.state.selectedIndex === 3){
            return (
                <Live/>
            )
        }



    }

    renderSeprater(){
        return(
            <View style={
                {backgroundColor:LINE_COLOR,
                width:'100%',
                height:0.5}
            }/>
        )
    }

    renderTopBar(){
        return(
                <View style={broadcastStyle.headerBar}>
                        <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{this.setState({
                                    selectedIndex:1,
                                    showLive:false
                                })}}>
                            <Text style={{fontSize:20,color: this.state.selectedIndex===1?UI_ACTIVE_COLOR:GRAY_SVG_COLOR}}>财经</Text>
                            </TouchableOpacity>
                            <View style={broadcastStyle.underline} display={this.state.selectedIndex===1?'flex':'none'}/>
                        </View>
                        <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity
                                onPress={()=>{this.setState({
                                    selectedIndex:2,
                                    showLive:false
                                })}}>
                            <Text style={{fontSize:20,color: this.state.selectedIndex===2?UI_ACTIVE_COLOR:GRAY_SVG_COLOR}}>快讯</Text>
                            </TouchableOpacity>
                            <View style={broadcastStyle.underline} display={this.state.selectedIndex===2?'flex':'none'}/>
                        </View>
                        <View style={{flex:1}}>
                            <TouchableOpacity
                                onPress={()=>{this.setState({
                                    selectedIndex:3,
                                    showLive:false
                                })}}>
                            <Text style={{fontSize:20,color: this.state.selectedIndex===3?UI_ACTIVE_COLOR:GRAY_SVG_COLOR}}>直播</Text>
                            </TouchableOpacity>
                            <View style={broadcastStyle.underline} display={this.state.selectedIndex===3?'flex':'none'}/>
                        </View>
                </View>
        )
    }
}

const broadcastStyle = StyleSheet.create({
    headerBar:{
        flexDirection:'row',
        height:44,
        alignItems:'center',
        justifyContent:'center'
    },
    underline:{
        width:'80%',
        backgroundColor:UI_ACTIVE_COLOR,
        height:1,
    },

});
