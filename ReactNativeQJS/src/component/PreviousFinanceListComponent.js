'use strict'
import React, {PureComponent} from 'react'
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    BackHandler,
    View,
    Text,
    Animated
} from 'react-native'
import FinanceListItemView from './FinanceListItemView'
import SeparatorLine from './SeparatorLine'
import CircleProgress from './CircleProgress'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
var pageIndex = 0;

export default class PreviousFinanceListComponent extends PureComponent {

    render() {
        return (<View style={styles.container}>
            <AnimatedFlatList
                ListFooterComponent={this.ListFootComponent()}
                ItemSeparatorComponent={() => SeparatorLine()}
                ListEmptyComponent={this.ListEmptyComponent}
                renderItem={this.renderItemView}
                onRefresh={() => this.refresh()}
                refreshing={this.props.isRefreshing}
                horizontal={false}
                extraData={this.state}
                legacyImplementation={false}
                onEndReachedThreshold={0.5}
                onEndReached={() => this.onEndReached()}
                keyExtractor={(item, index) => item.id}
                initialNumToRender={10}
                removeClippedSubviews={false}
                data={this.props.financeList}/>
        </View>)
    }


    onEndReached() {
        if (this.props.hasMore) {
            pageIndex = pageIndex + 1;
            this.loadNetData(pageIndex, false, true);
        }
    }

    componentWillUnmount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }

    _onBackAndroid = () => {
        const {routes} =this.props;
        if (routes.length > 1) {
            this.props.navigation.goBack();
            return true;
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
        this.refresh();
    }

    refresh() {
        pageIndex = 0;
        this.loadNetData(pageIndex, true, false)
    }

    loadNetData(pageIndex, isRefreshing, isLoadMore) {
        let {getNetFinanceList, financeList, hasMore} = this.props;
        getNetFinanceList(financeList, pageIndex, isRefreshing, isLoadMore, hasMore);
    }

    //列表为空时渲染该组件
    ListEmptyComponent() {
        return <View style={styles.emptyComponent}>
            <Text style={styles.emptyTextStyle}>没有数据</Text>
        </View>
    }

    //列表的foot组件
    ListFootComponent() {
        if (this.props.hasMore&&!this.props.errInfo) {
            return <View style={styles.footerComponentStyle}>
                {CircleProgress()}
            </View>
        } else {
            return <View style={styles.footerComponentStyle}>
                <Text style={styles.footerTextStyle}>{this.props.errInfo}?出错了:没有更多数据了!</Text>
            </View>
        }

    }

    onPressItem(item) {
        console.log(item.productName)
    }

    //item的布局
    renderItemView = ({item}) => {
        return FinanceListItemView.getFinanceListItemView(item, () => this.onPressItem(item))
    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.bgColor,
    },
    emptyComponent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 500,
    },
    emptyTextStyle: {
        fontSize: 16,
        color: Colors.gray,
    },
    renderItemStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginLeft: 10,
        marginRight: 10
    },
    footerComponentStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    footerTextStyle: {
        fontSize: 14,
        color: Colors.red
    }
})