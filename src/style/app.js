import  {StyleSheet} from 'react-native'
import { SCREEN_WIDTH } from '../lib/adjust';
import { BACKGROUND_COLOR } from '../lib/color';

export default styles = StyleSheet.create({
    imageBackground:{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        width: SCREEN_WIDTH
    },
    text:{
        alignSelf: 'center',
        fontSize: 20,
        color: BACKGROUND_COLOR
    }
});