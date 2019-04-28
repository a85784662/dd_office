<template>
  <div class="equipmenttotal-coat">
    <div class="scroll-wrap">
      <div class="block1">
        <!-- <p>运行中</p> -->
        <div class="icon"></div>
        <div class="text">今日能耗   {{pageDate.zone}}瓦</div>
      </div>
      <div class="block2">
        <p>今日分区能耗比</p>
        <div class="echarts-cnt" ref="mychart1"></div>
      </div>
      <div class="block2">
        <p>周统计</p>
        <div class="echarts-cnt" ref="mychart2"></div>
      </div>
    </div>
    <div @click="toEnergyyeartotal" class="year-total">年度统计</div>

  </div>
</template>

<script>
import echarts from 'echarts';
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'equipmenttotal',
  data () {
    return {
      chartBin:"",
      chartZhe:"",
      zid:"",
      token:"",
      pageDate:{}
    }
  },
  created(){
    var _this = this;
    this.zid = this.$route.query.navid;
    this.token = sessionStorage.getItem('token');

    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '区域设备统计信息',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });

    //向服务端获取初始数据

    this.$http.get(this.apiurl+'/api/consumption/zone?token='+this.token+'&zid='+this.zid ).then(function(res){
        var msg = res.body;
        if(msg.code===0){

          this.pageDate = msg.data;
          this.$nextTick(function () {
            //开始渲染echarts
              _this.initEchartBin();
              _this.initEchartZhe()
          })

        }else{
          alert(msg.msg)
        }
        
      },function(err){
        alert(JSON.stringify(err))
      }).finally(function(){
          this.loading = false;
      })


  },
  mounted(){

  },
  methods:{
    initEchartBin(){
      var _this = this
      this.chartBin = echarts.init(this.$refs.mychart1);
      var option = {
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
              orient: 'horizontal',
              left: 'left',
              data: ['大厅、开敞办公区','领导办公区','会议室']
          },
          series : [
              {
                  name: '',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:_this.pageDate.today,
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      };
      this.chartBin.setOption(option);
      //设置默认选中高亮部分
      this.chartBin.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: _this.$route.query.navid-1
      });

      this.chartBin.on('click', function(e) {
          //当检测到鼠标悬停事件，取消默认选中高亮
          _this.chartBin.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: _this.$route.query.navid-1
          });
          //高亮显示点击的那块
          _this.chartBin.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: e.dataIndex
          });
      });

      this.chartBin.on('mouseout', function(e) {
          //检测鼠标移出后显示之前默认高亮的那块
          _this.chartBin.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: _this.$route.query.navid-1
          });
      });


    },
    initEchartZhe(){
      var _this = this;
      this.chartZhe = echarts.init(this.$refs.mychart2);
      var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['大厅、开敞办公区','领导办公区','会议室']
        },
          xAxis: {
              type: 'category',
              data: ['1', '2', '3', '4', '5', '6', '7']
          },
          yAxis: {
              type: 'value'
          },
          series: [
              {
                data: _this.pageDate.week.employee,
                type: 'line',
                name:'大厅、开敞办公区'
              },
              {
                data: _this.pageDate.week.leader,
                type: 'line',
                name:'领导办公区'
              },
              {
                data: _this.pageDate.week.meeting,
                type: 'line',
                name:'会议室'
              }
       
          ]
      };
      this.chartZhe.setOption(option);
    },
    toEnergyyeartotal(){
      this.$router.push({path:'/energyyeartotal',query:{navid:this.zid}})
    }
  },
  components:{
    echarts
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block1{
  width: 9.45rem;
  height: 3.37rem;
  background-color: #44ba37;
  border-radius: 5px;
  color:#fff;
  margin:.27rem auto;
  padding:.27rem;
  box-sizing: border-box;
  font-size: 15px;
  text-align: center;
}
[data-dpr="2"] .block1{
    font-size: 30px;
}
[data-dpr="3"] .block1{
    font-size: 45px;
}
.block1 p{
  text-align: left;
}
.block1 .icon{
  display: inline-block;
  width:.81rem;
  height: .88rem;
  margin-top: .4rem;
  background:url("icon1.png") no-repeat center center;
  background-size: .81rem .88rem;
}
.block1 .text{
  margin-top: .4rem;
}

.block2{
  width: 9.45rem;
  height: 7rem;
  background-color: #fff;
  margin:.27rem auto;
  padding:.27rem;
  box-sizing: border-box;
}
.block2 p{
  font-size: 15px;
}
[data-dpr="2"] .block2 p{
    font-size: 30px;
}
[data-dpr="3"] .block2 p{
    font-size: 45px;
}
.year-total{
  width: 9.45rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  background-color: #bfcdd5;
  border-radius: 5px;
  color:#333;
  font-size: 15px;
  position: fixed;
  left:.26rem;
  bottom:.1rem;
}
.echarts-cnt{
  height: 6rem;
  margin-top:.26rem;
  overflow: hidden;
}
.scroll-wrap{
  width: 100%;
  position: absolute;
  left:0;
  top:0;
  bottom:1.46rem;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
