import {StyleSheet} from 'react-native'
import {UI_ACTIVE_HOVER_COLOR, NOTICE_CONTENT_FONT_COLOR,HEADER_FONT_COLOR,GRAY_SVG_COLOR,DATE_FONT_COLOR, HEADER_BACKGROUND, LINE_COLOR} from './../../lib/color'
import {RATIO, SCREEN_WIDTH} from './../../lib/adjust'

export default styles = StyleSheet.create({
    root:{
        backgroundColor: HEADER_FONT_COLOR, 
    },
    cellRoot:{
        
    },
    titleWrapper:{
        justifyContent: 'flex-start', 
        flexDirection: 'row',
        borderBottomWidth:1,
        borderColor:LINE_COLOR,
        paddingVertical:20,
    },
    dot:{
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: HEADER_BACKGROUND,
        alignSelf: 'center',
        margin: 3
    },
    title:{
        fontSize: 16,
        marginLeft:10
    },
    date:{
        fontSize: 14,
        color: DATE_FONT_COLOR, 
        paddingVertical: 5,
        alignSelf:'flex-end',
        color:NOTICE_CONTENT_FONT_COLOR
    },
    content:{
        color: NOTICE_CONTENT_FONT_COLOR,
        lineHeight:20,
    },
    plaformTitle:{
        color:HEADER_BACKGROUND,
        fontSize:16,
        padding:10
    },
    contentWrapper:{
        paddingTop:10,
        paddingHorizontal:10
    }
});