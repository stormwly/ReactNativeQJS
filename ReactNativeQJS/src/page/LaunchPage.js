import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    InteractionManager,
} from 'react-native';
import {NavigationActions} from 'react-navigation'
export default class LaunchPage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                this.goToPage('Tab');
            });
        },1000);
    }

    render() {
        return <View style={styles.container}>
            {/*<StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'}/>*/}
            <Image source={ConstantData.LAUNCH_IMG} style={styles.image}/>
        </View>

    }

    goToPage(route) {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: route})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        resizeMode: 'cover'
    }
})
