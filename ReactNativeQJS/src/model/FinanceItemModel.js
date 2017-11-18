'use strict'
export default function FinanceItemModel(key,productName,id,rate,financeDays,amountMoney,productType,investMoney,activeRate){
    this.key=key;
    this.productName=productName;//项目名称
    this.id=id;//项目id
    this.rate=rate;//正常收益率
    this.financeDays=financeDays;//投资项目期限
    this.amountMoney=amountMoney;//表示万元赚取收益
    this.productType=productType;//0表示可购买,1表示已售罄，2表示预约中
    this.investMoney=investMoney;//剩余可投金额
    this.activeRate=activeRate;//活动加息%1
}