<template>
  <section>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>提现查询</span>
      </div>
      <div class="text item">
        <el-form :inline="true" :model="userSearch">
          <el-form-item>
            <span>商户名称:</span>
          </el-form-item>
          <el-form-item>
            <el-select v-model="userSearch.SID" placeholder="请选择商户" size="small" style="width: 130px">
              <el-option
                v-for="item in users"
                :key="item.Sid"
                :label="item.SName"
                :value="item.Sid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <span>交易时间:</span>
            <el-date-picker
              size="small"
              style="width: 160px"
              value-format="yyyy-MM-dd"
              v-model="userSearch.FromDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <span>到:</span>
            <el-date-picker
              style="width: 160px"
              size="small"
              value-format="yyyy-MM-dd"
              v-model="userSearch.ToDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <span>提现状态:</span>
            <el-select v-model="userSearch.CashStatus" placeholder="请选择提现状态" size="small" style="width: 160px">
              <el-option label="处理中" value="0"></el-option>
              <el-option label="处理完成" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search" size="small">查询</el-button>
          </el-form-item>

        </el-form>
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户资金</span>
      </div>
      <div class="text item">
        商户编号 : {{AutomaticMentionObj.CStationid}}
      </div>
      <div class="text item">
        商户名称 : {{AutomaticMentionObj.CStationName}}
      </div>
      <div class="text item">
        总金额 : {{}}元
      </div>
      <div class="text item">
        可提现金额 :
        <span style="color:green; font-weight: bold;">{{}}</span>元
      </div>
      <div class="text item">
        不可提现金额 :
        <span style="color:red; font-weight: bold;">{{}}</span>元
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>结算账户</span>
      </div>
      <div class="text item">
        开户姓名 : {{AutomaticMentionObj.CWorkerName?AutomaticMentionObj.CWorkerName:"待查询"}}
      </div>
      <div class="text item">
        开户银行 : {{AutomaticMentionObj.CWorkerBank?AutomaticMentionObj.CWorkerBank:"待查询"}}
      </div>
      <div class="text item">
        银行账户 : {{AutomaticMentionObj.CWorkerCard?AutomaticMentionObj.CWorkerCard:"待查询"}}
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>提现信息</span>
      </div>
      <div class="text item">
        商户编号 : {{AutomaticMentionObj.CStationid}}
      </div>
      <div class="text item">
        商户名称 : {{AutomaticMentionObj.CStationName}}
      </div>
      <div class="text item">
        截止时间 : <span style="color:#00c; font-weight: bold;">{{new Date() | getNewTimeDate}}</span>
      </div>
      <div class="text item">
        提现金额 : <span style="color:green; font-weight: bold;"></span>元
      </div>
      <div class="text item">
        手续费率 : {{AutomaticMentionObj.CFreeRate}}
      </div>
      <div class="text item">
        到账金额 : <span style="color:green; font-weight: bold;"></span>元
      </div>
      <div class="text item">
        登录密码 : <input class="loginPassword" type="password" v-model="loginPassword">
      </div>
    </el-card>
    <div class="block">
      <el-button type="success" style="width: 400px;height: 50px" :loading="isSubmit" @click="application">申请提现</el-button>
    </div>


  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    computed: {
      ...mapGetters([
        'AutomaticMentionObj',
        'users'
      ])
    },
    data(){
      return {
        userSearch:{
          SID:'',
          FromDate:'',
          ToDate:'',
          CashStatus:''
        },
        isSubmit:false,
        loginPassword:'',
      }
    },
    mounted(){
//      let user = JSON.parse(sessionStorage.getItem('admin'));
//      this.$store.dispatch('initData',{id:user.Sid,num:0})
//      this.$store.dispatch('initData',{id:user.Sid,num:1})
    },
    methods: {
      //查询
      search(){
        this.$store.dispatch('automaticMentionObj',this.userSearch)
      },
      //初始化
      initData(){

      },
      //申请提现
      application(){}
    }
  }
</script>
<style scoped>
  .block{
    width: 400px;
    margin: 0 auto;
  }
  input {
    border:none;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    margin-bottom: 20px;
  }
  .loginPassword {
    border: 1px solid green;
    border-radius: 3px;
    padding:0 2px;
  }
</style>
