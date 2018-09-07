import React, {Component} from "react";

import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import Swiper from 'react-native-swiper';
import {withNavigation} from 'react-navigation'

import {
    BASIC_FONT_COLOR,
    RAISE,
    FALL,
    SCHEME_THREE_BACKGROUND_COLOR,
} from "../../lib/color";

import TapTitle from './tapTitle'

import {
    Schedule,
    Contracts,
    Data
} from "../../module";

import {lang} from "../../lang";
import req from "../../lib/req";
import {HAS_CRYPTO} from "../../config";
import styles from './../../style/home/quotePart'
import { RATIO } from "../../lib/adjust";
import commonStyles from './../../style/variable'

class Divide extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.index !== undefined && [1, 2, 4, 5].includes(this.props.index)) {
            return (
                <View style={styles.divideLine}>
                </View>
            )
        } else {
            return (
                <View>

                </View>
            )
        }
    }
}

class List extends Component {
    constructor(props) {
        super(props);
    }

    renderHotTag(value){
        if (value) {
            return(
                <Text style={[styles.tagText,{backgroundColor:RAISE}]}>{'HOT'}</Text>
            );
        }else{
            return null
        }
    }

    renderNewTag(value){
        if (value) {
            return(
                <Text style={[styles.tagText,{backgroundColor:FALL}]}>{'NEW'}</Text>
            );
        }else{
            return null
        }
    }

    render() {
        const list = this._slice() || this.props.team;
        if (this.props.team.length === 0) {
            return null;
        }
        return (
            <Swiper
                // renderPagination={(index,total,context)=>{console.log(index,total,context)}}
                dot={<View style={styles.dot}/>}
                activeDot={<View style={styles.activeDot}/>}
                paginationStyle={styles.pagination}
                loop={false}>
                {
                    list.map((t) => {
                        // console.log(t,'t是个什么的东西');
                        return (
                            <View style={styles.cellRoot}>
                                {
                                    t.map(({code, name, price, rate, isUp}, index) => {
                                        if (name !== undefined) {
                                            
                                            let priceColor = price === null ? BASIC_FONT_COLOR : (isUp ? RAISE : FALL);
                                            let rateColor = rate === null ? BASIC_FONT_COLOR : (isUp ? RAISE : FALL);
                                            let isHot = Contracts.isHot(code);
                                            let isNew = Contracts.isNew(code);

                                            return (
                                                <TouchableHighlight style={[styles.touchable,{height: this.props.height}]} onPress={() => {
                                                    // Schedule.dispatchEvent({event: 'openTrade', eventData: name});
                                                    this.props.navigation.navigate('GotoTrade',{code:code});
                                                }} activeOpacity={1} underlayColor={SCHEME_THREE_BACKGROUND_COLOR}>
                                                    <View>
                                                        <Divide index={index}/>
                                                        <View style={[commonStyles.rowStyle,{justifyContent:'center'}]}>
                                                            <Text style={styles.name}>{Contracts.total[code].name}</Text>
                                                            {this.renderHotTag(isHot)}
                                                            {this.renderNewTag(isNew)}
                                                        </View>
                                                        <Text style={[{color: priceColor},styles.priceAndPercentText]}>{price !== null ? price : '-'}</Text>
                                                        <Text style={[styles.priceAndPercentText,{color: rateColor,fontSize:16*RATIO}]}>{rate !== null ? rate : '-'}</Text>
                                                    </View>
                                                </TouchableHighlight>
                                            )
                                        } else {
                                            return (
                                                <View style={styles.emptyContent}>
                                                </View>
                                            )
                                        }

                                    })
                                }
                            </View>
                        )
                    })
                }
            </Swiper>
        )
    }

    _slice() {
        if (this.props.team.length === 0)
            return;

        let result = [];
        for (let i = 0, len = this.props.team.length; i < len; i += this.props.max) {
            result.push(this.props.team.slice(i, i + this.props.max))
        }
        const len = result.length;
        if (len !== 0 && result[len - 1].length < this.props.max) {
            do {
                result[len - 1].push({})
            } while (result[len - 1].length < this.props.max)
        }
        return result;
    }

    componentDidUpdate(){
        this.props.team = null;
    }
}

class App extends Component {
    _isFocused = true;
    constructor(props) {
        super(props);
        this.state = {
            fiat: [],
            crypto: [],
            stock:[],
            label:'International Futures',
            stockLabel:'Stock index futures'
        };
        this.props.navigation.addListener('didFocus',()=>{
            this._isFocused = true;
        });
        this.props.navigation.addListener('didBlur',()=>{
            this._isFocused = false;
        })
    }

    componentDidMount() {
        if(Data.initial){
            this.setState({fiat: Data.foreignBrief,crypto: Data.digitalBrief,stock:Data.stockBrief});
            Data.start('updateAll');
        }else{
            Schedule.addEventListener('contractsInitial', this.receiveInit, this);
        }
        Schedule.addEventListener('updateAll', this.receiveUpdate, this);
        Schedule.addEventListener('updateLanguage',this.updateLabel,this);
    }

    receiveInit() {
        this.setState({fiat: Data.foreignBrief,crypto: Data.digitalBrief,stock:Data.stockBrief});
        Data.start('updateAll');
    }

    receiveUpdate() {
        if(this._isFocused){
            this.setState({fiat: Data.foreignBrief,crypto: Data.digitalBrief,stock:Data.stockBrief});
        }
    }

    render() {
        return (
            <View style={styles.quoteRoot}>
                <View style={styles.fiatRoot}>
                    <TapTitle title={this.state.label} forward='Quotation' type={1}/>
                    <View style={styles.line}>
                    </View>
                    <View style={styles.fiatListWrapper}>
                        <List team={this.state.fiat} max={3} height={80} navigation={this.props.navigation}/>
                    </View>
                </View>

                <View style={styles.fiatRoot}>
                    <TapTitle title={this.state.stockLabel} forward='Quotation' type={2}/>
                    <View style={styles.line}>
                    </View>
                    <View style={styles.fiatListWrapper}>
                        <List team={this.state.stock} max={3} height={80} navigation={this.props.navigation}/>
                    </View>
                </View>
                {
                    HAS_CRYPTO?(<View style={styles.cryptoRoot}>
                        <TapTitle title={'Crypto Futures'} forward='Quotation' type={1}/>
                        <View style={styles.line}>
                        </View>
                        <View style={styles.cryptoListWrapper}>
                            <List team={this.state.crypto} max={6} height={80} navigation={this.props.navigation}/>
                        </View>
                    </View>):null
                }
            </View>
        )
    }

    updateLabel(){
        this.setState({
            label:'Fiat Futures',
            stockLabel:'Stock index futures'
        })
    }

    componentWillUnmount() {
        Schedule.removeEventListeners(this);
        Data.end('updateAll');
    }
}

export default withNavigation(App)