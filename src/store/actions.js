/**
 * Created by leibo on 17/11/29.
 */
import {postPromise} from '@/assets/js/public'
import $ from 'jquery'
export default {
  //首页初始化
  initData({commit}){
    commit('showLoading');
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:43000/CashoutWebservice.asmx/Traders', {
        Sid: '',
        SName: '',
        Delete: '',
        Wedo: '',
      })
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            commit('initHomeUsers', data.stationInfoList)
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //商户初始化
  initCashUser({commit}, data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:43000/CashoutWebservice.asmx/Traders', data)
        .then(data => {
          var data = JSON.parse(data)
          if (Number(data.backCode) == 200) {
            for (var i = 0; i < data.stationInfoList.length; i++) {
              if (data.stationInfoList[i].SAutoOut == false) {
                data.stationInfoList[i].SAutoOut = 1;
              } else {
                data.stationInfoList[i].SAutoOut = 0;
              }
            }
            commit('initCashUser', data.stationInfoList)
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //添加商户
  addCashUser({commit}, data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:43000/CashoutWebservice.asmx/AddTrader', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //修改商户
  updateCashUser({commit}, data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:43000/CashoutWebservice.asmx/UpdateByAdmin',
        {
          Sid: data.Sid,
          SPassword: data.SPassword,
          SName: data.SName,
          SFreeRate: data.SFreeRate,
          SType: data.SType,
          SHuiCardNo: data.SHuiCardNo,
          SOrganNo: data.SOrganNo,
          SOrganSecret: data.SOrganSecret,
          APPID: data.APPID,
          APPKEY: data.APPKEY,
          NotifyURL: data.NotifyURL,
          RefundURL: data.RefundURL,
          APPSECRET: data.APPSECRET,
          CertPath: data.CertPath,
          CertPassword: data.CertPassword,
          SubMchid: data.SubMchid,
          STelephone: data.STelephone,
          SWorkerName: data.SWorkerName,
          SWorkerBank: data.SWorkerBank,
          SWorkerCard: data.SWorkerCard,
          SAutoOut: data.SAutoOut,
          SWebServiceType: data.SWebServiceType,
          SWebSellFee: data.SWebSellFee,
          SEmail: data.SEmail,
          SPassengerUse: data.SPassengerUse,
          SSale: data.SSale,
          SSaleHalf: data.SSaleHalf,
          SSaleFree: data.SSaleFree,
          SAllSale: data.SAllSale,
          SSellTimeLimit: data.SSellTimeLimit,
          SIntroduce: data.SIntroduce,
          SPayType: data.SPayType,
          SPicture1URL: data.SPicture1URL,
          SPicture2URL: data.SPicture2URL,
          SPicture3URL: data.SPicture3URL,
          SPicture4URL: data.SPicture4URL,
          SPicture5URL: data.SPicture5URL,
          ISDelete: data.co_si_ISDelete,
          WeDo: data.co_si_WeDo,

        })
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //删除商户
  deleteCash({commit}, id){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:43000/CashoutWebservice.asmx/CancelTrader', {
        Sid: id
      })
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            relove()
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //初始化明细信息
  initSearch({commit}, data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:43000/CashoutWebservice.asmx/SellInfos', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            commit('initSearch', data.sellInfoList)
            relove(data.total)
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //初始化提现查询信息
  initCashSearch({commit}, data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:43000/CashoutWebservice.asmx/CashApplays', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            commit('initCashSearch', data.cashApplayList)
            relove(data.total)
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  rowClick({commit}, data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:43000/CashoutWebservice.asmx/SellInfos', data)
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            commit('initRowClick', data.sellInfoList)
            relove(data.total)
          } else {
            reject(data.backResult)
          }
        })
    })
  },
  //上传提现
  updateVisible(store, data){
    return new Promise(function (relove, reject) {
      // var formdata = new FormData();
      // formdata.append('ID', data.ID);
      // formdata.append('CBackBillImageString', data.CBackBillImageString);
      // formdata.append('CRemark', data.CRemark);
      // formdata.append('CRemarkImageString', data.CRemarkImageString);
      // var xhr = new XMLHttpRequest();
      // xhr.open('post', 'http://114.55.248.116:43000/CashoutWebservice.asmx/UpdateImages');
      // xhr.onreadystatechange = function() {
      //   if (xhr.readyState == 4 && xhr.status == 200) {
      //     var data = JSON.parse(data);
      //     if(Number(data.backCode)==200){
      //       relove()
      //     }else{
      //       reject(data.backResult)
      //     }
      //   }
      // };
      // xhr.send(formdata);


      // postPromise('http://114.55.248.116:43000/CashoutWebservice.asmx/UpdateImages',data)
      //   .then(data=>{
      //     var data = JSON.parse(data);
      //     if(Number(data.backCode)==200){
      //       relove()
      //     }else{
      //       reject(data.backResult)
      //     }
      //   })
      $.post('http://114.55.248.116:43000/CashoutWebservice.asmx/UpdateImages', data, (data => {
        var data = JSON.parse(data);
        if (Number(data.backCode) == 200) {
          relove()
        } else {
          reject(data.backResult)
        }
      }))
    })
  },
  //自动提现查询
  automaticMentionObj({commit},data){
    return new Promise(function (relove, reject) {
      postPromise('http://114.55.248.116:43000/CashoutWebservice.asmx/CashApplays',{
        SID:data.SID,
        FromDate:data.FromDate,
        ToDate:data.ToDate,
        CashStatus:data.CashStatus,
        PageNum:1,
        Rows:1
      })
        .then(data => {
          var data = JSON.parse(data);
          if (Number(data.backCode) == 200) {
            if(data.cashApplayList.length){
              commit('initAutomaticMentionObj', data.cashApplayList[0])
            }else{
              reject('数据不存在!')
            }
          } else {
            reject(data.backResult)
          }
        })
    })
  }
}
