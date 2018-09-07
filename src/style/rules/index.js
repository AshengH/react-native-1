import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO} from './../../lib/adjust'
import {HEADER_FONT_COLOR, UI_ACTIVE_HOVER_COLOR, RULES_LEFT_COLOR, LINE_COLOR, GRAY_SVG_COLOR,BACKGROUND_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    left: {
        padding: 15,
        backgroundColor: RULES_LEFT_COLOR,
        width: 160
    },
    right: {
        paddingVertical:15,
        paddingLeft:15,
        backgroundColor: BACKGROUND_COLOR,
    },
    textBox: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: LINE_COLOR,
        paddingRight:0,
    },
    touch:{
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: LINE_COLOR
    },
    introductionView:{
        paddingHorizontal:15,
        paddingVertical:20,
    },
    descWrap:{
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:10,
        backgroundColor: BACKGROUND_COLOR,
    },
    leftDesc:{

    },
    rightDesc:{
        color:GRAY_SVG_COLOR,
    },
    infoContent:{
        backgroundColor:BACKGROUND_COLOR,
        padding:10
    },
    infoCellRoot:{
        borderBottomWidth:1,
        borderBottomColor:LINE_COLOR
    },
    scrollViewBackground:{
        // flex:1,
        backgroundColor:BACKGROUND_COLOR,
    }
});