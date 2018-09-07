import React,{Component} from 'react';

import {
    TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native';

import {lang} from '../lang'

import {UI_ACTIVE_COLOR, SCHEME_THREE_BACKGROUND_COLOR, NOTICE_CONTENT_FONT_COLOR} from "../lib/color";
import styles from './../style/common/type'

export default class App extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let color = this.props.select===this.props.type ? UI_ACTIVE_COLOR : NOTICE_CONTENT_FONT_COLOR
        return(
            <TouchableHighlight style={[styles.button,{borderColor:color},this.props.style]}
                                activeOpacity={1}
                                underlayColor={SCHEME_THREE_BACKGROUND_COLOR}
                                onPress={()=>{this.props.onPress(this.props.type)}}
            >
                <Text style={[styles.buttonContent,{color:color}]}>{lang(this.props.title)}</Text>
            </TouchableHighlight>
        )
    }
}


