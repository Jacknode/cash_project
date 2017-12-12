/**
 * Created by leibo on 17/11/29.
 */
import getters from './getters'

const state = {
	//加载动画
	loadingShow: false,
	//初始化动画
	transtionActive: {
		isActive: false,
		isMove: false
	},
  //初始化商户
  users:[],
  //商户信息
  cashUserList:[],
  //初始化修改商户信息
  cashUserObj:{},
  //初始化明细信息
  DetailEnquiriesList:[],
  //初始化提现查询信息
  CashSearchList:[],
  //初始化明细记录
  RowClickList:[],
  //管理员自动提现
  AutomaticMentionObj:{},
};

const mutations = {
  clearData(state){
    state.cashUserList = state.DetailEnquiriesList = state.CashSearchList = state.RowClickList = [];
  },
	//loading动画过渡
	showLoading(state) {
		state.loadingShow = true
	},
	hideLoading() {
		state.loadingShow = false
	},
	//初始化动画
	setTranstionFalse(state) {
		state.transtionActive = {
			isActive: false,
			isMove: false
		}
	},
	oPTranstionFalse() {
		state.transtionActive = {
			isActive: !state.transtionActive.isActive,
			isMove: !state.transtionActive.isMove
		}
	},
  initHomeUsers(state,data){
	  state.users = data;
  },
  initUser(state,obj){
    state.user = obj;
  },
  //商户信息
  initCashUser(state,data){
	  state.cashUserList = data;
  },
  //初始化修改商户信息obj
  initCashUserObj(state,id){
    state.cashUserObj = state.cashUserList.filter(item=>{
      if(item.Sid===id){
        return true
      }
      return false
    })[0]
  },
  initSearch(state,data){
    state.DetailEnquiriesList = data;
  },
  initCashSearch(state,data){
    state.CashSearchList = data;
  },
  initRowClick(state,data){
    state.RowClickList = data;
  },
  //管理员自动提现
  initAutomaticMentionObj(state,data){
    state.AutomaticMentionObj = data;
  }
};

export default {
	getters,
	state,
	mutations
}
