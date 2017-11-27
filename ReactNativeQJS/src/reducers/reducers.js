import notice from './homeNoticeReducers'
import nav from './navReducers'
import homeBanner from './homeBannerReducers'
import homeList from './homeListReducers'
import financeList from './financeListReducers'
import previousFinanceList from './previousFinanceListReducers'
import account from './accountInfoReducers'
import login from './loginReducers'
import setLoginPwd from './setLoginPwdReducers'
import register from './registerReducers'
import myInvestInfo from './myInvestInfoReducers'

const reducers = {
    nav,
    notice,
    homeBanner,
    homeList,
    financeList,
    previousFinanceList,
    account,
    login,
    setLoginPwd,
    register,
    myInvestInfo
}

export default reducers;