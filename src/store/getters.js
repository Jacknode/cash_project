/**
 * Created by leibo on 17/11/29.
 */
export default {
  //加载动画
  loadingShow: (state) => state.loadingShow,
  //初始化动画
  transtionActive: (state) => state.transtionActive,
  //初始化商户信息
  users: state => state.users,
  //商户信息
  cashUserList: state => state.cashUserList,
  //修改商户信息obj
  cashUserObj: state => state.cashUserObj,
  //登陆用户信息
  user: state => state.user,
  DetailEnquiriesList: state => state.DetailEnquiriesList,
  //初始化提现查询列表
  CashSearchList:state=>state.CashSearchList,
  //初始化明细记录
  RowClickList:state=>state.RowClickList,
  //管理员自动提现
  AutomaticMentionObj:state=>state.AutomaticMentionObj,
}
