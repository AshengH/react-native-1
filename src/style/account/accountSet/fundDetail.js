import {StyleSheet} from 'react-native'
import {RATIO,SCREEN_WIDTH} from "../../../lib/adjust";
import {BASIC_FONT_COLOR, HEADER_FONT_COLOR, GRAY_SVG_COLOR, BASIC_COLOR,BACKGROUND_COLOR} from './../../../lib/color'

export default styles = StyleSheet.create({
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
    selectBox: {
        flexDirection: 'row',
        backgroundColor: HEADER_FONT_COLOR,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: GRAY_SVG_COLOR
    },
    none: {
        width: SCREEN_WIDTH,
        textAlign: 'center',
        paddingVertical: 20,
        backgroundColor: HEADER_FONT_COLOR,
        color: BASIC_COLOR,
        flex: 1
    },
    selectionItem:{
        paddingHorizontal: 15
    },
    amountRoot:{
        backgroundColor: HEADER_FONT_COLOR
    },
    amount:{
        fontSize: 40,
        alignSelf: 'center',
        marginTop: 30
    },
    amountBalance:{
        fontSize: 15,
        alignSelf: 'center',
        paddingVertical: 10
    },
    scrollViewBackground:{
        backgroundColor: BACKGROUND_COLOR
    },
    list:{
        marginTop: 8
    },
    cellTouchable:{
        marginTop: 2,
        backgroundColor: HEADER_FONT_COLOR
    },
    cellRoot:{
        flexDirection: 'row',
        padding: 15
    },
    textWrapper:{
        flex: 1
    },
    explain:{
        fontSize: 17,
        marginBottom: 3
    },
    date:{
        fontSize: 15,
        color: GRAY_SVG_COLOR
    },
    currency:{
        textAlign: 'right',
        paddingRight: 15,
        fontSize: 17
    },
    money:{
        textAlign: 'right',
        paddingRight: 15,
        fontSize: 15,
    },
    icon:{
        alignSelf: 'center'  
    },
    cryptoSelectionRoot:{
        width: 150,
        alignSelf: 'center',
        height: 30,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: BASIC_COLOR,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 30
    },
    cryptoTouchable:{
        flex: 1,
        alignSelf: 'center',
        height: 28,
        justifyContent: 'center'
    },
    selectionWrapper:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    name:{
        textAlign: 'center'
    }
});