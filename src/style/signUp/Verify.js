import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO} from './../../lib/adjust'
import { BASIC_COLOR, HEADER_FONT_COLOR, DATE_FONT_COLOR, UI_ACTIVE_HOVER_COLOR } from './../../lib/color'

export default styles = StyleSheet.create({
    root:{
        position:'absolute',
        left:0,
        top:0,
        right:0,
        bottom:0,
        justifyContent:'center'
    },
    background:{
        position:'absolute',
        left:0,
        top:0,
        right:0,
        bottom:0,
        backgroundColor:BASIC_COLOR,
    },
    contentRoot:{
        width:'80%',
        backgroundColor:HEADER_FONT_COLOR,
        borderRadius:8,
        alignSelf:'center',
        padding:10
    },
    titleText:{
        alignSelf:'center',
        marginBottom:10,
        fontSize:16
    },
    inputWrapper:{
        borderColor:BASIC_COLOR,
        borderWidth:1,
        borderRadius:8,
        flexDirection:'row',
        padding:10
    },
    codeInput:{
        flex:1
    },
    verifyImage:{
        width:70,
        height:26
    },
    descText:{
        color:DATE_FONT_COLOR,
        alignSelf:'flex-end',
        marginTop:10
    },
    buttonsWrapper:{
        flexDirection:'row',

    },
    button:{
        backgroundColor:UI_ACTIVE_HOVER_COLOR,
        paddingVertical:10,
        paddingHorizontal:15,
        borderRadius:8,
        flex:1,
        justifyContent:'center',
        margin:10
    },
    buttonText:{
        textAlign:'center',
        fontSize:16,
        color:HEADER_FONT_COLOR
    },
    scrollViewBackground:{
        flex:1
    }
});