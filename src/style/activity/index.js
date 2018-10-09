import {StyleSheet} from 'react-native'
import { LINE_COLOR, HEADER_FONT_COLOR } from '../../lib/color';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../lib/adjust';


export default styles = StyleSheet.create({
    image:{
        width:SCREEN_WIDTH,
        resizeMode:'stretch',
    },
    bottomButtonRoot:{
        width:'100%',
        height:100,
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        backgroundColor:HEADER_FONT_COLOR
    },
    bottomButtonTitle:{
        marginLeft:10,
        marginTop:10
    },
    bottomButtonTouchable:{
        borderWidth:1,
        borderColor:LINE_COLOR,
        flex:1,
        margin:10,
        paddingVertical:5
    },
    bottomButtonText:{
        textAlign:'center'
    },
    root:{
        position:'relative',
        flex:1
    },
    imageWrapper:{
        justifyContent:'flex-start',
        paddingBottom:100,
        width:SCREEN_WIDTH
    }
});