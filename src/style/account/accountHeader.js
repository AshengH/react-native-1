import {StyleSheet} from 'react-native'
import {RATIO} from "../../lib/adjust";
import {ACCOUNT_COLOR,HEADER_FONT_COLOR,LINE_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    topBox: {
        backgroundColor: ACCOUNT_COLOR
    },
    top: {
        height: 20,
    },
    header: {
        height: 64,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5
    },
    headerIcon: {
        fontSize: 30,
        paddingHorizontal: 10
    },
    ling: {
        fontSize: 30,
        position: 'absolute',
        right: 10
    },
    buttonBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 25
    },
    buttonColor: {
        backgroundColor: ACCOUNT_COLOR,
        paddingHorizontal: 3,
        paddingVertical: 2,
        borderRadius: 8,
        alignSelf: "center"
    },
    buttonStyle: {
        backgroundColor: ACCOUNT_COLOR,
        borderWidth: 1,
        width: 91,
        height: 28,
        borderRadius: 8,
        justifyContent: 'center'
    },
    function: {
        flexDirection: 'row',
        width: 375,
        backgroundColor: HEADER_FONT_COLOR,
        marginBottom: 1
    },
    functionStyle: {
        height: 60,
        lineHeight: 60
    },
    typeBox: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: HEADER_FONT_COLOR,
        borderColor: LINE_COLOR,
        //borderWidth: 1
    },
    typeStyle:{
        flexDirection: 'row',
        flex:1,
        justifyContent: 'flex-start',
        paddingLeft:Math.min(18,18*RATIO)
    },
    typeAmount:{
        justifyContent: 'center',
        flex:1.3,
        paddingLeft:20
    },
    userName:{
        fontSize: 17
    },
    amountRoot:{
        backgroundColor: ACCOUNT_COLOR
    },
    amount:{
        textAlign: 'center', 
        fontSize: 40
    },
    amountTotalText:{
        textAlign: 'center', 
        fontSize: 20
    },
    buttonBox_root:{
        flexDirection: 'row'
    },
    cryptoRowRoot:{
        flexDirection: 'row'
    },
    cryptoImage:{
        alignSelf: 'center', 
        marginRight: 5
    }
});