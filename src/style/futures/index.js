import {StyleSheet} from 'react-native'
import {RATIO} from "../../lib/adjust";
import {UI_ACTIVE_COLOR,BACKGROUND_COLOR,GRAY_SVG_COLOR,HEADER_FONT_COLOR,BASIC_FONT_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    root:{
        backgroundColor:HEADER_FONT_COLOR,
        flex:1
    },
    buttonGroup_buttonStyle:{
        borderColor:UI_ACTIVE_COLOR
    },
    buttonGroup_textStyle:{
        color:BASIC_FONT_COLOR,
        fontSize:16
    },
    buttonGroup_selectedButtonStyle:{
        backgroundColor:UI_ACTIVE_COLOR
    },
    buttonGroup_containerStyle:{
        height:30,
        width:355*RATIO,
        alignSelf:'center',
        borderColor:UI_ACTIVE_COLOR,
        backgroundColor:HEADER_FONT_COLOR
    }
});