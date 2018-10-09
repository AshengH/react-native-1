import React,{Component} from 'react'
import {View,Text,Image,TouchableOpacity,ScrollView,Clipboard} from 'react-native'
import styles from './../../style/promote/index'
import commonStyles from './../../style/variable'
import { Header } from '../../common';
import req from './../../lib/req'
import { Cache, Schedule } from '../../module';
import { DOMAIN } from '../../config';
import { UI_ACTIVE_COLOR } from '../../lib/color';
export default class App extends Component {
    constructor(props){
        super(props)

        this.state = {
            isLogin:Cache.isLogin(),
            userId:'',
            qrAddress:'',
            successful: false,
            linkAddress:'',
            commRatio:'',
            levName:'',
            userCount:'',
            userConsume:'',
        }
    }

    componentDidMount(){
        if(Cache.initial){
            this.loginCallback()
        }else{
            Schedule.addEventListener('cacheInitial', this.loginCallback, this)
        }
        if(Cache.userId !== ''){
            this.getInfoCallback();
        }else{
            Schedule.addEventListener('getUserInfo', this.getInfoCallback, this)
        }

        // this.setState({
        //     qrAddress: `/api/vf/tdCode.gif?type=tj&url=${DOMAIN}/?ru=${this.state.userId}`
        // })

        this.getPromotionInfo()
    }

    componentWillUnmount(){
        Schedule.removeEventListeners(this)
    }


    renderRewardView(){
        return(
            <View style={[commonStyles.rowStyle,styles.RewardViewRoot]}>
                <View style={styles.RewardViewLeftRoot}>
                    <Text style={{marginBottom:5}}>{'累计推广活动返利'}</Text>
                    <Text style={styles.promoteAmountText}>{0.00}</Text>
                </View>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserList')} style={styles.userListButtonTouchable}>
                    <Text style={styles.userListButtonText}>{'用戶列表'}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderInfoView(){
        return(
            <View style={styles.InfoViewRoot}>
                <View style={[commonStyles.fillStyle]}>
                    <Text style={[styles.infoViewText,{marginBottom:5}]}>注册用户数</Text>
                    <Text style={[styles.infoViewText,{color:UI_ACTIVE_COLOR}]}>{this.state.userCount}</Text>
                </View>
                <View style={styles.InfoViewLine}/>
                <View style={commonStyles.fillStyle}>
                    <Text style={[styles.infoViewText,{marginBottom:5}]}>注册用户数</Text>
                    <Text style={[styles.infoViewText,{color:UI_ACTIVE_COLOR}]}>{this.state.userConsume}</Text>
                </View>
                <View style={styles.InfoViewLine}/>
                <View style={commonStyles.fillStyle}>
                    <Text style={[styles.infoViewText,{marginBottom:5}]}>注册用户数</Text>
                    <Text style={[styles.infoViewText,{color:UI_ACTIVE_COLOR}]}>0</Text>
                </View>
            </View>
        );
    }

    render(){
        console.log(DOMAIN+this.state.qrAddress)
        return(
            <View style={[commonStyles.fillStyle,commonStyles.whiteBackground]}>
                <Header title={'Promote detail'} navigation={this.props.navigation}/>
                <ScrollView>
                    {this.renderRewardView()}
                    {this.renderInfoView()}
                    <Image style={styles.qrCodeImage} source={{uri:DOMAIN+this.state.qrAddress}}/>
                    <Text style={styles.urlText}>{'分享您的专属链接 \n'+this.state.linkAddress}</Text>
                    <TouchableOpacity onPress={Clipboard.setString(this.state.linkAddress)} style={styles.copyButtonTouchable}>
                        <Text style={styles.copyButtonText}>{'复制'}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    async getPromotionInfo(){
        try{
            let result = await req({
                url:'/mine/union.htm',
                type:'GET'
            });
            let info = result.union;

            this.setState({
                commRatio:info.commRatio * 100,
                userCount:info.userCount,
                userConsume : info.userConsume,
                visitCount: info.visitCount,
                linkAddress:`http://${window.location.host}/?ru=${info.userId}`,
                userId:info.userId
            });

            if(this.state.userConsume >= 50) {
                this.setState({levName:'钻石经纪'});
            }else if(this.state.userConsume >= 40) {
                this.setState({levName:'金牌经纪'});
            }else if(this.state.userConsume >= 30 || this.state.userConsume >=10){
                this.setState({levName:'银牌经纪'});
            }else {
                this.setState({levName:'普通经纪'});
            }
        }catch(e){}
    }

    loginCallback(){
        this.setState({
            isLogin:Cache.isLogin()
        })
    }

    getInfoCallback(){
        this.setState({
            userId:Cache.userId,
            qrAddress: `/api/vf/tdCode.gif?type=tj&url=${DOMAIN}/?ru=${Cache.userId}`,
            linkAddress:`http://${DOMAIN}/?ru=${Cache.userId}`
        })
    }


}