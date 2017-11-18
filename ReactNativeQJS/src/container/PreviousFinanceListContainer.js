import PreviousFinanceListComponent from '../component/PreviousFinanceListComponent'
import {connect} from 'react-redux'
import * as PreviousFinanceListAction from '../actions/PreviousFinanceListAction'

const mapStateToProps = (state) => {
   let {financeList,errInfo,isRefreshing,hasMore}=state.previousFinanceList;
    return {
        financeList:financeList,
        errInfo: errInfo,
        isRefreshing:isRefreshing,
        hasMore:hasMore
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNetFinanceList: (financeList,pageIndex,isRefreshing,isLoadMore,hasMore) => {
            dispatch(PreviousFinanceListAction.getNetPreviousFinanceList(financeList,pageIndex,isRefreshing,isLoadMore,hasMore));
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PreviousFinanceListComponent)

