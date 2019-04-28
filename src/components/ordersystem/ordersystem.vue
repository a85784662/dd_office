<template>
  <div class="ordersystem-coat">
    <headtop headtext="工单系统">
      <span class="more-btn" @click="showalert"></span>
    </headtop>

    <div class="cnt-wrap">
      <div class="list-wrap1">
        <div class="list">
          <div class="sb-name left">空调23</div>
          <div class="sb-state left">维修中</div>
          <div class="handle-wrap right">
            <select class="handle-select">
              <option>结束工单</option>
              <option>开始工单</option>
              <option>删除工单</option>
            </select>
          </div>
        </div>
        <div class="list">
          <div class="sb-name left">空调23</div>
          <div class="sb-state left">维修中</div>
          <div class="handle-wrap right">
            <select class="handle-select">
              <option>结束工单</option>
              <option>开始工单</option>
              <option>删除工单</option>
            </select>
          </div>
        </div>
        <div class="list">
          <div class="sb-name left">空调23</div>
          <div class="sb-state left">维修中</div>
          <div class="handle-wrap right">
            <select class="handle-select">
              <option>结束工单</option>
              <option>开始工单</option>
              <option>删除工单</option>
            </select>
          </div>
        </div>
        <div class="list">
          <div class="sb-name left">空调23</div>
          <div class="sb-state left">维修中</div>
          <div class="handle-wrap right">
            <select class="handle-select">
              <option>结束工单</option>
              <option>开始工单</option>
              <option>删除工单</option>
            </select>
          </div>
        </div>
      </div>

      <div class="modify-total" @click="tomendsystem"> 维修统计 <span class="arrow"></span></div>

      <div class="alert-mask" v-if="alertShow">
        <div class="alert-cnt">
          <div class="title">资产列表</div>
          <div class="alert-ul">
            <div class="alert-li" @click="toaddorder">
              <div class="name left">音响</div>
              <div class="desc left">已损坏</div>
              <div class="more-btn right"></div>
            </div>
            <div class="alert-li">
              <div class="name left">音响</div>
              <div class="desc left">已损坏</div>
              <div class="more-btn right"></div>
            </div>
            <div class="alert-li">
              <div class="name left">音响</div>
              <div class="desc left">已损坏</div>
              <div class="more-btn right"></div>
            </div>
            <div class="alert-li">
              <div class="name left">音响</div>
              <div class="desc left">已损坏</div>
              <div class="more-btn right"></div>
            </div>
            <div class="alert-li">
              <div class="name left">音响</div>
              <div class="desc left">已损坏</div>
              <div class="more-btn right"></div>
            </div>
          </div>
          <div class="close-btn" @click="cancelalert">关闭</div>
        </div>
      </div>
    </div>
        


  </div>
</template>

<script>
import headtop from '../common/headtop/headtop';
export default {
  name: 'ordersystem',
  data () {
    return {
      alertShow:false
    }
  },
  created(){

  },
  mounted(){

  },
  methods:{
    tomendsystem(){
      this.$router.push({path:'/mendtotal'});
    },
    cancelalert(){
      this.alertShow = false
    },
    showalert(){
      this.alertShow = true
    },
    toaddorder(){
      this.$router.push({path:'/addorder'})
    }
  },
  components:{
    headtop
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cnt-wrap{
  font-size:15px;
  color:#333;
  margin-top:.8rem; 
}
[data-dpr="2"] .cnt-wrap{
    font-size: 30px;
}
[data-dpr="3"] .cnt-wrap{
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
.cnt-wrap .title{
  padding:.73rem .27rem .27rem;
}
.unusual-wrap .title{
  padding:.73rem .27rem .27rem;
}
.list-wrap1{
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
.handle-select{
  width:2.98rem;
  height: .8rem;
  border:none;
  background-color: #f2f6f8;
  border-radius: 5px;
  padding-left: .4rem;
}
.modify-total{
  height: 1.2rem;
  line-height: 1.2rem;
  padding: 0 .27rem;
  font-size: 15px;
  background-color: #fff;
  margin-top: .8rem;
  box-sizing: border-box;
}
[data-dpr="2"] .modify-total{
    font-size: 30px;
}
[data-dpr="3"] .modify-total{
    font-size: 45px;
}
.modify-total .arrow{
  float: right;
  width:.253rem;
  height:.373rem;
  background:url("arrow-right.png") no-repeat center center;
  background-size: .253rem .253rem;
  margin-top: .4rem;
}
.more-btn{
  float:right;
  width: .67rem;
  height: .67rem;
  background:url("more-gray.png") no-repeat center center;
  background-size: .67rem .67rem;
  margin:.18rem .27rem 0 0;
}
.alert-mask{
  width:100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  left: 0;
  top:0;
  bottom:0;
}
.alert-cnt{
  width:9.5rem;
  max-height:10.5rem;
  background-color: #fff;
  border-radius: 5px;
  margin:1.87rem auto 0;
  box-sizing: border-box;
  padding:.27rem; 
  font-size: 15px;
  color:#333; 
}
[data-dpr="2"] .alert-cnt{
    font-size: 30px;
}
[data-dpr="3"] .alert-cnt{
    font-size: 45px;
}
.alert-ul{
  max-height:7.8rem;
  overflow-y: auto;
  overflow-x: visible;
}
.alert-li{
  height:1.2rem;
  line-height: 1.2rem;
  background-color: #ccd7de;
  border-radius: 5px;
  margin-top: .27rem; 
  padding:0 .26rem;
  box-sizing: border-box;
}

.alert-li .more-btn{
  float:right;
  width: .67rem;
  height: .67rem;
  background:url("more-gray.png") no-repeat center center;
  background-size: .67rem .67rem;
  margin:.3rem .27rem 0 0;
}

.close-btn{
 height:1.6rem;
 line-height: 1.6rem;
 text-align: center;
 border-radius: 5px;
 font-size: 15px;
}
[data-dpr="2"] .close-btn{
    font-size: 30px;
}
[data-dpr="3"] .close-btn{
    font-size: 45px;
}
</style>
