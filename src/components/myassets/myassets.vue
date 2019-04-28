<template>
  <div class="myassets-coat">
    <headtop headtext="我的资产"></headtop>
    <div class="list-wrap">
      <div class="list">
        <div class="item1 left">电脑</div>
        <div class="item2 left">正常</div>
        <div class="item3 right" @click="toaddorder">
          <span></span>
        </div>
      </div>
      <div class="list">
        <div class="item1 left">打印机</div>
        <div class="item2 left">正常</div>
        <div class="item3 right">
          <span></span>
        </div>
      </div>
      <div class="list">
        <div class="item1 left">办公桌</div>
        <div class="item2 left">正常</div>
        <div class="item3 right">
          <span></span>
        </div>
      </div>
      <div class="list breakdown">
        <div class="item1 left">音响</div>
        <div class="item2 left">已损坏</div>
        <div class="item3 right">
          <span class="breakdown"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headtop from '../common/headtop/headtop';
export default {
  name: 'myassets',
  data () {
    return {

    }
  },
  created(){

  },
  mounted(){

  },
  methods:{
    toindex(){
      this.$router.push({path:'/'})
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
.list-wrap{
  padding:0 .27rem;
}
.list-wrap .list{
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  background-color: #3faa3c;
  border-radius: 5px;
  margin-top:.27rem;
  padding:0 .27rem;
  box-sizing: border-box;
  font-size: 15px;
  color:#fff;
}
[data-dpr="2"] .list-wrap .list{
    font-size: 30px;
}
[data-dpr="3"] .list-wrap .list{
    font-size: 45px;
}
.list-wrap .list.breakdown{
  background-color: #ccd7de;
  color:#666;
}
.list-wrap .list .item1{
  width:1.64rem;
  height: 1.2rem;
}
.list-wrap .list .item2{
  width:2.3rem;
  height: 1.2rem;
}
.list-wrap .list .item3{
  width:1.3rem;
  height: 1.2rem;
  text-align: right;
}
.list-wrap .list .item3 span{
  display: inline-block;
  width: .67rem;
  height: .67rem;
  background:url("more-wite.png") no-repeat center center;
  background-size: .67rem .67rem;
  margin-top:.27rem;
}
.list-wrap .list .item3 span.breakdown{
  background:url("more-gray.png") no-repeat center center;
  background-size: .67rem .67rem;
}
</style>
