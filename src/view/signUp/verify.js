import React, { Component } from "react";
import {View,Text,Image,Animated,Easing,TextInput,TouchableOpacity,StyleSheet,Dimensions,Alert,ScrollView,Keyboard} from 'react-native'
import { HOST, DefaultLanguage } from "../../config";
import req from "../../lib/req";
import {lang} from '../../lang';
const {width,height} = Dimensions.get('window');
import styles from './../../style/signUp/Verify'
export default class verity extends Component {
    constructor(props){
        super(props);

        this.state = {
            fadeInOpacity: new Animated.Value(0),
            verifyURL:HOST+`/vf/verifyCode.jpg?_=${new Date()}`,
            isShow:false,
            heightOffset:new Animated.Value(height*2),
            code:''
        }
    }

    componentDidMount(){
        Animated.timing(this.state.fadeInOpacity,{
            toValue:0.8,
            duration:300
        }).start();
    }

    render(){
        if (this.state.isShow) {
            return(
                <Animated.View style={styles.root}>
                <Animated.View style={[styles.background,{opacity:this.state.fadeInOpacity}]}>
                        
                        </Animated.View>
                    <ScrollView style={styles.scrollViewBackground}>
                    
                        <Animated.View style={[styles.contentRoot,{marginTop:this.state.heightOffset}]}>
                            <Text style={styles.titleText}>{lang("Verification Code")}</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput style={styles.codeInput} placeholder={lang('Enter Code')} value={this.state.code} onChangeText={text=>this.setState({code:text})}/>
                                <TouchableOpacity onPress={()=>this.changeVerifyURL()}>
                                    <Image style={styles.verifyImage} source={{uri:this.state.verifyURL}}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.descText}>{lang('Click picture and change code')}</Text>
                            <View style={styles.buttonsWrapper}>
                                <TouchableOpacity style={styles.button} onPress={()=>this.submit()}>
                                    <Text style={styles.buttonText}>{lang('OK')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={()=>this.cancel()}>
                                    <Text style={styles.buttonText}>{lang('Cancel')}</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </ScrollView>
                </Animated.View>
            );
        }else{
            return(<View></View>);
        }
    }

    showVerify(){
        this.setState({
            isShow:true
        },()=>{
            Animated.timing(this.state.fadeInOpacity,{
                toValue:0.8,
                duration:200
            }).start();
            Animated.timing(this.state.heightOffset,{
                toValue:height/2-183/2,
                duration:200
            }).start();
        });
    }

    hideVerify(){
        Animated.timing(this.state.fadeInOpacity,{
            toValue:0,
            duration:200
        }).start();
        Animated.timing(this.state.heightOffset,{
            toValue:height,
            duration:200
        }).start(()=>{
            this.setState({
                isShow:false
            });
        });
    }

    changeVerifyURL(){
        this.setState({
            verifyURL:HOST+`/vf/verifyCode.jpg?_=${new Date()}`
        });
    }

    cancel(){
        Keyboard.dismiss();
        this.hideVerify();
    }

    submit(){
        Keyboard.dismiss();
        if (this.state.code === '') {
            return alert(lang("Please input your verification code"));
        }
        this.hideVerify();
        this.props.submit({mobile:this.props.mobileNumber,code:this.state.code})
    }
}