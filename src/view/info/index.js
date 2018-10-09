import React,{Component} from 'react';

import {
    completeNum,
    formatDate
} from "../../lib/tool";

import {
    View,
    Text
} from 'react-native';

import {
    Button
} from 'react-native-elements';

import {
    locale,
    GMT,
    lang
} from "../../config";

import {
  SafeBody
} from "../../lib/adjust";

import {
    Header
} from "../../common/index";

export default class Info extends Component {
    constructor(props){
        super(props)
    }
    render(){
        const {params:{type}} = this.props.navigation.state;
        const d = new Date();
        return (
            <SafeBody>
                <Header title="Info" navigation={this.props.navigation}/>
                <Text style={{alignSelf:'center'}}>设备语言 {locale} {lang} {type}</Text>
                <Text style={{alignSelf:'center',fontSize:17}}>{formatDate('y m-d h:i',{date:d})}</Text>
                <Text style={{alignSelf:'center',fontSize:17}}>{d.getUTCFullYear()} {completeNum(d.getUTCMonth()+1)}-{d.getUTCDate()} {completeNum(d.getUTCHours())}:{completeNum(d.getUTCMinutes())}</Text>
            </SafeBody>
        )
    }
}