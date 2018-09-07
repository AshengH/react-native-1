import React, {Component} from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import {
    withNavigation
} from 'react-navigation'

import {lang} from "../lang";

import Icons from 'react-native-vector-icons/Ionicons'

import {
    HEADER_COLOR,
    HEADER_FONT_COLOR
} from "../lib/color";

import {
    isIphoneX, SCREEN_WIDTH
} from "../lib/adjust";
import styles from './../style/common/editHeader'
import commonStyles from './../style/variable'
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (isIphoneX()) {
            return (
                <View style={styles.container}>
                    <View style={styles.body}>
                        <Icons name={`ios-arrow-back`} style={styles.back} onPress={() => {
                            this.props.navigation.goBack()
                        }}/>
                        <Text style={styles.title}>
                            {lang(this.props.title) || 'FK'}
                        </Text>
                        {/*部分页面有右边按钮,只需调用页面写button 可调用*/}
                        {this.props.button ? (
                            <TouchableHighlight style={styles.btnStyle} onPress={()=>this.props.button.onPress()}>
                                <Text style={styles.iphoneTypeText}>
                                    {lang(this.props.button.name) || 'FK'}
                                </Text>
                            </TouchableHighlight>
                        ) : (null)}
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={commonStyles.heightOffset}>

                    </View>
                    <View style={styles.body}>
                        <Icons name={`ios-arrow-back`} style={styles.back} onPress={() => {
                            this.props.navigation.goBack()
                        }}/>
                        <Text style={styles.title}>
                            {lang(this.props.title) || 'FK'}
                        </Text>
                        {/*部分页面有右边按钮,只需调用页面写buttonName 可调用*/}
                        {this.props.button ? (
                            <TouchableHighlight style={styles.btnStyle} activeOpacity={1} underlayColor={'transparent'}  onPress={()=>this.props.button.onPress()}>
                                <Text style={styles.noneIphoneText}>
                                    {lang(this.props.button.name) || 'FK'}
                                </Text>
                            </TouchableHighlight>
                        ) : (null)}
                    </View>
                </View>
            )
        }

    }
}

export default withNavigation(App);