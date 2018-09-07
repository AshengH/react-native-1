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

import {BACKGROUND_COLOR} from '././../../lib/color'
import Rule from './../../module/rules'
import {
    SafeBody
} from "../../lib/adjust";

import {
    Header
} from "../../common/index";

import {lang} from "../../lang";

import {GRID_LINE_COLOR} from "../../lib/color";
import styles from './../../style/rules/index';
import EnRules from '../../rules/enTradeRule';
import Zh_cnRules from '../../rules/zh_cnTradeRule';
import {getCurrentlyLanguage} from "../../lang";

export default class App extends Component {

    static defaultProps = {
        
    };

    constructor(props) {
        super(props);

        this.state = {
            rule:'',
            info:[
                {
                    title:lang('Novice practice'),
                    content:lang('If you are a novice and have no trading experience, I suggest you go to the simulation practice area for a simulated transaction.'),
                    isShow:false
                },
                {
                    title:lang('What is standard/mini?'),
                    content:lang('Select \'Standard\' Margin to trade on the basis of Yuan, select \'Mini\' Margin and handling fee will be reduced by 10 times on the basis of Yuan.'),
                    isShow:false
                },
                {
                    title:lang('What is buying up?'),
                    content:lang('When you buy up, you will make money if the price goes up, and lose money if the price falls.'),
                    isShow:false
                },
                {
                    title:lang('What is buying down?'),
                    content:lang('When you buy down, you will make money when the price falls, and lose money if the price goes up.'),
                    isShow:false
                },
                {
                    title:lang('What is the take profit?'),
                    content:lang('When a single transaction profit amount triggers (more than equals) the specified take profit amount, the trade is forced to close. /n Since the price of the market is changing in real time, there is no guarantee that the final profit amount after the position is closed must be greater than or equal to the take profit amount, which may be less than the triggered take profit amount.'),
                    isShow:false
                },
                {
                    title:lang('What is stop loss?'),
                    content:lang('When a single transaction loss amount triggers (more than equals) the specified stop loss amount, the trade is forced to close. /n Since the price of the market is changing in real time, there is no guarantee that the final loss amount after selling will be less than or equal to the stop loss amount, which may be greater than the stop loss amount.'),
                    isShow:false
                },
                {
                    title:lang('When is the time of the position?'),
                    content:lang('US crude oil futures final position: the next day 04:55:00 / n When the position is up to the point, the trade in the position will be forced to close the position, do not guarantee the transaction price, please be sure to choose to sell before the expiration.'),
                    isShow:false
                },
                {
                    title:lang('Rising and falling trading restrictions'),
                    content:lang('When the trading volume increases by 20%, it is forbidden to buy, and when the price drops by 20%, it is forbidden to buy. When the /n trading volume rises by 30%, all the trades that are bought and sold in the position are forced to close, and when the decrease is ⩾30%, the trading in the position is forced to liquidate.'),
                    isShow:false
                },
                {
                    title:lang('Performance bond'),
                    content:lang('The performance bond is the margin for the trader to entrust the platform to freeze the obligation to pay for the loss of the transaction. The trader uses the frozen performance bond as the upper limit for the loss of the transaction. The excess of the upper limit is entirely borne by the cooperating investor. After the /n cooperation transaction ends, according to the settlement result, if the transaction is profitable, the trader\'s frozen performance bond will be refunded in full. If the transaction is at a loss, from the frozen performance bond, the amount of the loss payable by the trader shall be deducted, and the deducted balance shall be refunded.'),
                    isShow:false
                },
                {
                    title:lang('How to distribute profit'),
                    content:lang('100% profit is owned by the trader, investors do not participate in profit sharing.'),
                    isShow:false
                },
            ]
        }
    }

    componentDidMount(){
        let contract = this.props.navigation.state.params.contract;
        // let contractCode = this.props.navigation.state.params.code;
        let contractCode = contract;

        // let currentLang = defaultLang || getCurrentlyLanguage().value;
        //
        // if (currentLang === 'zh_cn' && this.zh_hansRule) {
        //     result = this.zh_hansRule
        // }else if(currentLang === 'en' && this.enRule){
        //     result = this.enRule


        let currentLang = getCurrentlyLanguage().value;
        if(currentLang === 'zh_cn'){
            this.setState({
                rule:Zh_cnRules[contractCode]
            });
        }
        else if(currentLang === 'en'){
            this.setState({
                rule:EnRules[contractCode]
            });
        }

        // (
        //     async()=>{
        //         try{
        //             let rule = await Rule.getRule();
        //             this.setState({
        //                 rule:rule[contractCode],
        //                 contract:contract
        //             });
        //
        //         }catch(err){
        //             //no language file
        //             if (err === 'no language file'){
        //                 let rule = await Rule.getRule('en');
        //                 this.setState({
        //                     rule:rule[contractCode],
        //                     contract:contract,
        //                 });
        //             }
        //         }
        //     }
        // )()
    }


    renderInfo(){
        let content = this.state.info.map((item,i)=>{
            if (item.isShow) {
                return(
                    <View key={i} style={styles.infoCellRoot}>
                        <TouchableHighlight onPress={()=>this.selectInfo(i)}>
                            <View>
                                <View style={styles.descWrap}>
                                    <Text style={styles.leftDesc}>{item.title}</Text>
                                    <Text style={styles.rightDesc}>{lang("more >")}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <Text style={styles.infoContent}>{item.content}</Text>
                    </View>
                );
            }else{
                return(
                    <View key={i} style={styles.infoCellRoot}>
                        <TouchableHighlight onPress={()=>this.selectInfo(i)}>
                            <View>
                                <View style={styles.descWrap}>
                                    <Text style={styles.leftDesc}>{item.title}</Text>
                                    <Text style={styles.rightDesc}>{lang("more >")}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                );
            }
        });
        return content;
    }


    render() {
        return (
            <SafeBody>
                <Header title={'Rules'} navigation={this.props.navigation}/>
                <ScrollView style={styles.scrollViewBackground}>
                    <View style={{}}>
                        <View style={styles.textBox}>
                            <Text style={styles.left}>{lang('Transaction kind')}</Text>
                            <Text style={styles.right}>{this.state.rule && this.state.rule.name || '-'}</Text>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={[styles.left, {backgroundColor: GRID_LINE_COLOR}]}>{lang('Currency unit')}</Text>
                            <Text style={styles.right}>{lang('Dollar')}</Text>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.left}>{lang('Trading unit')}</Text>
                            <Text style={styles.right}>{this.state.rule && this.state.rule.unit || '-'}</Text>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={[styles.left, {backgroundColor: GRID_LINE_COLOR}]}>{lang('Minimum fluctuation')}</Text>
                            <Text style={styles.right}>{this.state.rule && this.state.rule.volatility || '-'}</Text>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.left}>{lang('Fluctuating profit and loss')}</Text>
                            <Text style={styles.right}>{this.state.rule && this.state.rule.volatilityIncome || '-'}</Text>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={[styles.left, {backgroundColor: GRID_LINE_COLOR}]}>{lang('transaction time')}</Text>
                            <Text style={styles.right}>{this.state.rule && '[' + lang('Time of purchase') + ']' + '\n' + this.state.rule.buyTimeAM +'\n' + '[' + lang('Time of sale') + ']' + '\n' + this.state.rule.sellTimeAM || '-'}</Text>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.left}>{lang('Clearance time')}</Text>
                            <Text style={styles.right}>{this.state.rule && this.state.rule.clearTime || '-'}</Text>
                        </View>
                        {/*<View style={styles.textBox}>*/}
                            {/*<Text style={[styles.left, {backgroundColor: GRID_LINE_COLOR}]}>{lang('Open position fixed spread')}</Text>*/}
                            {/*<Text style={styles.right}>$158</Text>*/}
                        {/*</View>*/}
                        <View style={styles.textBox}>
                            <Text style={[styles.left, {backgroundColor: GRID_LINE_COLOR}]}>{lang('Transaction fees')}</Text>
                            <Text style={styles.right} numberOfLines={0}>{this.state.rule && this.state.rule.chargeUnit || '-'}</Text>
                        </View>
                        <View style={styles.textBox}>
                            <Text style={styles.left}>{lang('Exchange rate')}</Text>
                            <Text style={styles.right}>{this.state.rule && this.state.rule.rate || '-'}</Text>
                        </View>
                    </View>
                    <View style={styles.introductionView}>
                            <Text>{this.state.rule && this.state.rule.introduce || '-'}</Text>
                    </View>
                    {this.renderInfo()}
                </ScrollView>
            </SafeBody>
        )
    }

    selectInfo(index){
        let tempInfo = this.state.info;
        let element = tempInfo[index];
        element.isShow = !element.isShow;
        this.setState({
            info:tempInfo
        });
    }
}