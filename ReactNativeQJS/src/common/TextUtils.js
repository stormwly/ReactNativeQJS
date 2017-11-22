'use strict'

/*
 *判断字符串是否为数字
 * 判断是否为正整数 /^[1-9]+[0-9]*]*$/
 */
export const isNumber = (input) => {
    let regular = /^[0-9]+.?[0-9]*$/;
    if (!regular.test(input)) {
        return false;
    }
    return true;
}

/*正则表达式(/^[1][3,4,5,7,8][0-9]{9}$/)验证是否为11位有效手机号码
 *这个表达式的意思是：
1--以1为开头；
2--第二位可为3,4,5,7,8,中的任意一位；
3--最后以0-9的9个整数结尾。
 *
 */

export const isPhoneNumber = (input) => {
    var regular = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!regular.test(input)) {
        return false;
    } else {
        return true;
    }
}

/*
*正则表达式^\\w+$,由数字、26个英文字母或者下划线组成的字符串
 */
export const isPwdValid=(text)=>{
    var regular = /^\\w+$/;
    if (!regular.test(text)) {
        return false;
    } else {
        return true;
    }
}


//校验登录密码：只能输入6-18个字母、数字、下划线
export const isLoginPwd = (input) => {
    var regular = /^(\w){6,18}$/;
    if (!regular.exec(input)) {
        return false
    }
    return true
}