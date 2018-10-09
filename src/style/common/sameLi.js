import {StyleSheet} from 'react-native'
import {isIphoneX,SCREEN_WIDTH} from './../../lib/adjust'
import {HEADER_FONT_COLOR,GRAY_SVG_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    function: {
        flexDirection: 'row',
        width: SCREEN_WIDTH,
        backgroundColor: HEADER_FONT_COLOR,
        padding: 15
    },
    functionStyle: {
        alignSelf: 'center',
        marginRight: 10
    },
    right: {
        fontSize: 16,
        color: GRAY_SVG_COLOR,
        position: 'absolute',
        right: 30,
        alignSelf: 'center',
        textAlign:'right'
    },
    icon:{
        position: 'absolute', 
        right: 15, 
        alignSelf: 'center',
        color:GRAY_SVG_COLOR
    }
});