import React, {Component} from 'react';

import {Button} from 'react-native-elements';

import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableHighlight,
    Alert
} from 'react-native'

import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    SCREEN_WIDTH
} from "../../lib/adjust";

import {
    SafeBody
} from "../../lib/adjust";

import {
    Select
} from "../../common/index";


import {getAvailableLanguage, setLanguage, lang} from "../../lang";
import {Schedule} from "../../module";
import styles from './../../style/signUp/language'
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: false,
            lang: 'English',

            label1:lang('Language'),
            button:lang('Confirm')
        };

        this.setLanguage = this.setLanguage.bind(this);
    }

    render() {
        const list = getAvailableLanguage();
        return (
            <SafeBody>
                {/* 引入select模块*/}
                <Select name='countrySelect' value='country' show={this.state.languages}
                        data={list}
                        onPress={({name, value}) => {
                            this.setState({languages: false, lang: name});
                            setLanguage(value)
                        }}
                />
                <ImageBackground source={require('../../images/loginBg.jpg')} style={styles.imageBackground}>
                    <View style={{padding: 25}}>
                        <Text style={styles.loginTitle}>{this.state.label1}</Text>
                        <Text style={styles.descText}>{lang('You can also change language in settings')}</Text>
                    </View>
                    <View style={[styles.inputBox,{marginBottom:100}]}>
                        <Icons
                            name={`language-html5`}
                            size={25}
                            style={styles.iconStyle}
                        />

                        <TouchableHighlight
                            style={[styles.textInput]}
                            onPress={() => {
                                this.setState({languages: true})
                            }}
                        >
                            <Text style={[styles.textInput, {
                                lineHeight: 40,
                                textAlign: 'center'
                            }]}>{this.state.lang}</Text>
                        </TouchableHighlight>

                    </View>

                    {/*提交按钮*/}
                    <Button
                        buttonStyle={[styles.loginBtn]}
                        title={this.state.button}
                        onPress={this.setLanguage}
                    />
                </ImageBackground>
            </SafeBody>
        )
    }

    componentDidMount(){
        Schedule.addEventListener('updateLanguage',this.updateLabel,this);
    }

    componentWillUnmount(){
        Schedule.removeEventListeners(this);
    }

    updateLabel(){
        this.setState({
            label1:lang('Language'),
            button:lang('Confirm')
        })
    }

    setLanguage() {
        Alert.alert('',lang('Sign Up Successfully'));
        this.props.navigation.popToTop();
    }
}

