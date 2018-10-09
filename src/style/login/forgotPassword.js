import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO} from './../../lib/adjust'
import {HEADER_FONT_COLOR, UI_ACTIVE_HOVER_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    loginTitle:{
        textAlign:'center',
        marginTop:80,
        fontSize:20,
        marginBottom:20
    },
    inputBox:{
        width:329*RATIO,
        height:40,
        alignSelf:'center',
        backgroundColor:'white',
        marginTop:15,
        borderRadius:20,
        justifyContent:'center',
        flexDirection:'row'
    },
    textInput:{
        width:289*RATIO,
        height:40,
        paddingLeft:15
    },
    loginBtn:{
        backgroundColor:UI_ACTIVE_HOVER_COLOR,
        width:329*RATIO,
        height:40,
        alignSelf:'center',
        borderRadius:20
    },
    iconStyle:{
        position:'absolute',
        top:10,
        right:10
    },
    ImageBackground:{
        width: SCREEN_WIDTH, 
        flex: 1
    },
    backIcon:{
        padding: 10
    }
});