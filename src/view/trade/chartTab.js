import React, {Component} from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';



import {lang} from '../../lang';
import {UI_ACTIVE_COLOR, NOTICE_CONTENT_FONT_COLOR,FALL,RAISE} from "../../lib/color";
import {Type} from "../../common";
import {SCREEN_WIDTH} from "../../lib/adjust";
import styles from './../../style/trade/chartTab'
class TypeSpecial extends Component{

    _self = null;

    constructor(props){
        super(props);
    }
    render(){
        let color = this.props.select===this.props.type? UI_ACTIVE_COLOR : NOTICE_CONTENT_FONT_COLOR;
        return(
            <TouchableHighlight ref={ref=>this._self=ref} style={[styles.button,{borderColor:color,overflow:'visible'}]} activeOpacity={1} underlayColor={'#E6E6E6'} onPress={()=>{
                this.props.onPress(this.props.type)
            }}>
                <View>
                    <Text style={{color:color}}>{lang(this.props.title)}</Text>
                </View>
            </TouchableHighlight>
        )
    }
    componentDidMount(){
        setTimeout(()=>{
            this._self.measure((fx,fy,width,height,px,py)=>{
                this.props.position(px-SCREEN_WIDTH,width);
            });
        },1)
    }
}

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'time'
        };
    }

    render() {

        return (
            <View style={[this.props.style,{height:145}]}>

                    <View style={{width:'100%',paddingLeft:10,backgroundColor:'#E23635'}}>
                        <Text style={{alignSelf:'flex-start',color:'#fff',fontSize:20,fontWeight:'600'}}>{this.props.price || ''}</Text>
                        <View style={{display:'flex',flexDirection:'row',marginBottom: 6}}>
                            <Text style={{alignSelf:'center',color:'#fff'}}>{this.props.rate || ''}</Text>
                            <Text style={{alignSelf:'center',color:'#fff',marginHorizontal: 10}}>{this.props.percent || ''}</Text>
                        </View>
                    </View>
                    {/*<View style={{width:'55%',marginRight:10}}>*/}
                        {/*<View style={{flexDirection:'row',flex:1,justifyContent:'space-around'}}>*/}
                            {/*<Text>今开</Text>*/}
                            {/*<Text style={{color:FALL}}>{this.props.opening || ''}</Text>*/}
                            {/*<Text>最高</Text>*/}
                            {/*<Text style={{color:RAISE}}>{this.props.highest || ''}</Text>*/}
                        {/*</View>*/}
                        {/*<View style={{flexDirection:'row',flex:1,justifyContent:'space-around'}}>*/}
                            {/*<Text>昨收</Text>*/}
                            {/*<Text style={{color:FALL}}>{this.props.yesterday || ''}</Text>*/}
                            {/*<Text>最低</Text>*/}
                            {/*<Text style={{color:RAISE}}>{this.props.lowest || ''}</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}


                <View style={{display: 'flex',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    paddingHorizontal: 10,
                    marginVertical: 10
                }}>
                    <View style={{display:'flex',flexDirection:'row',}}>
                        <Text style={{color:'#666A72'}}>今开</Text>
                        <Text style={{color:FALL}}>{this.props.opening || ''}</Text>
                    </View>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <Text style={{color:'#666A72'}}>最高</Text>
                        <Text style={{color:RAISE}}>{this.props.highest || ''}</Text>
                    </View>

                </View>
                <View style={{display: 'flex',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,marginBottom:10}}>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <Text style={{color:'#666A72'}}>昨收</Text>
                        <Text style={{color:FALL}}>{this.props.yesterday || ''}</Text>
                    </View>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <Text style={{color:'#666A72'}}>最低</Text>
                        <Text style={{color:RAISE}}>{this.props.lowest || ''}</Text>
                    </View>

                </View>

                {/*中部按钮*/}
                <View style={{flexDirection:'row',flex:1}}>
                    <View style={{width:SCREEN_WIDTH/6,justifyContent:'center',display:'flex',alignItems: 'center'}}>
                        <Type
                            title='Time-Sharing'
                            type='time'
                            select={this.state.type}
                            onPress={(type)=>{
                            this.setState({type:type});
                            this.props.onPress(type);
                            this.props.close();
                            }}
                        />
                    </View>

                    {/* <Type title='Daily Chart' type='1D' select={this.state.type} onPress={(type)=>{
                        this.setState({type:type});
                        this.props.onPress(type);
                        this.props.close();
                    }}/> */}

                    <View style={{width:SCREEN_WIDTH/6,justifyContent:'center',display:'flex',alignItems: 'center'}}>
                        <Type title='1D' type='1D' select={this.state.type} onPress={(type)=>{
                            this.setState({type:type});
                            this.props.onPress(type);
                            this.props.close();
                        }}/>
                    </View>

                    {/*<View style={{width:'16%',justifyContent:'center'}}>*/}
                        {/*<TypeSpecial*/}
                            {/*title={this.props.min}*/}
                            {/*type='minute'*/}
                            {/*select={this.state.type}*/}
                            {/*onPress={(type)=>{*/}
                            {/*this.setState({type:type});*/}
                            {/*// this.props.expand();*/}
                            {/*}}*/}
                            {/*position={(px,width)=>this.props.position(px,width)}*/}
                            {/*onSelect={(type)=>{this.props.onPress(type)}}*/}
                        {/*/>*/}
                    {/*</View>*/}

                    <View style={{width:SCREEN_WIDTH/6,justifyContent:'center',display:'flex',alignItems: 'center'}}>
                        <Type title='M1' type='1' select={this.state.type} onPress={(type)=>{
                            this.setState({type:type});
                            this.props.onPress(type);
                            this.props.close();
                        }}/>
                    </View>

                    <View style={{width:SCREEN_WIDTH/6,justifyContent:'center',display:'flex',alignItems: 'center'}}>
                        <Type title='M3' type='3' select={this.state.type} onPress={(type)=>{
                            this.setState({type:type});
                            this.props.onPress(type);
                            this.props.close();
                        }}/>
                    </View>

                    <View style={{width:SCREEN_WIDTH/6,justifyContent:'center',display:'flex',alignItems: 'center'}}>
                        <Type title='M5' type='5' select={this.state.type} onPress={(type)=>{
                            this.setState({type:type});
                            this.props.onPress(type);
                            this.props.close();
                        }}/>
                    </View>

                    <View style={{width:SCREEN_WIDTH/6,justifyContent:'center',display:'flex',alignItems: 'center'}}>
                        <Type title='M15' type='15' select={this.state.type} onPress={(type)=>{
                            this.setState({type:type});
                            this.props.onPress(type);
                            this.props.close();
                        }}/>
                    </View>
                    {/*<View style={{width:'33%',justifyContent:'center'}}>*/}
                        {/*<Type title='Handicap' type='Live' select={this.state.type} onPress={(type)=>{*/}
                            {/*this.setState({type:type});*/}
                            {/*this.props.onPress(type);*/}
                            {/*this.props.close();*/}
                        {/*}}/>*/}
                    {/*</View>*/}
                </View>
                {/*<View style={{flexDirection:'row',flex:1,justifyContent:'space-around'}}>*/}
                    {/*<Text style={{alignSelf:'center',color:this.props.tend}}>{this.props.price || ''}</Text>*/}
                    {/*<Text style={{alignSelf:'center',color:this.props.tend}}>{this.props.rate || ''}</Text>*/}
                    {/*<Text style={{alignSelf:'center',color:this.props.tend}}>{this.props.percent || ''}</Text>*/}
                {/*</View>*/}
            </View>
        )
    }
}

