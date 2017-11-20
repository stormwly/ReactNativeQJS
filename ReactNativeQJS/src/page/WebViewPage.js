import React, {Component} from 'react';
import {
    WebView,
    View,
    TouchableOpacity,
    TextInput,
    Text,
    StyleSheet,
    BackHandler
} from 'react-native';
import {connect} from 'react-redux'

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var WEB_VIEW_REF = 'webView';
var TEXT_INPUT_REF = 'textInput';
var inputText = null;


 class WebViewPage extends Component {

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
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
        this.props.navigation.setParams({
            title: this.props.navigation.state.params.title,
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            url: props.navigation.state.params.url,
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            scalesPageToFit: true,
        }
    }

    _handleTextInputChange = (event) => {
        var url = event.nativeEvent.text;
        if (!/^[a-zA-Z-_]+:/.test(url)) {
            url = 'http://' + url;
        }
        inputText = url;
    };


    render() {
        inputText = this.state.url;
        return <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={this._goBack}
                                  style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
                    <Text>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._goForWard}
                                  style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
                    <Text>{'>'}</Text>
                </TouchableOpacity>
                <TextInput
                    ref={TEXT_INPUT_REF}
                    autoCapitalize='none'
                    clearButtonMode='while-editing'
                    underlineColorAndroid='transparent'
                    style={styles.addressBarTextInput}
                    onChange={this._handleTextInputChange}
                    onSubmitEditing={this._onSubmitEditing}
                    defaultValue={this.state.url}/>
                <TouchableOpacity onPress={this._onPressGoButton}>
                    <View style={styles.goButton}>
                        <Text>前往</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <WebView
                ref={WEB_VIEW_REF}
                style={styles.webView}
                automaticallyAdjustContentInsets={false}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                decelerationRate='normal'
                onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
                startInLoadingState={true}
                source={{uri: this.state.url}}
                scalesPageToFit={this.state.scalesPageToFit}/>

            {/*<View style={styles.statusBar}>*/}
            {/*<Text style={styles.statusBarText}>{this.state.status}</Text>*/}
            {/*</View>*/}
        </View>

    }

    _goBack = () => {
        this.refs[WEB_VIEW_REF].goBack()
    }

    _goForWard = () => {
        this.refs[WEB_VIEW_REF].goForward()
    }

    _reload = () => {
        this.refs[WEB_VIEW_REF].reload();
    };

    _onSubmitEditing = (event) => {
        this._onPressGoButton();
    };

    _onPressGoButton = () => {
        if (inputText === this.state.url) {
            this._reload();
        } else {
            this.setState({
                url: inputText
            })
        }

        this.refs[TEXT_INPUT_REF].blur()// dismiss keyboard
    }

    _onShouldStartLoadWithRequest = (event) => {
        return true
    }


}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: HEADER
    },

    topBar: {
        flexDirection: 'row',
        padding: 8,
    },

    navButton: {
        width: 30,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    disabledButton: {
        width: 30,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DISABLED_WASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },

    goButton: {
        height: 24,
        padding: 3,
        marginLeft: 8,
        alignItems: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        alignSelf: 'stretch',
    },
    addressBarTextInput: {
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        borderWidth: 1,
        height: 24,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        flex: 1,
        fontSize: 14,
    },
    webView: {
        backgroundColor: BGWASH,
    },
    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 22,
    },
    statusBarText: {
        color: 'white',
        fontSize: 13,
    },
})

export default connect((state) => {
    const routes  = state.nav.routes;
    return {
        routes
    };
})(WebViewPage)