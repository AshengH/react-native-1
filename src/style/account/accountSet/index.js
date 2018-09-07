import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH} from "../../../lib/adjust";
import {GRAY_SVG_COLOR, GRID_LINE_COLOR, HEADER_FONT_COLOR, UI_ACTIVE_COLOR} from './../../../lib/color'

export default styles = StyleSheet.create({
    functionStyle: {
        alignSelf: 'center',
        marginRight: 10
    },
    line:{
        height:1,
        width:SCREEN_WIDTH,
        backgroundColor:GRAY_SVG_COLOR
    },
    scrollViewBackground:{
        backgroundColor:GRID_LINE_COLOR
    },
    bigLine:{
        width:'100%',
        height:10,
        backgroundColor:GRID_LINE_COLOR
    },
    logoutTouchable:{
        backgroundColor:UI_ACTIVE_COLOR,
        width:'90%',
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:4,
        paddingVertical:10,
        marginTop:50
    },
    logoutButtonText:{
        color:HEADER_FONT_COLOR,
        textAlign:'center'
    }
});