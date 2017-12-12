<template>
  <div>
    <div class="navbar navbar-inverse">
      <div class="navbar-header">
        <a class="navbar-brand" href="javascript:;">后台提现管理系统</a>
        <ul class="nav navbar-nav visible-xs-block">
          <li><a data-toggle="collapse" data-target="#navbar-mobile"><i class="icon-tree5"></i></a></li>
          <li><a class="sidebar-mobile-main-toggle"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>
      </div>
      <div class="navbar-collapse collapse" id="navbar-mobile">
        <ul class="nav navbar-nav">
          <li><a class="sidebar-control sidebar-main-toggle hidden-xs"><i class="icon-paragraph-justify3"></i></a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li class="dropdown dropdown-user">
            <a class="dropdown-toggle" data-toggle="dropdown">
              <!--<img src="assets/images/placeholder.jpg" alt="">-->
              <span v-if="isAdmin">管理员</span>
              <span v-else="isAdmin">商户</span>
              <i class="caret"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-right">
              <li @click="getUser"><a href="javascript:;"><i class="icon-user-plus"></i>{{qiankeUser?qiankeUser:''}}</a></li>
              <li @click="Quit"><a href="javascript:;"><i class="icon-switch2"></i>退出</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- /main navbar -->
    <!-- Page container -->
    <div class="page-container">

      <!-- Page content -->
      <div class="page-content">

        <!-- Main sidebar 左边导航栏开始-->
        <div class="sidebar sidebar-main">
          <div class="sidebar-content">

            <!-- User menu -->
            <div class="sidebar-user">
              <div class="category-content">
                <div class="media">
                  <a href="javascript:;" class="media-left">
                    <!--<img src="assets/images/placeholder.jpg" class="img-circle img-sm" alt="">-->
                  </a>
                  <div class="media-body">
                    <span class="media-heading text-semibold">欢迎您:{{qiankeUser?qiankeUser:''}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- /user menu -->
            <!-- Main navigation -->
            <div class="sidebar-category sidebar-category-visible">
              <div class="category-content no-padding">
                <ul class="navigation navigation-main navigation-accordion">
                  <!-- Main -->
                  <li class="navigation-header"><span>Main</span> <i class="icon-menu" title="Main pages"></i></li>
                  <li v-if="isAdmin">
                    <a href="javascript:;"><i class="icon-home"></i> <span>商户管理</span></a>
                    <!--管理员-->
                    <ul>
                      <!--<li>-->
                      <!--<router-link to="/home/demo">测试</router-link>-->
                      <!--</li>-->
                      <li>
                        <router-link to="/home/cashUser">基本信息</router-link>
                      </li>
                      <li>
                        <router-link to="/home/detailsSearch">明细查询</router-link>
                      </li>
                      <li>
                        <router-link to="/home/withdrawal">提现记录</router-link>
                      </li>
                      <li>
                        <router-link to="/home/automaticMention">自动提现</router-link>
                      </li>
                      <li>
                        <router-link to="/home/demo">DEMO</router-link>
                      </li>
                    </ul>
                  </li>
                  <!--非管理员-->
                  <li v-else="isAdmin">
                    <a href="javascript:;"><i class="icon-redo2"></i> <span>提现管理</span></a>
                    <!--商户-->
                    <ul>
                      <!--<li>-->
                      <!--<router-link to="/home/demo">测试</router-link>-->
                      <!--</li>-->
                      <li>
                        <router-link to="/home/cashUser">提现申请</router-link>
                      </li>

                    </ul>
                  </li>
                  <!-- /main -->
                </ul>
              </div>
            </div>
            <!-- /main navigation-->
          </div>
        </div>
        <!-- /main sidebar  左边导航栏结束-->
        <!--右边内容-->
        <div class="content-wrapper">

          <div class="content" :class="{ 'animated': transtionActive.isActive, 'slideInUp': transtionActive.isMove }">
            <!-- Page length options -->
            <!-- /page length options -->
            <router-view name="User"></router-view>

            <!-- Footer -->
            <!--<div class="footer text-muted">-->
            <!--&copy; 2015. <a href="#">Limitless Web App Kit</a> by <a href="http://themeforest.net/user/Kopyov" target="_blank">Eugene Kopyov</a>-->
            <!--</div>-->
            <!-- /footer -->
          </div>
        </div>
        <!--右边内容结束-->
        <!-- Footer -->
        <div class="footer text-muted">
        </div>
        <!-- /footer -->
      </div>
      <!-- /content area -->
    </div>
    <!-- /main content -->
  </div>
  <!-- /page content -->
</template>
<script>
  import {mapGetters} from 'vuex'

  export default{
    name: '',
    data(){
      return {
        qiankeUser:'',
        isAdmin:false
      }
    },
    computed:mapGetters([
      'transtionActive',
    ]),
    created(){
      this.initData()
      let user = JSON.parse(sessionStorage.getItem('user'))
      this.$store.commit('initUser',user)
      if(user.SType=='admin'){
        this.isAdmin = true;
      }
      if(!user){
        this.$router.push({name:'Login'})
      }
      this.qiankeUser = user.SName;
    },
    watch: {
      '$route' (to, from) {
//        if(!JSON.parse(sessionStorage.getItem('isLogin'))){
//          this.$router.push({name:'Login'})
//          return;
//        }
        this.$store.commit('clearData')
        // 对路由变化作出响应...
        if(this.transtionActive.isActive&&this.transtionActive.isMove){
          this.$store.commit('setTranstionFalse')
        }
        setTimeout(()=>{
          this.$store.commit('oPTranstionFalse')
        },10)
      }
    },
    methods:{
      //退出
      Quit(){
        sessionStorage.removeItem('user')
        this.$router.push({ name: 'Login' })
      },
      //用户信息
      getUser(){
        this.$router.push({ name: 'CashUser' })
      },
      //初始化数据
      initData(){
        this.$store.dispatch('initData')
          .then(()=>{
            this.$store.commit('hideLoading');
          })
      }
    }
  }
</script>
<style>
  .el-loading-spinner .circular{
    margin-left: 50%;
  }
  .sidebar{
    width: 250px !important;
  }
  /*input[type="file"] {*/
    /*display: none !important;*/
  /*}*/
</style>
