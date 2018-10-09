import {StyleSheet} from 'react-native'
import { UI_ACTIVE_COLOR, HEADER_FONT_COLOR, LINE_COLOR } from '../../lib/color';
import { SCREEN_WIDTH } from '../../lib/adjust';

export default styles = StyleSheet.create({
    userListButtonTouchable:{
        backgroundColor:UI_ACTIVE_COLOR,
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:4,
        justifyContent:'center',
        
    },
    userListButtonText:{
        color:HEADER_FONT_COLOR,
    },
    RewardViewRoot:{
        justifyContent:'space-between',
        marginHorizontal:10,
        marginVertical:10,
        borderBottomWidth:1,
        borderColor:LINE_COLOR,
        paddingBottom:10
    },
    RewardViewLeftRoot:{
        justifyContent:'center',
    },
    promoteAmountText:{
        color:UI_ACTIVE_COLOR
    },
    InfoViewRoot:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor:LINE_COLOR,
        paddingBottom:5,
        marginHorizontal:10,
    },
    InfoViewLine:{
        width:1,
        height:'90%',
        backgroundColor:LINE_COLOR
    },
    infoViewText:{
        alignSelf:'center',
    },
    qrCodeImage:{
        width:SCREEN_WIDTH/2,
        height:SCREEN_WIDTH/2,
        alignSelf:'center',
        marginVertical:10
    },
    urlText:{
        textAlign:'center'
    },
    copyButtonTouchable:{
        backgroundColor:UI_ACTIVE_COLOR,
        paddingHorizontal:20,
        paddingVertical:10,
        alignSelf:'center',
        marginVertical:10,
        borderRadius:4
    },
    copyButtonText:{
        color:HEADER_FONT_COLOR
    }
});