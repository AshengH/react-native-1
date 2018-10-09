import React ,{Component} from 'react';

import {
    FlatList,
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import {
    Mask
} from "../lib/adjust";

import styles from './../style/common/select'

export default class App extends Component{
    constructor(props){
        super(props)
    }

    render(){
        if(this.props.show === true){
            return(
                <Mask>
                    {/*类似于原生的多选页面*/}
                    <FlatList
                        data={this.props.data}
                        renderItem={({item})=>{
                            return(
                                <TouchableHighlight onPress={()=>{
                                    this.props.onPress({name:item.name,value:item.value});
                                }} style={styles.touchable}>
                                    <View style={styles.textRoot}>
                                        <Text style={styles.text}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            )
                        }}C
                    />
                </Mask>
            )
        }else{
            return null;
        }
    }
}