import {StyleSheet} from 'react-native'
import {BACKGROUND_COLOR, BASIC_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    touchable:{
        height:50,
        flex:1
    },
    textRoot:{
        borderBottomWidth:1, 
        borderBottomColor:BACKGROUND_COLOR
    },
    text:{
        color:BASIC_COLOR,
        lineHeight:50,
        paddingLeft:20
    }
});