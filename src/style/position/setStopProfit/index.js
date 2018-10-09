import {StyleSheet} from 'react-native'
import { UI_ACTIVE_COLOR, DATE_FONT_COLOR, RAISE, HEADER_FONT_COLOR, FALL,BACKGROUND_COLOR } from '../../../lib/color';
import { RATIO } from '../../../lib/adjust';
export default styles = StyleSheet.create({
    doneStyle: {
        width: 356 * RATIO,
        backgroundColor: UI_ACTIVE_COLOR,
        textAlign: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        fontWeight: '100',
        overflow: "hidden"
    },
    topBox:{
        paddingHorizontal: 10, paddingVertical: 15, backgroundColor: BACKGROUND_COLOR, marginBottom: 3
    },
    firstViewWrapper:{
        justifyContent: 'space-between', 
        flexDirection: 'row'
    },
    contractName:{
        fontSize: 17, 
        flex: 1
    },
    income:{
        flex: 1,
        fontSize: 20,
        textAlign: 'right'
    },
    contractCurrency:{
        fontSize: 14, 
        fontWeight: '200', 
        marginLeft: 10
    },
    secondViewWrapper:{
        flexDirection: 'row', 
        marginBottom: 5
    },
    latestPrice:{
        marginRight: 10
    },
    price:{
        color: FALL, 
        marginRight: 10
    },
    buyText:{
        color: RAISE, 
        fontSize: 16
    },
    volumeText:{
        color: RAISE, 
        fontSize: 16, 
        marginLeft: 80
    },
    bottomBox:{
        backgroundColor: BACKGROUND_COLOR,
        padding: 10
    },
    winProgressBarRoot:{
        marginVertical: 15
    },
    winImage:{
        alignSelf: 'center', 
        color: UI_ACTIVE_COLOR
    },
    sliderStyle:{
        width: 310 * RATIO, 
        alignSelf: 'center'
    },
    sliderThumbStyle:{
        width: 25, 
        height: 40, 
        backgroundColor: RAISE, 
        borderRadius: 5
    },
    profitWrapper:{
        justifyContent: 'space-between', 
        flexDirection: 'row', 
        paddingVertical: 15
    },
    profitValue:{
        flex: 1,
        color: RAISE,
        textAlign: 'right'
    },
    winProgressBarContractCurrency:{
        fontWeight: '200',
         marginLeft: 10
    },
    sliderWrapper:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        height: 40
    },
    tipsOne:{
        marginTop: 30,
        fontSize: 16
    },
    tipsTwo:{
        color: DATE_FONT_COLOR, 
        marginVertical: 8
    },
    tipsThree:{
        color: DATE_FONT_COLOR
    },
    tipsFour:{
        marginTop: 20, 
        color: DATE_FONT_COLOR, 
        marginVertical: 8
    }
});