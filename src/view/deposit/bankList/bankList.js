import React, {Component} from 'react';

import {NavigationActions} from 'react-navigation';

import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Alert,
    ScrollView,
    ListView,
} from 'react-native'

import Icons from 'react-native-vector-icons/Ionicons';

import {Header,Type} from "../../../common";

import {lang} from "../../../lang";

import {RATIO, SafeBody, SCREEN_WIDTH} from "../../../lib/adjust";

import req from '../../../lib/req'

import {UI_ACTIVE_COLOR,BACKGROUND_COLOR} from "../../../lib/color";


let banks = require('./bankList.json').bankList;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
        this.renderRow = this.renderRow.bind(this);
    }

    render() {
        return (
            <SafeBody>
                <Header
                    title={'Bank'}
                />
                <ListView
                    renderRow={this.renderRow}
                    dataSource={this.state.dataSource}
                    style={bankListStyles.container}
                />
            </SafeBody>
        )
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight onPress={()=>{
                this.clickBack(rowData)
            }}>
                <View style={bankListStyles.cell}>
                    <Text style={bankListStyles.text}>
                        {rowData}
                    </Text>
                    <Icons
                        name={`ios-disclosureIndicator`}
                        size={26}
                        color={'#EEC544'}
                        style={{alignSelf: 'center', marginLeft: 10}}
                    />
                </View>
            </TouchableHighlight>
        )
    }

    clickBack(name){
        this.props.navigation.state.params.getBankName(name);
        this.props.navigation.pop()
        // this.props.navigation.state.params.getBankName(name);

    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(banks),
        });
    }
}

const bankListStyles = StyleSheet.create({
        container:{
            backgroundColor:'white',
        },
        cell:{
            backgroundColor:'white',
            height:50,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            borderBottomWidth:0.5,
            borderColor:'gray',
            marginHorizontal:10,
        },
        text:{
            fontSize:17,
        }
});