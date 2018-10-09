import React, {Component} from 'react';

import {Text,View,TouchableHighlight,ScrollView, StyleSheet} from 'react-native'

import {RATIO, SafeBody} from "../../../lib/adjust";
import Icons from 'react-native-vector-icons/Ionicons'
import {Header} from "../../../common";
import {getAvailableLanguage, lang, setLanguage,currentLanguage} from "../../../lang";
import {UI_ACTIVE_COLOR, UI_ACTIVE_HOVER_COLOR,BACKGROUND_COLOR} from "../../../lib/color";
import styles from './../../../style/account/accountSet/languageSet'

export default class App extends Component{
    constructor(props){
        super(props);
        const ln = currentLanguage();
        this.state = {
            set:ln
        }
    }

    render(){
        const list = getAvailableLanguage();
        return(
            <SafeBody>
                {/*头部*/}
                <Header title={'Language setting'} navigation={this.props.navigation}/>
                <ScrollView style={styles.scrollVIewBackground}>
                    {
                        list.map(({name,value,des})=>{
                            let iconColor = this.state.set===value?UI_ACTIVE_COLOR:null
                            return(
                                <TouchableHighlight onPress={()=>this.changeLanguage(value)}>
                                    <View style={styles.cellRoot}>
                                       <View>
                                           <Text style={styles.title}>{name}</Text>
                                           <Text style={styles.desc}>{des}</Text>
                                       </View>
                                        <Icons
                                            name={`ios-checkmark-circle`}
                                            size={25}
                                            style={[{color:iconColor},styles.icon]}
                                        />
                                    </View>
                                </TouchableHighlight>
                            )
                        })
                    }

                    <TouchableHighlight style={styles.button} activeOpacity={1} underlayColor={UI_ACTIVE_HOVER_COLOR} onPress={() => {
                        this.submit()
                    }}>
                        <Text style={styles.doneStyle}>{lang('Save')}</Text>
                    </TouchableHighlight>
                </ScrollView>
            </SafeBody>
        )
    }
    changeLanguage(value){
        this.setState({set:value})
    }
    submit(){
        setLanguage(this.state.set);
        this.props.navigation.popToTop();
    }
}