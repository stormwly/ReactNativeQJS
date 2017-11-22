import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import ModalBox from 'react-native-modalbox';

export default class LoadingView extends Component {
    constructor(props) {
        super(props);
    }

    open() {
        this.refs.modal.open()
    }

    close() {
        this.refs.modal.close()
    }

    render() {
        return (
            <ModalBox
                style={styles.modal}
                ref="modal"
                position={"center"}
                backdrop={false}
                isOpen={this.props.isOpen || false}
                //backdropOpacity={.3}
                backdropPressToClose={false}
                animationDuration={0}>
                <View>
                    <ActivityIndicator
                        animating={true}
                        style={styles.centering}
                        color={Colors.blue}
                        size="large"/>
                    <Text style={styles.text}>加载中...</Text>
                </View>
            </ModalBox>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    container: {
        flexDirection: 'column'
    },
    text:{
      fontSize:FONT_SIZE(14),
      color:Colors.gray
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        height:120,
    },
});
