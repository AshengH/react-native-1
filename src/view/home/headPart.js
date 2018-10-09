import React, {Component} from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TouchableHighlight,
    TextInput
} from 'react-native';
import {withNavigation} from 'react-navigation';
import Swiper from 'react-native-swiper';
import Icons from 'react-native-vector-icons/Ionicons';
import {AsyncStorage} from 'react-native';
import {SCHEME_THREE_BACKGROUND_COLOR} from "../../lib/color";
import {Cache, Schedule, Assets, Store, Contracts, Data} from "../../module";
import styles from './../../style/home/headPart'
import commonStyle from './../../style/variable'
import cache from "../../module/cache";
import { lang } from "../../lang";
import JsonUtils from "../../common/jsonUtils";

const data = [
    {name: "自选期货", id: 0},
    {name: "所有", id: 1}]


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

    goNotice(){
        this.props.navigation.navigate('Notice');
    }

    render(){

        if (!this.state.homeNotice.length) {
            return(
                <View style={[commonStyle.rowStyle,styles.homeNotice]}>
                    <View style={styles.homeNoticeTilleWrapper}>
                        <Text style={styles.homeNoticeTitle}>{lang('Notices')}</Text>
                    </View>
                </View>
            );
        }

        let content = this.state.homeNotice.map((item, i)=>{
            return (
                <TouchableOpacity
                    onPress={()=>this.goNotice()}
                    style={[commonStyle.fillStyle, styles.homeNoticeTouchable]}
                >
                    <Text style={styles.homeNoticeContent}>
                        {item.title}
                    </Text>
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
                    <Swiper height={48} autoplay={true} showsPagination={false}>
                        {content}
                    </Swiper>
                </View>
            </View>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: cache.isLogin(),
            userName: '',
            idx: 0,
            contract: null,
            notices: [],
            foreignArray: [],
            stockArray: [],
            domesticArray: [],
            hot: [],
            news: [],
            dataArr:[],
            allArr:[],
            arr: [],
            selfArray: [],
        }
        if (Contracts.initial) {
            this.state.foreignArray = Data.foreignBrief;
            this.state.stockArray = Data.stockBrief;
            this.state.domesticArray = Data.domesticBrief;
            let [o] = Contracts.foreignArray;
            this.state.contract = o.contract;
            this.state.hot = Contracts.hot;
            this.state.news = Contracts.new;
            this.state.selfArray = Data.selfBrief
            this.state.allArr = Data.foreignBrief.concat(Data.stockBrief,Data.domesticBrief)
            Data.start('updateBrief');
        } else {
            Schedule.addEventListener('contractsInitial', this.updateContracts, this);
        }
    }

    updateContracts() {
        let [o] = Contracts.foreignArray;
        this.setState({
            contract: o.contract,
            foreignArray: Data.foreignBrief,
            stockArray: Data.stockBrief,
            domesticArray: Data.domesticBrief,
            hot: Contracts.hot,
            selfArray: Data.selfBrief,
            allArr: Data.foreignBrief.concat(Data.stockBrief,Data.domesticBrief)
        });

        Data.start('updateBrief');
    }

    updateBrief() {
        this.setState({
            foreignArray: Data.foreignBrief,
            stockArray: Data.stockBrief,
            domesticArray: Data.domesticBrief,
            allArr:Data.foreignBrief.concat(Data.stockBrief,Data.domesticBrief)
        });
    }

    async getSelf() {

        let aryStr = await AsyncStorage.getItem('self');
        let ary = JsonUtils.stringToJson(aryStr) || [];
        // console.log(ary,'打印数组');

        let code = this.props.commodity;
        if (ary.includes(code) === true) {
            this.state.active = true;
        }
    }

    componentDidMount(){
        // console.log(Data);
        Schedule.addEventListener('updateBrief', this.updateBrief, this)
        this.getSelf()
    }

    componentWillUnmount() {
        Schedule.removeEventListeners(this);
        Data.end('updateBrief');
    }

    handleActive(i) {
        this.setState({
           idx: i
        });
    }

    // 我的自选
    renderTabs(){
        return(
            <View style={[commonStyle.rowStyle, styles.functionButtonRoot]}>
                <View style={[commonStyle.rowStyle, styles.tabsWrapper]}>
                    {
                        data.map((e, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.functionButtonWrapper}
                                    onPress={()=>{
                                    Schedule.dispatchEvent({
                                        event: 'typeSelect',
                                        eventData: 3
                                    });
                                        this.handleActive(index);
                                    // this.props.navigation.navigate('Quotation')
                                }}>
                                    <Text style={this.state.idx === index ? [styles.baseTabs, styles.activeTab]: styles.baseTabs}>{e.name}</Text>
                                </TouchableOpacity>
                            )

                        })
                    }
                </View>
                <Icons name='ios-arrow-forward' size={20} style={styles.backIcon} />
            </View>
        );
    }

    renderTabContent() {
        return (
            <View style={[commonStyle.rowStyle, styles.tabContentBox]}>
                <ScrollView
                    horizontal
                    directionalLockEnabled
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center">
                    <View>
                        {this.state.idx === 0 ? this.state.selfArray.length ?
                            this.state.selfArray.map((item, idx) => {
                                return (
                                    <TouchableHighlight>
                                        <Text>我是一</Text>
                                    </TouchableHighlight>)}) :
                            <View>
                                <Text>添加自选</Text>
                            </View>:
                            <View>
                                <TouchableHighlight
                                    activeOpacity={1}
                                    style={[styles.touchable, {height: 80}]}
                                    onPress={() => {
                                        // Schedule.dispatchEvent({event: 'openTrade', eventData: name});
                                        // this.props.navigation.navigate('GotoTrade',{code:code});
                                    }}
                                    underlayColor={SCHEME_THREE_BACKGROUND_COLOR}
                                >
                                    <View>
                                        <Text>我是二</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
    // renderHeightOffset(){
    //     if (isIphoneX()) {
    //         return null
    //     }else{
    //         return(
    //             <View style={styles.headerOffset}/>
    //         );
    //     }
    // }



    render() {
        // let imageStyle = isIphoneX() ? styles.csImage : null;

        return (
            <View style={styles.banner}>
                <HomeNotice navigation={this.props.navigation}/>
                {this.renderTabs()}
                {this.renderTabContent()}
                <View style={styles.loginButtonLine}/>
            </View>
        )
    }

    // goAccountCenter(){
    //     if (this.state.isLogin) {
    //         this.props.navigation.navigate('AccountCenter');
    //     } else {
    //         this.props.navigation.navigate('Login');
    //     }
    // }

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
}


export default withNavigation(App)