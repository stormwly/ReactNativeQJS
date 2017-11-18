import MineComponent from '../component/MineComponent'
import {connect} from 'react-redux'
import * as AccountInfoAction from '../actions/AccountInfoAction'
import MineGridItemModel from '../model/MineGridItemModel'
import {toastShort} from "../common/ToastUtils"
import  ImagePicker from 'react-native-image-picker'; //第三方相机
var photoOptions = {
    //底部弹出框选项
    title:'选择上传头像',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'从图库选择',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}
const mapStateToProps = (state) => {
    let {accountInfo, errInfo, isRefreshing,avatarSource} = state.account;
    return {
        accountInfo: accountInfo,
        errInfo: errInfo,
        isRefreshing: isRefreshing,
        gridItems: getItemsArray(),
        avatarSource:avatarSource
    }
}

const getItemsArray = () => {
    var items = [];
    items.push(new MineGridItemModel("投资记录", 0, ConstantData.MINE_ACCOUNT_REMAINS));
    items.push(new MineGridItemModel("资金流水", 0, ConstantData.MINE_STABLE_PERIOD_FIANCE));
    items.push(new MineGridItemModel("我的订单", 0, ConstantData.MINE_ORDER));
    items.push(new MineGridItemModel("我的银行卡", 0, ConstantData.MINE_BANK_CARD));
    items.push(new MineGridItemModel("我的邀请", 0, ConstantData.MINE_INVITATION));
    items.push(new MineGridItemModel("风险评估", 0, ConstantData.MINE_RISK_RATING));
    return items;
}

const cameraAction=(dispatch)=>{
    ImagePicker.showImagePicker(photoOptions, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
            toastShort('用户取消了')
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            toastShort('啊呀,出错了')
            console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        }
        else {
            let source = { uri: response.uri };

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            dispatch(AccountInfoAction.getAvatarSource(dispatch,source));
        }
    });
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getNetAccountInfo: (oldAccountInfo) => {
            dispatch(AccountInfoAction.getNetAccountInfo(oldAccountInfo));
        },
        openCamera:()=>{
            cameraAction(dispatch);
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MineComponent)

