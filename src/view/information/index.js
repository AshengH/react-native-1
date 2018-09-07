import React, {Component} from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from 'react-native';

import {
    TabNavigator,
    StackNavigator
} from 'react-navigation';

import {
    Header
} from "../../common";

import {
    SafeBody
} from "../../lib/adjust";
import NewsDetail from '../information/petrolGoldDetail/index'
import commonStyles from './../../style/variable'
import LiveInformation from './liveInformation/index'
import PetrolAndGold from './petrolAndGold/index'
import { LINE_COLOR, UI_ACTIVE_COLOR } from '../../lib/color';
import { lang } from '../../lang';

 class information extends Component {
    scrollView = null;
    constructor(props) {
        super(props);
        this.state = {
            content:'live'
        }
    }

    renderContentView(){
        if (this.state.content === 'live') {
            return(
                <LiveInformation navigation={this.props.navigation}/>
            );
        }else{
            return(
                <PetrolAndGold navigation={this.props.navigation}/>
            );
        }
    }

    renderButtons(){

        let liveBorderColor = this.state.content === 'live'?UI_ACTIVE_COLOR:'transparent';
        let oilBorderColor = this.state.content === 'oil'?UI_ACTIVE_COLOR:'transparent';

        return(
            <View style={styles.buttonsRoot}>
                <TouchableOpacity style={[styles.buttonTouchable,{borderBottomColor:liveBorderColor}]} onPress={()=>this.changeContent('live')}>
                    <Text style={styles.buttonText}>{lang('Live')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonTouchable,{borderBottomColor:oilBorderColor}]} onPress={()=>this.changeContent('oil')}>
                    <Text style={styles.buttonText}>{lang('Petrol & Gold')}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        console.log(this.props.navigation);
        return (
            <SafeBody>
                <View style={commonStyles.fillStyle}>
                    <Header title={'Information'} customBack={() => this.props.navigation.navigate('Home')}/>
                    {this.renderButtons()}
                    <View style={commonStyles.fillStyle}>
                        {this.renderContentView()}
                    </View>
                </View>
            </SafeBody>
        );
    }

    changeContent(value){
        this.setState({
            content:value
        })
    }
}

const styles = StyleSheet.create({
    buttonText:{
        textAlign:'center',
        fontSize:16
    },
    buttonTouchable:{
        paddingVertical:15,
        width:'50%',
        justifyContent:'center',
        borderBottomWidth:2
    },
    buttonsRoot:{
        width:'100%',
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:LINE_COLOR
    }
});

export default StackNavigator({

    App:{
        screen: information,
        navigationOptions: {
            header: null,

        }
    },
    NewsDetail:{
        screen: NewsDetail,
        navigationOptions: {
            header: null,

        }
    }
});