import React,{Component} from 'react'
import {View,WebView} from 'react-native'
import { SafeBody } from '../../lib/adjust';
import { Header } from '../../common';
import { formatDate } from '../../lib/tool';


export default class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let item = this.props.navigation.state.params.item;
        let date = formatDate('y-m-d    h:i:s ',{date:item.time['time']});
        let html = `
            <!DOCTYPE html>
                <html>
                    <head>
                        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
                    <head>
                    <body style="margin:0;">
                        <div style="padding:10px">
                            <div>${item.title}</div>
                            <div style="color:#8f8e94">${date}</div>
                        </div>
                        <div style="padding:0 10px">
                            ${item.content}
                        </div>
                    <body>
                    <style type="text/css">
                        img {width:100% ! important}
                    </style>
                <html>
            `

        return(
            <SafeBody>
                <Header title={'Notice detail'} navigation={this.props.navigation}/>
                <WebView source={{html:html}}/>
            </SafeBody>
        );
    }
}