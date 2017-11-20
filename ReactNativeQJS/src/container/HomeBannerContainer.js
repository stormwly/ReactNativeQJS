import HomeBannerComponent from '../component/HomeBannerComponent'
import {connect} from 'react-redux'
import * as HomeBannerAction from '../actions/HomeBannerAction'

const mapStateToProps = (state,ownProps) => {
    let routes  = state.nav.routes;
    let {bannerList,errInfo}=state.homeBanner;
    return {
        bannerList:bannerList,
        errInfo: errInfo,
        navigation:ownProps.navigation,
        routes:routes
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getHomeBanner: () => {
            dispatch(HomeBannerAction.getHomeBanner());
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeBannerComponent)

