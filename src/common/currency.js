import React ,{Component} from 'react';

import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import {
    BASIC_FONT_COLOR,
    UI_ACTIVE_COLOR
} from "../lib/color";
import styles from './../style/common/currency'
export default class App extends Component{
    constructor(props){
        super(props)
    }
    render(){
        if(!!this.props.onPress){
            return(
                <TouchableHighlight style={[styles.textWrapper,this.props.style]} onPress={()=>this.props.onPress()}>
                    <Text style={[styles.text,this.props.textStyle]}>
                        {this.props.title}
                    </Text>
                </TouchableHighlight>
                )
        }else{
            return(
                <View style={[styles.textWrapper,this.props.style]}>
                    <Text style={[styles.text,this.props.textStyle]}>
                        {this.props.title}
                    </Text>
                </View>
            )
        }
    }
}