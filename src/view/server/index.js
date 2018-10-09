import React, {Component} from 'react'
import {Text, TextInput, View, Image, TouchableHighlight, ImageBackground, StyleSheet, Alert,ScrollView} from 'react-native'

import {Header} from "../../common";
import {RATIO, SafeBody, SCREEN_WIDTH} from "../../lib/adjust";
import Icons from 'react-native-vector-icons/FontAwesome'
import {UI_ACTIVE_COLOR} from "../../lib/color";
import req from '../../lib/req'
import styles from './../../style/server/index'
export default class App extends Component {

    timer = null;

    constructor(props) {
        super(props)

        this.state = {
            content:'',
            convesation:[]
        }
    }

    renderItem(){
        let content = this.state.convesation.map((item,i)=>{
            if (item.status == 3 || item.status == 4) {
                return(
                    <View key={i} style={styles.serverConversationRoot}>
                        <Image
                            source={require('../../images/serverIcon.png')}
                            style={styles.serverImage}
                        />
                        <View>
                            <View style={styles.triangleServer}>

                            </View>
                            <View style={styles.serverTextWrapper}>
                                <Text style={styles.conversationText}>{item.content}</Text>
                            </View>
                        </View>
                    </View> 
                );
            }else{
                return(
                    <View key={i} style={styles.userConversationRoot}>
                        <View>
                            <View style={styles.userTextWrapper}>
                                <Text style={styles.conversationText}>{item.content}</Text>
                            </View>
                        </View>
                        <View style={styles.triangleCustomer}>

                        </View>
                        <Image
                            source={require('../../images/customer.png')}
                            style={styles.userImage}
                        />
                    </View>
                );
            }
        });

        return content;
    }

    render() {
        return (
            <SafeBody>
                <ImageBackground source={require('../../images/serverBg.png')} style={styles.imageBackground}>
                    <Header title={'Client Service'} navigation={this.props.navigation}/>
                    {/*客服*/}
                    
                    {/*用户*/}
                    <ScrollView  ref={sv => this.sv = sv}>
                        {this.renderItem()}
                    </ScrollView>
                    
                </ImageBackground>
                <View style={styles.bottomView}>
                    <TextInput
                        style={styles.input}
                        value={this.state.content}
                        onChangeText={text=>this.setState({content:text})}
                        returnKeyType={'done'}
                    />
                    <TouchableHighlight onPress={()=>this.sendMessage()}>
                        <Icons
                            name={`telegram`}
                            size={32}
                            style={styles.sendIcon}
                        />
                    </TouchableHighlight>
                </View>
            </SafeBody>
        )
    }

    componentDidMount() {
        this.sv.scrollToEnd();
        this.requestMessage();
    }

    componentWillUnmount(){
        clearTimeout(this.timer);
    }

    async requestMessage () {
        try {
            let result = await req({
                url: '/home/kefu.htm',
                type: 'GET',
                data: {
                    action: 'more',
                    size: 50,
                    _: new Date()
                }
            })
            
            if (result && result.code && result.code == 200) {
                this.setState({convesation:result.data},()=>{
                    // this.sv.scrollToEnd();
                });
                
            }
        } catch (err) {

            Alert.alert('Error', err['errorMsg'])
        }

        this.timer = setTimeout(() => {
            this.requestMessage()
        }, 1000);
    }

    async sendMessage () {

        if (this.state.content == '') {
            return;
        }

        try {
            let result = await req({
                url: '/home/kefu.htm',
                type: 'POST',
                data: {
                    action: 'send',
                    content:this.state.content
                }
            })

            if (result && result.code && result.code == 200) {
                this.setState({content:''});
            }
        } catch (err) {
            Alert.alert('Error', err['errorMsg'])
        }

        this.timer = setTimeout(() => {
            this.requestMessage()
        }, 1000);
    }

    async initSend() {
        try {
            await req({
                url: '/home/kefu.htm',
                type: 'GET',
                data: {
                    action: 'more',
                    size: 50,
                    _: new Date()
                }
            })
        } catch (err) {
            Alert.alert('Error', err['errorMsg'])
        }
    }
}


