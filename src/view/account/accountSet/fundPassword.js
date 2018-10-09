import React, {Component} from 'react'

import {Text, View, TextInput, TouchableHighlight, ScrollView, StyleSheet, Alert} from 'react-native'

import {RATIO, SafeBody} from "../../../lib/adjust";

import {Header} from "../../../common";
import {lang} from "../../../lang";
import {Assets, Cache} from "../../../module";
import req from "../../../lib/req";
import styles from './../../../style/account/accountSet/fundPassword'

export default class App extends Component {
    _password=null;
    _newPassword=null;
    _conPassword=null;

    constructor(props) {
        super(props);
        this.state={
            havePassword:null
        }

        if (Assets.initial) {
            if (Assets.withdrawPW.length === 0) {
                //todo 设置密码
                this.state = {
                    havePassword: false,
                };
            } else {
                //todo 修改密码
                this.state = {
                    havePassword: true,
                };
            }
        }
    }


    render() {
        return (
            <SafeBody>
                <Header title={'Set Fund Password'} navigation={this.props.navigation}/>
                <ScrollView style={styles.scrollViewBackground}>
                    <View>

                        {
                            this.state.havePassword ?
                                (<View style={[styles.liStyle,{marginTop: 10}]}>
                                    <Text style={styles.inputText}>{lang('Old Password')}</Text>
                                    <TextInput
                                        placeholder={lang('Your old password')}
                                        clearButtonMode={'while-editing'}
                                        style={styles.input}
                                        secureTextEntry={true}
                                        onChangeText={(text)=>this._password=text}
                                    />
                                </View>)
                                :
                                (<View style={[styles.liStyle,{marginTop: 10}]}>
                                    <Text style={styles.inputText}>{lang('Login Password')}</Text>
                                    <TextInput
                                        placeholder={lang('Your login password')}
                                        clearButtonMode={'while-editing'}
                                        style={styles.input}
                                        secureTextEntry={true}
                                        onChangeText={(text)=>this._password=text}
                                    />
                                </View>)
                        }

                        <View style={styles.liStyle}>
                            <Text style={styles.inputText}>{lang('New Password')}</Text>
                            <TextInput
                                placeholder={lang('Your new password')}
                                clearButtonMode={'while-editing'}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(text)=>this._newPassword=text}
                            />
                        </View>
                        <View style={styles.liStyle}>
                            <Text style={styles.inputText}>{lang('Confirm Password')}</Text>
                            <TextInput
                                placeholder={lang('Confirm new password')}
                                clearButtonMode={'while-editing'}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(text)=>this._conPassword=text}
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
                url: '/mine/atmPasswd.htm',
                type: 'POST',
                data: {
                    password: this._password,
                    withdrawPw: this._newPassword,
                    withdrawPwCfm: this._conPassword
                }
            });

            Alert.alert(
                '',
                lang('Reset password successfully!'),
                [{
                    text: 'OK', onPress: () => {
                        this.props.navigation.popToTop();
                        Assets.update()
                    }
                }])

        } catch (err) {
            Alert.alert('Error',err['errorMsg'])
        }
    }
}