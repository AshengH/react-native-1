import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native'

import {
    withNavigation
} from 'react-navigation';

import Icons from 'react-native-vector-icons/Ionicons'
import {lang} from "../../lang";
import {BASIC_FONT_COLOR} from "../../lib/color";
import styles from './../../style/home/tapTitle'

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.root}>
                <View style={styles.verticalLine}>
                </View>
                <Text style={styles.title}>
                    {lang(this.props.title)}
                </Text>
                <Icons name='ios-arrow-forward' size={24} style={styles.backIcon} onPress={() => {
                    this.props.navigation.navigate(this.props.forward, {type: this.props.type})
                }}/>
            </View>
        )
    }
}

export default withNavigation(App);