import { StyleSheet } from 'react-native';
import { UI_ACTIVE_COLOR, HEADER_FONT_COLOR } from '../../lib/color';

export default styles = StyleSheet.create({
    listHeaderRoot:{
        backgroundColor:UI_ACTIVE_COLOR,
        paddingVertical:10
    },
    listHeaderText:{
        color:HEADER_FONT_COLOR,
    },
    cellRoot:{
        paddingVertical:10
    }
})