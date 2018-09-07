import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO} from './../../../lib/adjust'
import { BASIC_COLOR, GRAY_SVG_COLOR, HEADER_FONT_COLOR } from '../../../lib/color';

export default styles = StyleSheet.create({
    root:{
        backgroundColor:HEADER_FONT_COLOR
    },
    crypto_root:{
        backgroundColor:HEADER_FONT_COLOR
    },
    crypto_cellRoot:{
        backgroundColor: HEADER_FONT_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 10
    },
    crypto_cellTopWrapper:{
        flexDirection: 'row', 
        marginBottom: 2
    },
    crypto_cellBottomWrapper:{
        flexDirection: 'row'
    },
    crypto_topWrapperText:{
        flex: 1,
        textAlign: 'center'
    },
    crypto_bottomWrapperText:{
        flex: 1, 
        color: GRAY_SVG_COLOR
    },
    crypto_date:{
        flex: 1,
        color: GRAY_SVG_COLOR,
        textAlign: 'center'
    },
    crypto_noRecord:{
        color:BASIC_COLOR,
        textAlign:'center',
        padding:15,
        fontSize:20
    }
});