import {StyleSheet} from 'react-native'
import { GRAY_SVG_COLOR, BACKGROUND_COLOR, UI_ACTIVE_COLOR } from '../../lib/color';

export default styles = StyleSheet.create({
    root:{
        height: 40, 
        flexDirection: 'row'
    },
    title:{
        color: UI_ACTIVE_COLOR, 
        alignSelf: 'center',
        fontSize: 17
    },
    backIcon:{
        alignSelf: 'center',
        textAlign: 'right',
        width: 100,
        position: 'absolute',
        right: 10,
        color: GRAY_SVG_COLOR,
    },
    verticalLine:{
        backgroundColor: BACKGROUND_COLOR,
        height: 14,
        width: 4,
        alignSelf: 'center',
        marginHorizontal: 10
    },
    
});