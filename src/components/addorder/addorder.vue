<template>
  <div class="addorder-coat">
    <headtop headtext="添加工单"></headtop>
    <div class="list-wrap">
      <div class="list">
        <div class="name left">部门名称</div>
        <div class="message left">创新研发后勤部</div>
      </div>
      <div class="list">
        <div class="name left">申请人员</div>
        <div class="message left">李建国</div>
      </div>
      <div class="list">
        <div class="name left">设备名称</div>
        <div class="message left"></div>
      </div>
      <div class="list">
        <div class="name left">工单编号</div>
        <div class="message left"></div>
      </div>
    </div>
    <div class="cnt-wrap">
      <div class="des-text">
        <h4>问题描述</h4>
        <textarea placeholder="输入相关问题描述" class="questions"></textarea>
      </div>
    </div>
    <div class="submit-btn">提 交</div>
  </div>
</template>

<script>
import headtop from '../common/headtop/headtop';
export default {
  name: 'addorder',
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
.list-wrap{
  background-color: #fff;
  overflow: hidden;
  margin-top: .8rem;
}
.list-wrap .list{
  height: 1.2rem;
  line-height: 1.2rem;
  padding:0 .27rem;
  border-bottom: 1px solid #e9eff2;
  box-sizing: border-box;
  font-size: 15px;
  color:#333;
}
[data-dpr="2"] .list-wrap .list{
    font-size: 30px;
}
[data-dpr="3"] .list-wrap .list{
    font-size: 45px;
}
.list-wrap .list .name{
  padding-right:.8rem;
}
.cnt-wrap{
  padding:.6rem .27rem;
  background-color: #fff;
  margin-top: .8rem;
}
.des-text h4{
  height: .67rem;
  font-size: 15px;
  color:#333;
}
[data-dpr="2"] .des-text h4{
    font-size: 30px;
}
[data-dpr="3"] .des-text h4{
    font-size: 45px;
}
.questions{
  width:100%;
  height: 2.8rem;
  padding:.27rem;
  box-sizing: border-box;
  background-color:#e9eff2;
  border:none;
  resize: none;
}
.submit-btn{
  width:9.44rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  background-color: #ff8400;
  border-radius: 5px;
  margin: .53rem auto 0;
  color:#fff;
  font-size: 15px;
}
[data-dpr="2"] .submit-btn{
    font-size: 30px;
}
[data-dpr="3"] .submit-btn{
    font-size: 45px;
}
</style>
