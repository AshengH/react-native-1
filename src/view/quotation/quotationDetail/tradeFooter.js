import React, {Component} from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';

import {
    Button
} from 'react-native-elements'

import Icons from 'react-native-vector-icons/EvilIcons';

// import {
//     RATIO,
//     SCREEN_WIDTH
// } from "../../../lib/adjust";

import {
    LINE_COLOR,
    RAISE,
    RAISE_HIGHLIGHT,
    FALL,
    FALL_HIGHLIGHT,
    BASIC_FONT_COLOR,
    UI_ACTIVE_COLOR
} from "../../../lib/color";

import {lang} from '../../../lang';

import {
    Schedule,
    Cache, Assets, Contracts, Data
} from "../../../module";
import styles from './../../../style/trade/controller'
import commonStyles from './../../../style/variable'
import schedule from "../../../module/schedule";

class LoginOrBalanceBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            money : 0,
        };
    };

    componentDidMount(){
        if (Data.initial){
            if (this.props.contract !== ''){
                let n = Assets.game;
                this.setState({
                    money:n
                });
                n = null;
            }
        }else {
            Schedule.addEventListener('contractsInitial', this.assetsUpdate, this);
        }
        schedule.addEventListener('updateAssets',this.assetsUpdate,this);
    }

    render(){
        if (this.props.status === null){
            return(
                <View style={this.props.style}>
                    <Icons name='spinner' size={40} style={commonStyles.centerView}/>
                </View>
            )
        }
        else if (this.props.status === 1){
            return(
                <View style={this.props.style}>
                    <Text style={styles.text}>{lang('Game Balance')}</Text>
                    <Text style={styles.text}>{
                        Contracts.total[this.props.contract]?Contracts.total[this.props.contract].currency:''
                    }</Text>
                    <Text style={styles.text}>{this.state.money}</Text>
                </View>
            )
        }
        else {
            return (
                <View style={[this.props.style]}>
                    <Button title={lang('Login')} color={BASIC_FONT_COLOR} containerViewStyle={styles.barButtonWrap} buttonStyle={styles.barButton} onPress={()=>{this.props.navigation.navigate('Login')}}/>
                    <Button title={lang('Sign Up')} color={BASIC_FONT_COLOR} containerViewStyle={styles.barButtonWrap} buttonStyle={styles.barButton} onPress={()=>{this.props.navigation.navigate('SignUp')}}/>
                </View>
            )
        }
    }

    componentWillUnmount(){
        Schedule.removeEventListeners(this);
    }

    componentWillReceiveProps({contract}){
        if(this.props.contract !== contract){
            let n = Assets.game;
            this.setState({money:n});
            n = null;
        }
    }

    assetsUpdate(){
        if(Data.initial){
            if(this.props.contract !== ''){
                let n = Assets.game;
                this.setState({money:n});
                n = null;
            }
        }
    }
}


class Order extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <TouchableHighlight style={[{ backgroundColor: this.props.color},commonStyles.fillStyle]} activeOpacity={1} underlayColor={this.props.activeColor} onPress={()=>this.props.onPress()}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>
                        {lang(this.props.title)}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance:0,
            isLogin:null,
            buyPrice:0,
            buyVolume:0,
            buyWidth:1,
            sellPrice:0,
            sellVolume:0,
            sellWidth:1,
        };
    }

    loginCallback() {
        this.setState({isLogin: Cache.isLogin()});
    }

    componentWillMount() {

    }

    componentDidMount(){
        if (Cache.initial) {
            this.loginCallback();
        } else {
            Schedule.addEventListener('cacheInitial', this.loginCallback, this)
        }
        Schedule.addEventListener('loginCallback',this.loginCallback,this);
        Schedule.addEventListener('quoteUpdate',this.volumeUpdate,this);
    }


    render(){
        return(
            <View style={tradeFooterStyles.container}>
                <View style={tradeFooterStyles.topView}>
                    <LoginOrBalanceBar status={this.state.isLogin} navigation={this.props.navigation}
                                       contract={this.props.contract} style={styles.bar}/>
                </View>
                <View style={tradeFooterStyles.centerView}>
                    <View style={styles.leftVolume}>
                        <View style={[{width:this.state.buyWidth,backgroundColor:RAISE},styles.volumeLine]}/>
                        <Text style={[{color:RAISE},styles.index]}>{`${this.state.buyVolume}/${this.state.buyPrice}`}</Text>
                    </View>
                    <View style={styles.volumeWrapper}>
                        <Text style={styles.volume}>{lang('Volume')}</Text>
                    </View>
                    <View style={styles.rightVolume}>
                        <Text style={[{color:FALL},styles.index]}>{`${this.state.sellPrice}/${this.state.sellVolume}`}</Text>
                        <View style={[{width:this.state.sellWidth,backgroundColor:FALL},styles.volumeLine]}/>
                    </View>
                </View>
                <View style={tradeFooterStyles.bottomView}>
                    <Order title={'Buy Long'} onPress={()=>this.props.onPress(true)} color={RAISE} activeColor={RAISE_HIGHLIGHT}/>
                    <Order title={'Sell Short'} onPress={()=>this.props.onPress(false)} color={FALL} activeColor={FALL_HIGHLIGHT}/>
                </View>
            </View>
        )
    }


    /**
     * 控制台成交量信息更新
     * @param data
     */
    volumeUpdate(data){
        const {priceDigit} = Contracts.total[data.code];
        const total = data.wt_buy_volume.add(data.wt_sell_volume);
        this.setState({
            buyPrice:data.wt_sell_price.toFixed(priceDigit),
            buyVolume:data.wt_buy_volume,
            buyWidth:data.wt_buy_volume.div(total).mul(80),
            sellPrice:data.wt_buy_price.toFixed(priceDigit),
            sellVolume:data.wt_sell_volume,
            sellWidth:data.wt_sell_volume.div(total).mul(80),
        })
    }

    componentWillUnmount(){
        Schedule.removeEventListeners(this);
    }
}

const tradeFooterStyles = StyleSheet.create({
    container:{},
    topView:{},
    centerView:{},
    bottomView:{
        flexDirection:'row',
        height:100,
        bottom:0,
    },

});