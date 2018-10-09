import {StyleSheet} from 'react-native'
import { HEADER_FONT_COLOR, BACKGROUND_COLOR } from '../lib/color';

let commonStyles;
export default commonStyles = StyleSheet.create({
    rowStyle:{
        flexDirection:'row',
    },
    heightOffset:{
        height:20
    },
    fillStyle:{
        flex: 1
    },
    centerView:{
        alignSelf: 'center'
    },
    whiteBackground:{
        backgroundColor: BACKGROUND_COLOR
    }
});