'use strict'
import React, {Component} from 'react'
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    Animated,
} from 'react-native'
import HomeListItemView from './HomeListItemView'
import SeparatorLine from './SeparatorLine'
import Immutable from 'immutable'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export default class HomeListComponent extends Component {

    render() {
        return <View style={styles.container}>

            <AnimatedFlatList
                style={{flex: 1}}
                ItemSeparatorComponent={()=>SeparatorLine()}
                ListEmptyComponent={this.ListEmptyComponent}
                renderItem={this.renderItemView}
                horizontal={false}
                extraData={this.state}
                legacyImplementation={false}
                keyExtractor={this._keyExtractor}
                data={this.props.financeList}/>
        </View>
    }

    _keyExtractor = (item, index) => item.id;

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate')
        let flag1 = !(this.props === nextProps || Immutable.is(this.props, nextProps));
        let flag2 = !(this.state === nextState || Immutable.is(this.state, nextState));
        return flag1 || flag2;
    }

    componentDidMount() {
        console.log('HomeListComponent')
    }

//列表为空时渲染该组件
    ListEmptyComponent() {
        return <View style={styles.emptyComponent}>
            <Text style={styles.emptyTextStyle}>没有数据</Text>
        </View>
    }

    onPressItem(item) {
        console.log(item.productName)
    }

//item的布局
    renderItemView = ({item}) => {
        return HomeListItemView.getHomeListItem(item, () => this.onPressItem(item))
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    emptyComponent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    emptyTextStyle: {
        fontSize: 16,
        color: Colors.gray,
    },
})