import React, {Component} from 'react'
import {Text, View, Alert,WebView,TouchableOpacity} from 'react-native'
import {SafeBody, SCREEN_WIDTH} from "../../../lib/adjust";
import {withNavigation} from 'react-navigation'
import TapTitle from '../../home/tapTitle'
import {UI_ACTIVE_HOVER_COLOR} from "../../../lib/color";
import {lang} from "../../../lang";
import req from '../../../lib/req'
import {formatDate} from "../../../lib/tool";
import {Schedule} from "../../../module";
import styles from './../../../style/home/noticePart'
import {
    SafeBody
} from "../../../lib/adjust";
import {
    Header
} from "../../../common";

class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            notices : [],
            label:'Announcement'
        }
    }

    renderCell(){
        return this.state.notices.map((item,i)=>{
            if (item.isShow) {
                return (
                    <View key={i} style={styles.cellRoot}>
                        <TouchableOpacity onPress={()=>this.showContent(i)} style={styles.titleWrapper}>
                            <Text style={styles.title}>{item.title}</Text>
                        </TouchableOpacity>

                        <View style={styles.contentWrapper}>
                            <Text style={styles.content}>{item.content}</Text>
                            <Text style={styles.date}>{formatDate('y-m-d h:i:s ',{date:item.time['time']})}</Text>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View key={i} style={styles.cellRoot}>
                        <TouchableOpacity onPress={()=>this.showContent(i)} style={styles.titleWrapper}>
                            <Text style={styles.title}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        });
    }

    render() {
        return (
            <SafeBody>
                <Header/>
                <View style={styles.root}>
                    <Text style={styles.plaformTitle}>{lang(this.state.label)}</Text>
                    {this.renderCell()}
                </View>
            </SafeBody>

        )
    }

    componentDidMount() {
        this.getNotice();
        Schedule.addEventListener('updateLanguage',this.updateLabel,this);
    }

    async getNotice() {
        try {
            let result = await req({
                url: '/discover/index.htm',
                type: 'GET'
            });
            for (let index of result['notices']) {
                index.isShow = false;
                index.content = index.content.replace(new RegExp('<p>','g'),'')
                index.content = index.content.replace(new RegExp('</p>','g'),'')
                index.content = index.content.replace(new RegExp(' ','g'),'')
            }
            this.setState({
                notices:result['notices']
            });
        } catch (err) {
            Alert.alert(lang('Error'), err['errorMsg'])
        }
    }

    updateLabel(){
        this.setState({
            label:'Announcement'
        })
    }

    showContent(i){
        let o = this.state.notices;
        let e = o[i];
        e.isShow = !e.isShow
        this.setState({
            notices:o
        });
    }

    componentWillUnmount(){
        Schedule.removeEventListeners(this);
    }
}

export default withNavigation(App)