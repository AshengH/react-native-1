import React, {Component} from 'react';

import {Text, View, StyleSheet, TouchableHighlight} from 'react-native'

import Icons from 'react-native-vector-icons/Ionicons'

import {SCREEN_WIDTH} from "../lib/adjust";

import {
    lang
} from "../lang";
import styles from './../style/common/sameLi'

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <TouchableHighlight onPress={()=>{this.props.onPress()}} disabled={this.props.onPress?false:true}>
                <View style={styles.function}>
                    {/*如果需要Icon 图标，使用的属性*/}
                    {this.props.icon?this.props.icon():null}

                    <Text style={[styles.functionStyle]}>{lang(this.props.title)}</Text>

                    {/* 如果需要尖头右边显示 使用的属性*/}
                    {this.props.rightMsg ? <Text style={styles.right}>{this.props.rightMsg}</Text> : null}

                    {this.props.onPress?<Icons
                        name={'ios-arrow-forward'}
                        size={18}
                        style={styles.icon}
                    />:null}
                </View>
            </TouchableHighlight>
        )
    }
}