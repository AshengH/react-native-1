import React,{Component} from 'react';


import {
    StyleSheet,
    Text,
    FlatList,
    Alert,
    View,
    WebView,
    Image
} from 'react-native';

import Header from '../../../common/header';

import {
    SafeBody
} from "../../../lib/adjust";
import req from "../../../lib/req"

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news:null
        }
    }

    componentDidMount(){
        this.fetchData()
    }

    async fetchData(){
        let itemId = this.props.navigation.state.params.itemId;
        try {
            let result = await req({
                url: '/news/newsDetail.htm',
                data:{
                    id:itemId
                },
                animate:true
            });
                this.setState({
                    news:result.news,
                });

        } catch (err) {
            Alert.alert('Error', err['errorMsg'] || err)
        }
    }

    renderWebview(){
        if (this.state.news === null) {
            return null
        }else{
            
            let html = `
        <!DOCTYPE html>
            <html>
                <head>
                    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
                <head>
                <body style="margin:0;">
                    <div style="background-color:#eeeff0;padding:10px">
                        <div>${this.state.news.title}</div>
                        <div>${this.state.news.date}</div>
                    </div>
                    <div style="padding:0 10px">
                        ${this.state.news.content}
                    </div>
                <body>
                <style type="text/css">
                    img {width:100% ! important}
                </style>
            <html>
    `
            return(
                <WebView
                    automaticallyAdjustContentInsets={false}
                    source={{html:html}}
                    javaScriptEnabled={true}
                    decelerationRate="normal"
                />
            );
        }
    }

    render() {
        
        return (
            <SafeBody>
                <Header title={'Information detail'}/>
                {this.renderWebview()}
            </SafeBody>
        )
    }
}

const  petrolGoldDetailStyle = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
    },
    titleBg:{
        position:'absolute',
        left:0,
        right:0,
        height:100,
    },
    titleLabel:{
        fontSize: 18,
        marginLeft:10,
    },
    timeLabel:{
        fontSize: 15,
        marginLeft:10,
    },
    webView:{

    }
});