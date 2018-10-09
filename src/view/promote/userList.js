import React,{Component} from 'react'
import {View,Text,FlatList} from 'react-native'
import styles from './../../style/promote/userList'
import commonStyles from './../../style/variable'
import req from './../../lib/req'
import { Header } from '../../common';
import { lang } from '../../lang';
import { formatDate } from '../../lib/tool';

export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            users:[]
        }

        this.getUser()
    }

    getUser() {
        req({
            url: '/mine/unionUser.htm',
            type: 'GET',
            animate:true
        }).then((data) => {
            this.setState({
                users: data.users
            });
            console.log(data.users);
        })
    }

    renderHeader(){
        return(
            <View style={[commonStyles.fillStyle,commonStyles.rowStyle,styles.listHeaderRoot]}>
                <View style={commonStyles.fillStyle}>
                    <Text style={[commonStyles.centerView,styles.listHeaderText]}>{lang('User name')}</Text>
                </View>
                <View style={commonStyles.fillStyle}>
                    <Text style={[commonStyles.centerView,styles.listHeaderText]}>{lang('Day trading')}</Text>
                </View>
                <View style={commonStyles.fillStyle}>
                    <Text style={[commonStyles.centerView,styles.listHeaderText]}>{lang('Transaction history')}</Text>
                </View>
                <View style={commonStyles.fillStyle}>
                    <Text style={[commonStyles.centerView,styles.listHeaderText]}>{lang('Register Date')}</Text>
                </View>
            </View>
        );
    }

    renderItem(item){
        return(
            <View style={[commonStyles.fillStyle,commonStyles.rowStyle,styles.cellRoot]}>
                <View style={commonStyles.fillStyle}>
                    <Text style={commonStyles.centerView}>{item.username}</Text>
                </View>
                <View style={commonStyles.fillStyle}>
                    <Text style={commonStyles.centerView}>{item.dayTradeVolume}</Text>
                </View>
                <View style={commonStyles.fillStyle}>
                    <Text style={commonStyles.centerView}>{item.tradeVolume}</Text>
                </View>
                <View style={commonStyles.fillStyle}>
                    <Text style={commonStyles.centerView}>{formatDate('y-m-d',{date:item.loginTime.time})}</Text>
                </View>
            </View>
        );
    }

    render(){
        return(
            <View style={commonStyles.fillStyle}>
                <Header title={'My users'}/>
                <FlatList data={this.state.users} renderItem={obj=>this.renderItem(obj.item)} keyExtractor={(item, index) => item.key} ListHeaderComponent={this.renderHeader}/>
            </View>
        );
    }
}