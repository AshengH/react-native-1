import {StyleSheet} from 'react-native'
import {RATIO} from "../../lib/adjust";
import {HEADER_FONT_COLOR,GRID_LINE_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    root:{
        flex:1
    },
    titleRoot:{
        flexDirection:'row',
        height:34,
        borderBottomColor:GRID_LINE_COLOR,
        borderBottomWidth:1
    },
    title:{
        flex:1,
        textAlign:'center',
        alignSelf:'center'
    },
    itemBase:{
        flex:1,
        textAlign:'center',
        alignSelf:'center',
        fontSize:Math.min(17*RATIO,17)
    },
    itemRate:{
        textAlign:'center',
        alignSelf:'center',
        height:28,
        lineHeight:28,
        fontSize:15,
        width:60,
        justifyContent:'center',
        color:HEADER_FONT_COLOR
    },
    cellRoot:{
        flexDirection:'row',
        height:60,
        borderBottomColor:GRID_LINE_COLOR,
        borderBottomWidth:1
    },
    changeWrapper:{
        flex:1,
        justifyContent:'center'
    }
});