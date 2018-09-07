import React, {Component} from 'react'
import {Text, View, Alert, ScrollView,TouchableOpacity,FlatList} from 'react-native'
import {UI_ACTIVE_HOVER_COLOR, GRAY_SVG_COLOR} from "../../lib/color";
import {lang} from "../../lang";
import req from '../../lib/req'
import {Header} from "../../common";
import {SafeBody} from "../../lib/adjust";
import {formatDate} from "../../lib/tool";
import styles from './../../style/notice/index'
import commonStyles from './../../style/variable'
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            notices : []
        }
    }

    renderSeparator(){
        return(
            <View style={{height:1,width:'100%',backgroundColor:GRAY_SVG_COLOR}}></View>
        );
    }

    renderItem(item){
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('NoticeDetail',{item:item})} style={styles.cellRoot}>
                <View style={commonStyles.fillStyle}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{item.title}</Text>
                    </View>
                    <Text style={styles.date}>{formatDate('y-m-d    h:i:s ',{date:item.time['time']})}</Text>
                </View>
                <View style={styles.triangle}></View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeBody>
                <Header title={'Notices'}  navigtion={this.props.navigation}/>
                <FlatList data={this.state.notices} renderItem={obj=>this.renderItem(obj.item)} ItemSeparatorComponent={this.renderSeparator} keyExtractor={(item,index)=>index}/>
            </SafeBody>
        )
    }

    componentDidMount() {
        this.getNotice()
    }

    async getNotice() {
        try {
            let result = await req({
                url: '/discover/index.htm',
                type: 'GET',
                animate:true
            });
            this.setState({notices:result.notices});
        } catch (err) {
            Alert.alert(lang('Error'), err['errorMsg'])
        }
    }
}
