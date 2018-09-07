import React, {Component} from 'react';

import {Button} from 'react-native-elements';

import {
    Text,
    View,
    ImageBackground,
    StyleSheet,
    TextInput
} from 'react-native'

import {
    RATIO,
    SCREEN_WIDTH
} from "../../lib/adjust";

import {
    SafeBody
} from "../../lib/adjust";

import Icons from 'react-native-vector-icons/Ionicons'
import {lang} from "../../lang";
import styles from './../../style/login/forgotPassword'
import commonStyles from './../../style/variable'
export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeBody>
                <ImageBackground
                    source={require('../../images/loginBg.jpg')}
                    style={styles.ImageBackground}
                >
                    <View style={commonStyles.heightOffset}>

                    </View>
                    <View>
                        <Icons
                            name={`ios-arrow-dropleft-circle-outline`}
                            size={30}
                            style={styles.backIcon}
                            onPress={()=>{
                                this.props.navigation.goBack()
                            }}
                        />
                    </View>

                    {/*标题*/}
                    <View>
                        <Text
                            style={styles.loginTitle}
                        >{lang('Forgot Password')}</Text>
                    </View>

                    {/*修改密码内容*/}
                    <View>
                        <View style={styles.inputBox}>
                            <TextInput
                                placeholder={lang('Old Password')}
                                secureTextEntry={true}
                                clearButtonMode={'while-editing'}
                                style={styles.textInput}
                            />
                        </View>
                        <View style={styles.inputBox}>
                            <TextInput
                                placeholder={lang('New Password')}
                                secureTextEntry={true}
                                clearButtonMode={'while-editing'}
                                style={styles.textInput}
                            />
                        </View>

                        <View style={styles.inputBox}>
                            <TextInput
                                placeholder={lang('Confirm Password')}
                                secureTextEntry={true}
                                clearButtonMode={'while-editing'}
                                style={styles.textInput}
                            />
                        </View>
                    </View>

                    {/*提交按钮*/}
                    <Button
                        buttonStyle={[styles.loginBtn,{marginTop:100}]}
                        title={'确认'}
                    />
                </ImageBackground>
            </SafeBody>
        )
    }
}

