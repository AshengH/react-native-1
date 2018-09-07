import {StyleSheet} from 'react-native'
import {RATIO} from "../../../lib/adjust";
import {BACKGROUND_COLOR,HEADER_FONT_COLOR,UI_ACTIVE_COLOR,NOTICE_CONTENT_FONT_COLOR} from './../../../lib/color'

export default styles = StyleSheet.create({
    doneStyle: {
        width: 356 * RATIO,
        backgroundColor: UI_ACTIVE_COLOR,
        textAlign: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        fontWeight: '100',
        overflow: "hidden",
        color:HEADER_FONT_COLOR
    },
    liStyle: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: "row",
        backgroundColor: HEADER_FONT_COLOR,
        marginTop: 1
    },
    scrollViewBackground:{
        backgroundColor:BACKGROUND_COLOR
    },
    inputText:{
        width: 140 * RATIO, 
        fontSize: 15
    },
    input:{
        width: 210 * RATIO
    },
    descRoot:{
        flexDirection: 'row', 
        padding: 15, 
        justifyContent: 'center', 
        marginVertical: 20
    },
    descBlackText:{
        fontWeight: '100'
    },
    descBlueText:{
        color: NOTICE_CONTENT_FONT_COLOR
    },
    button:{
        alignSelf: 'center'
    }
});