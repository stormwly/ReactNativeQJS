import notice from './homeNoticeReducers'
import nav from './navReducers'
import homeBanner from './homeBannerReducers'
import homeList from './homeListReducers'
import financeList from './financeListReducers'
import previousFinanceList from './previousFinanceListReducers'
import account from './accountInfoReducers'

const reducers = {
    nav,
    notice,
    homeBanner,
    homeList,
    financeList,
    previousFinanceList,
    account
}

export default reducers;