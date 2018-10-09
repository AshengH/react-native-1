import React, {Component} from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    Alert,
    Image
} from 'react-native';
import {Header} from "../../common";
import {
    SafeBody,
    SCREEN_WIDTH,
    SCREEN_HEIGHT
} from "../../lib/adjust";

import {
    BASIC_FONT_COLOR,
    RAISE,
    FALL,
    SCHEME_THREE_BACKGROUND_COLOR,
} from "../../lib/color";

export default class App extends Component {
    constructor(props) {
        super(props);
        // this.state = {}
    }

    render(){

        let volume_ranking = '../../images/Nf-img/volume_ranking.jpg';

        return(
            <SafeBody>
                <Header title={'榜单排名'}/>
                <ScrollView>
                    <Image
                        style={{flex:1}}
                        source={require(volume_ranking)}
                    />
                </ScrollView>
            </SafeBody>

        )
    }


    componentDidMount() {

    }
}
const topListStyle=StyleSheet.create({
    topBgImg:{
    },
});