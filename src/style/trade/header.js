import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO,isIphoneX} from './../../lib/adjust'
import { GRAY_SVG_COLOR , HEADER_COLOR , HEADER_FONT_COLOR,UI_ACTIVE_COLOR, BASIC_FONT_COLOR,BACKGROUND_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUND_COLOR,
        height: 64,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'space-around'
    },
    body: {
        flexDirection: 'row',
        flex: 1,
        // justifyContent:'space-around'
    },
    back: {
        position: 'absolute',
        alignSelf: 'center',
        width: 40*RATIO,
        height: isIphoneX() ? 64 : 44,
        lineHeight: isIphoneX() ? 64 : 44,
        fontSize: 24,
        color: HEADER_FONT_COLOR,
        left: 8,
        zIndex: 1
    },
    listIcon:{
        alignSelf: 'center',
        width: 30,
        height: isIphoneX() ? 64 : 44,
        lineHeight: isIphoneX() ? 64 : 44,
    },
    title: {
        width: SCREEN_WIDTH,
        color: HEADER_FONT_COLOR,
        fontSize: 17,
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1
    },
    btnStyle: {
        position: 'absolute',
        backgroundColor: HEADER_COLOR,
        right: 10,
        alignSelf: 'center',
        height: isIphoneX() ? 64 : 44,
        justifyContent: 'center'
    },
    btnBox: {
        alignSelf: 'center',
        width: 240*RATIO,
        borderWidth: 1,
        // borderColor: UI_ACTIVE_COLOR,
        flexDirection: 'row',
        borderRadius: 8,
        overflow: 'hidden'
    },
    switchBtn: {
        width:120*RATIO,
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    triangle: {
        position:'absolute',
        zIndex:1,
        right:5,
        top:10,
        width: 0,
        height: 0,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopWidth: 7,
        borderBottomWidth: 2,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: BASIC_FONT_COLOR,
        borderBottomColor: 'transparent',
        alignSelf: 'center',
        marginLeft: 3
    },
    headerRoot:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
        // width:'40%'
    },
    rules:{
        fontSize: 15, 
        color: GRAY_SVG_COLOR
    },
    selectorRoot:{
        flex: 1, 
        justifyContent: 'center'
    }
});