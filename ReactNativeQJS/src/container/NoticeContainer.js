import NoticeComponent from '../component/NoticeComponent'
import {connect} from 'react-redux'
import * as HomeNoticeAction from '../actions/HomeNoticeAction'

const mapStateToProps = (state) => {
   let {noticeContent,errInfo}=state.notice;
    return {
        noticeContent:noticeContent,
        errInfo: errInfo
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getHomeNotice: () => {
            dispatch(HomeNoticeAction.getHomeNotice());
        },
        clearTime:()=>{
            HomeNoticeAction.clearTime();
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NoticeComponent)

