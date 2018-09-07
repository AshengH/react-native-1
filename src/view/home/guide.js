import React,{Component} from 'react'
import {View,Image,ScrollView,TouchableOpacity,StyleSheet} from 'react-native'
import {Header} from './../../common/index'
import { SafeBody, SCREEN_WIDTH } from '../../lib/adjust';

import commonStyles from './../../style/variable'
export default class App extends Component{
    constructor(props){
        super(props);
    }

    render(){

        return(
            <SafeBody>
                <Header title={'榜单排名'}/>
                <ScrollView style={{width:SCREEN_WIDTH}}>
                    <Image
                        style={{alignSelf:'center'}}
                        source={require('./../../images/bg-guide.jpg')}
                    />
                </ScrollView>
            </SafeBody>

        )
        // return(
        //     <SafeBody>
        //             <Header title={'Guideline'}/>
        //             <ScrollView>
        //                 <Image
        //                     style={{flex:1}}
        //                     source={require('./../../images/bg-guide.jpg')}/>
        //             </ScrollView>
        //     </SafeBody>
        // );
    }
}

const styles = StyleSheet.create({
    button:{
        position:'absolute',
        bottom:45,
        left:82,
        width:220,
        height:50
    }
});