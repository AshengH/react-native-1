import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {SCREEN_WIDTH} from "../lib/adjust";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:''
        }
    }

    render() {
        return (
            <View style={inputStyles.container}>
                <Text style={{fontSize:18,marginLeft:15,alignSelf:'center'}}>{this.props.title}</Text>
                <TextInput
                    style={{fontSize:18,marginLeft:10}}
                    placeholder={this.props.placeholder}
                    maxLength={this.props.maxLength}
                    onChangeText={(v)=>{
                        this.setState({
                            value:v
                        });
                        this.props.callback(v);
                    }}
                />
            </View>
        )
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

const inputStyles = StyleSheet.create({
    container:{
        height:35,
        marginTop:10,
        width:SCREEN_WIDTH*0.9,
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderColor:'gray',
    },
});