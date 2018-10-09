import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO} from './../../lib/adjust'
import {HEADER_FONT_COLOR, UI_ACTIVE_HOVER_COLOR,UI_ACTIVE_COLOR, GRID_LINE_COLOR, NOTICE_CONTENT_FONT_COLOR,LOGIN_TITLE_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    loginTitle: {
        color: LOGIN_TITLE_COLOR,
        marginTop: 160,
        fontSize: 17,
        marginBottom: 10
    },
    inputBox: {
        width: 329,
        height: 40,
        alignSelf: 'center',
        backgroundColor: HEADER_FONT_COLOR,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textInput: {
        width: 329,
        height: 40
    },
    loginBtn: {
        backgroundColor: UI_ACTIVE_HOVER_COLOR,
        width: 329,
        height: 40,
        alignSelf: 'center',
        borderRadius: 20
    },
    iconStyle: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    imageBackground:{
        width: SCREEN_WIDTH, 
        flex: 1
    },
    descText:{
        fontSize: 22
    }
});