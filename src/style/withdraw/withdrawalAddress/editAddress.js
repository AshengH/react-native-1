import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO} from './../../../lib/adjust'
import {UI_ACTIVE_COLOR, DATE_FONT_COLOR, HEADER_FONT_COLOR} from '../../../lib/color';

export default styles = StyleSheet.create({
    doneStyle: {
        width: 356 * RATIO,
        backgroundColor: UI_ACTIVE_COLOR,
        alignSelf: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        marginVertical: 20,
    },
    root:{
        padding: 10, 
        backgroundColor: HEADER_FONT_COLOR, 
        marginBottom: 10
    },
    save:{
        textAlign: 'center', 
        fontWeight: '100'
    },
    addressInput:{
        color: DATE_FONT_COLOR, 
        width: SCREEN_WIDTH, 
        paddingVertical: 5
    },
    address:{
        alignSelf: 'center'
    },
    addressWrapper:{
        justifyContent: 'space-between', 
        flexDirection: 'row'
    }
});