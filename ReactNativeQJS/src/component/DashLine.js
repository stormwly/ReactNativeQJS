//绘制虚线
import React, {Component} from 'react'
import {
    View,
    ART,
    Dimensions
} from 'react-native'

const {Surface, Shape} = ART;
const {width} = Dimensions.get('window')
export default class DashLine extends Component {
    render() {
        let {margin, style} = this.props;
        const path = ART.Path();
        path.moveTo(1, 1); //将起始点移动到(1,1) 默认(0,0)
        path.lineTo(SCREEN_WIDTH - margin * 2, 1); //连线到目标点(300,1)
        return <View style={style}>
            <Surface width={width - margin * 2} height={1}>
                <Shape d={path} stroke={Colors.financeItemLineColor} strokeWidth={2} strokeDash={[3, 3]}/>
            </Surface>
        </View>
    }
}