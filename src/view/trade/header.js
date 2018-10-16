import React, {Component} from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Image, AsyncStorage
} from 'react-native';

import {
    lang
} from "../../lang";

import Icons from 'react-native-vector-icons/Ionicons'

import {
    Cache, Contracts,Schedule
} from "../../module";

import JsonUtils from '../../common/jsonUtils'

import {
    HEADER_COLOR,
    HEADER_FONT_COLOR, UI_ACTIVE_COLOR
} from "../../lib/color";

import {
    isIphoneX, RATIO, SCREEN_WIDTH
} from "../../lib/adjust";
import styles from './../../style/trade/header' 
import commonStyles from './../../style/variable'
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            simulate: true,
            name: '获取中',
            code: '',
            active: false
        };

        // //todo 获取缓存
        if (AsyncStorage.getItem('self') !== null) {
            this.getSelf()
        }
    }

    render() {
        if (isIphoneX()) {
            return (
                <View style={styles.container}>
                    <View style={styles.body}>
                        <Icons name={`ios-arrow-back`} style={styles.back} onPress={() => {
                            this.props.navigation.goBack();
                            this.props.onPress(true);
                        }}/>
                        <View style={styles.headerRoot}>
                            {/*<View style={styles.btnBox}>*/}
                                <TouchableHighlight onPress={() => {this.props.onPress()}}>
                                    <View style={commonStyles.rowStyle}>
                                        <View>
                                            <Text style={styles.switchBtn}>


                                                {this.props.commodity===''?this.props.commodity:Contracts.total[this.props.commodity].name}</Text>
                                            <Text style={{color:'#fff'}}>
                                                {this.props.commodity===''?this.props.commodity:Contracts.total[this.props.commodity].contract}</Text>
                                        </View>
                                        {/*<View style={[styles.triangle]}>*/}
                                        {/*</View>*/}
                                    </View>
                                </TouchableHighlight>
                        </View>
                        <Icons name={`ios-list-box-outline`} style={styles.listIcon} onPress={() => {
                            this.props.navigation.navigate('Rule',{contract:Contracts.total[this.props.commodity].code});
                        }}/>
                        {/*<Icons name={this.state.active ? `ios-star` : 'ios-star-outline'} style={styles.listIcon} onPress={() => {*/}
                            {/*if (Cache.isLogin()) {*/}
                                {/*this.chooseStar(this.props.commodity)*/}
                                {/*// this.props.navigation.navigate('Position');*/}
                                {/*// this.props.onPress(true);*/}
                            {/*}*/}
                        {/*}}/>*/}
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <View style={commonStyles.heightOffset}>

                    </View>
                    <View style={styles.body}>
                        <Icons name={`ios-arrow-back`} style={styles.back} onPress={() => {
                            this.props.navigation.goBack();
                            this.props.onPress(true);
                        }}/>
                        <View style={styles.headerRoot}>
                                <TouchableHighlight onPress={() => {this.props.onPress()}}>
                                    <View style={commonStyles.rowStyle}>
                                        <View>
                                            <Text style={styles.switchBtn}>{this.props.commodity===''?this.props.commodity:Contracts.total[this.props.commodity].name}</Text>
                                            <Text style={{alignSelf:'center'}}>{this.props.commodity===''?this.props.commodity:Contracts.total[this.props.commodity].contract}</Text>
                                        </View>
                                        <View style={[styles.triangle]}>
                                        </View>
                                    </View>
                                </TouchableHighlight>

                        </View>
                        <Icons name={`ios-list-box-outline`} style={styles.listIcon} onPress={() => {
                            this.props.navigation.navigate('Rule',{contract:Contracts.total[this.props.commodity].code});
                        }}/>
                        {/*<Icons name={this.state.active ? `ios-star` : 'ios-star-outline'} style={styles.listIcon} onPress={() => {*/}
                            {/*if (Cache.isLogin()) {*/}
                                {/*this.chooseStar(this.props.commodity)*/}
                                {/*// this.props.navigation.navigate('Position');*/}
                                {/*// this.props.onPress(true);*/}
                            {/*}*/}
                        {/*}}/>*/}
                    </View>
                </View>
            )
        }
    }

    forward() {
        this.props.navigation.navigate('Rules', {code: Contracts.total[this.props.commodity].code,contract:this.props.commodity});
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.location.state.simulate !== nextProps.location.state.simulate) {
    //         const o = Contracts.total[nextProps.location.state.contract];
    //         this.setState({
    //             simulate: nextProps.location.state.simulate,
    //             name: o.name,
    //             code: o.contract,
    //         })
    //     }
    // }

    componentWillUnmount() {
        Schedule.removeEventListeners(this)
    }

    updateContracts() {
        let c = Contracts.getContract(this);
        if (!!c) {
            this.setState({
                name: Contracts.total[c].name,
                code: c
            });
        }
    }

    //todo 获取
    async getSelf() {

        let aryStr = await AsyncStorage.getItem('self');
        let ary = JsonUtils.stringToJson(aryStr) || [];
        let code = this.props.commodity;
        if (ary.includes(code) === true) {
            this.state.active = true;
        }
    }

    //todo 选择自己喜欢
    async chooseStar(code) {
        // const o = Contracts.totalArray.find((n)=>{
        //     if (n.contract === this.config.passCode) {
        //         return n
        //     }
        // });
        // const code = o.code;
        // this.setState({contract: o.contract});
        console.log(code,'要存储的code');

        let aryStr = await AsyncStorage.getItem('self');
        let ary = JsonUtils.stringToJson(aryStr) || [];
        //todo 先检查是否存在，如果存在就移除， 如果不存在就添加
        console.log(ary,'打印数组');
        ary.includes(code) ? ary.remove(code) :  ary.push(code);
        let newAryStr = JsonUtils.jsonToString(ary);
        // this.setState({active: !this.state.active});
        // let Ary = ary;
        AsyncStorage.setItem('self', newAryStr);
        this.setState({
            active: !this.state.active
        })

        // Contracts.updateSelf()
    }

}

