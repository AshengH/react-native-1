import React, {Component} from 'react';

import {View, Text, ScrollView} from 'react-native';

import { SafeBody} from "../../../lib/adjust";
import {Header} from "../../../common";


import {FALL, RAISE,BACKGROUND_COLOR} from "../../../lib/color";
import {formatDate} from "../../../lib/tool";
import styles from './../../../style/account/accountSet/detailList'
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: 'Deposit($)'
        };
    }

    render() {

        let moneyColor = this.props.navigation.state.params.type === 100? RAISE:FALL

        return (
            <SafeBody>
                <Header title={'Fund Details'} navigation={this.props.navigation}/>
                <ScrollView style={styles.scrollViewBackground}>
                    <View style={styles.amountRoot}>
                        <Text style={[styles.money,{color:moneyColor}]}>{this.props.navigation.state.params.type === 100 ? '+' : '-'}{this.props.navigation.state.params.money}</Text>
                        <Text style={styles.status}>{this.state.status}</Text>
                    </View>
                    <View style={styles.infoRoot}>
                        <View style={styles.textWrapper}>
                            <Text>Complete time</Text>
                            <Text
                                style={styles.date}>{formatDate('y-m-d  h:i', {data: this.props.navigation.state.params.time})}</Text>
                        </View>
                        <View style={styles.textWrapper}>
                            <Text>Detail</Text>
                            <Text style={styles.explain}>{this.props.navigation.state.params.explain}</Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeBody>
        )
    }
}
