import React,{Component} from 'react';
import {
    View
} from 'react-native';

export class ViewRow extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={[{flexDirection:'row'},this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}