import React, {Component} from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import {
    withNavigation
}from 'react-navigation';

import {lang} from "../lang";

import Icons from 'react-native-vector-icons/Ionicons'

import {
    HEADER_COLOR,
    HEADER_FONT_COLOR, UI_ACTIVE_COLOR
} from "../lib/color";

import {
    isIphoneX, SCREEN_WIDTH
} from "../lib/adjust";
import styles from './../style/common/buttonHeader'
import commonStyles from './../style/variable'
/**
 * pop - 返回导航器顶端
 * special - 返回特定页面
 * button {name:按钮名字,btnStyle:按钮样式}
 */
class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (isIphoneX()) {  /*根据不同设备头部显示不同*/
            return (
                <View style={styles.container}>
                    <View style={styles.body}>
                        <Icons name={`ios-arrow-back`} style={styles.back} onPress={() => {
                            if(this.props.pop){
                                this.props.navigation.popToTop();
                            }else if(this.props.special !== undefined){
                                this.props.navigation.navigate(this.props.special)
                            }else{
                                this.props.navigation.goBack()
                            }
                        }}/>
                        <View style={styles.selectionRootView}>
                            {/*根据调用的模块 传值显示点击按钮*/}
                            <View style={styles.btnBox}>
                                {
                                    this.props.btnName.map((item)=>{
                                        return(
                                            <TouchableHighlight onPress={()=>{this.props.onPress(item.type)}}>
                                                <Text style={[styles.switchBtn,item.type===this.props.showType?{backgroundColor:UI_ACTIVE_COLOR}:{color:UI_ACTIVE_COLOR}]}>{lang(item.name) || 'FK'}</Text>
                                            </TouchableHighlight>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        {/*部分页面有右边按钮,只需调用页面写button 可调用*/}
                        {this.props.button ? (
                            <TouchableHighlight style={styles.btnStyle} onPress={()=>this.forward()}>
                                <Text style={styles.buttonName}>
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
                            if(this.props.pop){
                                this.props.navigation.popToTop();
                            }else if(this.props.special !== undefined){
                                this.props.navigation.navigate(this.props.special)
                            }else{
                                this.props.navigation.goBack()
                            }
                        }}/>
                        <View style={styles.selectionRootView}>
                            {/*根据调用的模块 传值显示点击按钮*/}
                            <View style={styles.btnBox}>
                                {
                                    this.props.btnName.map((item)=>{
                                        return(
                                            <TouchableHighlight onPress={()=>{this.props.onPress(item.type)}}>
                                                <Text style={[styles.switchBtn,item.type===this.props.showType?{backgroundColor:UI_ACTIVE_COLOR}:{color:UI_ACTIVE_COLOR}]}>{lang(item.name) || 'FK'}</Text>
                                            </TouchableHighlight>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        {/*部分页面有右边按钮,只需调用页面写button 可调用*/}
                        {this.props.button ? (
                            <TouchableHighlight style={styles.btnStyle} onPress={()=>this.forward()}>
                                <Text style={styles.buttonName}>
                                    {lang(this.props.button.name) || 'FK'}
                                </Text>
                            </TouchableHighlight>
                        ) : (null)}
                    </View>
                </View>
            )
        }

    }

    forward(){
        if(!!this.props.button){
            this.props.navigation.navigate(this.props.button.forward,{take:this.props.button.take})
        }
    }
}

export default withNavigation(App);