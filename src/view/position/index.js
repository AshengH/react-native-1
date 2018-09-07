import React,{Component} from 'react';
import { View} from 'react-native'
import {
    StackNavigator
   
} from 'react-navigation';

import {
    SafeBody
} from "../../lib/adjust";

import {
    BtnHeader,
    Select,
    Header,
} from "../../common";

import Fiat from './fiat';
import cryptos from './cryptos';
import {Assets, Schedule, Cache} from "../../module";
import { HAS_CRYPTO } from '../../config';
import commonStyles from './../../style/variable'
import Stop from './../position/setStopProfit/index'


 class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            showType:'fiat',
            picker:false,
            isLogin:Cache.isLogin()
        }

        this.props.navigation.addListener('didFocus',()=>{
            if (this.state.isLogin) {
                
            }else{
                this.props.navigation.navigate('Login');
            }
        });
    }

    renderHeader(){
        if (HAS_CRYPTO) {
            return(
               <BtnHeader pop={true} btnName={[{name:'Fiat Order',type:'fiat'},{name:'Cryptos Order',type:'cryptos'}]} showType={this.state.showType} onPress={(type)=>{this.setState({showType:type})}}/>

            );
        }else{
            return(
                <Header title={'Position'} navigation={this.props.navigation} comeBackHome={true}/>
            // customBack={()=>this.props.navigation.navigate('Home')}
            );
        }
    }

    renderOrder(){
        if (this.state.isLogin) {
            return(
                // <Order screenProps={this.state.showType}/>
                <Fiat navigation={this.props.navigation}/>
            );
        }else{
            return <View/>
        }
    }

    render(){
        let data = Assets.currency;
        data.remove('USD');
        data = data.map((e)=>{
            return {name:e,value:e}
        });

        return(
            <SafeBody style={commonStyles.whiteBackground}>
                <Select data={data} show={this.state.picker} onPress={(o)=>{
                    this.setState({picker:false});
                    Schedule.dispatchEvent({event:'holdPicker',eventData:o})
                }}/>
                {this.renderHeader()}
                {this.renderOrder()}
            </SafeBody>
        )
    }
    componentDidMount(){
        Schedule.addEventListener('toOrder',this._toOrder,this);
        Schedule.addEventListener('toStopPL',this._toStopPL,this);
        Schedule.addEventListener('openHoldPicker',this._open,this);

        if (Cache.initial) {
            this.loginCallback()
        } 
        Schedule.addEventListener('loginCallback', this.loginCallback, this);
    }
    componentWillUnmount(){
        Schedule.removeEventListeners(this);
    }
    _toOrder(){
        this.props.navigation.popToTop();
        if (this.props.navigation.state && this.props.navigation.state.params && this.props.navigation.state.params.origin) {
            this.props.navigation.navigate('Trade');
        }
    }
    _toStopPL(data){
        this.props.navigation.navigate('StopPL',data);
    }
    _open(){
        this.setState({picker:true})
    }

    loginCallback() {
        this.setState({isLogin: Cache.isLogin()})
    }
}

export default StackNavigator({
    Position:{
        screen:App,
        navigationOptions: {
            header: null,
        }
    },
    StopPL:{
        screen:Stop,
        navigationOptions: {
            header: null
        }
    },
});
