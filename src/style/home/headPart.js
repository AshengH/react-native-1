import {StyleSheet} from 'react-native'
import {BACKGROUND_COLOR,HEADER_BACKGROUND, HEADER_FONT_COLOR, LINE_COLOR, TRADE_VIEW_BACKGROUND_COLOR, TRADE_FONT_COLOR, NOTICE_TITLE_BACKGROUND, NOTICE_CONTENT_FONT_COLOR, HOME_NOTICE_CONTENT_BACKGROUND, GRID_LINE_COLOR} from './../../lib/color'
import {RATIO, SCREEN_WIDTH} from './../../lib/adjust'

export default styles = StyleSheet.create({
    headBar: {
        height: 65 * RATIO,
        backgroundColor: HEADER_BACKGROUND,
        width: SCREEN_WIDTH,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    banner: {
        // height: 205 * RATIO,
    },
    server: {
        width: 25, 
        height: 25, 
        marginVertical: 15, 
        marginHorizontal: 15
    },
    bannerImage:{
        width: SCREEN_WIDTH,
        height: 130 * RATIO
    },
    csImageWrapper:{
        alignSelf:'flex-end'
    },
    userImageWrapper:{
        alignSelf:'flex-start',
        flexDirection:'row'
    },
    csImage:{
        marginVertical: 5
    },
    headerOffset:{
        height: 20
    },
    functionButtonRoot:{
        width:'100%',
        backgroundColor:BACKGROUND_COLOR,
        paddingVertical:10,
        marginVertical:10
    },
    functionButtonWrapper:{
        flex:1,
        justifyContent:'center'
    },
    functionButtonText:{
        textAlign:'center'
    },
    functionButtonImage:{
        width:42,
        height:42,
        alignSelf:'center',
        marginBottom:5
    },
    swiper:{
        height:130
    },
    loginButtonLine:{
        height:10,
        width:'100%',
        backgroundColor:GRID_LINE_COLOR,
    },
    tradeViewRoot:{
        flexDirection:'row',
        backgroundColor:TRADE_VIEW_BACKGROUND_COLOR,
        borderRadius:8,
        padding:10,
        marginHorizontal:10,
    },
    tradeViewImage:{
        // width:32,
        // height:32,
        // backgroundColor:'red'
    },
    tradeViewTextWrapper:{
        flex:1,
        marginLeft:10
    },
    tradeButtonText:{
        color:HEADER_FONT_COLOR,
        alignSelf:'center'
    },
    tradeViewTouchable:{
        alignSelf:'center',
        paddingVertical:5,
        paddingHorizontal:15,
        borderRadius:4
    },
    tradeViewTitleText:{
        color:TRADE_FONT_COLOR
    },
    tradeViewValueText:{
        
    },
    tradeViewTextOffset:{
        height:5,
        width:'100%'
    },
    transactionButtonsRoot:{
        borderRadius:4,
        backgroundColor:HEADER_BACKGROUND,
        marginHorizontal:10,
    },
    transactionButtonImage:{
        width:20,
        height:20,
        marginRight:5,
        backgroundColor:'red'
    },
    transactionButtonTouchable:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical:10
    },
    transactionButtonText:{
        alignSelf:'center',
        color:HEADER_FONT_COLOR
    },
    transactionButtonLine:{
        backgroundColor:'#fa7973',
        marginVertical:10,
        width:1,
        height:'70%',
        alignSelf:'center'
    },
    userName:{
        color:HEADER_FONT_COLOR
    },
    homeNotice:{
        width:'90%',
        alignSelf:'center',
        marginBottom:10
    },
    homeNoticeTilleWrapper:{
        justifyContent:'center'
    },
    homeNoticeTitle:{
        borderTopLeftRadius:4,
        borderBottomLeftRadius:4,
        backgroundColor:NOTICE_TITLE_BACKGROUND,
        color:BACKGROUND_COLOR,
        alignSelf:'center',
        paddingVertical:10,
        paddingHorizontal:20,
        overflow:'hidden',
        borderRadius:17,
        fontSize:16
    },
    homeNoticeTitleOffset:{
        backgroundColor:NOTICE_TITLE_BACKGROUND,
        height:'100%',
        width:20,
        position:'absolute',
        right:0
    },
    homeNoticeTouchable:{
        justifyContent:'center'
    },
    homeNoticeContent:{
        paddingLeft:10,
        color:NOTICE_CONTENT_FONT_COLOR
    },
    swiperWrapper:{
        backgroundColor:HOME_NOTICE_CONTENT_BACKGROUND,
        borderRadius:16,
        flex:1
    },
    swiperOffset:{
        backgroundColor:HOME_NOTICE_CONTENT_BACKGROUND,
        left:0,
        position:'absolute',
        width:10,
        height:'100%'
    },
    searchBar:{
        flex:1,
        backgroundColor:'rgba(255,255,255,0.7)',
        flexDirection:'row',
        paddingHorizontal:10,
        marginRight:10
    },
    topBar:{
        position:'absolute',
        top:20,
        zIndex:99,
        left:0,
        right:0,
        flexDirection:'row',
        paddingHorizontal:10
    }
});