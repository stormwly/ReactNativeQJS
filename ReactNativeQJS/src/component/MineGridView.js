import React,{Component} from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import MineGridViewItem from './MineGridViewItem'
export default class MineGridView extends Component {
    render() {
        let { items } = this.props
        let gridItems = []
        for (let i = 0; i < items.length; i++) {
            let gridItem = (
                <MineGridViewItem item={items[i]} key={i} onPress={() => this.props.onGridSelected(items[i])} index={i} investNums={this.props.investNums} />
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