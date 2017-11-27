import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native'

export default class MineGridItem extends Component {
    render() {
        let item = this.props.item
        let title = item.title
        let num =this.props.index===4?this.props.investNums:0;
        let icon = item.icon
        let investView = num > 0 ?
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 14, color: Colors.headTitleColor}}>
                    (
                </Text>
                <Text style={{fontSize: 14, color: Colors.red}}>
                    {num}
                </Text>
                <Text style={{fontSize: 14, color: Colors.headTitleColor}}>
                    人)
                </Text>
            </View> :null;
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress} activeOpacity={0.8}>
                <View style={{flexDirection: 'row',alignItems:'center',marginLeft:20}}>
                    <Image style={styles.icon} source={icon}/>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 14, color: Colors.headTitleColor}}>{title}</Text>
                        {investView}
                    </View>
                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: SCREEN_WIDTH/ 2 - 1,
        height: SCREEN_WIDTH / 6,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#e9e9e9'
    },
    icon: {
        width: 32,
        height: 32,
        marginRight: 5

    }
});