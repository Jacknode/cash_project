<template>
  <section id="wrap">
    <h1 class="userClass">明细查询</h1>
    <!--工具条-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true" :model="getData">
        <el-form-item>
          <span>交易时间:</span>
          <el-date-picker
            v-model="getData.SSellTimeFrom"
            type="date"
            value-format="yyyy-MM-dd"
            size="small"
            placeholder="哪一天开始查询"
            style="width: 154px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <span>到:</span>
          <el-date-picker
            v-model="getData.SSellTimeTO"
            type="date"
            style="width: 154px"
            size="small"
            value-format="yyyy-MM-dd"
            placeholder="查询到哪一天">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="是否提现:">
          <el-select v-model="getData.SCashOut" placeholder="未提现" size="small" style="width: 100px">
            <el-option label="未提现" value="0"></el-option>
            <el-option label="提现中" value="1"></el-option>
            <el-option label="已提现" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户:">
          <el-select v-model="getData.SStationid" placeholder="请选择商户" size="small" style="width: 130px">
            <el-option
              v-for="item in users"
              :key="item.Sid"
              :label="item.SName"
              :value="item.Sid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span>汇卡订单号:</span>
          <el-input v-model="getData.SHuiOrderNo" placeholder="请输入订单号" size="small" style="width: 120px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="small">查询</el-button>
        </el-form-item>
      </el-form>

    </el-col>
    <el-table
      :height="initHeight"
      :data="DetailEnquiriesList"
      v-loading="listLoading"
      style="width: 100%;"
      highlight-current-row
      border
      :summary-method="getSummaries"
      size="small"
      show-summary
    >
      <el-table-column
        label="ID"
        type="index"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="交易时间"
        align="center"
        width="140"
      >
        <template slot-scope="scope">
          {{scope.row.SSellTime | getNewDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="SStationid"
        label="商户号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SSellerID"
        label="售票员编号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="交易状态"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.STicketState | getTicketStatus}}
        </template>
      </el-table-column>
      <el-table-column
        prop="SPayWay"
        label="支付方式"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SOrderNo"
        label="微信订单号"
        align="center"
        width="250"
      >
      </el-table-column>
      <el-table-column
        prop="SHuiOrderNo"
        label="汇卡订单号"
        align="center"
        width="160"
      >
      </el-table-column>
      <el-table-column
        label="是否提现"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.SCashOut | getTicketCashOut}}
        </template>
      </el-table-column>
      <el-table-column
        prop="STicketPrice"
        label="票价"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="SServiceFee"
        label="服务费"
        align="center"
        width="60"
      >
      </el-table-column>
      <el-table-column
        prop="SClassNo"
        label="班次编号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SFromSiteName"
        label="上车站点"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SEndSiteName"
        label="到达站点"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SClassDate"
        label="班次日期"
        align="center"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="SDpartureTime"
        label="发车时间"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SBillNo"
        label="提现流水号"
        align="center"
        width="150"
      >
      </el-table-column>
    </el-table>
  <!--分页-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        v-show="total"
        style="float: right;"
      >
      </el-pagination>
    </el-col>



  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {postPromise} from '../assets/js/public'
  export default{
    name: '',
    computed: mapGetters([
      'user',
      'DetailEnquiriesList',
      'users'
    ]),
    data(){
      return {
        initHeight:200,
        size:20,
        total:0,
        currentPage4:0,
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
          SStationid:'',
          SSellTimeFrom:'',
          SSellTimeTO:'',
          SHuiOrderNo:'',
          SCashOut:'',
          BillNo:'',
          PageNum:1,
          Rows:10
        },
      }
    },
    methods: {
      handleSizeChange(val) {
        this.initData(1,val)
        this.getData.Rows = val
      },
      handleCurrentChange(val) {
        this.initData(val,this.getData.Rows)
      },
      //初始化
      initData(num,rows){
        this.getData.PageNum = num;
        this.getData.Rows = rows;
        this.listLoading = true;
        this.$store.dispatch('initSearch',this.getData)
          .then(total=>{
            this.total = Number(total);
            this.listLoading = false;
          },err=>{
            this.$message({
              message: err,
              type: 'error'
            });
          })
      },
      //搜索
      search(){
        this.initHeight = 750;
        this.initData(1,this.size);
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => {
            if(column.property=='STicketPrice'||column.property=='SServiceFee'){
              return Number(item[column.property])
            }
          });
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        });

        return sums;
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
