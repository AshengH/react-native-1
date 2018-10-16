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
        let color = this.props.select===this.props.type ? '#F05522' : '#565C66'
        let back = this.props.select === this.props.type ? "#F6F6F6" :'#fff';
        let fontW = this.props.select === this.props.type ? '600' : '' ;

        return(
            <TouchableHighlight
                style={{display: 'flex',justifyContent: 'center',height:'100%',width:'100%',backgroundColor:back,alignItems: 'center'}}

                                underlayColor={SCHEME_THREE_BACKGROUND_COLOR}
                                onPress={()=>{this.props.onPress(this.props.type)}}
            >
                <Text style={[styles.buttonContent,{color:color,fontWeight:fontW}]}>{lang(this.props.title)}</Text>
            </TouchableHighlight>
        )
    }
}


