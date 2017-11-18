import React,{Component} from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import DiscoverGridItem from './DiscoverGridItem'
export default class GridView extends Component {
    render() {
        let { items } = this.props
        let gridItems = []
        for (let i = 0; i < items.length; i++) {
            let gridItem = (
                <DiscoverGridItem item={items[i]} key={i} onPress={() => this.props.onGridSelected(items[i])}/>
            )
            gridItems.push(gridItem)
        }

        return (
            <View style={styles.container}>
                {gridItems}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: '#e9e9e9'
    },
});