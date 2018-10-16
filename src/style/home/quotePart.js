import {StyleSheet} from 'react-native'
import {UI_ACTIVE_COLOR,BASIC_FONT_COLOR,HEADER_FONT_COLOR,LINE_COLOR,DOT_COLOR, BACKGROUND_COLOR, NOTICE_CONTENT_FONT_COLOR, GRID_LINE_COLOR} from './../../lib/color'
import {RATIO, SCREEN_WIDTH} from './../../lib/adjust'

export default styles = StyleSheet.create({
    card:{
        width:280,
        height:140,


    },
    uncard:{
        width:280,
        height:120,

    },

    tabWrap:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height:40,
        alignItems: 'center',

    },
    choose:{
        color:'#F05522',
        fontWeight:'600'
    },
    lineWidth:{
        borderBottomWidth: 3,
        padding:5 ,
        borderBottomColor:'#F05522',
    },










    dot:{
        backgroundColor: DOT_COLOR,
        width: 7,
        height: 7,
        borderRadius: 7,
        margin:5,
    },
    activeDot:{
        backgroundColor: '#4785DF',
        width: 7,
        height: 7,
        borderRadius: 7,
        margin:5,
    },

    pagination:{
        bottom: -30,
    },

    cellRoot:{
        display:'flex',
        flexDirection: 'row',
        width: '50%',
        alignContent: 'center',
        flexWrap: 'wrap',
    },
    emptyContent:{
        alignSelf: 'center',
        width: SCREEN_WIDTH / 3,
    },
    touchable:{
        alignSelf: 'center',
        width: SCREEN_WIDTH / 3,
        justifyContent: 'center'
    },
    name:{
        color: NOTICE_CONTENT_FONT_COLOR,
        fontSize: 14*RATIO,
        textAlign: 'center'
    },
    priceAndPercentText:{
        fontSize: 18*RATIO,
        textAlign: 'center'
    },
    fiatRoot:{
        backgroundColor: BACKGROUND_COLOR,
        marginBottom: 10
    },
    line:{
        backgroundColor: LINE_COLOR, 
        height: 1, 
        marginBottom: 10
    },
    fiatListWrapper:{
        display:'flex',
        width:'100%',
        height: 140,
        paddingTop: 20,
        backgroundColor: '#F7F7F7',
        paddingBottom: 30,
        overflow: 'hidden',

    },
    cryptoRoot:{
        backgroundColor: HEADER_FONT_COLOR,
        width:2000,
    },
    cryptoListWrapper:{
        height: 186
    },
    divideLine:{
        height: 16, 
        backgroundColor: UI_ACTIVE_COLOR, 
        width: 1, 
        position: 'absolute'
    },
    tagText:{
        fontSize:7,
        padding:1,
        borderRadius:2,
        color:BACKGROUND_COLOR,
        alignSelf:'center',
        marginLeft:2,
        overflow:'hidden'
    },
    quoteRoot:{
        backgroundColor:GRID_LINE_COLOR
    }
});