import {StyleSheet} from 'react-native'
import {isIphoneX,SCREEN_WIDTH} from './../../lib/adjust'
import {HEADER_COLOR,HEADER_FONT_COLOR,GRAY_SVG_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    container: {
        backgroundColor: HEADER_COLOR,
        height: 64,
        flexDirection: 'column',
        alignItems: 'center'
    },
    body: {
        flexDirection: 'row',
        flex: 1
    },
    back: {
        position: 'absolute',
        alignSelf: 'center',
        width: 40,
        height:isIphoneX()?64:44,
        lineHeight:isIphoneX()?64:44,
        fontSize: 24,
        color: HEADER_FONT_COLOR,
        left: 8,
        zIndex: 1
    },
    title: {
        width:SCREEN_WIDTH,
        color: HEADER_FONT_COLOR,
        fontSize: 17,
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1
    },
    btnStyle:{
        position:'absolute',
        backgroundColor:HEADER_COLOR,
        right:10,
        alignSelf:'center',
        height:isIphoneX()?64:44,
        justifyContent:'center'
    },
    iphoneTypeText:{
        fontSize:15,
        color:GRAY_SVG_COLOR
    },
    noneIphoneText:{
        fontSize:15,
        color:GRAY_SVG_COLOR,
        alignSelf:'center'
    },
});