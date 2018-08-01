<template>
    <div>
        <el-row>
            <el-col :span="6" v-for="(item,index) in arr" :key="index"><div class="grid-content bg-purple" :class="item.class"><span>{{item.name}}</span><p>{{item.val}}</p></div></el-col>
        </el-row>
        <div class="chart_nav">
            <span class="chart_title">{{echart_title}}</span>
            <div class="all_btn">
                <div class="chart_btn" @click="tap(index)" :class="{echat_active: active ==index}" v-for="(item,index) in echart_btn" :key="index">{{item.name}}</div>
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
              :prop="item.prop"
              :label="item.name"
              :sortable="item.turn" >
            </el-table-column>
          </el-table>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
    export default {
        data(){
            return {
                echart_title: '总收入趋势',
                show_day: 7,
                fn: "",
                active: 0,
                echart_btn: [
                    {name: "7天内",value: 7},
                    {name: "30天内",value: 30},
                    {name: "60天内",value: 60},
                    {name: "更多详情",value: "more"}
                ],
                countdata: [],
                arr: [
                    {name: "今天收入",val: "￥0.000",class: "count_special"},
                    {name: "昨天收入",val: "￥0.000"},
                    {name: "账户余额",val: "￥0.000"},
                    {name: "总收入",val: "￥0.000"}
               ],
               table: [
                    {name: "日期",prop: "dates",turn: true},
                    {name: "总收入",prop: "all_in"},
                    {name: "CPL收入",prop: "cpl_in"},
                    {name: "CPA收入",prop: "cpa_in"},
                    {name: "小程序收入",prop: "cpa_in"},
                    {name: "唤醒任务", prop: "cpa_in"}
               ],
               tableData: [],
                Xdate: null,
                val_date: null 
            }
        },
        mounted() {
            var that = this

            // 初始化echarts
            let myChart = echarts.init(document.getElementById('mychart'))
            // 封装调用api
            that.fn = function () {
                // 金额总计api
                that.$http.jsonp("http://ad.midongtech.com/api/dev/summary"+this.url_token()).then(function(response){
                    // 防止多处登录
                    if(response.body.code == 0) {
                        this.$router.replace('/login');
                        this.$notify.error({
                          title: '温馨提示',
                          message: '您的账号在别处登录，请重新登录',
                        })
                    }
                    // 总计列表数据渲染
                    that.countdata = [response.data.data.incometoday,response.data.data.incomeyesterday,response.data.data.balance,response.data.data.totalbalance]
                    for(let i = 0;i < that.countdata.length; i++) {
                        that.arr[i].val = that.countdata[i]
                    }
                });
                // 日期数据api
                that.$http.post("http://ad.midongtech.com/api/dev/incomeRange"+this.url_token(),{days: that.show_day}).then(function(response){
                    // x轴数据
                    that.Xdate = response.data.data.date
                    // 图表val
                    that.val_date = response.data.data.total
                    var len = response.data.data.date.length,obj;
                    for(var i = 0; i < len; i++) {
                       obj = {dates: response.data.data.date[i],all_in: response.data.data.total[i],cpl_in: response.data.data.cpl[i], cpa_in: response.data.data.cpa[i]}
                       that.tableData.push(obj); 
                    }
                    // console.log(that.tableData);
                    // 设置echarts
                    myChart.setOption({
                    tooltip : {
                        trigger: 'axis'
                    },
                    // toolbox: {
                    //     show : true,
                    //     // feature : {
                    //     //     mark : {show: true},
                    //     //     dataView : {show: true, readOnly: false},
                    //     //     restore : {show: true},
                    //     //     saveAsImage : {show: true}
                    //     // }
                    // },
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
                            data: that.Xdate
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
                            data: that.val_date
                        }
                    ]
                    })
                });
                // echarts 随着窗口大小改变而改变
                // window.onresize(myChart.resize()) 
                    
                
                
            }
            that.fn();
        },
        methods: {
            // tab动态显示
            tap(a) {
                this.active = a
                this.show_day = this.echart_btn[a].value
                // 归零处理
                this.tableData = []
                if(this.echart_btn[a].value == 'more') {
                     // this.$router.replace('/Income')  //路由跳转（暂时不要）
                    this.$notify.success({
                      title: '温馨提示',
                      message: '暂未开放，敬请期待~',
                    });
                }else {
                  this.fn()  
                }
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
    &:last-child {
      margin-bottom: 0;
    }
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