import React,{Component} from 'react'
import {View,Text,FlatList,TouchableOpacity,StyleSheet,Button,Image} from 'react-native'
import { UI_ACTIVE_COLOR, GRAY_SVG_COLOR, HEADER_FONT_COLOR, RAISE, LINE_COLOR, GRID_LINE_COLOR, FALL, GREEN_POINT_COLOR } from '../../../lib/color';
import { lang } from '../../../lang';
import {SafeBody, SCREEN_WIDTH} from "../../../lib/adjust";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 1
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render(){
        return(
            <View>
                <View >
                    <Image
                        style={liveStyle.imageView}
                        source={{uri: 'https://nf.hot7h.com/static/media/liveBanner.0351b24c.png'}}
                    />
                </View>
                <View style={liveStyle.selectBar}>
                    <Button
                        title={'直播表'}
                        color={'black'}
                    />
                    <Button
                        title={'聊天室'}
                        color={'black'}
                    />
                </View>
                <View style={liveStyle.cellView}>
                    <View style={liveStyle.cellLeftPart}>
                        <Image
                            style={liveStyle.headerImageView}
                            source={{uri: 'data:image/png;base64,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'}}
                        />
                    </View>
                    <View style={liveStyle.cellRightPart}>
                        <Text>首席分析师：吴大志老师</Text>
                        <Text>20:00:00-22:00:00 直播</Text>
                        <Text style={{width:SCREEN_WIDTH*0.65}}>5年财经门户网站及实盘操作经验，精通蜡烛图、均线及MACD等技术指标，擅长找出进出场位置，能够做到稳定盈利。投资格言：胆大心细，像狼一样有耐心</Text>
                    </View>
                </View>
            </View>

        )
    }
}

const liveStyle=StyleSheet.create({
    imageView:{
        width:SCREEN_WIDTH,
        height:SCREEN_WIDTH*0.45,
    },
    selectBar:{
        height:44,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    cellView:{
        flexDirection:'row',
    },
    cellLeftPart:{
        width:SCREEN_WIDTH*0.3,
        marginLeft:10
    },
    cellRightPart:{
        marginVertical:10,
        marginRight:10,
    },
    headerImageView:{
        width:SCREEN_WIDTH*0.2,
        height:SCREEN_WIDTH*0.2,
    }
});