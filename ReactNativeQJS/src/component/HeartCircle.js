//根据圆半径radius及填充色fill绘制心形圆形
import React, {Component} from 'react';
import {
    ART,
    View,
} from 'react-native';

var {
    Surface,
    Shape,
    Path
} = ART;
export default class HeartCircle extends Component {
    render() {
        let {radius, fill, style} = this.props;
        let path = Path().moveTo(radius * 2, 1)
            .arc(0, radius * 2, radius)
            .arc(0, radius * (-2), radius)
            .close();

        return (
            <View style={style}>
                <Surface width={radius * 4} height={radius * 4}>
                    <Shape d={path} fill={fill}/>
                </Surface>
            </View>)
    }
}
// let HeartCircle = (props) => {
//     var radius = props.radius;
//     var fill = props.fill;
//
//     var path = Path().moveTo(radius * 2, 1)
//         .arc(0, radius * 2, radius)
//         .arc(0, radius * (-2), radius)
//         .close();
//
//     return (
//         <View style={props.style}>
//             <Surface width={radius * 4} height={radius * 4}>
//                 <Shape d={path} fill={fill}/>
//             </Surface>
//         </View>
//     )
// }
//
// export default HeartCircle;