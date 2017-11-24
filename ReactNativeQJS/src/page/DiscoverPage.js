//发现页面的逻辑
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl,
} from 'react-native';
import HomeBannerComponent from '../component/HomeBannerComponent'
import DiscoverGridView from '../component/DiscoverGridView'
import Immutable from 'immutable'
import {toastShort} from '../common/ToastUtils'
import SeparatorLine from '../component/SeparatorLine'

export default class DiscoverPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: this.getItemsArray(),
            isRefreshing: false,
        }
    }

    render() {
        return <ScrollView style={styles.container}
                           horizontal={false}
                           showsVerticalScrollIndicator={false}
                           refreshControl={
                               <RefreshControl
                                   refreshing={this.state.isRefreshing}
                                   onRefresh={() => this._onRefresh()}
                                   tintColor={Colors.red}
                                   title="刷新中..."
                                   titleColor={Colors.red}
                                   colors={['#ff0000', '#00ff00', '#0000ff']}
                                   progressBackgroundColor={Colors.white}/>
                           }>
            <HomeBannerComponent style={styles.bannerStyle}/>
            <DiscoverGridView items={this.state.items} onGridSelected={this.onGridSelected}/>
            {SeparatorLine()}
            <View style={styles.layoutStyle}>
                <Image source={ConstantData.ICON_DISCOVERY_NOTICE} style={styles.imageStyle}/>
                <Text>公告中心</Text>
            </View>
            <View style={styles.separatorStyle}/>
            <View style={styles.layoutStyle}>
                <Image source={ConstantData.ICON_DISCOVERY_HELP} style={styles.imageStyle}/>
                <Text>帮助中心</Text>
            </View>
            <View style={styles.separatorStyle}/>
            <View style={styles.layoutStyle}>
                <Image source={ConstantData.ICON_DISCOVERY_SERVICE} style={styles.imageStyle}/>
                <Text>客户服务</Text>
            </View>
            <View style={styles.separatorStyle}/>
            <View style={styles.layoutStyle}>
                <Image source={ConstantData.ICON_DISCOVERY_FEEDBACK} style={styles.imageStyle}/>
                <Text>意见反馈</Text>
            </View>
        </ScrollView>
    }

    checkNetWork() {
        IOS ?
            NetUtils.listenerNetworkState(() => {
                NetUtils.addEventListener(NetUtils.TAG_NETWORK_CHANGE, this.handleMethod);
            })
            :
            NetUtils.listenerNetworkState((isConnected) => {
                if (!isConnected) {
                    toastShort(NetUtils.NOT_NETWORK);
                }
            });
    }

    componentWillUnmount() {
        NetUtils.removeEventListener(NetUtils.TAG_NETWORK_CHANGE, this.handleMethod);
    }

    // 检测网络状态
    handleMethod = (isConnected) => {
        if (!isConnected) {
            toastShort(NetUtils.NOT_NETWORK);
        }
    };


    _onRefresh = () => {
        this.checkNetWork();
    };

    getItemsArray() {
        var items = [];
        items.push(new this.ItemData("平台介绍", "您的赚钱管家", ConstantData.ICON_DISCOVERY_INTRODUCE));
        items.push(new this.ItemData("平台数据", "信息清晰透明", ConstantData.ICON_DISCOVERY_DATA));
        items.push(new this.ItemData("安全保障", "专注所以专业", ConstantData.ICON_DISCOVERY_SECURITY));
        items.push(new this.ItemData("媒体报道", "靠谱值得信赖", ConstantData.ICON_DISCOVERY_REPORT));
        return items;
    }

//存储每个item对象的数据
    ItemData(title, desc, icon) {
        this.title = title;
        this.desc = desc;
        this.icon = icon;
    }

    onGridSelected(item) {
        // alert(item.title)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(this.props === nextProps || Immutable.is(this.props, nextProps))
            || !(this.state === nextState || Immutable.is(this.state, nextState));
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.white,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH
    },
    bannerStyle: {
        height:SCREEN_HEIGHT/3,
        width: SCREEN_WIDTH,
    },
    layoutStyle: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 16,
        color: Colors.headTitleColor
    },
    imageStyle: {
        width: 24,
        height: 24,
        resizeMode: 'cover',
        marginRight: 5
    },
    separatorStyle: {
        height: 1,
        marginLeft: 10,
        backgroundColor: Colors.splitLineColor,
    },
});