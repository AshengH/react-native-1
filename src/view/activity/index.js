import React,{Component} from 'react'
import {TouchableOpacity,View,Text,Image,ScrollView} from 'react-native'
import { Header } from '../../common';
import { lang } from '../../lang';
import styles from './../../style/activity/index'
import commonStyles from './../../style/variable'
import { HEADER_BACKGROUND, HEADER_FONT_COLOR, LINE_COLOR, ACTIVITY_FONT_COLOR } from '../../lib/color';

const inviteFriend = require('./../../images/activity-inviteFriend.png');
const register = require('./../../images/activity-register.png');
export default class extends Component {
    constructor(props){
        super(props);

        this.state = {
            selectIndex:0,
            image:inviteFriend,
            height:0
        }
    }

    renderBottomButtons(){

        let selectedStyle = {backgroundColor:HEADER_BACKGROUND};
        let unselectStyle = {backgroundColor:HEADER_FONT_COLOR};

        let selectedTextStyle = {color:HEADER_FONT_COLOR};
        let unselectTextStyle = {color:ACTIVITY_FONT_COLOR};

        let firstButtonStyle = this.state.selectIndex === 0 ? selectedStyle : unselectStyle;
        let secondButtonStyle = this.state.selectIndex === 1 ? selectedStyle : unselectStyle;
        
        let firstButtonTextStyle = this.state.selectIndex === 0 ? selectedTextStyle : unselectTextStyle;
        let secondButtonTextStyle = this.state.selectIndex === 1 ? selectedTextStyle : unselectTextStyle;
        
        return(
            <View style={styles.bottomButtonRoot}>
                <Text style={styles.bottomButtonTitle}>{lang('Total 2 events')}</Text>
                <View style={commonStyles.rowStyle}>
                    <TouchableOpacity onPress={()=>this.selectedActivity(0)} style={[styles.bottomButtonTouchable,firstButtonStyle]}>
                        <Text style={[styles.bottomButtonText,firstButtonTextStyle]}>{'邀请好友\n交易有礼'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.selectedActivity(1)} style={[styles.bottomButtonTouchable,secondButtonStyle]}>
                        <Text style={[styles.bottomButtonText,secondButtonTextStyle]}>{'注册即送\n双重好礼'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render(){
        return(
            <View style={styles.root}>
                <Header title={'Activity'} navigation={this.props.navigation}/>
                <ScrollView contentContainerStyle={styles.imageWrapper}>
                    <Image style={styles.image} source={this.state.image}/>
                </ScrollView>
                {this.renderBottomButtons()}
            </View>
        );
    }

    selectedActivity(i){

        let image = i === 0 ? inviteFriend : register;

        this.setState({
            selectIndex:i,
            image:image
        });
    }
}