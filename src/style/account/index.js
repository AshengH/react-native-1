import {StyleSheet} from 'react-native'
import {RATIO} from "../../lib/adjust";
import {UI_ACTIVE_COLOR,BACKGROUND_COLOR,GRAY_SVG_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    doneStyle: {
        width: 356 * RATIO,
        backgroundColor: UI_ACTIVE_COLOR,
        textAlign: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        fontWeight: '100',
        overflow: "hidden"
    },
    functionStyle: {
        alignSelf: 'center',
        marginRight: 10,
        color: GRAY_SVG_COLOR
    },
    scrollViewBackground:{
        backgroundColor:BACKGROUND_COLOR
    },
    list:{
        marginTop: 10
    },
    buttonWrapper:{
        alignSelf: 'center', 
        marginTop: 30
    }
});