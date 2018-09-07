import {StyleSheet} from 'react-native'
import { UI_ACTIVE_COLOR, HEADER_FONT_COLOR, LINE_COLOR } from '../../lib/color';
import { SCREEN_WIDTH } from '../../lib/adjust';

export default styles = StyleSheet.create({
    cellRoot:{
        paddingVertical:10
    },
    cellLeftWrapper:{
        width:SCREEN_WIDTH/3
    },
    cellMiddleWrapper:{
        width:SCREEN_WIDTH/3,
        alignItems:'center',
        justifyContent:'center'
    },
    cellRightWrapper:{
        width:SCREEN_WIDTH/3,
        alignItems:'center',
        justifyContent:'center'
    },
    cellLeftTitleText:{

    },
    cellLeftHotText:{
        fontSize:8,
        borderRadius:2,
        color:'white',
        marginTop:1,
        padding:1,
        overflow:'hidden'
    },
    priceText:{
        textAlign:'center',
        borderRadius:8,
        flexDirection:'row',
        paddingHorizontal:20,
        paddingVertical:5,
        overflow:'hidden',
        width:100
    },
    listSeparator:{
        backgroundColor:LINE_COLOR,
        width:'100%',
        height:1
    },
    listHeaderRoot:{
        marginVertical:10,
    },
});