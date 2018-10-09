import React,{Component} from 'react';

import {
    View,
    Text
} from 'react-native';

import {
    ButtonGroup
} from 'react-native-elements'

import {
    RATIO,
    SafeBody
} from "../../lib/adjust";

import {
    Header
} from "../../common";

import {
    BASIC_FONT_COLOR,
    UI_ACTIVE_COLOR
} from "../../lib/color";

import {
    Data,
    Schedule
} from "../../module";

import {lang} from '../../lang'

import FuturesList from './futuresList'
import { HAS_CRYPTO } from '../../config';
import styles from './../../style/futures/index'

const component1 = () => <Text>{lang('Fiat Futures')}</Text>;
const component2 = () => <Text>{lang('Crypto Futures')}</Text>;

export default class App extends Component{
    constructor(props){
        super(props);
        const {params:{type}} = this.props.navigation.state;

        this.state = {
            selectedIndex:type,
        };
        let d;
        if(Data.initial){
            if(type){
                d = Data.digitalBrief;
            }else{
                d = Data.foreignBrief;
            }
        }else{
            d = [];
        }
        this.state.data = d;
        this.updateIndex = this.updateIndex.bind(this);
    }
    
    updateIndex(selectedIndex){
        this.setState({selectedIndex});
        if(Data.initial){
            let d;
            if(selectedIndex){
                d = Data.digitalBrief;
            }else{
                d = Data.foreignBrief;
            }
            this.setState({data:d});
        }
    }
    componentWillMount(){
        if(Data.initial){
            Data.start('updateFutures');
            Schedule.addEventListener('updateFutures',this.receiveUpdate,this)
        }else{
            Schedule.addEventListener('contractsInitial',this.receiveInit,this)
        }
    }
    receiveInit(){
        if(Data.initial){
            let d;
            if(this.state.selectedIndex){
                d = Data.digitalBrief;
            }else{
                d = Data.foreignBrief;
            }
            let n = [];
            for(let o of d){
                n.push(Object.assign({},o))
            }
            this.setState({data:n});
            Schedule.removeEventListeners(this);
            Data.start('updateFutures');
            Schedule.addEventListener('updateFutures',this.receiveUpdate,this)
        }
    }
    receiveUpdate(){
        let d;
        if(this.state.selectedIndex){
            d = Data.digitalBrief;
        }else{
            d = Data.foreignBrief;
        }
        let n = [];
        for(let o of d){
            n.push(Object.assign({},o))
        }
        this.setState({data:n});
    }

    renderButtonGroup(){
        if (HAS_CRYPTO) {
            return(
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={buttons}
                    buttonStyle={styles.buttonGroup_buttonStyle}
                    textStyle={styles.buttonGroup_textStyle}
                    selectedButtonStyle={styles.buttonGroup_selectedButtonStyle}
                    containerStyle={styles.buttonGroup_containerStyle}
                    containerBorderRadius={0.5}
                />
            );
        }else{
            return(
                <View></View>
            );
        }
    }

    render(){
        const buttons = [{ element: component1 }, { element: component2 }];
        return(
            <SafeBody>
                <View style={styles.root}>
                    <Header title={'All Futures'} navigation={this.props.navigation}/>
                    {this.renderButtonGroup()}
                    <FuturesList list={this.state.data} navigation={this.props.navigation}/>
                </View>
            </SafeBody>
        )
    }
    componentWillUnmount() {
        Schedule.removeEventListeners(this);
        Data.end('updateFutures');
    }
}