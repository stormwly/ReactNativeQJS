'use strict'
import RepositoryUtils from '../common/storage/RepositoryUtils'

export default {

    isLogin() {
        if (GLOBAL.UserToken === undefined || GLOBAL.UserToken === null ||GLOBAL.UserToken.length === 0) {
            return false;
        } else {
            return true;
        }
    }
}