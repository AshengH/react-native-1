import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO,SCREEN_HEIGHT} from './../../lib/adjust'
import {BACKGROUND_COLOR,UI_ACTIVE_COLOR, HEADER_FONT_COLOR, HEADER_BACKGROUND, DATE_FONT_COLOR, LINE_COLOR, GRAY_SVG_COLOR, BASIC_FONT_COLOR, RAISE, FALL} from './../../lib/color'

export default styles = StyleSheet.create({
    webview:{
        width: SCREEN_WIDTH, 
        flex: 1
    },
    chartTab: {
        height: 100,
        backgroundColor: BACKGROUND_COLOR,
        width: SCREEN_WIDTH,
        // flexDirection: 'row',
        // justifyContent: 'space-around'
    },
    dropdown: {
        width: 61,
        height: 214,//172,//128,
        backgroundColor: BASIC_FONT_COLOR,
        borderRadius: 4,
        paddingTop: 15
    },
    dropItem: {
        height: 34
    },
    dropItemText: {
        alignSelf: 'center',
        color: DATE_FONT_COLOR,
        fontSize: 16,
        height: 34,
        lineHeight: 34
    },
    dropItemTextActive: {
        color: UI_ACTIVE_COLOR,
    },
    dynamic: {
        flex: 1,
        position: 'absolute',
        backgroundColor: BACKGROUND_COLOR,
        zIndex: 1,
        width: SCREEN_WIDTH,
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    box: {
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal:5,
        borderWidth: 1,
        borderColor: GRAY_SVG_COLOR
    },
    name: {
        color: DATE_FONT_COLOR,
        maxWidth:110*RATIO
    },
    up: {
        color: RAISE
    },
    down: {
        color: FALL
    },
    touchableStyle: {
        borderRadius: 8,
        marginHorizontal: 5,
        marginBottom: 8,
        width:86*RATIO,
        backgroundColor: LINE_COLOR,
        height:30
    },
    touchableText: {
        lineHeight:30,
        textAlign: 'center',
        fontSize:15*RATIO,
        color:DATE_FONT_COLOR
    },
    HUD:{
        /*遮罩层*/
        position: 'absolute',
        top: 0,
        backgroundColor: HEADER_BACKGROUND,//"rgba(0,0,0,.3)",
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        zIndex: 1
    },
    selectorRoot:{
        backgroundColor: HEADER_FONT_COLOR, 
        flexDirection: 'row', 
        paddingHorizontal: 15
    },
    digitalRoot:{
        borderTopColor:LINE_COLOR,
        padding:10,
        backgroundColor: HEADER_FONT_COLOR,
    },
    currencyDataWrapper:{
        paddingRight:30,
        paddingLeft:5
    },
    currencyWrapper:{
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    root:{
        backgroundColor: HEADER_FONT_COLOR, 
        flexDirection: 'row', 
        paddingHorizontal: 10,
        paddingVertical:20
    },
    usdQuoteImageWrapper:{
        paddingRight:30,
        paddingLeft:5,
        paddingTop:10
    },
    cellWrapper:{
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    orderRoot:{
        position:'absolute',
        backgroundColor:'rgba(0, 0, 0, 0.8)',
        left:0,
        right:0,
        bottom:0
    }
});