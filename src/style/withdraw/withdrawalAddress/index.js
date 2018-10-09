import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO} from './../../../lib/adjust'
import {UI_ACTIVE_COLOR , BASIC_COLOR, GRAY_SVG_COLOR, HEADER_FONT_COLOR, DATE_FONT_COLOR, NOTICE_CONTENT_FONT_COLOR, BASIC_FONT_COLOR, GREEN_POINT_COLOR } from '../../../lib/color';

export default styles = StyleSheet.create({
    doneStyle: {
        width: 356 * RATIO,
        backgroundColor: UI_ACTIVE_COLOR,
        alignSelf: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        marginVertical: 20,
    },
    triangle: {
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
    greenPoint: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: GREEN_POINT_COLOR,
        alignSelf: 'center',
        marginHorizontal: 5
    },
    cellRoot:{
        padding: 10,
        backgroundColor: HEADER_FONT_COLOR, 
        marginBottom: 10
    },
    address:{
        alignSelf: 'center'
    },
    coinWrapper:{
        justifyContent: 'space-between', 
        flexDirection: 'row'
    },

    addressInput:{
        color:DATE_FONT_COLOR, 
        width: SCREEN_WIDTH, 
        paddingVertical: 5
    },
    editRoot:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: GRAY_SVG_COLOR
    },
    defaultAddress:{
        alignSelf: 'center', 
        fontWeight: '100', 
        fontSize: 14
    },
    editTouchable:{
        marginRight: 15
    },
    icon:{
        color: NOTICE_CONTENT_FONT_COLOR, 
        marginRight: 5
    },
    edit:{
        alignSelf: 'center',
        fontWeight: '100',
        fontSize: 14
    },
    addRoot:{
        padding: 10, 
        backgroundColor: HEADER_FONT_COLOR, 
        marginTop: 5
    },
    save:{
        textAlign: 'center', 
        fontWeight: '100'
    },
    addressInput:{
        width: 250, 
        height: 40
    },
    nameView:{
        justifyContent: 'space-between', 
        flexDirection: 'row'
    },
    nameTouchable:{
        alignSelf: 'center',
        height: 28,
        justifyContent: 'center',
        width: 80,
        borderWidth: 1,
        borderColor: GRAY_SVG_COLOR,
        borderRadius: 5
    },
    nameText:{
        textAlign: 'center'
    },
    nameTextWrapper:{
        flexDirection: 'row', 
        justifyContent: 'center'
    }
});