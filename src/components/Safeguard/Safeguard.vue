<template>
  <div class="Safeguard-coat">
    <loading :isshow="loading"></loading>
    <div class="unusual-wrap">
        <div class="list-wrap2">
          <div class="list" v-for="item in initdata.recent">
            <div class="photo left"><img :src="item.headerImage"></div>
            <div class="timer left">{{item.visitedAt}}</div>
            <div class="name right">{{item.name}}</div>
          </div>
        </div>
    </div>
    <div class="scroll-wrap">
      <div class="day-total">日统计 &nbsp;&nbsp;&nbsp;&nbsp;来访 {{initdata.today}} 人</div>
      <div class="week-total">
        <p>周统计</p>
        <div class="echarts-cnt" ref="mychart"></div>
      </div>
      <!-- <div class="export-btn-wrap">
          <div class="export-btn right">历史统计导出</div>
      </div> -->

      <div @touchstart="tocameralist" class="video-btn">监控画面 <span class="arrow"></span></div>
    </div>

    <div class="nav-coat">
        <navigation pronavigationId="3"></navigation>
    </div>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import echarts from 'echarts';
import navigation from '../common/navigation/navigation';
import loading from '../common/loading/loading';
export default {
  name: 'Safeguard',
  data () {
    return {
      userID:"",
      token:"",
      initdata:{},
      loading:true
    }
  },
  created(){

    //获取userID和token
    this.userID = sessionStorage.getItem('userID');
    this.token = sessionStorage.getItem('token');
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '安防',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });

    var _this = this;
    //获取服务器初始数据
    this.$http.get(_this.apiurl+'/api/security/data?token='+this.token+'&userid='+this.userID).then(function(res){
        var msg = res.body;
        if(msg.code===0){
          _this.initdata = msg.data;

          //开始渲染echarts
          this.$nextTick(function () {
              _this.initEchart(msg.data.week);
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
  mounted(){

  },
  methods:{
    tocameralist(){
      this.$router.push({path:'/cameralist'})
    },
    initEchart(chartNormal){
      var _this = this;
      this.chart = echarts.init(this.$refs.mychart);
      var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['来访人数']
        },
          xAxis: {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
              type: 'value'
          },
          series: [
              {
                data: chartNormal,
                type: 'line',
                name:'来访人数'
              }
          ]
      };
      this.chart.setOption(option);
    },
  },
  components:{
    navigation,
    loading
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroll-wrap{
  width: 100%;
  position: absolute;
  left:0;
  top:3.4rem;
  bottom:1.46rem;
  overflow-x: hidden;
  overflow-y: auto;

}

.unusual-wrap{
  font-size:15px;
  color:#333; 
}

[data-dpr="2"] .unusual-wrap{
    font-size: 30px;
}
[data-dpr="3"] .unusual-wrap{
    font-size: 45px;
}
.list-wrap1,.list-wrap2{
  background-color: #fff;
  overflow: hidden;
  max-height: 3.4rem;
  overflow-y: auto;
}
.list-wrap1 .list{
  height: 1.2rem;
  line-height: 1.2rem;
  padding:0 .27rem;
  box-sizing: border-box;
  border-bottom: 1px solid #e9eff2;
}
.sb-name{
  width:2.4rem;
  margin-right: .26rem;
}
.arrow{
  float: right;
  width: .25rem;
  height: .37rem;
  background:url("arrow-right.png") no-repeat center center;
  background-size: .25rem .37rem;
  margin-top: .4rem;
}

.list-wrap2 .list{
  height: 1.7rem;
  line-height: 1.7rem;
  padding:0 .27rem;
  box-sizing: border-box;
  border-bottom: 1px solid #e9eff2;
}
.list-wrap2 .list .photo{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background-color: #e9eff2;
    margin: .26rem .4rem 0 0;
}
.list-wrap2 .list .photo img{
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
}
.list-wrap2 .list .name{
    height: 1.2rem;
    margin-left: .27rem;
}
.day-total{
  height: 1.27rem;
  line-height: 1.27rem;
  padding:0 .53rem;
  font-size: 15px;
  color:#333;
  background-color: #fff;
  margin-top: .8rem;
}
[data-dpr="2"] .day-total{
    font-size: 30px;
}
[data-dpr="3"] .day-total{
    font-size: 45px;
}
.week-total{
  min-height:6.76rem;
  background-color: #fff;
  padding:.52rem;
  margin-top: .53rem;
  box-sizing: border-box;
}
.week-total p{
  font-size: 15px;
  color:#333;
}
[data-dpr="2"] .week-total p{
    font-size: 30px;
}
[data-dpr="3"] .week-total p{
    font-size: 45px;
}
.export-btn-wrap{
  margin-top: .26rem;
  padding-right:.27rem;
  overflow:hidden;
}
.export-btn{
  width:2.63rem;
  height: .76rem;
  line-height: .76rem;
  text-align: center;
  background-color: #bfcdd5;
  color:#333;
  border-radius: 5px;
  font-size: 12px;

}
[data-dpr="2"] .export-btn{
    font-size: 24px;
}
[data-dpr="3"] .export-btn{
    font-size: 36px;
}
.video-btn{
  height: 1.27rem;
  line-height: 1.27rem;
  background-color: #fff;
  font-size: 15px;
  color:#333;
  padding:0 .4rem;
  margin-top:.8rem;
  margin-bottom: .533rem;
}
[data-dpr="2"] .video-btn{
    font-size: 30px;
}
[data-dpr="3"] .video-btn{
    font-size: 45px;
}

.video-btn .arrow{
  float: right;
  width:.253rem;
  height:.373rem;
  background:url("arrow-right.png") no-repeat center center;
  background-size: .253rem .253rem;
  margin-top: .44rem;
}

.echarts-cnt{
  height: 6rem;
  margin-top:.26rem;
  overflow: hidden;
}
</style>
