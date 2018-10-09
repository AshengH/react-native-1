import {StyleSheet} from 'react-native'
import { HEADER_FONT_COLOR, LINE_COLOR, UI_ACTIVE_COLOR } from '../../../lib/color';

export default styles = StyleSheet.create({
    inputViewRoot:{
        width:'100%',
        flexDirection:'row',
        backgroundColor:HEADER_FONT_COLOR,
        paddingVertical:20,
        borderBottomWidth:1,
        borderColor:LINE_COLOR
    },
    title:{
        paddingHorizontal:20,
        fontSize:16
    },
    textInput:{
        fontSize:16,
        flex:1,
        width:'100%'
    },
    submitButtonTouchable:{
        backgroundColor:UI_ACTIVE_COLOR,
        borderRadius:8,
        width:'80%',
        paddingVertical:10,
        alignSelf:'center',
        marginVertical:10
    },
    submitButtonText:{
        color:HEADER_FONT_COLOR,
        textAlign:'center'
    },
    arrowText:{
        fontSize:18
    },
    noticeRoot:{
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:10
    },
    noticeButtonText:{
        color:UI_ACTIVE_COLOR
    }
});