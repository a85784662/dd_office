<template>
  <div class="mendtotal-coat">
    <tabnav :navtexts="['创新中心','市场部','综合部']" v-on:navClicked="navitemClicked"></tabnav>
    <div class="time-btn">选择时间</div>
    <div class="block1">
        <div class="item left ts1">
          <div class="icon-wrap p1"></div>
          <p class="icon-text1">18 次</p>
          <p class="icon-text2">维修次数</p>
        </div>
        <div class="item left">
          <div class="icon-wrap p2"></div>
          <p class="icon-text1">1800212 元</p>
          <p class="icon-text2">维修总费用</p>
        </div>
    </div>
    <div class="block2">
        <div class="list">
          <div class="name left">空调23</div>
          <div class="desc left">压缩机故障</div>
        </div>
        <div class="list">
          <div class="name left">空调23</div>
          <div class="desc left">压缩机故障</div>
        </div>
        <div class="list">
          <div class="name left">空调23</div>
          <div class="desc left">压缩机故障</div>
        </div>
        <div class="list">
          <div class="name left">空调23</div>
          <div class="desc left">压缩机故障</div>
        </div>
    </div>
    <div class="foot-wrap">
      <div class="export-btn">维修详情导出</div>
    </div>
  </div>
</template>

<script>
import tabnav from '../common/tabnav/tabnav';
export default {
  name: 'mendtotal',
  data () {
    return {

    }
  },
  created(){
    //设置导航栏标题
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '维修统计',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });
  },
  mounted(){

  },
  methods:{
    navitemClicked(){
      console.log(2)
    }
  },
  components:{
    tabnav
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.time-btn{
  height: 1.3rem;
  line-height: 1.3rem;
  padding: 0 .27rem;
  font-size: 15px;
  background-color: #fff;
  margin-top: .8rem;
}
[data-dpr="2"] .time-btn{
    font-size: 30px;
}
[data-dpr="3"] .time-btn{
    font-size: 45px;
}
.block1{
  width:9.45rem;
  height: 4.15rem;
  background-color: #fff;
  border-radius: 5px;
  margin:.47rem auto 0;
  padding:.26rem;
  box-sizing: border-box;
}
.block1 .item{
  width: 50%;
  height: 3.64rem;
  box-sizing: border-box;
  text-align: center;
}
.block1 .item.ts1{
  border-right:1px solid #e9eff2;
}
.icon-wrap{
  display: inline-block;
  width: 1.28rem;
  height: 1.28rem;
  margin-top: .8rem;
}
.icon-wrap.p1{
  background:url('icon1.png') no-repeat center center;
  background-size: 1.28rem 1.28rem;
}
.icon-wrap.p2{
  background:url('icon2.png') no-repeat center center;
  background-size: 1.28rem 1.28rem;
}
.icon-text1{
  padding-top:.27rem;
  font-size:18px;
  color:#333;
}
[data-dpr="2"] .icon-text1{
    font-size: 36px;
}
[data-dpr="3"] .icon-text1{
    font-size: 54px;
}
.icon-text2{
  padding-top:.27rem;
  font-size:12px;

}
[data-dpr="2"] .icon-text2{
    font-size: 24px;
}
[data-dpr="3"] .icon-text2{
    font-size: 36px;
}
.block2{
  background-color: #fff;
  max-height: 10.5rem;
  margin:.47rem auto 0;
  overflow-x: hidden;
  overflow-y: auto;
}
.block2 .list{
  height: 1.2rem;
  line-height: 1.2rem;
  border-bottom: 1px solid #e9eff2;
  font-size: 15px;
  padding: 0 .26rem;
  box-sizing: border-box;
  overflow: hidden;
}
[data-dpr="2"] .block2 .list{
    font-size: 30px;
}
[data-dpr="3"] .block2 .list{
    font-size: 45px;
}
.block2 .list .name{
  width: 2.1rem;
  height: 1.2rem;
  padding-right: .23rem;
  border-bottom: 1px solid #e9eff2;
}
.foot-wrap{
  width: 100%;
  height: 1.25rem;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom:0;
}
.export-btn{
  width: 9.48rem;
  height: .76rem;
  line-height: .76rem;
  text-align: center;
  font-size: 12px;
  background-color:#bfcdd5;
  border-radius: 5px;
  margin:.21rem auto 0;
}
[data-dpr="2"] .export-btn{
    font-size: 24px;
}
[data-dpr="3"] .export-btn{
    font-size: 36px;
}

</style>
