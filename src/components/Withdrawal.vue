<template>
  <section id="wrap">
    <h1 class="userClass">提现记录</h1>
    <!--工具条-->
    <el-col :span="24" class="formSearch">
      <el-form :inline="true" :model="getData">
        <el-form-item >
          <el-button type="success" icon="el-icon-circle-plus-outline
" size="small" @click="cashWithdrawal">提现</el-button>
        </el-form-item>
        <el-form-item label="商户:">
          <el-select v-model="getData.SID" placeholder="请选择商户" size="small" style="width: 130px">
            <el-option
              v-for="item in users"
              :key="item.Sid"
              :label="item.SName"
              :value="item.Sid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span>申请时间:</span>
          <el-date-picker
            size="small"
            v-model="getData.FromDate"
            type="date"
            style="width: 160px"
            value-format="yyyy-MM-dd"
            placeholder="哪一天开始查询">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <span>到:</span>
          <el-date-picker
            size="small"
            v-model="getData.ToDate"
            type="date"
            style="width: 160px"
            value-format="yyyy-MM-dd"
            placeholder="查询到哪一天">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="提现状态:">
          <el-select v-model="getData.CashStatus" placeholder="提现状态" size="small" >
            <el-option label="处理中" value="0"></el-option>
            <el-option label="处理完成" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search"  size="small" >查询</el-button>
        </el-form-item>
      </el-form>

    </el-col>
    <el-table
      @row-click="rowClick"
      :height="initHeight"
      :data="CashSearchList"
      v-loading="listLoading"
      style="width: 100%;"
      border
      size="small"
      highlight-current-row
      :summary-method="getSummaries"
      show-summary
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column
        prop="id"
        label="ID"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="CStationid"
        label="商户号"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="结算开始时间"
        align="center"
        width="140"
      >
        <template slot-scope="scope">
          {{scope.row.CPayForm | getNewDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="结算结束时间"
        align="center"
        width="140"
      >
        <template slot-scope="scope">
          {{scope.row.CPayTo | getNewDate}}
        </template>
      </el-table-column>
      <el-table-column
        label="申请时间"
        align="center"
        width="140"
      >
        <template slot-scope="scope">
          {{scope.row.CCreateTime | getNewDate}}
        </template>
      </el-table-column>
      <el-table-column
        width="140"
        label="反馈时间"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.CBackTime | getNewDate}}
        </template>
      </el-table-column>
      <el-table-column
        prop="CStationName"
        label="车站名称"
        align="center"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="CApplayPrice"
        label="提现金额"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="CFreeRate"
        label="提现费率"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="CFree"
        label="提现手续费"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="CBackPrice"
        label="到账金额"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        label="提现状态"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.CStatus ==0?"处理中":"处理完成"}}
        </template>
      </el-table-column>
      <el-table-column
        label="查看回款单"
        align="center"
      >
        <template slot-scope="scope">
          <el-button  @click="look(scope.row.CBackBill)" size="small">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="CRemark"
        label="备注"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="CRemarkImage"
        label="备注图片"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="CBillNo"
        label="流水单号"
        align="center"
        width="160"
      >
      </el-table-column>
    </el-table>
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

    <el-table
      :height="initHeight"
      :data="RowClickList"
      v-loading="listLoading2"
      style="width: 100%;"
      highlight-current-row
      :summary-method="getSummaries2"
      show-summary
      size="small"
      border
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
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
        prop="SOrderNo"
        label="微信订单号"
        align="center"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="SHuiOrderNo"
        label="汇卡订单号"
        align="center"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="STicketPrice"
        label="订单金额"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="SBuyerName"
        label="售票员名称"
        align="center"
        width="100"
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
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="SDpartureTime"
        label="发车时间"
        align="center"
        width="140"
      >
      </el-table-column>
      <el-table-column
        prop="SBillNo"
        label="提现流水号"
        align="center"
        width="200"
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
        prop="SFreeRate"
        label="是否提现"
        align="center"
      >
        <template slot-scope="scope">
          {{scope.row.SCashOut | getTicketCashOut}}
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination
        @size-change="handleSizeChange2"
        @current-change="handleCurrentChange2"
        :current-page="currentPage9"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total2"
        v-show="total2"
        style="float: right;"
      >
      </el-pagination>
    </el-col>

<!--上传弹窗-->
    <el-dialog title="提现" :visible.sync="uploadDialog">
      <el-form :model="addUpload">
        <el-form-item label="商户号:" :label-width="formLabelWidth">
          <span>{{addUpload.userStationID}}</span>
        </el-form-item>
        <el-form-item label="商户名:" :label-width="formLabelWidth">
          <span>{{addUpload.userName}}</span>
        </el-form-item>
        <el-form-item label="公司名称:" :label-width="formLabelWidth">
          <span>{{addUpload.workerName}}</span>
        </el-form-item>
        <el-form-item label="开户银行:" :label-width="formLabelWidth">
          <span>{{addUpload.workerBank}}</span>
        </el-form-item>
        <el-form-item label="银行卡号:" :label-width="formLabelWidth">
          <span>{{addUpload.workerCard}}</span>
        </el-form-item>
        <el-form-item label="到账金额:" :label-width="formLabelWidth">
          <span style="font-weight: bold;color: red">{{addUpload.toPrice}}</span>
        </el-form-item>
        <el-form-item label="银行回单:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">点击上传
            <input type="file" name=""  ref="upload"  accept="image/*">
          </a>
          <span>{{backVal?backVal:""}}</span>
        </el-form-item>
        <el-form-item label="备注图片:" :label-width="formLabelWidth">
          <a href="javascript:;" class="file">备注图片
            <input type="file" name="" ref="upload1" accept="image/*">
          </a>
          <span>{{RecakVal?RecakVal:""}}</span>
        </el-form-item>
        <el-form-item label="备注:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4}"
            placeholder="请输入备注内容"
            v-model="CRemark">
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadDialog = false">取 消</el-button>
        <el-button type="primary" @click="updateVisible(addUpload.userID)">确 定</el-button>
      </div>
    </el-dialog>

  </section>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    name: '',
    computed: mapGetters([
      'user',
      'CashSearchList',
      'RowClickList',
      'users'
    ]),
    data(){
      return {
        backVal:'',
        RecakVal:'',
        CRemark:'',
        addUpload:{
          userName:"",
          userID:'',
          workerName:'',
          workerBank:'',
          workerCard:'',
          toPrice:'',
          userStationID:''
        },
        rowClickObj:{},
        listLoading2:false,
        initHeight:450,
        size:20,
        total:0,
        total2:0,
        currentPage4:0,
        currentPage9:0,
        formLabelWidth:'120px',
        isOff:true,
        uploadDialog:false,//上传弹窗
        updateCashUserDialog:false,//修改弹窗
        value:'',
        listLoading: false,
        uid:'',
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
          SID:'',
          FromDate:'',
          CashStatus:'',
          ToDate:'',
          PageNum:1,
          Rows:10
        },
        getRecordData: {
          SStationid:'',
          SSellTimeFrom:'',
          SSellTimeTO:'',
          SHuiOrderNo:'',
          SCashOut:'',
          BillNo:'',
          PageNum:1,
          Rows:10
        },
        uploadImgs:[]
      }
    },
    methods: {
      //图片转二进制
      uploadImg(file,num){
//        return new Promise(function (relove,reject) {
//          var reader = new FileReader();
//          reader.onload = (evt)=>{
//            relove(evt.target.result);
//          }
//          reader.readAsDataURL(file);
//        })
        return new Promise(function (relove,reject) {
          lrz(file)
            .then(data=>{
              relove(data.base64.split(',')[1])
            })
        })
      },
      //返回图片二进制数组
       async getStrImgs(){
        let str1 = await this.uploadImg(this.$refs.upload.files[0])
        let str2 = await this.uploadImg(this.$refs.upload1.files[0])
        this.uploadImgs.push(str1,str2)
        return this.uploadImgs
      },
      //上传提交
      updateVisible(id){
        this.getStrImgs().then(data=>{
          this.$store.dispatch('updateVisible',{
            ID:id,
            CBackBillImageString:data[0],
            CRemark:this.CRemark,
            CRemarkImageString:data[1]?data[1]:''
          }).then(data=>{
            this.$message({
              showClose: true,
              message: '提现成功',
              type: 'success'
            });
            this.initData(1,this.size)
          },err=>{
            this.$message({
              message: err,
              type: 'error'
            });
          });
          this.uploadDialog = false;
        })
      },
      //查看
      look(CBackBill){
        if(CBackBill){
          window.open('http://114.55.248.116:43000'+CBackBill)
        }else{
          this.$message({
            message: '图片不存在！',
            type: 'error'
          });
        }
      },
      //计算条数
      handleSizeChange(val) {
        this.initData(1,val)
        this.getData.Rows = val
      },
      //计算页数
      handleCurrentChange(val) {
        this.initData(val,this.getData.Rows)
      },
      //计算条数
      handleSizeChange2(val) {
        this.initData2(1,val)
        this.getData.Rows = val
      },
      //计算页数
      handleCurrentChange2(val) {
        this.initData2(val,this.getData.Rows)
      },
      initData2(num,rows){
        this.getRecordData.SStationid = this.uid;
        this.getRecordData.PageNum = num;
        this.getRecordData.Rows = rows;
        this.listLoading2 = true;
        this.$store.dispatch('rowClick',this.getRecordData)
          .then(total=>{
            this.total2 = Number(total);
            this.listLoading2 = false;
          },err=>{
            this.$message({
              message: err,
              type: 'error'
            });
          })
      },
      //初始化
      initData(num,rows){
        this.getData.PageNum = num;
        this.getData.Rows = rows;
        this.listLoading = true;
        this.$store.dispatch('initCashSearch',this.getData)
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
        this.initData(1,this.size)
      } ,
      //计算总价（上）
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => {
            if(column.property=='CApplayPrice' || column.property=='CFree' || column.property=='CBackPrice'){
              return Math.round(item[column.property])
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
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
      //计算总价（下）
      getSummaries2(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => {
            if(column.property=='STicketPrice'){
              return Number(item.STicketPrice)
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
            sums[index] += ' 元';
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
      rowClick(row){
        this.rowClickObj = row;
        this.uid = row.CStationid;
        if(row.CStatus==0){
          this.getRecordData.SCashOut = 2;
        }else{
          this.getRecordData.SCashOut = 0;
        }
        this.getRecordData.SStationid = row.CStationid
        this.listLoading2 = true;
        this.$store.dispatch('rowClick',this.getRecordData)
          .then(total=>{
            this.total2 = Number(total);
            this.listLoading2 = false;
          },err=>{
            this.$message({
              message: err,
              type: 'error'
            });
          })
      },
      //提现
      cashWithdrawal(){
        this.uploadDialog = true;
        this.$store.commit('setTranstionFalse');
        this.addUpload.userID = this.rowClickObj.id;
        this.addUpload.userName = this.rowClickObj.CStationName;
        this.addUpload.workerName = this.rowClickObj.CWorkerName;
        this.addUpload.workerBank = this.rowClickObj.CWorkerBank;
        this.addUpload.workerCard = this.rowClickObj.CWorkerCard;
        this.addUpload.toPrice = this.rowClickObj.CBackPrice;
        this.addUpload.userStationID = this.rowClickObj.CStationid
        setTimeout(()=>{
          this.$refs.upload.addEventListener('change',data=>{
            this.backVal = data.target.files[0].name
          })
          this.$refs.upload1.addEventListener('change',data=>{
            this.RecakVal = data.target.files[0].name
          })
        },30)
      },
    },
    mounted(){
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
  .file {
    position: relative;
    display: inline-block;
    background: #409EFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #fff;
    text-decoration: none;
    text-indent: 0;
    font-size:12px;
    line-height: 20px;
  }
  .file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
  }
</style>
