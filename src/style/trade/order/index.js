import {StyleSheet} from 'react-native'
import { GRID_LINE_COLOR , UI_ACTIVE_COLOR , BASIC_FONT_COLOR, NOTICE_CONTENT_FONT_COLOR, DATE_FONT_COLOR } from '../../../lib/color';
import { RATIO } from '../../../lib/adjust';


const padding = 8;
export default styles = StyleSheet.create({
    rowLeft: {
        color: BASIC_FONT_COLOR,
        marginLeft: padding
    },
    rowRight: {
        marginRight: padding
    },
    row: {
        paddingHorizontal: padding
    },
    rowDes: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'space-between'
    },
    grid: {
        borderTopColor: GRID_LINE_COLOR,
        borderBottomColor: GRID_LINE_COLOR,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    btn: {
        minWidth: 60,
        height: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: UI_ACTIVE_COLOR,
        borderWidth: 1,
        borderRadius: 4,
        margin: 4,
        paddingHorizontal: 10
    },
    active: {
        backgroundColor: UI_ACTIVE_COLOR
    },
    submit:{
        backgroundColor:UI_ACTIVE_COLOR,
        width:Math.min(355*RATIO,355),
        height:44,
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:8,
        marginTop:24
    },
    accountBalance:{
        // height: 44, 
        // lineHeight: 44, 
        fontSize: 15,
        alignSelf:'center'
    },
    balance:{
        // height: 50, 
        // lineHeight: 50, 
        fontSize: 20
    },
    contract:{
        fontSize: 17, 
        alignSelf: 'center', 
        flex: 1.2
    },
    close:{
        fontSize: 16,
        alignSelf: 'center',
        flex: 2.55,
        color: BASIC_FONT_COLOR,
        textAlign: 'right'
    },
    tradingLots:{
        fontSize: 16, 
        height: 40, 
        lineHeight: 40
    },
    tradingLotsButtonsWrapper:{
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        marginBottom: 10
    },
    stopProfitTitle:{
        fontSize: 16, 
        alignSelf: 'center'
    },
    stopProfitCurrency:{
        color: NOTICE_CONTENT_FONT_COLOR, 
        fontSize: 17
    },
    stopProfitValue:{
        fontSize: 17,
        color: UI_ACTIVE_COLOR,//DATE_FONT_COLOR,
        textAlign: 'center',
        height: 30,
        lineHeight: 30
    },
    stopProfitValueWrapper:{
        alignSelf: 'center',
        minWidth: 70,
        // backgroundColor: GRID_LINE_COLOR,
        borderRadius: 4
    },
    stopLossButtonsWrapper:{
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    theLatestPriceWrapper:{
        borderBottomColor: GRID_LINE_COLOR, 
        borderBottomWidth: 1
    },
    theLatestPriceText:{
        fontSize: 16,
        height: 30,
        lineHeight:30
    }
});