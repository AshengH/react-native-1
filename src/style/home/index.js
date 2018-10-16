import {StyleSheet} from 'react-native'
import {HEADER_BACKGROUND, BACKGROUND_COLOR, HEADER_FONT_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    scrollViewBackground:{
        backgroundColor:BACKGROUND_COLOR
    },
    loginButtonTouchable:{
        backgroundColor:HEADER_BACKGROUND,
        flexDirection:'row',
        marginHorizontal:10,
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:4
    },
    loginButtonText:{
        color:HEADER_FONT_COLOR,
        fontSize:18
    },
    loginButtonsRoot:{
        paddingVertical:10,
        backgroundColor:HEADER_BACKGROUND
    },


});