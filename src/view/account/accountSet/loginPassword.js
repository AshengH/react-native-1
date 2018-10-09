import React, {Component} from 'react'

import {Text, View, TextInput, TouchableHighlight, ScrollView, StyleSheet, Alert} from 'react-native'

import {SafeBody} from "../../../lib/adjust";

import {Header} from "../../../common";
import {lang} from "../../../lang";
import {Cache, Assets} from "../../../module";
import req from '../../../lib/req'
import styles from './../../../style/account/accountSet/loginPassword'

export default class App extends Component {
    _oldPassword = null;
    _newPassword = null;
    _conPassword = null;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeBody>
                {/*头部*/}
                <Header title={'Set Login Password'} navigation={this.props.navigation}/>
                <ScrollView style={styles.scrollViewBackground}>
                    <View>
                        <View style={[styles.liStyle, {marginTop: 10}]}>
                            <Text style={styles.inputText}>{lang('Old Password')}</Text>
                            <TextInput
                                placeholder={lang('Your old password')}
                                clearButtonMode={'while-editing'}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(text) => this._oldPassword = text}
                            />
                        </View>

                        <View style={styles.liStyle}>
                            <Text style={styles.inputText}>{lang('New Password')}</Text>
                            <TextInput
                                placeholder={lang('Your new password')}
                                clearButtonMode={'while-editing'}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(text) => this._newPassword = text}
                            />
                        </View>

                        <View style={styles.liStyle}>
                            <Text style={styles.inputText}>{lang('Confirm Password')}</Text>
                            <TextInput
                                placeholder={lang('Confirm new password')}
                                clearButtonMode={'while-editing'}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(text) => this._conPassword = text}
                            />
                        </View>
                    </View>
                    <View style={styles.descRoot}>
                        <Text style={styles.descBlackText}>{lang('If you need help,please')}</Text>
                        <TouchableHighlight>
                            <Text style={styles.descBlueText}>{lang('contact the client service')}</Text>
                        </TouchableHighlight>
                    </View>

                    <TouchableHighlight style={styles.button} onPress={() => {
                        this.submit()
                    }}>
                        <Text style={styles.doneStyle}>{lang('Done')}</Text>
                    </TouchableHighlight>
                </ScrollView>
            </SafeBody>
        )
    }

    async submit() {
        try {
            let result = await req({
                url: '/mine/loginPasswd.htm',
                type: 'POST',
                data: {
                    oldPass: this._oldPassword,
                    newPass: this._newPassword,
                    newPassCfm: this._conPassword
                }
            });
            Cache.setLogout();
            Assets.update();

            Alert.alert(
                lang(''),
                lang('Reset password successfully! Please login again'),
                [{
                    text: 'OK', onPress: () => {
                        this.props.navigation.navigate('Login');
                    }
                }])


        } catch (err) {
            Alert.alert('Error',err['errorMsg'])
        }
    }

}