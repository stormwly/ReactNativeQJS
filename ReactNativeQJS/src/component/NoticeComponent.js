import React, {Component} from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native'
export default class NoticeComponent extends Component {
    render() {
        let {noticeContent} = this.props;
        let textView = noticeContent ? <Text style={styles.text}>{noticeContent}</Text> : null;
        return <View style={styles.container}>
            <Image style={styles.img} source={ConstantData.NOTICE_ICON} resizeMode={'center'}/>
            {textView}
        </View>
    }

    componentDidMount() {
        const {getHomeNotice} = this.props;
        getHomeNotice();
    }

    componentWillUnmount() {
        const {clearTime} = this.props;
        clearTime();
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: Colors.white,
        alignItems: 'center'
    },
    img: {
        height: 24,
        width: 24,
        marginRight: 15
    },
    text: {
        fontSize: 14,
        color: Colors.headTitleColor
    }
})