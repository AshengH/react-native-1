import {StyleSheet} from 'react-native'
import {UI_ACTIVE_COLOR} from './../../lib/color'
export default styles = StyleSheet.create({
    button:{
        alignSelf:'center',
        paddingHorizontal:10,
        paddingVertical:5,
        borderWidth:1,
        borderRadius:4
        // margin:10
        // height:40
    },
    buttonActive:{
        borderBottomWidth:3,
        borderBottomColor:UI_ACTIVE_COLOR
    },
    buttonContent:{
        // lineHeight:40,
        // paddingHorizontal:8
    },

});