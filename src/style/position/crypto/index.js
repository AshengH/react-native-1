import {StyleSheet} from 'react-native'
import { HEADER_FONT_COLOR, RAISE, UI_ACTIVE_COLOR, SCHEME_THREE_BACKGROUND_COLOR, BASIC_FONT_COLOR } from '../../../lib/color';
import { PAGE_HEIGHT, SCREEN_WIDTH } from '../../../lib/adjust';

export default styles = StyleSheet.create({
    tab: {
        flexDirection: "row",
        width: SCREEN_WIDTH,
        paddingHorizontal: 10,
        backgroundColor: HEADER_FONT_COLOR,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row'
    },
    rowSeparate: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mid: {
        alignSelf: 'center'
    },
    closeAll: {
        width: 130,
        height: 26,
        backgroundColor: RAISE,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    closeAllText: {
        color: HEADER_FONT_COLOR,
        alignSelf: 'center',
        fontSize: 14
    },
    stopPL: {
        minWidth: 120,
        height: 28,
        borderColor: RAISE,
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        marginRight: 20
    },
    stopPLText: {
        color: RAISE,
        alignSelf: 'center',
        fontSize: 14
    },
    btn: {
        minWidth: 120,
        height: 30,
        backgroundColor: UI_ACTIVE_COLOR,
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 5
    },
    schemeOneRoot:{
        backgroundColor: HEADER_FONT_COLOR, 
        padding: 9
    },
    schemeOneScrollView:{
        height: PAGE_HEIGHT - 219
    },
    incomeWrapper:{
        height: 54
    },
    incomeTitle:{
        fontSize: 17, 
        color: BASIC_FONT_COLOR, 
        marginRight: 15
    },
    usd:{
        fontSize: 22
    },
    income:{
        fontSize: 36
    },
    schemeTwoRoot:{
        height: PAGE_HEIGHT - 104,
        backgroundColor:SCHEME_THREE_BACKGROUND_COLOR
    },
    schemeThreeRoot:{
        height: PAGE_HEIGHT - 104,
        backgroundColor:SCHEME_THREE_BACKGROUND_COLOR
    }
});