import {StyleSheet} from 'react-native'
import {BASIC_FONT_COLOR,UI_ACTIVE_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    textWrapper:{
        alignSelf:'center',
        width:66,
        height:20,
        backgroundColor:BASIC_FONT_COLOR,
        borderRadius:8
    },
    text:{
        fontSize:17,
        color:UI_ACTIVE_COLOR,
        textAlign:'center',
        fontWeight:'700'
    }
});