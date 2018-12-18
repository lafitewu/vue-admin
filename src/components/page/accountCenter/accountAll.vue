<template>
    <div>
        <div class="tab_title">财务记录</div>
        <el-row>
            <el-col :span="6" v-for="(item,index) in arr" :key="index"><div class="grid-content bg-purple" :class="item.class"><span>{{item.name}}</span><p>{{item.val}}</p></div></el-col>
        </el-row>
        <div v-loading="loading" element-loading-text="加载中...">
            
            <!-- <el-row :gutter="20">
                <el-col :span="24">
                    <div id="mychart"></div>
                </el-col> 
            </el-row> -->
            <div class="tab_title">提款记录</div>
            <div class="tablist">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    row-style="height: 50px">
                    <!-- <el-table-column type="expand">
                    
                    </el-table-column> -->
                        <el-table-column
                        label="交易号"
                        prop="deal_id">
                        </el-table-column>
                        <el-table-column
                        label="提款日期"
                        prop="createtime">
                        </el-table-column>
                        <el-table-column
                        label="状态"
                        prop="status">
                        </el-table-column>
                        <el-table-column
                        label="发票"
                        >
                            <template scope="page_scope">
                                <span>{{page_scope.row.receipt != ""? "是":"否"}}</span>
                            </template>    
                        </el-table-column>
                         <el-table-column
                        label="备注"
                        prop="bz">
                        </el-table-column>
                        <el-table-column
                        label="提款金额"
                        prop="amount">
                        </el-table-column>
                        <!-- <el-table-column
                        label="打款金额"
                        prop="desc">
                        </el-table-column> -->
                        <el-table-column
                        label="详情"
                        type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="开户名">
                                    <span>{{ props.row.payee }}</span>
                                </el-form-item>
                                <el-form-item label="开户银行">
                                    <span>{{ props.row.bankname }}</span>
                                </el-form-item>
                                <el-form-item label="银行账号">
                                    <span>{{ props.row.bankaccount }}</span>
                                </el-form-item>
                                </el-form>
                            </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                        @current-change ="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="allPage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
// import echarts from 'echarts'
    export default {
        data(){
            return {
                loading: true,
                show_day: 7,
                startDate: '',
                endDate: '',
                fn: "",
                active: 0,
                valueDate: '',
                countdata: [],
                arr: [
                    {name: "账户余额",val: "￥0.000",class: "count_special"},
                    {name: "未到账余额",val: "￥0.000"},
                    {name: "可提款余额",val: "￥0.000"},
                    {name: "总收入",val: "￥0.000"}
               ],
               table: [
                    {name: "日期",prop: "dates",turn: true},
                    {name: "总收入",prop: "all_in"},
                    {name: "CPL收入",prop: "cpl_in"},
                    {name: "CPA收入",prop: "cpa_in"},
                    {name: "小程序收入",prop: "wx"},
                    {name: "唤醒任务", prop: "wakeup"}
               ],
               tableData: [],
               curPage: 1
            }
        },
        mounted() {
            this.Init();
            this.tableInit();
        },
        methods: {
           Init() {
               var that = this;
                that.$http.jsonp(that.hostname+"/api/dev/userinfo"+this.url_token()).then(function(response){
                    console.log(response.data);
                    
                    if(response.data.code == 1) {
                        that.ruleForm = response.data.data;
                        if(that.ruleForm.pay_type == 3) {
                            that.arr[0].name = "预收款剩余金额";
                            that.arr[1].name = "预收款总金额";
                            that.arr[2].name = "当月收入";
                            that.arr[3].name = "累计收入";

                            that.arr[0].val = that.ruleForm.prebalance;
                            that.arr[1].val = that.ruleForm.prebalance - that.ruleForm.totalbalance < 0 ? 0:(that.ruleForm.prebalance - that.ruleForm.totalbalance);
                            that.arr[2].val = that.ruleForm.monthbalance;
                        }else {
                            that.arr[0].val = that.ruleForm.balance;
                            that.arr[1].val = that.ruleForm.not_arrive_amount;
                            that.arr[2].val = that.ruleForm.withbalance;
                        }
                        that.arr[3].val = that.ruleForm.totalbalance;
                        
                    }else {
                        that.$router.replace('/login');
                        that.$notify.error({
                            title: '温馨提示',
                            message: '您的账号在别处登录，请重新登录',
                        })
                    }
                });
           },
           tableInit() {
            let that = this;
            let datas = {
                page: that.curPage,
                limit: 10
            }
            that.$http.get(that.hostname+"/api/dev/withdrawlist"+this.url_token(),{params:datas}).then(function(res){
                console.log(res.body);
                that.loading = false;
                that.tableData = res.body.data.rows;
                that.allPage = (res.body.data.total/10)*10;
			});
           },
           handleCurrentChange(val) {
               this.loading = true;
               this.curPage = val;
               this.tableInit();
           }
        }
    }
</script>

<style>
.content {
    background: #EFEFEF;
}
.el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 8.5rem;
    text-align: center;
    font-size: 1.4rem;
    background: white;
    margin-bottom: .5rem;
  }
    .grid-content span {
        margin-top: 2.4rem;
        display: inline-block;  
    }
    .grid-content p {
        margin-top: .4rem;
        color: #FFB600;
    }
   /* .count_special {
        font-size: 1.8rem;
    }
        .count_special span {
            margin-top: 3.2rem;
            float: left;
            margin-left: 6rem;
        }
        .count_special p {
            margin-top: 3.2rem;
            float: left;
        }*/
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .chart_nav {
    padding-top: 1rem;
    height: 3rem;
    width: 100%;
    color: #333;
    font-size: 20px;
    line-height: 3rem;
    background: white;
  }
    .chart_title {
        float: left;
        margin-left: 2%;
        font-size: 1.4rem;
        font-weight: bold;
    }
    .all_btn {
        float: right;
        margin-right: 3%;
    }
    .chart_btn {
        float: left;
        margin-top: .5rem;
        height: 2rem;
        width: 6rem;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        margin-left: .5rem;
    }
    .echat_active {
        color: #FFB600;
        border-radius: 3rem;
        border: 1px solid #FFB600;
    }
  #mychart {
    width: 100%;
    height: 400px;
    background: white;
    margin-bottom: .5rem;
  }
  .tablist {
    width: 100%;
    padding: 1rem 0;
    background: white;
    padding-bottom: 2rem;
  }
  .tab_title {
    padding-top: 1rem;
    text-indent: 2%;
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 2rem;
    background: white;
  }
  .tablist .el-table,.tablist .el-table th>.cell {
    text-align: center;
  }
</style>