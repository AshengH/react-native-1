import {StyleSheet} from 'react-native'
import {UI_ACTIVE_COLOR, NOTICE_CONTENT_FONT_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    button:{
        alignSelf:'center',
        paddingVertical:5,
        paddingHorizontal:10,
        // height:40,
        // flex:1,
        borderWidth:1,
        borderColor:NOTICE_CONTENT_FONT_COLOR,
        borderRadius:4,
        overflow:'hidden'
        // margin:10
    },
    buttonActive:{
        // borderBottomWidth:3,
        // borderBottomColor:UI_ACTIVE_COLOR,
        borderWidth:1,
        color:UI_ACTIVE_COLOR,
        paddingVertical:2,
        paddingHorizontal:5,
        // margin:10
    },
    buttonContent:{
        // lineHeight:40,
        // paddingHorizontal:8
    }
});