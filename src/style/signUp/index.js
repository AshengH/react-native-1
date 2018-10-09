import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO} from './../../lib/adjust'
import {HEADER_FONT_COLOR, UI_ACTIVE_HOVER_COLOR,UI_ACTIVE_COLOR, GRID_LINE_COLOR, NOTICE_CONTENT_FONT_COLOR, LINE_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    loginTitle: {
        textAlign: 'left',
        marginTop: 20,
        fontSize: 20,
        // marginBottom: 20,
        color:UI_ACTIVE_COLOR
    },
    inputBox: {
        width: 329 * RATIO,
        height: 40,
        alignSelf: 'center',
        backgroundColor: HEADER_FONT_COLOR,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        // flexDirection: 'row'
    },
    textInput: {
        width: 289 * RATIO,
        height: 40,
        paddingLeft: 15,
        borderBottomWidth:1,
        borderColor:LINE_COLOR
    },
    buttonBox: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 60
    },
    functionButton: {
        width: 160,
        height: 40,
        position: 'absolute'
    },
    functionBtnStyle: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: 120,
        height: 40
    },
    loginBtn: {
        backgroundColor: UI_ACTIVE_HOVER_COLOR,
        width: 329 * RATIO,
        height: 40,
        alignSelf: 'center',
        borderRadius: 20
    },
    backIcon:{
        padding: 10
    },
    userIdInputImage:{
        lineHeight: 40, 
        color: NOTICE_CONTENT_FONT_COLOR
    },

});