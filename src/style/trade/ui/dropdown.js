import {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    root:{
        position: 'absolute',
        zIndex: 1
    },
    itemWrapper:{
        width:0,
        height:0,
        borderLeftWidth:10,
        borderRightWidth:10,
        borderTopWidth:2,
        borderBottomWidth:7,
        borderLeftColor:'transparent',
        borderRightColor:'transparent',
        borderTopColor:'transparent',
        alignSelf:'center'
    }
});