'use strict';
import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import ConstantData from "../contants/ConstantData";

export default class HomeBannerComponent extends Component {

    render() {
        const {bannerList} = this.props;
        if (!bannerList || bannerList.length === 0) {
            return null;
        }
        const viewArray = [];
        bannerList.map((item, index) => {
            viewArray.push(
                <TouchableOpacity key={index} onPress={() => this.jumpToWeb(item)} activeOpacity={1}
                                  style={styles.touchableOpacity}>
                    <Image style={styles.slideImage} source={ConstantData.DEFAULT_BANNER} resizeMode="stretch"/>
                    <Image style={styles.slideImage} source={{uri: item.imageUrl}} resizeMode="stretch"/>
                </TouchableOpacity>)
        })
        return (<View style={styles.container}>
                <Swiper
                    height={SCREEN_HEIGHT / 3}
                    autoplay={true}
                    autoplayTimeout={3}
                    bounces={true}
                    dot={<View style={styles.customDot}/>}
                    activeDot={<View style={styles.customActiveDot}/>}
                    paginationStyle={{bottom: 10}}>
                    {viewArray}
                </Swiper>
            </View>
        );
    }

    componentDidMount() {
        let {getHomeBanner} = this.props;
        if (getHomeBanner) {
            getHomeBanner();
        }
    }

    jumpToWeb = (item) => {
        console.log(this.props)
        this.props.navigation.navigate('WebView', {title: item.bannerTitle, url: item.bannerUrl})
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1
    },
    touchableOpacity: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 3,
    },
    slideImage: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT / 3,
        position: 'absolute'
    },
    customDot: {
        backgroundColor: Colors.gray,
        height: 6,
        width: 6,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 10,
        borderRadius: 3
    },
    customActiveDot: {
        backgroundColor: Colors.red,
        height: 6,
        width: 6,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 10,
        borderRadius: 3
    },
})