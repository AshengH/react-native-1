import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableHighlight, StyleSheet, TextInput, Alert} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import {RATIO, SafeBody, SCREEN_WIDTH} from "../../../lib/adjust";
import {EditHeader} from "../../../common/index";
import {UI_ACTIVE_COLOR, LINE_COLOR, GRAY_SVG_COLOR, FALL} from "../../../lib/color";
import req from '../../../lib/req'
import {Select} from "../../../common/index";
import {Assets, Schedule} from "../../../module/index";
import {lang} from "../../../lang";
import styles from './../../../style/withdraw/withdrawalAddress/index'
import commonStyles from './../../../style/variable'
/*钱包*/
class Packet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            editIndex: null,
        };
    }

    render() {
        return this.props.total.map(({address, currency, id, defaultCoint}, index) => {
            return (
                <TouchableHighlight
                    underlayColor={LINE_COLOR}
                    onPress={()=>{
                        this.props.navigation.goBack();
                        Schedule.dispatchEvent({event:'sendAddress',eventData:address})
                    }}
                >
                    <View style={styles.cellRoot}>
                        <View style={styles.coinWrapper}>
                            <View style={commonStyles.rowStyle}>
                                {
                                    defaultCoint ?
                                        (
                                            <View style={commonStyles.rowStyle}>
                                                <View style={styles.greenPoint}>
                                                </View>
                                                <Text style={styles.address}>{lang('Default Address')}({currency})</Text>
                                            </View>
                                        )
                                        :
                                        (
                                            <Text style={styles.address}>{lang('Address')} {index + 1}({currency})</Text>
                                        )
                                }
                            </View>
                        </View>
                        <TextInput
                            style={styles.addressInput}
                            multiline={true}
                            editable={this.state.editable && this.state.editIndex === index}
                            clearTextOnFocus={true}
                            placeholder={address}
                            value={address}
                        />
                        {
                            this.props.edit ?
                                (/*编辑样式*/
                                    <View style={styles.editRoot}>
                                        {/*设为默认值*/}
                                        <TouchableHighlight
                                            onPress={() => {
                                                this.default(id)
                                            }}
                                        >
                                            <View style={commonStyles.rowStyle}>
                                                <Icons
                                                    name={`check-circle`}
                                                    size={20}
                                                    style={{color: defaultCoint ? FALL : GRAY_SVG_COLOR}}
                                                />
                                                <Text style={styles.defaultAddress}>{lang('Set Default Address')}({currency})</Text>
                                            </View>
                                        </TouchableHighlight>
                                        <View style={commonStyles.rowStyle}>
                                            {/*修改*/}
                                            <TouchableHighlight
                                                style={styles.editTouchable}
                                                onPress={()=>{
                                                    this.props.navigation.navigate('EditAddress',{address,currency,id,index})
                                                }}
                                            >
                                                <View style={commonStyles.rowStyle}>
                                                    <Icons
                                                        name={`account-edit`}
                                                        size={22}
                                                        style={styles.icon}
                                                    />
                                                    <Text style={styles.edit}>{lang('Edit')}</Text>
                                                </View>
                                            </TouchableHighlight>
                                            {/*删除*/}
                                            <TouchableHighlight
                                                onPress={() => {
                                                    this.makeSure(id)
                                                }}
                                            >
                                                <View style={commonStyles.rowStyle}>
                                                    <Icons
                                                        name={`close-circle`}
                                                        size={20}
                                                        style={styles.icon}
                                                    />
                                                    <Text style={styles.edit}>{lang('Delete')}</Text>
                                                </View>
                                            </TouchableHighlight>
                                        </View>
                                    </View>)
                                :
                                (null)
                        }
                    </View>
                </TouchableHighlight>
            )
        })
    }

    componentWillUnmount(){
        Schedule.removeEventListeners(this)
    }

    makeSure(id) {
        Alert.alert(lang('Reminder'), lang('Are you sure to delete this address'),
            [{text: lang('Cancel')}, {text: lang('Confirm'), onPress: () => this.delete(id)}]
        );
    }

    async delete(id) {
        try {
            let result = await req({
                url: '/mine/coinAddressDel.htm',
                type: 'POST',
                data: {
                    id: id
                }
            });
            Alert.alert('', lang('Delete Successfully'));
            this.props.get()
        } catch (err) {
            Alert.alert(lang('Error'), err['errorMsg'])
        }
    }

    async default(id) {
        try {
            let result = await req({
                url: '/mine/coinAddressDefault.htm',
                type: 'POST',
                data: {
                    id: id
                }
            });
            Alert.alert('', lang('Set Successfully'));
            this.props.get()
        } catch (err) {
            Alert.alert(lang('Error'), err['errorMsg'])}
    }
}

/*添加钱包模块*/
class Add extends Component {

    _address = [];

    constructor(props) {
        super(props);
        this.state = {
            buttonColor: false,
        };
    }

    render() {
        if (this.props.show) {
            return (
                <View>
                    <View style={styles.addRoot}>
                        <View style={styles.nameView}>
                            <TouchableHighlight style={styles.nameTouchable} onPress={() => {
                                this.props.selectShow();
                            }}>
                                <View style={styles.nameTextWrapper}>
                                    <Text style={styles.nameText}>{this.props.name}</Text>
                                    <View style={styles.triangle}>

                                    </View>
                                </View>
                            </TouchableHighlight>
                            <View>
                                <Icons
                                    name={`close-circle`}
                                    size={25}
                                    onPress={() => {
                                        this.props.onPress();
                                    }}
                                />
                            </View>
                        </View>
                        <TextInput
                            style={styles.addressInput}
                            placeholder={lang(' Please enter address')}
                            onChangeText={(text) => {
                                text.length > 0 ? this.setState({buttonColor: true}) : this.setState({buttonColor: false})
                                this._address = text
                            }}
                        />
                        <TouchableHighlight
                            style={[styles.doneStyle, {backgroundColor: this.state.buttonColor ? UI_ACTIVE_COLOR : GRAY_SVG_COLOR}]}
                            onPress={() => {
                                this.sendAddress()
                            }}
                        >
                            <Text style={styles.save}>{lang('Save')}</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        } else {
            this.state.buttonColor = false;
            return null
        }
    }

    async sendAddress() {
        try {
            let result = await req({
                url: '/mine/coinAddressAdd.htm',
                type: 'POST',
                data: {
                    coin: this.props.name,
                    address: this._address
                }
            });
            Alert.alert('', lang('Successfully'), [{text: 'OK', onPress: () => this.props.onPress()}]);
            this.props.get()
        } catch (err) {
            Alert.alert(lang('Error'), err['errorMsg'])
        }
    }
}

/*主模块*/
export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            add: false,
            button: true,
            edit: false,
            info: false,
            showSlt: false,
            name: 'BTC',
            totalAddress: []
        };

        /*从 Assets 获取货币种类*/
        this._currency = Assets.cryptos.split(',').map((o) => {
            return {name: o, value: o}
        });

        /*当导航进入页面后执行的函数*/
        this.props.navigation.addListener('didFocus',()=>{
            this.getAddressList().catch()
        });
    }

    render() {
        return (
            <SafeBody>
                <Select
                    data={this._currency} show={this.state.showSlt}
                    onPress={({name, value}) => {
                        this.setState({showSlt: false, name: name})
                    }}
                />
                <EditHeader title={'Withdrawal Address'} navigation={this.props.navigation}
                            button={{
                                name: this.state.edit ? 'Cancel' : 'Management',
                                onPress: () => {
                                    this.setState({edit: !this.state.edit, button: !this.state.button})
                                }
                            }}
                />

                <ScrollView>
                    {/*当前选定钱包*/}
                    style={commonStyles.whiteBackground}
                    <Packet
                        total={this.state.totalAddress}
                        edit={this.state.edit}
                        get={() => {
                            this.getAddressList()
                        }}
                        navigation={this.props.navigation}
                    />

                    {/*添加模块*/}
                    <Add show={this.state.add} name={this.state.name}
                         onPress={() => {
                             this.setState({add: false, button: true})
                         }}
                         selectShow={() => {
                             this.setState({showSlt: true})
                         }}
                         get={() => {
                             this.getAddressList()
                         }}
                    />

                    {
                        this.state.button ?
                            (<TouchableHighlight style={styles.doneStyle} onPress={() => {
                                this.setState({add: true, button: false})
                            }}>
                                <Text style={{textAlign: 'center', fontWeight: '100'}}>{lang('Add New Address')}</Text>
                            </TouchableHighlight>)
                            :
                            (null)
                    }
                </ScrollView>
            </SafeBody>
        )
    }

    componentDidMount() {
        this.getAddressList()
    }

    async getAddressList() {
        try {
            this.setState({edit:false,button: true});
            let result = await req({
                url: '/mine/coinAddressList.htm',
                type: 'POST'
            });
            result['coins'].length !== 0 ? this.setState({info: true}) : this.setState({info: false});
            this.setState({totalAddress: result['coins']})
        } catch (err) {
            Alert.alert('Error', err['errorMsg'])
        }
    }
}

