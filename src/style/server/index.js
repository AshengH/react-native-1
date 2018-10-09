import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO} from './../../lib/adjust'
import {HEADER_FONT_COLOR, UI_ACTIVE_HOVER_COLOR,UI_ACTIVE_COLOR, GRID_LINE_COLOR,SCHEME_THREE_BACKGROUND_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    triangleServer: {
        position: 'absolute',
        zIndex: 1,
        left: -15,
        top: 10,
        width: 0,
        height: 0,
        borderLeftWidth: 2,
        borderRightWidth: 10,
        borderTopWidth: 7,
        borderBottomWidth: 7,
        borderLeftColor: 'transparent',
        borderRightColor: HEADER_FONT_COLOR,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        alignSelf: 'center',
        marginLeft: 3
    },
    triangleCustomer: {
        position: 'absolute',
        zIndex: 1,
        right: 67,
        top: 23,
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 2,
        borderTopWidth: 7,
        borderBottomWidth: 7,
        borderLeftColor: HEADER_FONT_COLOR,
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        alignSelf: 'center',
        marginLeft: 3
    },
    imageBackground:{
        width: SCREEN_WIDTH, 
        flex: 1
    },
    bottomView:{
        paddingVertical: 8,
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        backgroundColor: HEADER_FONT_COLOR
    },
    input:{
        padding: 8, 
        paddingLeft: 20, 
        backgroundColor: GRID_LINE_COLOR, 
        borderRadius: 28, 
        flex: 6
    },
    sendIcon:{
        flex: 1, 
        color: UI_ACTIVE_COLOR, 
        alignSelf: 'center', 
        marginLeft: 10
    },
    serverConversationRoot:{
        flexDirection: 'row', 
        padding: 15
    },
    serverImage:{
        width: 44, 
        height: 44, 
        marginRight: 20
    },
    serverTextWrapper:{
        backgroundColor:SCHEME_THREE_BACKGROUND_COLOR,
        padding: 10, 
        maxWidth: 215 * RATIO
    },
    conversationText:{
        fontSize: 16
    },
    userConversationRoot:{
        flexDirection: 'row', 
        padding: 15, 
        justifyContent: 'flex-end'
    },
    userTextWrapper:{
        backgroundColor: SCHEME_THREE_BACKGROUND_COLOR,
        padding: 10, 
        maxWidth: 215 * RATIO
    },
    userImage:{
        width: 44, 
        height: 44, 
        marginLeft: 20
    }
})