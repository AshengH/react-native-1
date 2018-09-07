import {StyleSheet} from 'react-native'
import {RATIO} from "../../../lib/adjust";
import {BACKGROUND_COLOR,GRAY_SVG_COLOR,HEADER_FONT_COLOR,UI_ACTIVE_COLOR} from './../../../lib/color'

export default styles = StyleSheet.create({
    doneStyle:{
        width: 356 * RATIO,
        textAlign: 'center',
        paddingVertical: 12,
        fontWeight: '100',
        overflow: "hidden"
    },
    scrollVIewBackground:{
        backgroundColor:BACKGROUND_COLOR
    },
    button:{
        alignSelf: 'center',
        backgroundColor: UI_ACTIVE_COLOR,
        marginTop: 60,borderRadius: 10
    },
    cellRoot:{
        paddingHorizontal:10,
        paddingVertical:15,
        flexDirection:'row',
        backgroundColor:HEADER_FONT_COLOR,
        borderBottomWidth:1,
        borderBottomColor:GRAY_SVG_COLOR
    },
    title:{
        fontSize:15
    },
    desc:{
        fontSize:13,
        'color':GRAY_SVG_COLOR
    },
    icon:{
        position:'absolute',
        right:15,
        alignSelf:'center',
    }
});