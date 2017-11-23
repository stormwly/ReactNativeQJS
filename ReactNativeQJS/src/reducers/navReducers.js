import Routers from '../routers/Routers';
const recentlyVisitedRoutes = new Set();//防止連點，多次navigate，增加此判斷
const navReducers = (state, action) =>{
    if (action.type === 'Navigation/NAVIGATE') {
        console.log(state, action)
        if (recentlyVisitedRoutes.has(action.routeName)) {
            return state;
        }
        recentlyVisitedRoutes.add(action.routeName);
        setTimeout(() => {
            recentlyVisitedRoutes.delete(action.routeName);
        }, 400);
    }
    const newState = Routers.router.getStateForAction(action, state);
    return newState || state;
};
export default navReducers;