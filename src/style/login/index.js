import {StyleSheet} from 'react-native'
import {SCREEN_WIDTH,RATIO} from './../../lib/adjust'
import {HEADER_FONT_COLOR, UI_ACTIVE_HOVER_COLOR, LOGIN_BACKGROUND_COLOR, HEADER_BACKGROUND, TRADE_VIEW_BACKGROUND_COLOR, UI_ACTIVE_COLOR, BASIC_FONT_COLOR, BACKGROUND_COLOR, LINE_COLOR} from './../../lib/color'

export default styles = StyleSheet.create({
    loginTitle: {
        // textAlign: 'center',
        color:BASIC_FONT_COLOR,
        fontSize: 20,
        marginBottom: 40,
        marginTop: 60,
        paddingHorizontal:30
    },
    inputBox: {
        width: 349*RATIO,
        height: 40,
        alignSelf: 'center',
        backgroundColor: BACKGROUND_COLOR,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth:1,
        borderColor:LINE_COLOR
    },
    textInput: {
        width: 289*RATIO,
        height: 40,
        paddingLeft: 10,
        alignSelf:'center'
    },
    buttonBox: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 60
    },
    functionButton: {
        height: 40,
        position: 'absolute',
        alignSelf: 'center',
        flex:1
    },
    functionBtnStyle: {
        flexDirection: 'row',
        width: 120*RATIO,
        height: 40
    },
    loginBtn: {
        backgroundColor: UI_ACTIVE_COLOR,
        width: 329*RATIO,
        height: 40,
        alignSelf: 'center',
        borderRadius: 30,
        zIndex:99
    },
    signUpBtn: {
        backgroundColor: BACKGROUND_COLOR,
        width: 329*RATIO,
        height: 40,
        alignSelf: 'center',
        borderRadius: 30,
        zIndex:99,
        borderColor:UI_ACTIVE_COLOR,
        borderWidth:1,
    },
    imageBackground:{
        width: SCREEN_WIDTH, 
        flex: 1,
        backgroundColor:LOGIN_BACKGROUND_COLOR,
        position:'relative'
    },
    backIconWrapper:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    backIcon:{
        padding: 10, 
        opacity: .8
    },
    inputIcon:{
        lineHeight: 60
    },
    doubleButtonRoot:{
        height: 30, 
        marginTop: 20, 
        flexDirection: 'row',
        justifyContent:"space-around",
        zIndex:99
    },
    loginButtonContainerViewStyle:{
        width: 329*RATIO,
        height: 40,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 15
    },
    thirdPartyTouchable:{
        margin: 10
    },
    thirdPartyButtonWrapper:{
        width: 120, 
        flexDirection: 'row', 
        justifyContent: "center"
    },
    thirdPartyButtonIcon:{
        alignSelf: 'center'
    },
    thirdPartyButtonText:{
        alignSelf: 'center', 
        marginLeft: 5
    },
    loginBottomWrapper:{
        position:'relative',
        paddingBottom:10,
        flex:1
    },
    loginBottomImage:{
        position:'absolute',
        right:0,
        bottom:0
    },
    loginLeftImage:{
        position:'absolute',
        left:'-20%'
    },
    
});