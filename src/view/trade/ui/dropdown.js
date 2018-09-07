import React, {Component} from 'react';

import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import {lang} from '../../../lang'
import styles from './../../../style/trade/ui/dropdown'
export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.show) {
            return (
                <View style={[styles.root,{top:this.props.top,left:this.props.left}]}>
                    <View style={[{borderBottomColor:this.props.triangle},styles.itemWrapper]} />
                    <View style={[this.props.style]}>
                        {
                            this.props.item.map((i)=>{
                                return(
                                    <TouchableHighlight style={this.props.itemStyle} onPress={()=>{this.props.onPress(i)}}>
                                        <Text style={[this.props.textStyle,i===this.props.select?this.props.activeStyle:null]}>
                                            {lang(i)}
                                        </Text>
                                    </TouchableHighlight>
                                )
                            })
                        }
                    </View>
                </View>
            )
        } else {
            return null;
        }
    }
}