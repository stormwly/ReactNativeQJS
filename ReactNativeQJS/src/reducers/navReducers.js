import Routers from '../routers/Routers';
import { NavigationActions } from 'react-navigation';
import RepositoryUtils from '../common/storage/RepositoryUtils'
const recentlyVisitedRoutes = new Set();//防止連點，多次navigate，增加此判斷
const navReducers = (state, action) => {
    if (action.type === 'Navigation/NAVIGATE') {
        console.log(state,action)
        if (recentlyVisitedRoutes.has(action.routeName)) {
            return state;
        }
        recentlyVisitedRoutes.add(action.routeName);
        setTimeout(() => {
            recentlyVisitedRoutes.delete(action.routeName);
        }, 400);
        if(action.routeName==='Mine'){
            let hasToken=false;
            console.log('jump login')
            RepositoryUtils.init().getDataByKey(StorageKeys.userToken).then(response => {
                if(response){
                    hasToken=true;
                }
                console.log('获取token',response)
            }).catch(err => {
                console.log(err)
                hasToken=false;
            });
            if(!hasToken){
                return Routers.router.getStateForAction(
                    NavigationActions.navigate({ routeName:'Login'}), {...state,from:action.routeName}
                );
            }
        }
    }
    const newState = Routers.router.getStateForAction(action, state);
    return newState || state;
};

export default navReducers;