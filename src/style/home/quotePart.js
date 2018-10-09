import {StyleSheet} from 'react-native'
import {UI_ACTIVE_COLOR,BASIC_FONT_COLOR,HEADER_FONT_COLOR,LINE_COLOR,DOT_COLOR, BACKGROUND_COLOR, NOTICE_CONTENT_FONT_COLOR, GRID_LINE_COLOR} from './../../lib/color'
import {RATIO, SCREEN_WIDTH} from './../../lib/adjust'

export default styles = StyleSheet.create({
    dot:{
        backgroundColor: DOT_COLOR,
        width: 6,
        height: 6,
        borderRadius: 6,
        marginLeft: 2,
        marginRight: 2
    },
    activeDot:{
        backgroundColor: UI_ACTIVE_COLOR,
        width: 13,
        height: 6,
        borderRadius: 6,
        marginLeft: 2,
        marginRight: 2
    },
    pagination:{
        bottom: 14
    },
    cellRoot:{
        flexDirection: 'row',
        width: SCREEN_WIDTH,
        justifyContent: 'space-around',
        alignContent: 'center',
        flexWrap: 'wrap'
    },
    emptyContent:{
        alignSelf: 'center',
        width: SCREEN_WIDTH / 3
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
        height: 103
    },
    cryptoRoot:{
        backgroundColor: HEADER_FONT_COLOR,
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