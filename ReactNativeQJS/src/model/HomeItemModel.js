'use strict'
export default function HomeItemModel(productName,id,rate,financeDays,amountMoney,productType){
    this.productName=productName;
    this.id=id;
    this.rate=rate;
    this.financeDays=financeDays;
    this.amountMoney=amountMoney;
    this.productType=productType;//0表示可购买,1表示已满标，2表示预约中
}