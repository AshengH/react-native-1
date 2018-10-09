import {StyleSheet} from 'react-native'
import {RATIO,SCREEN_WIDTH} from "../../../lib/adjust";
import {BACKGROUND_COLOR, DATE_FONT_COLOR, HEADER_FONT_COLOR} from './../../../lib/color'

export default styles = StyleSheet.create({
    scrollViewBackground:{
        backgroundColor:BACKGROUND_COLOR
    },
    amountRoot:{
        backgroundColor: HEADER_FONT_COLOR, 
        marginBottom: 10
    },
    money:{
        fontSize: 40,
        alignSelf: 'center',
        marginTop: 35,
        marginBottom: 5,
    },
    status:{
        alignSelf: 'center', 
        marginBottom: 20
    },
    infoRoot:{
        backgroundColor: HEADER_FONT_COLOR, 
        padding: 12
    },
    textWrapper:{
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        paddingVertical: 10
    },
    date:{
        color: DATE_FONT_COLOR
    },
    explain:{
        color: DATE_FONT_COLOR
    }
});