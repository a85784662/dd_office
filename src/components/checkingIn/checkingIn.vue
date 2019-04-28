<template>
  <div class="energy-coat">
    
    <div v-if="limits==='a'" class="limit-wrap">
      <div class="top-statistics">
        <div class="item1 ">日统计</div>
        <div class="item1 ">{{initdata.today.normal}}人 正常</div>
        <div class="item1 "><span>{{initdata.today.late}}人</span> 迟到</div>
        <div class="item1 "><span>{{initdata.today.innormal}}人</span> 异常</div>
      </div>
      <div class="echarts-wrap">
          <p>月统计</p>
          <div class="echarts-cnt" ref="mychart"></div>
      </div>
      <!-- <div class="tj-export-wrap">
        <div class="tj-export right" @click="StatisticsExport">历史统计导出</div>
      </div> -->
      <div class="show-block3" @click="tolistcheckingIn">
          今日考勤状态
          <div class="icon-cnt right">
            <span class="icon"></span>
          </div>
      </div>
    </div>
    
    <div class="show-block3" @click="tomycheckingIn">
        我的考情统计
        <div class="icon-cnt right">
          <span class="icon"></span>
        </div>
    </div>
    <div class="nav-coat">
        <navigation pronavigationId="1"></navigation>
    </div>
    <div v-if="dateShow" class="tyl-alert-mask">
        <div class="alert-cnt">
          <div class="time-wrap"><input v-model="mydate"  @click="selectTime" readonly="" placeholder="请选择时间" class="time"></input></div>
          <div class="export-bin">导出EXECL</div>
          <div class="export-cancel" @click="cancelMask">取消</div>
        </div>
    </div>

    <loading :isshow="loading"></loading>
  </div>
</template>

<script>
import echarts from 'echarts';
import navigation from '../common/navigation/navigation';
import headtop from '../common/headtop/headtop';
import tabnav from '../common/tabnav/tabnav';
import loading from '../common/loading/loading';
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'energy',
  data () {
    return {
      initdata:{},
      chart:"",
      dateShow:false,
      mydate:'',
      limits:'b', //权限：b表示员工，a表示领导
      userID:"",
      token:"",
      chartNormal:[],
      chartLate:[],
      chartInnormal:[],
      loading:false

    }
  },
  created(){
    var _this = this
    //设置导航栏标题
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '考勤',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });
    //获取userID和token
    this.userID = sessionStorage.getItem('userID');
    this.token = sessionStorage.getItem('token');

  },
  mounted(){
    var _this = this
    //向服务端获取初始数据
    _this.loading = true
    this.$http.get(_this.apiurl+'/api/attendance/all?token='+this.token+'&userid='+this.userID).then(function(res){
        var msg = res.body;
        if(msg.code===0){
          _this.initdata = msg.data;
          _this.limits = msg.authlevel;

          var chartNormal = msg.data.month.normal
          var chartLate = msg.data.month.late
          var chartInnormal = msg.data.month.innormal 
          //开始渲染echarts
          this.$nextTick(function () {
              _this.initEchart(chartNormal,chartLate,chartInnormal);
          })
          
        }else{
          alert(msg.msg)
        }
        
      },function(err){
        alert(JSON.stringify(err))
      }).finally(function(){
          _this.loading = false
      })

    
  },
  methods:{
    navitemClicked(e){
      alert(e)
    },
    tomycheckingIn(){
      this.$router.push({path:'/mycheckingIn'})
    },
    tolistcheckingIn(){
      this.$router.push({path:'/listcheckingIn'})
    },
    StatisticsExport(){
        this.dateShow = true
    },
    cancelMask(){
      this.dateShow = false
    },
    initEchart(chartNormal,chartLate,chartInnormal){
      var _this = this;
      this.chart = echarts.init(this.$refs.mychart);
      var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['正常','迟到','异常']
        },
          xAxis: {
              type: 'category',
              data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
          },
          yAxis: {
              type: 'value'
          },
          series: [
              {
                data: chartNormal,
                type: 'line',
                name:'正常'
              },
              {
                data: chartLate,
                type: 'line',
                name:'迟到'
              },
              {
                data: chartInnormal,
                type: 'line',
                name:'异常'
              }
       
          ]
      };
      this.chart.setOption(option);
    },
    selectTime(){
      var nowDate = this.getNowFormatDate();
      var _this = this;
      dd.ready(function() {

          dd.biz.util.datepicker({
              format: 'yyyy-MM-dd',//注意：format只支持android系统规范，即2015-03-31格式为yyyy-MM-dd
              value: nowDate, //默认显示日期
              onSuccess : function(result) {
                  //onSuccess将在点击完成之后回调
                  /*{
                      value: "2015-02-10"
                  }
                  */
                  _this.mydate = result.value
              },
              onFail : function(err) {
              }
          })
      });
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    }
  },
  components:{
    navigation,
    headtop,
    tabnav,
    loading
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-statistics{
  height: 1.2rem;
  line-height: 1rem;
  padding:0 .27rem;
  box-sizing: border-box;
  background-color: #fff;
  font-size: 15px;
  color: #333;
  display: flex;
  justify-content:space-around;
}
[data-dpr="2"] .top-statistics{
    font-size: 30px;
}
[data-dpr="3"] .top-statistics{
    font-size: 45px;
}
.top-statistics .item1 span{
  color:#ff6600;
}
.echarts-wrap{
  height:7rem;
  margin-top:.8rem;
  background-color: #fff;
  padding: .27rem;
  box-sizing: border-box;
}

.echarts-wrap p{
  color:#333;
  font-size: 15px;
}
[data-dpr="2"] .echarts-wrap p{
    font-size: 30px;
}
[data-dpr="3"] .echarts-wrap p{
    font-size: 45px;
}
.tj-export-wrap{
  height: .8rem;
  overflow: hidden;
  padding:.27rem;
}
.tj-export{
  width: 2.62rem;
  height: .76rem;
  line-height: .76rem;
  text-align: center;
  border-radius: 6px;
  font-size: 12px;
  background-color: #bfcdd5;
}
[data-dpr="2"] .tj-export{
    font-size: 24px;
}
[data-dpr="3"] .tj-export{
    font-size: 36px;
}

.show-block3{
  height:1.2rem;
  line-height: 1.2rem;
  background-color: #fff;
  margin: .4rem 0 0;
  padding:0 .27rem;
  box-sizing: border-box;
  position: relative;
  font-size: 15px;
}

[data-dpr="2"] .show-block3{
    font-size: 30px;
}
[data-dpr="3"] .show-block3{
    font-size: 45px;
}
.icon-cnt{
  line-height: 1.4rem;
}
.show-block3 .icon{
  display: inline-block;
  width:.32rem;
  height: .48rem;
  background:url("icon3.png") no-repeat center center;
  background-size: .32rem .48rem;
}

.echarts-cnt{
  height: 6rem;
  margin-top:.26rem;
  overflow: hidden;
}

.tyl-alert-mask{
  width: 100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  left:0;
  top:0;
  bottom:0;
}
.alert-cnt{
  width:9.5rem;
  height:7.5rem;
  background-color: #fff;
  margin:4rem auto 0;
  padding-top: 1.1rem;
}
.export-bin{
  width: 8.1rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  color:#fff;
  font-size: 15px;
  background-color: #ff8400;
  border-radius: 5px;
  margin:0 auto;
}
[data-dpr="2"] .export-bin{
    font-size: 30px;
}
[data-dpr="3"] .export-bin{
    font-size: 45px;
}

.time-wrap{
  width: 8.1rem;
  height: 1.2rem;
  margin:0 auto 1.1rem;
}

.time{
  width: 8.1rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  border:1px solid #d8d8d8;
  font-size: 15px;
}
[data-dpr="2"] .time{
    font-size: 30px;
}
[data-dpr="3"] .time{
    font-size: 45px;
}

.export-cancel{
  width: 8.1rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  color:#666;
  font-size: 15px;
  background-color: #d8d8d8;
  border-radius: 5px;
  margin:20px auto;
}
[data-dpr="2"] .export-cancel{
    font-size: 30px;
}
[data-dpr="3"] .export-cancel{
    font-size: 45px;
}
</style>
