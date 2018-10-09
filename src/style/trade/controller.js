import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO} from './../../lib/adjust'
import {LINE_COLOR,UI_ACTIVE_COLOR, HEADER_FONT_COLOR,BACKGROUND_COLOR} from './../../lib/color'
export default styles = StyleSheet.create({
    text:{
        alignSelf:'center',
        fontSize:14,
        marginHorizontal:5
    },
    bar:{
        height:36,
        borderTopColor:LINE_COLOR,
        borderTopWidth:1,
        flexDirection:'row',
        justifyContent:'center'
    },
    barButtonWrap:{
        width:97,
        alignSelf:'center',
        backgroundColor:'transparent',
        borderWidth:1,
        borderRadius:4,
        borderColor:UI_ACTIVE_COLOR
    },
    barButton:{
        height:25,
        alignSelf:'center',
        backgroundColor:'transparent',
    },
    titleWrapper:{
        flex: 1, 
        justifyContent: 'center'
    },
    title:{
        alignSelf: 'center', 
        color: HEADER_FONT_COLOR, 
        fontSize: 20
    },
    controllerRoot:{
        height: 128, backgroundColor: BACKGROUND_COLOR, width: SCREEN_WIDTH
    },
    topWrapper:{
        height: 78, 
        justifyContent: 'space-around'
    },
    buttonWrapper:{
        height: 50, 
        flexDirection: 'row', 
        justifyContent: 'center',
        marginBottom:10,
        paddingHorizontal:10
    },
    volume:{
        alignSelf:'center',
        fontSize:14
    },
    volumeWrapper:{
        flex:Math.max(1,1/RATIO),
        justifyContent:'center'
    },
    contentWrapper:{
        height: 42,
        borderTopColor:LINE_COLOR,
        borderTopWidth:1,
        justifyContent:'center',
        flexDirection:'row'
    },
    leftVolume:{
        flex:3,
        justifyContent:'flex-end',
        flexDirection:'row'
    },
    rightVolume:{
        flex:3,
        justifyContent:'flex-start',
        flexDirection:'row'
    },
    volumeLine:{
        height:2,
        alignSelf:'center'
    },
    index:{
        alignSelf:'center',
        fontSize:14,
        paddingHorizontal:5,
        textAlign:'center'
    },
    oneKeyTopupTouchanle:{
        backgroundColor:UI_ACTIVE_COLOR,
        paddingHorizontal:10,
        paddingVertical:3,
        borderRadius:4
    },
    oneKeyTopupText:{
        color:HEADER_FONT_COLOR
    }
});