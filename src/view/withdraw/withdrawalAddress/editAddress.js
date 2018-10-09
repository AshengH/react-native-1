import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet, TextInput, Alert} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import {RATIO, SafeBody, SCREEN_WIDTH} from "../../../lib/adjust";
import {Header} from "../../../common/index";
import {UI_ACTIVE_COLOR} from "../../../lib/color";
import req from '../../../lib/req'
import {Assets, Schedule} from "../../../module/index";
import {lang} from "../../../lang";
import {withNavigation} from 'react-navigation'
import styles from './../../../style/withdraw/withdrawalAddress/editAddress'
import commonStyles from './../../../style/variable'
class App extends Component {

    _address=null;
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SafeBody>
                <Header title={'Edit Address'}/>
                <View>
                    <View style={styles.root}>
                        <View style={styles.addressWrapper}>
                            <View style={commonStyles.rowStyle}>
                                <Text style={styles.address}>{lang('Address')} {this.props.navigation.state.params.index + 1}({this.props.navigation.state.params.currency})</Text>
                            </View>
                        </View>
                        <TextInput
                            style={styles.addressInput}
                            multiline={true}
                            clearTextOnFocus={true}
                            placeholder={this.props.navigation.state.params.address}
                            onChangeText={(text)=>this._address=text}
                        />
                    </View>
                    <TouchableHighlight style={styles.doneStyle} onPress={() => {
                            this.editAddress()
                    }}>
                        <Text style={styles.save}>{lang('Save')}</Text>
                    </TouchableHighlight>
                </View>
            </SafeBody>
        )
    }
    async editAddress(){
        if(this._address === null || this._address === ''){
            Alert.alert('Reminder',lang('Please enter address'))
        }

        try{
            await req({
                url:'/mine/coinAddressEdit.htm',
                type:'POST',
                data:{
                    id:this.props.navigation.state.params.id,
                    address: this._address
                }
            });
            Alert.alert('', lang('Edit Successfully'),[{text:'OK',onPress:()=>{this.props.navigation.goBack()}}])
        } catch (err){
            Alert.alert('Error',err['errorMsg'])
        }
    }
}

export default withNavigation(App)