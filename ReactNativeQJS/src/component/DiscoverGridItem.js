import React, {Component} from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native'

export default class GridItem extends Component {
    render() {
        let item = this.props.item

        let title = item.title
        let desc =item.desc
        let icon = item.icon
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View style={{flexDirection:'row'}}>
                    <Image style={styles.icon} source={icon}/>
                     <View style={{flexDirection:'column',justifyContent:'center'}}>
                         <Text style={{fontSize:16,color:Colors.headTitleColor,marginBottom:2}}>{title}</Text>
                         <Text style={{fontSize:14,color:Colors.itemDescColor}}>{desc}</Text>
                     </View>
                </View>

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: SCREEN_WIDTH/2-1,
        height:SCREEN_WIDTH /6,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: '#e9e9e9'
    },
    icon: {
        width:48,
        height:48,
        marginRight:5

    }
});