<template>
  <div class="orderpending-coat">
    <headtop headtext="待处理"></headtop>

    <div class="breakdown-wrap">
      <div class="title">设备故障</div>
      <div class="list-wrap1">
        <div class="list">
          <div class="sb-name left">空调23</div>
          <div class="sb-state left">故障未有处理</div>
          <span class="arrow"></span>
        </div>
        <div class="list">
          <div class="sb-name left">空调23</div>
          <div class="sb-state left">故障未有处理</div>
          <span class="arrow"></span>
        </div>
        <div class="list">
          <div class="sb-name left">空调23</div>
          <div class="sb-state left">故障未有处理</div>
          <span class="arrow"></span>
        </div>
        <div class="list">
          <div class="sb-name left">空调23</div>
          <div class="sb-state left">故障未有处理</div>
          <span class="arrow"></span>
        </div>
      </div>
    </div>
        
    <div class="unusual-wrap">
        <div class="title">考勤异常</div>
        <div class="list-wrap2">
          <div class="list">
            <div class="photo left"></div>
            <div class="timer left">2019-04-11   08:23:35</div>
          </div>
          <div class="list">
            <div class="photo left"></div>
            <div class="timer left">2019-04-11   08:23:35</div>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
import headtop from '../common/headtop/headtop';
export default {
  name: 'orderpending',
  data () {
    return {

    }
  },
  created(){

  },
  mounted(){

  },
  methods:{

  },
  components:{
    headtop
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.breakdown-wrap{
  font-size:15px;
  color:#333; 
}
[data-dpr="2"] .breakdown-wrap{
    font-size: 30px;
}
[data-dpr="3"] .breakdown-wrap{
    font-size: 45px;
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
.breakdown-wrap .title{
  padding:.73rem .27rem .27rem;
}
.unusual-wrap .title{
  padding:.73rem .27rem .27rem;
}
.list-wrap1,.list-wrap2{
  background-color: #fff;
  overflow: hidden;
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
</style>
