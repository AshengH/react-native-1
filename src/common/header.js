import React, {Component} from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    Image,
    StyleSheet
} from 'react-native';

import {
    withNavigation
} from 'react-navigation';

import {lang} from "../lang";

import Icons from 'react-native-vector-icons/Ionicons'

import {
    HEADER_COLOR,
    HEADER_FONT_COLOR
} from "../lib/color";

import {
    isIphoneX, SCREEN_WIDTH
} from "../lib/adjust";
import styles from './../style/common/header'
import commonStyles from './../style/variable'
class App extends Component {
    constructor(props) {
        super(props);
        this.forward = this.forward.bind(this)
    }

    render() {
            let title = lang(this.props.title) || this.props.title ||'FK';
            title = this.props.customTitle ? this.props.customTitle.title + ' ' + this.props.customTitle.contract : title
        if (isIphoneX()) {
            return (
                <View style={styles.container}>
                    <View style={styles.body}>
                        <Icons name={`ios-arrow-back`} style={styles.back} onPress={() => {
                            if (this.props.comeBackHome === true){
                                this.props.navigation.navigate('Home')
                            } else {
                                this.props.navigation.goBack()
                            }
                        }}/>
                        <View style={[commonStyles.rowStyle,commonStyles.fillStyle,{justifyContent:'center'}]}>
                            <Text style={styles.title}>
                                {title}
                            </Text>
                            {this.props.midButton && this.props.midButton(this.props.navigation,this.props.customTitle && this.props.customTitle.code)}
                        </View>
                        {/*部分页面有右边按钮,只需调用页面写button 可调用*/}
                        {this.props.button ? (
                            <TouchableHighlight style={styles.btnStyle} activeOpacity={1} underlayColor={'transparent'}
                                                onPress={() => this.forward()}>
                                {this.props.button.isText?(
                                    <Text style={styles.buttonText}>
                                        {lang(this.props.button.name) || 'FK'}
                                    </Text>
                                ):(
                                    <Image source={this.props.button.image} style={{width:20,height:20,backgroundColor:this.props.button.image?'transparent':'white'}}/>
                                )}
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
                            if (this.props.comeBackHome === true){
                                this.props.navigation.navigate('Home')
                            } else {
                                this.props.navigation.goBack()
                            }
                        }}/>
                        <View style={[commonStyles.rowStyle,commonStyles.fillStyle,{justifyContent:'center'}]}>
                            <Text style={styles.title}>
                                {title}
                            </Text>
                            {this.props.midButton && this.props.midButton(this.props.navigation,this.props.customTitle && this.props.customTitle.code)}
                        </View>
                        {/*部分页面有右边按钮,只需调用页面写buttonName 可调用*/}
                        {this.props.button ? (
                            <TouchableHighlight style={styles.btnStyle} activeOpacity={1} underlayColor={'transparent'}
                                                onPress={() => this.forward()}>
                                {this.props.button.isText?(
                                    <Text style={styles.buttonText}>
                                        {lang(this.props.button.name) || 'FK'}
                                    </Text>
                                ):(
                                    <Image source={this.props.button.image} style={{width:20,height:20,backgroundColor:this.props.button.image?'transparent':'white'}}/>
                                )}
                            </TouchableHighlight>
                        ) : (null)}
                    </View>
                </View>
            )
        }

    }

    forward() {
        if (!!this.props.button) {
            this.props.navigation.navigate(this.props.button.forward, {take: this.props.button.take})
        }
    }
}

export default withNavigation(App);
