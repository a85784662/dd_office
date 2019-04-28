<template>
  <div class="energyyeartotal-coat">
    <div class="scroll-wrap">
      <div class="block2">
        <p>年度能耗统计图</p>
        <div class="echarts-cnt" ref="mychart2"></div>
      </div>
      <div class="block2">
        <p>年度分区能耗比</p>
        <div class="echarts-cnt" ref="mychart1"></div>
      </div>
    </div>

  </div>
</template>

<script>
import echarts from 'echarts';
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'energyyeartotal',
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
          title : '年度统计',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });

    //向服务端获取初始数据  http://172.168.10.21:3000/api/consumption/year?token=&zid=

    this.$http.get(this.apiurl+'/api/consumption/year?token='+this.token+'&zid='+this.zid ).then(function(res){
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
                  data:_this.pageDate.pie,
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
        tooltip : {
              trigger: 'item',
              formatter: "{b} : {c}"
          },
          xAxis: {
              type: 'category',
              data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              data: _this.pageDate.bar,
              type: 'bar'
          }]
      };

      this.chartZhe.setOption(option);
    }
  },
  components:{
    echarts
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.block2{
  width: 9.45rem;
  height: 8.3rem;
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

.echarts-cnt{
  height: 7rem;
  margin-top:.26rem;
  overflow: hidden;
}
.scroll-wrap{
  width: 100%;
  position: absolute;
  left:0;
  top:0;
  bottom:0;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
