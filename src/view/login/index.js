import React, {Component} from 'react';

import {Button} from 'react-native-elements'

import req from '../../lib/req'

import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    Alert,
    Image
} from 'react-native'

import {
    RATIO,
    SCREEN_WIDTH
} from "../../lib/adjust";

import Icons from 'react-native-vector-icons/Ionicons'

import {
    SafeBody
} from "../../lib/adjust";

import {
    Cache, Schedule
} from "../../module";

import {
    lang
} from "../../lang";

import styles from './../../style/login/index'
import { NOTICE_CONTENT_FONT_COLOR, BASIC_COLOR, ACTIVITY_FONT_COLOR, BACKGROUND_COLOR, UI_ACTIVE_COLOR } from '../../lib/color';
import commonStyles from './../../style/variable'

const eye = require('./../../images/eye.png');
const closeEye = require('./../../images/closeEye.png');

export default class App extends Component {
    _account = null;
    _password = null;
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);

        this.state = {
            secure:true
        }
    }

    render() {
        return (
            <SafeBody>
                <View style={[styles.imageBackground]}>
                        <View style={commonStyles.heightOffset}>
                        </View>
                        <View style={styles.backIconWrapper}>
                            <Icons
                                name={`ios-arrow-dropleft-circle-outline`}
                                size={30}
                                style={styles.backIcon}
                                onPress={() => {
                                    this.props.navigation.popToTop()
                                }}
                            />
                        </View>
                        <View>
                            {/* <Image style={styles.loginLeftImage} source={loginLeft}/> */}
                            
                        </View>

                        <View>
                            <Text style={styles.loginTitle}>{lang('Welcome Login')}</Text>
                            <View style={styles.inputBox}>
                                {/* <Icons
                                    name={`md-person`}
                                    size={25}
                                    style={styles.inputIcon}
                                    color={NOTICE_CONTENT_FONT_COLOR}
                                    onPress={() => {
                                        this.setState({countrySelect: true})
                                    }}
                                /> */}
                                <TextInput
                                    placeholder={lang('Please input your mobile number')}
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                        this._account = text
                                    }}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                {/* <Icons
                                    name={`md-lock`}
                                    size={25}
                                    color={NOTICE_CONTENT_FONT_COLOR}
                                    style={styles.inputIcon}
                                /> */}
                                <TextInput
                                    placeholder={lang('Password')}
                                    style={styles.textInput}
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                        this._password = text
                                    }}
                                />
                                <TouchableOpacity style={[commonStyles.centerView,{width:20}]} onPress={()=>this.setState({secure:!this.state.secure})}>
                                    <Image source={this.state.secure ? closeEye : eye}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Button
                            buttonStyle={[styles.loginBtn]}
                            containerViewStyle={styles.loginButtonContainerViewStyle}
                            title={lang('Login')}
                            onPress={this.login}
                        />

                        <Button
                            buttonStyle={[styles.signUpBtn]}
                            containerViewStyle={[styles.loginButtonContainerViewStyle]}
                            title={lang('Sign Up')}
                            color={UI_ACTIVE_COLOR}
                            onPress={() => {
                                            this.props.navigation.navigate('SignUp')
                                        }}
                        />

                </View>
            </SafeBody>
        )
    }

    async login() {
        console.log(this._account,this._password);
        try {
            await req({
                url: '/sso/user_login_check',
                type: 'POST',
                data: {
                    mobile: this._account,
                    password: this._password,
                    jpush:Cache.jpush,
                },
                animate:true
            });
            Cache.setLogin(this._account, this._password);
            this.props.navigation.popToTop();
        } catch (err) {
            console.log('dsds');
            console.log(err);
            Alert.alert('Error',err['errorMsg']);
        }
    }

}

