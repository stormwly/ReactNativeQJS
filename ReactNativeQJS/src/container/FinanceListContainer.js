import FinanceListComponent from '../component/FinanceListComponent'
import {connect} from 'react-redux'
import * as FinanceListAction from '../actions/FinanceListAction'

const mapStateToProps = (state,ownProps) => {
   let {financeList,errInfo,isRefreshing}=state.financeList;
    return {
        financeList:financeList,
        errInfo: errInfo,
        isRefreshing:isRefreshing
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNetFinanceList: (financeList) => {
            dispatch(FinanceListAction.getNetFinanceList(financeList));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(FinanceListComponent)

