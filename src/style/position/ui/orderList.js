import {StyleSheet} from 'react-native'
import { UI_ACTIVE_COLOR, RAISE, LINE_COLOR, DATE_FONT_COLOR, BASIC_FONT_COLOR, GRAY_SVG_COLOR, HEADER_FONT_COLOR,BACKGROUND_COLOR } from '../../../lib/color';
import { RATIO } from '../../../lib/adjust';

export default styles = StyleSheet.create({
    btn: {
        minWidth: 120,
        height: 30,
        backgroundColor: UI_ACTIVE_COLOR,
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 5
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
    buttonTitle:{
        alignSelf: 'center', 
        fontSize: 16, 
        fontWeight: '300'
    },
    emptyRoot:{
        justifyContent: 'center', 
        minHeight: 300
    },
    emptyImage:{
        width: 56 * RATIO, 
        height: 73 * RATIO, 
        alignSelf: 'center'
    },
    cellRoot:{
        // height: 193,
        backgroundColor: BACKGROUND_COLOR,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderTopColor: LINE_COLOR,
        // borderBottomColor: LINE_COLOR,
        marginVertical: 8,
        marginHorizontal:10,
        // paddingHorizontal: 9,
        borderWidth:1,
        borderRadius:8,
        overflow:'hidden'
    },
    contractWrapper:{
        // height: 48, 
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingVertical:5,
        paddingHorizontal:10
    },
    contract:{
        // alignSelf: 'center',
        fontSize: 14,
        // marginRight: 25
    },
    idText:{
        alignSelf: 'center', 
        fontSize: 17
    },
    line:{
        height: 1,
        borderTopColor: GRAY_SVG_COLOR,
        borderTopWidth: 1,
        marginBottom: 3
    },
    cellViewRowRoot:{
        height:30
    },
    leftOffset:{
        marginLeft:5
    },
    setStopRoot:{
        height: 30, 
        marginVertical: 10, 
        justifyContent: 'flex-end'
    },
    date:{
        alignSelf:'center',
        fontSize:17,
        position:'absolute',
        right:5
    },
    tradeStatus:{
        alignSelf:'center',
        lineHeight:26,
        color:DATE_FONT_COLOR
    },
    tradeStatusWrapper:{
        backgroundColor:LINE_COLOR,
        width:94,
        height:26,
        borderRadius:4
    },
    cpPrice:{
        marginLeft:5,
        color:BASIC_FONT_COLOR
    },
    orderFailureWrapper:{
        alignSelf:'center',
        position:'absolute',
        top:81,
        right:10,
        backgroundColor:LINE_COLOR,
        height:26,
        borderRadius:4,
        paddingHorizontal:15
    },
    arrowImage:{
        width:11,
        height:11,
        alignSelf:'center',
        marginHorizontal:2
    },
    cellSettingRoot:{
        flexDirection:'row',
        width:'100%',
        paddingHorizontal:10,
        
        // paddingVertical:10
    },
    cellSettingTouchable:{
        borderWidth:1,
        borderColor:HEADER_FONT_COLOR,
        borderRadius:8,
        paddingHorizontal:10,
        paddingVertical:5,
        marginVertical:5,
        marginLeft:10
    },
    cellSettingTextColor:{
        color:HEADER_FONT_COLOR
    }
});