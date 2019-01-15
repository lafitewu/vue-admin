<template>
    <div>
        <el-select class="appSelect" @change="appFn" v-model="appVal" clearable placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.appname"
            :value="item.id">
            </el-option>
        </el-select>
        <div v-loading="loading" element-loading-text="加载中...">
            <div class="chart_nav">
                <div class="all_btn">

                    <!-- 日期选择 -->
                    <el-date-picker
                        @change="SelectFn"
                        v-model="valueDate"
                        type="date"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </div>
            </div>
            <div class="tablist">
                <el-table
                :data="tableData"
                stripe
                :default-sort = "{prop: 'date',order: 'descending'}"
                style="width: 94%;margin: 0 auto;font-size: 1rem">
                <el-table-column
			      label="广告名称"
			      >
                   <template scope="scope2">
                       <img style="width: 20%;border-radius: 10px;margin-top: 15px;" :src="scope2.row.logo"/>
                       <span style="display: block;font-size: 14px;">{{scope2.row.adname}}</span>
                   </template>
			    </el-table-column>
                <el-table-column v-for="item in table"
                :key="item.name"
                :prop="item.prop"
                :label="item.name"
                :sortable="item.turn" >
                </el-table-column>
            </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                appVal: '',
                loading: true,
                startDate: '',
                endDate: '',
                fn: "",
                active: 0,
                kindsIndex: 0,
                valueDate: '',
               table: [
                    {name: "广告形式",prop: "ad_type"},
                    {name: "效果数",prop: "rewarded_count"},
                    {name: "追加效果数",prop: "signin_count"},
                    {name: "分享数",prop: "share_count"},
                    {name: "收入",prop: "price"}
                    // {name: "唤醒任务", prop: "wakeup"}
               ],
               tableData: [],
                val_date: "total",
                options: '',
                appInitVal: '',
            }
        },
        mounted() {
            this.appInit();
            // console.log(this.$route.query.cid);
            // console.log(this.$store.state.options);
            // console.log(this.$store.state.appVal);
        },
        methods: {
            appInit() {
                var that = this;
                var Index;
                 that.$http.get(that.hostname+"/api/dev/getApps"+this.url_token()).then(function(res){
                    that.options = res.body.data;
                    // that.options = that.$store.state.options;
                    for(var i = 0; i < that.options.length; i++) {
                        if(that.options[i].id == that.$route.query.cid) {
                            Index = i;
                        }
                    }
                    // console.log(Index);
                    that.valueDate = that.$route.query.dates;
                    that.appVal = that.appInitVal || that.options[Index].id;
                    that.init();
                    // console.log(that.appVal);
                })
            },
            // 页面初始化
            init() {
                var that = this;
                var Datas = {
                    cid: that.appInitVal || that.$route.query.cid,
                    date: that.valueDate,
                }
                that.$http.get(that.hostname+"/api/dev/getappadlist"+this.url_token(),{params:Datas}).then(function(res){
                    if(res.body.code == 1) {
                        that.loading = false;
                        that.tableData = res.body.data;
                    }else {
                        that.$router.replace('/login');
                        that.$notify.error({
                          title: '温馨提示',
                          message: '您的账号在别处登录，请重新登录',
                        }) 
                    }  
                })  
            },
            SelectFn(val) {
                this.loading = true;
                this.valueDate = val;
                this.init();
            },
            appFn(val) {
                this.loading = true;
                this.appInitVal = val;
                this.appInit();
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

  .kinds {
      width: 100%;
      height: 40px;
      margin-bottom: 10px;
      font-size: .9rem;
  }
    .kindsBtns {
        float: left;
        margin-right: 5px;
        width: 10%;
        height: 100%;
        line-height: 40px;
        text-align: center;
        background: white;
        border: 1px solid gray;
        cursor: pointer;
    }
    .kinds_active {
        color: #FFB600;
        font-weight: bold;
        border: 1px solid #FFB600;
    }

    .appSelect {
        margin-bottom: 15px;
    }

    .table_detail2 {
        color: #20a0ff;
    }
</style>