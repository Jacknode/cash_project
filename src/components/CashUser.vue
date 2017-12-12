<template>
  <section id="wrap">
    <h1 class="userClass">商户信息</h1>
    <!--工具条-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true" :model="userSearch">
        <el-form-item>
          <span>商户名称筛选:</span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="userSearch.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addCashUser">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="cashUserList"
      border
      v-loading="listLoading"
      style="width: 100%"
      size="small"
      highlight-current-row
    >
      <el-table-column
        label="申请时间"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.SCreateTime | getNewDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="Sid"
        label="商户号"
        align="center"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="SName"
        label="商户名称"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="SWorkerName"
        label="收款人"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="SWorkerCard"
        label="银行卡号"
        align="center"
        width="170">
      </el-table-column>
      <el-table-column
        prop="SWorkerBank"
        label="办卡银行"
        align="center"
        width="170">
      </el-table-column>
      <el-table-column
        label="自动提现"
        align="center"
        width="120">
        <template slot-scope="scope">
          {{scope.row.SAutoOut?"是":"否"}}
        </template>
      </el-table-column>
      <el-table-column
        label="是否有效"
        align="center"
        width="120">
        <template slot-scope="scope">
          {{scope.row.co_si_ISDelete==0?"是":"否"}}
        </template>
      </el-table-column>
      <el-table-column
        prop="SWebSellFee"
        label="服务费"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="SFreeRate"
        label="提现费率"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        prop="STelephone"
        label="联系电话"
        align="center"
        width="120">
      </el-table-column>
      <el-table-column
        label="联系邮箱"
        align="center"
        width="120">
        <template slot-scope="scope">
          {{scope.row.SEmail}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="updateCash(scope.row.Sid)" type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="deleteCash(scope.row.Sid)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--添加商户-->
    <el-dialog title="添加商户" :visible.sync="addCashUserDialog">
      <el-form :model="AddCashUser"  size="small">
        <el-form-item label="商户编号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.Sid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户密码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.SPassword" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="商户名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.SName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="提现费率" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.SFreeRate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.SType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="汇卡卡号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.SHuiCardNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.SOrganNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构密钥" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.SOrganSecret" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信 APPID" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.APPID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信 APPKEY" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.APPKEY" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付回调地址" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.NotifyURL" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="退款回调地址" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.RefundURL" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户密钥" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.APPSECRET" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="退款证书路径" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.CertPath" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="证书密码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="AddCashUser.CertPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务商下的子商户" label-width="140px" :required="isOff">
          <el-input v-model="AddCashUser.SubMchid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否本商户结账" label-width="140px" :required="isOff">
          <el-select v-model="AddCashUser.WeDo" placeholder="是否本商户结账">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCashUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addCashUserSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改商户-->
    <el-dialog title="修改商户" :visible.sync="updateCashUserDialog">
      <el-form :model="cashUserObj"  size="small">
        <el-form-item label="商户编号" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="cashUserObj.Sid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户密码" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="cashUserObj.SPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户名称" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="cashUserObj.SName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="提现费率" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="cashUserObj.SFreeRate" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" :label-width="formLabelWidth" :required="isOff">
          <el-input v-model="cashUserObj.SType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="汇卡卡号" :label-width="formLabelWidth">
          <el-input v-model="cashUserObj.SHuiCardNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构号" :label-width="formLabelWidth">
          <el-input v-model="cashUserObj.SOrganNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="机构密钥" :label-width="formLabelWidth">
          <el-input v-model="cashUserObj.SOrganSecret" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信 APPID" :label-width="formLabelWidth">
          <el-input v-model="cashUserObj.APPID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="微信 APPKEY" :label-width="formLabelWidth">
          <el-input v-model="cashUserObj.APPKEY" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付回调地址" :label-width="formLabelWidth">
          <el-input v-model="cashUserObj.NotifyURL" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="退款回调地址" :label-width="formLabelWidth">
          <el-input v-model="cashUserObj.RefundURL" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户密钥" :label-width="formLabelWidth">
          <el-input v-model="cashUserObj.APPSECRET" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="退款证书路径" :label-width="formLabelWidth">
          <el-input v-model="cashUserObj.CertPath" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="证书密码" :label-width="formLabelWidth">
          <el-input v-model="cashUserObj.CertPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="140px">
          <el-input v-model="cashUserObj.STelephone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="收款人姓名" label-width="140px">
          <el-input v-model="cashUserObj.SWorkerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="办卡银行" label-width="140px">
          <el-input v-model="cashUserObj.SWorkerBank" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" label-width="140px">
          <el-input v-model="cashUserObj.SWorkerCard" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务商下的子商户" label-width="140px">
          <el-input v-model="cashUserObj.SubMchid" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否自动提现" label-width="140px" :required="isOff">
          <el-select v-model="cashUserObj.SAutoOut" placeholder="是否自动提现">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网售服务费的类型" label-width="140px" :required="isOff">
          <el-select v-model="cashUserObj.SWebServiceType" placeholder="网售服务费的类型">
            <el-option label="固定设置" value="0"></el-option>
            <el-option label="根据票价" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网售服务费" label-width="140px">
          <el-input v-model="cashUserObj.SWebSellFee" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" label-width="140px">
          <el-input v-model="cashUserObj.SEmail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用添加乘客功能" label-width="140px" :required="isOff">
          <el-select v-model="cashUserObj.SPassengerUse" placeholder="是否启用添加乘客功能">
            <el-option label="不启用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打折金额" label-width="140px">
          <el-input v-model="cashUserObj.SSale" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否售半价票" label-width="140px" :required="isOff">
          <el-select v-model="cashUserObj.SSaleHalf" placeholder="是否售半价票">
            <el-option label="不售" value="0"></el-option>
            <el-option label="售" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否售免票" label-width="140px" :required="isOff">
          <el-select v-model="cashUserObj.SSaleFree" placeholder="是否售免票">
            <el-option label="不售" value="0"></el-option>
            <el-option label="售" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否读取全部班次" label-width="140px" :required="isOff">
          <el-select v-model="cashUserObj.SAllSale" placeholder="是否读取全部班次">
            <el-option label="不全读" value="0"></el-option>
            <el-option label="全读" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班次提前多少分钟可微信购票" label-width="140px" :required="isOff">
          <el-input v-model="cashUserObj.SSellTimeLimit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户简介" label-width="140px">
          <el-input v-model="cashUserObj.SIntroduce" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" label-width="140px">
          <el-input v-model="cashUserObj.SPayType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否有效" label-width="140px" :required="isOff">
          <el-select v-model="cashUserObj.ISDelete" placeholder="是否有效">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否本商户结账" label-width="140px"  :required="isOff">
          <el-select v-model="cashUserObj.WeDo" placeholder="是否本商户结账">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateCashUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateCashUserSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    computed: mapGetters([
        'cashUserList',
        'cashUserObj'
    ]),
    data(){
      return {
        options: [{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        }],
        formLabelWidth:'120px',
        isOff:true,
        addCashUserDialog:false,//添加弹窗
        updateCashUserDialog:false,//修改弹窗
        value:'',
        listLoading: false,
        userSearch: {
          name: ''
        },
        //添加参数
        AddCashUser:{
          Sid:'',
          SPassword:'',
          SName:'',
          SFreeRate:'',
          SType:'',
          SHuiCardNo:'',
          SOrganNo:'',
          SOrganSecret:'',
          APPID:'',
          APPKEY:'',
          NotifyURL:'',
          RefundURL:'',
          APPSECRET:'',
          CertPath:'',
          CertPassword:'',
          SubMchid:'',
          WeDo:''
        },
        //请求参数
        getData: {
          Sid:'',
          SName:'',
          Delete:'',
          Wedo:'',
        },
      }
    },
    methods: {
      //初始化
      initData(){
        this.getData.SName = this.userSearch.name.trim()
        this.listLoading = true;
        this.$store.dispatch('initCashUser', this.getData)
          .then(() => {
            this.listLoading = false;
          }, err => {
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
      },
      //搜索
      search(){
        this.initData(1);
      },
      //添加
      addCashUser(){
        this.addCashUserDialog = true;
        this.$store.commit('setTranstionFalse');
      },
      //添加提交
      addCashUserSubmit(){
        if(this.AddCashUser.Sid.trim()==''
          ||this.AddCashUser.SPassword.trim()==''
          ||this.AddCashUser.SName.trim()==''
          ||this.AddCashUser.SFreeRate.trim()==''
          ||this.AddCashUser.SType.trim()==''
          ||this.AddCashUser.WeDo.trim()==''
        ){
          this.$message({
            showClose: true,
            message: '输入内容不能为空！',
            type: 'error'
          });
          return;
        }
        this.$store.dispatch('addCashUser',this.AddCashUser)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            });
            this.initData()
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
        this.addCashUserDialog = false;
      },
      //修改商户
      updateCash(id){
        this.updateCashUserDialog = true;
        this.$store.commit('setTranstionFalse');
        this.$store.commit('initCashUserObj',id)
      },
      //修改商户提交
      updateCashUserSubmit(){
        if(this.cashUserObj.Sid.trim()==''
          ||this.cashUserObj.SPassword.trim()==''
          ||this.cashUserObj.SName.trim()==''
          ||this.cashUserObj.SType.trim()==''
          ||this.cashUserObj.WeDo.trim()==''
        ){
          this.$message({
            showClose: true,
            message: '输入内容不能为空！',
            type: 'error'
          });
          return;
        }
        if(this.cashUserObj.SAutoOut==1){
          this.cashUserObj.SAutoOut = 'False';
        }else{
          this.cashUserObj.SAutoOut = 'True';
        }
        for(let attr in this.cashUserObj){
          if(this.cashUserObj[attr]==null){
            this.cashUserObj[attr] = '';
          }
        }
        this.$store.dispatch('updateCashUser',this.cashUserObj)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            });
            this.initData();
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          });
        this.updateCashUserDialog = false;
      },
      //删除商户
      deleteCash(id){
        this.$store.dispatch('deleteCash',id)
          .then(()=>{
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.initData();
          },err=>{
            this.$message({
              showClose: true,
              message: err,
              type: 'error'
            });
          })
      }
    }
  }
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  #wrap {
    background: #fff;
  }

  .formSearch {
    padding: 20px 0 0 20px;
  }

  .userClass {
    padding: 20px 0 0 20px;
    font-size: 18px;
  }

</style>
