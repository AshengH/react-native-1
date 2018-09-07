import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO} from './../../lib/adjust'
import { HEADER_FONT_COLOR, UI_ACTIVE_HOVER_COLOR, FALL, GRAY_SVG_COLOR, LINE_COLOR , UI_ACTIVE_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    tab: {
        flexDirection: "row",
        width: SCREEN_WIDTH,
        paddingHorizontal: 10,
        backgroundColor: HEADER_FONT_COLOR,
        marginBottom: 7,
        justifyContent: 'center'
    },
    touchStyle: {
        width: 177,
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    typeBox: {
        flex: 1,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: GRAY_SVG_COLOR,
        backgroundColor: HEADER_FONT_COLOR
    },
    typeStyle: {
        width: 64,
        height: 63,
        borderRadius: 5,
        margin: 11,
        flex: 1
    },
    imageStyle: {
        width: 36,
        height: 36,
        alignSelf: 'center',
        marginTop: 5
    },
    bg: {
        backgroundColor: LINE_COLOR
    },
    assetsBox: {
        backgroundColor: HEADER_FONT_COLOR,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: GRAY_SVG_COLOR
    },
    assetTitle: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10
    },
    assetMain: {
        fontSize: 30,
        color: FALL,
        fontWeight: '100',
        width: 200 * RATIO
    },
    about: {
        alignSelf: 'center',
        color: GRAY_SVG_COLOR,
        fontSize: 15,
        marginLeft: 15
    },
    addressBox: {
        backgroundColor: HEADER_FONT_COLOR,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: GRAY_SVG_COLOR,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addressTitle: {
        fontSize: 15,
        marginTop: 10,
        marginBottom: 10
    },
    addressMain: {
        alignSelf: 'center',
        color: GRAY_SVG_COLOR,
        fontSize: 15,
        width: 250 * RATIO
    },
    amount: {
        backgroundColor: HEADER_FONT_COLOR,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: GRAY_SVG_COLOR,
        flexDirection: 'row'
    },
    amountAll: {
        width: 40,
        height: 30,
        borderRadius: 15,
        overflow: 'hidden',
        textAlign: 'center',
        lineHeight: 30,
        backgroundColor: UI_ACTIVE_HOVER_COLOR
    },
    submit: {
        width: 356 * RATIO,
        paddingVertical: 10,
        textAlign: "center",
        backgroundColor: UI_ACTIVE_COLOR,
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 30
    },
    selectText:{
        textAlign: "center"
    },
    withdrawAmountWrapper:{
        flexDirection: 'row'
    },
    touchable:{
        width: 80,
        alignSelf: 'center'
    },
    touchIcon:{
        alignSelf: 'flex-end'
    },
    withdrawalAmount:{
        width: 130 * RATIO,
        lineHeight: 30,
        fontSize: 14
    },
    withdrawInput:{
        width: 160 * RATIO,
        paddingLeft: 15
    }
});