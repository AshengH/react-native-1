import {StyleSheet} from 'react-native'
import { RATIO } from '../../../lib/adjust';
import { UI_ACTIVE_COLOR, HEADER_FONT_COLOR, BACKGROUND_COLOR, NOTICE_CONTENT_FONT_COLOR } from '../../../lib/color';

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
    liStyle:{
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
        width: 100 * RATIO, 
        fontSize: 15,
        alignSelf:'center'
    },
    input:{
        //width: 210 * RATIO
        flex:1
    },
    descRoot:{
        flexDirection: 'row', 
        padding: 15, 
        justifyContent: 'center', 
    },
    descBlackText:{
        fontWeight: '100'
    },
    descBlueText:{
        color: UI_ACTIVE_COLOR
    },
    button:{
        alignSelf: 'center',
        marginTop:30,
        marginBottom:10
    },
    verifyTouchable:{
        borderRadius:4,
        borderWidth:1,
        borderColor:UI_ACTIVE_COLOR,
        padding:5
    },
    verifyText:{
        color:UI_ACTIVE_COLOR
    }
});