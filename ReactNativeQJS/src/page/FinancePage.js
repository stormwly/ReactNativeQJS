'use strict'
import React, {PureComponent} from 'react'
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Animated
} from 'react-native'
import {connect} from 'react-redux'
import * as FinanceListAction from '../actions/FinanceListAction'
import FinanceListItemView from '../component/FinanceListItemView'
import SeparatorLine from '../component/SeparatorLine'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
 class FinancePage extends PureComponent {

    render() {
        return (<View style={styles.container}>
            <AnimatedFlatList
                ListFooterComponent={this.ListFootComponent()}
                ItemSeparatorComponent={()=>SeparatorLine()}
                ListEmptyComponent={this.ListEmptyComponent}
                renderItem={this.renderItemView}
                onRefresh={() => this.refreshFlat()}
                refreshing={this.props.isRefreshing}
                horizontal={false}
                legacyImplementation={false}
                keyExtractor={this._keyExtractor}
                data={this.props.financeList}/>
        </View>)
    }

    _keyExtractor = (item, index) => item.id;

    componentDidMount() {
        let {getNetFinanceList} = this.props;
        getNetFinanceList();
    }

    refreshFlat() {
        let {getNetFinanceList,financeList} = this.props;
        getNetFinanceList(financeList);
    }


    //列表为空时渲染该组件
    ListEmptyComponent() {
        return <View style={styles.emptyComponent}>
            <Text style={styles.emptyTextStyle}>没有数据</Text>
        </View>
    }

    //列表的foot组件
    ListFootComponent() {
        return <View style={styles.footerComponentStyle}>
            <TouchableOpacity onPress={() => this.toPreviousFinancePage()}>
                <Text style={styles.footerTextStyle}>往期项目>></Text>
            </TouchableOpacity>
        </View>
    }

    toPreviousFinancePage = () => {
        this.props.navigation.navigate('PreviousFinance', {title: '投资项目'});
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
        marginTop: 5,
        marginBottom:5
    },
    footerTextStyle: {
        fontSize: 14,
        color: Colors.red
    },
    itemSeparatorStyle: {
        backgroundColor: 'transparent',
        height: 5,
    },
})

const mapStateToProps = (state,ownProps) => {
    let {financeList,errInfo,isRefreshing}=state.financeList;
    return {
        financeList:financeList,
        errInfo: errInfo,
        isRefreshing:isRefreshing
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNetFinanceList: (financeList) => {
            dispatch(FinanceListAction.getNetFinanceList(financeList));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(FinancePage)