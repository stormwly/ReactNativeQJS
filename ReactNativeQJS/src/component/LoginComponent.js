import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Image,
    BackHandler
} from 'react-native'
// import CustomTextInput from './CustomTextInput'

export default class LoginComponent extends Component {

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
        console.log('componentDidMount',this.props)
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
        // this.props.navigation.setParams({
        //     title:'登录',
        //     visible:true
        // })
        let {login} = this.props;
        login(123, 12);
    }


    render() {
        return <View style={styles.container}>
            <TextInput
                placeholderTextColor={Colors.gray}
                borderBottomColor={Colors.red}
                placeholderText="输入用户名"/>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
})