//投资页面的逻辑
import React, {Component} from 'react';
import FinanceListContainer from '../container/FinanceListContainer'

export default class FinancePage extends Component {

    render() {
        return (<FinanceListContainer navigation={this.props.navigation}/>)
    }
}
