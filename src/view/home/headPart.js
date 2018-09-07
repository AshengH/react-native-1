import React, {Component} from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import {withNavigation} from 'react-navigation'
import Swiper from 'react-native-swiper';
import {CHANNEL, contentVersion} from "../../config";

import req from "../../lib/req";
import {Cache, Schedule, Assets, Store} from "../../module";
import {
    isIphoneX, SCREEN_WIDTH
} from "../../lib/adjust";
import styles from './../../style/home/headPart'
import commonStyle from './../../style/variable'
import {DOMAIN} from './../../config'
import { TRADE_SIMULATE_COLOR, HEADER_BACKGROUND, NOTICE_TITLE_BACKGROUND, HOME_NOTICE_CONTENT_BACKGROUND, BACKGROUND_COLOR } from "../../lib/color";
import cache from "../../module/cache";
import { lang } from "../../lang";

const boy = require('./../../images/boy.png');
const girls = require('./../../images/girls.png');

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banner: []
        };
    }

    render() {
        if (this.state.banner.length === 0) {
            return null
        }
        return (
            <Swiper style={styles.swiper} autoplay={true} autoplayDirection={false} loop={true}
                    showsPagination={false}>
                {
                    this.state.banner.map(({url},i) => {
                        let newStr = `src/${CHANNEL}`;
                        let newUrl = url.replace('src',newStr);
                        
                        return (
                            <View key={i} style={{}}>
                                <Image source={{uri: `${DOMAIN}/${url}`}} style={styles.bannerImage}/>
                            </View>
                        )
                    })
                }
            </Swiper>
        )
    }

    componentDidMount() {
        (
            async () => {
                try {
                    const res = await req({
                        url: '/index.htm',
                        data: {
                            action: 'carousel'
                        }
                    });
                    this.setState({banner: res.carousels});
                } catch (err) {

                }
            }
        )()
    }
}

class HomeNotice extends Component {
    constructor(props){
        super(props);

        this.state = {
            homeNotice:[]
        }
    }

    componentDidMount(){
        this.mounted = true;
        Store.homeNotices.get().then((data)=>{
            if(this.mounted){
                this.setState({
                    homeNotice:data
                })
            }
        })
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    render(){

        if (this.state.homeNotice.length === 0) {
            return(
                <View style={[commonStyle.rowStyle,styles.homeNotice]}>
                    <View style={styles.homeNoticeTilleWrapper}>
                        <Text style={styles.homeNoticeTitle}>{lang('Notices')}</Text>
                        <View style={styles.homeNoticeTitleOffset}></View>
                    </View>
                    <View  style={styles.swiperWrapper} >
                        <View style={styles.swiperOffset}></View>
                        <View style={{height:34}}>
                            
                        </View>
                    </View>
                </View>
            );
        }

        let content = this.state.homeNotice.map((item,i)=>{
            return (
                <TouchableOpacity onPress={()=>this.goNotice()} style={[commonStyle.fillStyle,styles.homeNoticeTouchable]}>
                    <Text style={styles.homeNoticeContent}>{item.title}</Text>
                </TouchableOpacity>
            );
        });

        return(
            <View style={[commonStyle.rowStyle,styles.homeNotice]}>
                <View style={styles.homeNoticeTilleWrapper}>
                    <Text style={styles.homeNoticeTitle}>{lang('Notices')}</Text>
                    <View style={styles.homeNoticeTitleOffset}></View>
                </View>
                <View  style={styles.swiperWrapper} >
                    <View style={styles.swiperOffset}></View>
                    <Swiper height={34} autoplay={true} showsPagination={false}>
                        {content}
                    </Swiper>
                </View>
            </View>
        );
    }

    goNotice(){
        this.props.navigation.navigate('Notice');
    }
}

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogin:cache.isLogin(),
            userName:'',
        }

        if (Assets.initial) {
            this.state.realAmount = Assets.money;
            this.state.simulateAmount = Assets.game
        }else{
            Assets.update();
        }
        Schedule.addEventListener('updateAssets',()=>this.assetsCallbacks());
    }

    componentDidMount(){
        if (Cache.initial) {
            this.loginCallback()
        }

        if (Cache.userId !== '') {
            this.getInfoCallback();
        } else {
            Schedule.addEventListener('getUserInfo', this.getInfoCallback, this)
        }

        Schedule.addEventListener('cacheInitial', this.loginCallback, this);
        Schedule.addEventListener('loginCallback', this.loginCallback, this);

    }

    renderUserInfoButton(imageStyle){
        if (this.state.isLogin) {
            let userImage = this.state.gender ? girls : boy;
            return(
                <View style={[commonStyle.fillStyle,{justifyContent:'flex-end'}]}>
                    <View
                        style={styles.userImageWrapper}
                        onPress={() => {
                            
                        }}>
                        <Image
                            source={userImage}
                            style={[styles.server,imageStyle]}
                        />
                        <Text style={[commonStyle.centerView,styles.userName]}>{this.state.userName}</Text>
                    </View>
                </View>
            );
        } else {
            return null
        }
    }

    renderTransactionButtons(){
        if (contentVersion == 'standard') {
            return(
                <View style={[commonStyle.rowStyle,styles.transactionButtonsRoot]}>
                    <TouchableOpacity style={styles.transactionButtonTouchable}>
                        <Image style={styles.transactionButtonImage}/>
                        <Text style={styles.transactionButtonText}>{'入金'}</Text>
                    </TouchableOpacity>
                    <View style={[styles.transactionButtonLine]}/>
                    <TouchableOpacity style={styles.transactionButtonTouchable}>
                        <Image style={styles.transactionButtonImage}/>
                        <Text style={styles.transactionButtonText}>{lang('Withdraw')}</Text>
                    </TouchableOpacity>
                </View>
            );
        }else{
            return null
        }
    }

    renderTradeView(type,touchEvent){

        if (type === 'real' && contentVersion !== 'standard') {
            return(null);
        }

        let themeColor = type === 'real' ? HEADER_BACKGROUND : TRADE_SIMULATE_COLOR;
        let buttonText = type === 'real' ? '实盘交易' : '模拟交易';
        let titleText = type === 'real' ? '实盘账户余额' : '模拟账户余额';
        let amount = type === 'real' ? this.state.realAmount : this.state.simulateAmount;
        let customStyle = type === 'real' ? {marginBottom:10,marginTop:5} : {marginTop:10,marginBottom:5};

        return(
            <View style={[styles.tradeViewRoot,customStyle]}>
                <Image source={require('./../../images/home-simulateTrade.png')} style={styles.tradeViewImage}/>
                <View style={styles.tradeViewTextWrapper}>
                    <Text style={styles.tradeViewTitleText}>{titleText}</Text>
                    <View style={styles.tradeViewTextOffset}/>
                    <Text style={[{color:themeColor}]}>{amount}</Text>
                </View>
                <TouchableOpacity onPress={touchEvent} style={[styles.tradeViewTouchable,{backgroundColor:themeColor}]}>
                    <Text style={styles.tradeButtonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderTrade(){
        if (this.state.isLogin) {
            return (
                <View style={commonStyle.whiteBackground}>
                    {this.renderTradeView('simulate',()=>this.goSimulateTrade())}
                    {this.renderTradeView('real')}
                    {this.renderTransactionButtons()}
                </View>
            );
        } else {
            return null
        }
    }

    // Quotation
    renderButtons(){
        return(
            <View style={[commonStyle.rowStyle,styles.functionButtonRoot]}>
                <TouchableOpacity onPress={()=>{
                    Schedule.dispatchEvent({
                        event:'typeSelect',
                        eventData:3
                    });
                    this.props.navigation.navigate('Quotation')
                }} style={styles.functionButtonWrapper}>
                    <Image source={require('./../../images/myChoose.png')} style={styles.functionButtonImage}/>
                    <Text style={styles.functionButtonText}>我的自选</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Broadcast',{showLive:true})} style={styles.functionButtonWrapper}>
                    <Image source={require('./../../images/live.png')} style={styles.functionButtonImage}/>
                    <Text style={styles.functionButtonText}>新闻资讯</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Guide')} style={styles.functionButtonWrapper}>
                    <Image source={require('./../../images/guide.png')} style={styles.functionButtonImage}/>
                    <Text style={styles.functionButtonText}>{lang('Guideline')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('TopList')} style={styles.functionButtonWrapper}>
                    <Image source={require('./../../images/listRanking.png')} style={styles.functionButtonImage}/>
                    <Text style={styles.functionButtonText}>榜单排名</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderHeightOffset(){
        if (isIphoneX()) {
            return null
        }else{
            return(
                <View style={styles.headerOffset}/>
            );
        }
    }

    

    render() {
        let imageStyle = isIphoneX() ? styles.csImage : null;

        return (
            <View style={styles.banner}>
                <View>
                    <Image source={require('./../../images/banner.jpg')}
                           style={{width:SCREEN_WIDTH,height:SCREEN_WIDTH * 0.4,resizeMode: Image.resizeMode.stretch}}
                    />
                    <View style={styles.topBar}>
                        {/*<View style={styles.searchBar}>*/}
                            {/*<TextInput placeholder={lang('Please enter information such as product name/contract number')} returnKeyType={'done'} style={commonStyle.fillStyle}/>*/}
                            {/*<TouchableOpacity style={commonStyle.centerView}>*/}
                                {/*<Image source={require('./../../images/search.png')}/>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                        {/*<Image source={require('./../../images/letter.png')}/>*/}
                    </View>
                </View>
                {this.renderButtons()}
                <HomeNotice navigation={this.props.navigation}/>
                <View style={styles.loginButtonLine}/>
            </View>
        )
    }

    goAccountCenter(){
        if (this.state.isLogin) {
            this.props.navigation.navigate('AccountCenter');
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    loginCallback() {
        this.setState({isLogin: Cache.isLogin(),userName:Cache.nickname})
    }

    getInfoCallback() {
        // if (Cache.idNumber) {
        //     let num = Cache.idNumber.slice(16, 17) % 2;
        //     num === 0 ? this.setState({gender: true}) : this.setState({gender: false});
        // }
        if (Cache.idNumber === 0) {
            return;
        }
        let num = Cache.idNumber.slice(16, 17) % 2;
        num === 0 ? this.setState({gender: true}) : this.setState({gender: false});
    }

    assetsCallbacks(){
        this.setState({
            realAmount:Assets.money,
            simulateAmount:Assets.game
        });
    }

    goSimulateTrade(){
        this.props.navigation.navigate('Quotation');
    }
}


export default withNavigation(App)