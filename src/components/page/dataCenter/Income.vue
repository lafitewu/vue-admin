<template>
    <div>
        <div class="kinds">
            <div class="kindsBtns" @click="kindsTap(index)" :class="{kinds_active: kindsIndex == index }" v-for="(item,index) in KindsBtn" :key="index">{{item.name}}</div>
        </div>
        <div v-loading="loading" element-loading-text="加载中...">
            <div class="chart_nav">
                <span class="chart_title">{{echart_title}}</span>
                <div class="all_btn">
                    <div class="chart_btn" @click="tap(index)" :class="{echat_active: active ==index}" v-for="(item,index) in echart_btn" :key="index">{{item.name}}</div>

                    <!-- 日期选择 -->
                    <el-date-picker
                        @change="SelectFn"
                        v-model="valueDate"
                        type="daterange"
                        range-separator="至"
                        placeholder="选择日期"
                    >
                    </el-date-picker>
                </div>
            </div>
            <el-row :gutter="20">
            <el-col :span="24">
                    <div id="mychart"></div>
                </el-col> 
            </el-row>
            <div class="tab_title">详细信息列表</div>
            <div class="tablist">
                <el-table
                :data="tableData"
                stripe
                :default-sort = "{prop: 'dates',order: 'descending'}"
                style="width: 94%;margin: 0 auto;font-size: 1rem">
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
import echarts from 'echarts'
    export default {
        data(){
            return {
                loading: true,
                echart_title: '收入趋势图',
                show_day: 7,
                startDate: '',
                endDate: '',
                fn: "",
                active: 0,
                kindsIndex: 0,
                valueDate: '',
                echart_btn: [
                    {name: "7天内",value: 7},
                    {name: "30天内",value: 30},
                    {name: "60天内",value: 60}
                    // {name: "更多详情",value: "more"}
                ],
                KindsBtn: [
                    {name: "总收入概括",value: "total"},
                    {name: "CPA广告收入",value: "cpa"},
                    {name: "加粉广告收入",value: "mini"},
                    {name: "CPL广告收入",value: "cpl"}
                ],
                countdata: [],
               table: [
                    {name: "日期",prop: "date",turn: true},
                    {name: "CPA广告",prop: "cpa"},
                    {name: "加粉广告",prop: "mini"},
                    {name: "CPL广告",prop: "cpl"},
                    {name: "当天收入",prop: "total"}
                    // {name: "唤醒任务", prop: "wakeup"}
               ],
               tableData: [],
                Xdate: null,
                val_date: "total"
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                var that = this;
                // 初始化echarts
                let myChart = echarts.init(document.getElementById('mychart'));
                var Datas = {
                    days: that.show_day,
                    start: that.startDate, 
                    end: that.endDate
                }
                that.$http.get(that.hostname+"/api/dev/getincomelist"+this.url_token(),{params:Datas}).then(function(res){
                    
                    if(res.body.code == 1) {
                        that.loading = false;
                        that.tableData = res.body.data;
                        var xArr = [];
                        var Yval = [];
                        for(var i = 0; i < res.body.data.length; i++) {
                            xArr.push(res.body.data[i].date);
                            Yval.push(res.body.data[i][that.val_date]);
                        }
                        console.log(that.val_date);

                        myChart.setOption({
                            tooltip : {
                                trigger: 'axis'
                            },
                            legend: {
                                data:['展示次数','点击次数','消耗金额']
                            },
                            dataZoom: {
                                show: true,
                                start: 0,
                            },
                            grid: {
                                x: 50,
                                y: 20,
                                x2: 50,
                                y2: 90
                            },
                            xAxis : [
                                {
                                    type : 'category',
                                    data: xArr
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                {
                                    type: 'line',
                                    itemStyle: {
                                        color: '#FFB704'
                                    },
                                    // smooth:true,
                                    // itemStyle: {normal: {areaStyle: {type: 'default'},color: '#FFB704'}},
                                    data: Yval
                                },
                            ]
                        })
                    }
                })
            },
            // tab动态显示
            tap(a) {
                this.loading = true;
                this.active = a
                this.show_day = this.echart_btn[a].value
                // 归零处理
                this.tableData = []
                this.startDate = this.endDate = 0;
                if(this.echart_btn[a].value == 'more') {
                     // this.$router.replace('/Income')  //路由跳转（暂时不要）
                    this.$notify.success({
                      title: '温馨提示',
                      message: '暂未开放，敬请期待~',
                    });
                }else {
                  this.init();  
                }
            },
            kindsTap(a) {
               this.loading = true;
               this.kindsIndex = a
               this.val_date = this.KindsBtn[a].value;
               this.init();
            },
            SelectFn(val) {
                this.loading = true;
                this.startDate = val.split('至')[0];
                this.endDate = val.split('至')[1];
                this.tableData = [];
                this.init();
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
</style>