import {StyleSheet} from 'react-native'
import {RATIO} from "../../lib/adjust";
import {GRAY_SVG_COLOR,HEADER_FONT_COLOR,UI_ACTIVE_HOVER_COLOR,DATE_FONT_COLOR,NOTICE_CONTENT_FONT_COLOR, BACKGROUND_COLOR, LINE_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    scrollViewBackground:{
        backgroundColor: BACKGROUND_COLOR
    },
    cellRoot:{
        paddingTop: 15, 
        paddingBottom:10,
        paddingHorizontal:15,
        // borderTopWidth: 1, 
        // borderTopColor: GRAY_SVG_COLOR,
        flexDirection:'row'
    },
    titleWrapper:{
        justifyContent: 'flex-start', 
        flexDirection: 'row'
    },
    dot:{
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: UI_ACTIVE_HOVER_COLOR,
        alignSelf: 'center',
        margin: 3
    },
    title:{
        fontSize: 17
    },
    date:{
        fontSize: 15, 
        color: DATE_FONT_COLOR,
        paddingVertical: 5
    },
    content:{
        color: NOTICE_CONTENT_FONT_COLOR
    },
    triangle: {
        borderStyle:'solid',
        borderLeftWidth:1,
        borderColor:LINE_COLOR,
        borderBottomWidth:1,
        width: 15,
        height: 15,
        backgroundColor: 'transparent',
        transform: [{rotate: '225deg'}],
        marginLeft: 15,
        marginTop: 15,
      }
});