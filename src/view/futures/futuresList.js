import React,{Component} from 'react';

import {
    FlatList,
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import {
    Contracts,
    Schedule
} from "../../module";

import {lang} from '../../lang';

import {
    RAISE,
    FALL,
    BASIC_FONT_COLOR,
    GRAY_SVG_COLOR,
    SCHEME_THREE_BACKGROUND_COLOR
} from "../../lib/color";
import styles from './../../style/futures/futuresList'

export default class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.root}>
                <View style={styles.titleRoot}>
                    <Text style={styles.title}>{lang('Name')}</Text>
                    <Text style={styles.title}>{lang('Price')}</Text>
                    <Text style={styles.title}>{lang('Change')}</Text>
                    <Text style={styles.title}>{lang('Status')}</Text>
                </View>
                <FlatList
                    data={this.props.list}
                    renderItem={({item}) => {
                        console.log(item);
                        let priceColor = item.price === null?BASIC_FONT_COLOR:(item.isUp?RAISE:FALL);
                        let changeBackgroundColor = item.rate === null?GRAY_SVG_COLOR:(item.isUp?RAISE:FALL);
                        return(
                            <TouchableHighlight onPress={()=>{
                                Schedule.dispatchEvent({event:'openTrade',eventData:item.name});
                                this.props.navigation.popToTop();
                                this.props.navigation.navigate('Trade',{code:item.name});
                            }} activeOpacity={1} underlayColor={SCHEME_THREE_BACKGROUND_COLOR}
                            >
                                <View style={styles.cellRoot}>
                                    <Text style={[styles.itemBase]}>{Contracts.total[item.code].name}</Text>
                                    <Text style={[styles.itemBase,{color:priceColor}]}>{item.price !== null?item.price:'- -'}</Text>
                                    <View style={styles.changeWrapper}>
                                        <Text style={[{backgroundColor:changeBackgroundColor},styles.itemRate]}>{item.rate !== null?item.rate:'- -'}</Text>
                                    </View>
                                    <Text style={[styles.itemBase]}>{item.price !== null?lang('Open'):lang('Rest')}</Text>
                                </View>
                            </TouchableHighlight>
                        )
                    }}
                />
            </View>
        )
    }

    componentDidUpdate(){
        this.props.list = null;
    }
}
