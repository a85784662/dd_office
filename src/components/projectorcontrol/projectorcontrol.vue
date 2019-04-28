<template>
  <div class="projectorcontrol-coat">
    <div class="tyl-cnt-wrap2">
        <div class="gejian">
          <div class="list">
            <div class="list-title left">投影仪开关</div>
            <div class="switch-wrap right">
                <tylswitch :ischecked="ischecked" v-on:switchClicked="switchClicked" ></tylswitch>
            </div>
          </div>

        </div>
        
    </div>
    <loading :isshow="loading"></loading>
  </div>
</template>

<script>
import tylswitch from '../common/tylswitch/tylswitch';
import loading from '../common/loading/loading';
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'projectorcontrol',
  data () {
    return {
      code:'',
      identification:"",
      token:'',
      loading:false,
      ischecked:false
    }
  },
  created(){
    //获取参数
    this.code = this.$route.query.code;
    this.identification = this.$route.query.identification;
    this.ischecked = (this.$route.query.isopen=='开' ? true :false);
    this.token = sessionStorage.getItem('token');
    //设置导航栏标题
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '灯光控制',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });
  },
  mounted(){

  },
  methods:{

  },
  components:{
    tylswitch,
    loading
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tyl-cnt-wrap1{
  width: 9.45rem;
  height: 3.37rem;
  box-sizing: border-box;
  padding: .4rem;
  background-color: #44ba37;
  margin:.4rem auto 0;
  border-radius: 5px;
  position: relative;
}
.tyl-cnt-wrap1 .text{
  position: absolute;
  left: .27rem;
  top:.27rem;
  color:#fff;
  font-size: 15px;
}
[data-dpr="2"] .tyl-cnt-wrap1 .text{
    font-size: 30px;
}
[data-dpr="3"] .tyl-cnt-wrap1 .text{
    font-size: 45px;
}
.tyl-p-cnt{
  height: 2.61rem;
  box-sizing: border-box;
  font-size: 15px;
  color:#fff;
  text-align: center;
}
[data-dpr="2"] .tyl-p-cnt{
    font-size: 30px;
}
[data-dpr="3"] .tyl-p-cnt{
    font-size: 45px;
}

.item-icon{
  display: inline-block;
  width: 1.28rem;
  height: 1.28rem;
  margin-top:.44rem; 
}
.item-test{
  padding-top:.2rem;
}
.tyl-cnt-wrap2{
  width:100%;
  overflow: hidden;
  background-color: #fff;
  margin-top: .4rem;
}
.tyl-cnt-wrap2 .list{
  height: 1.2rem;
  line-height: 1.2rem;
  padding:.27rem;
  border-bottom:1px solid #e9eff2;
  color:#333;
  font-size: 15px;
}
[data-dpr="2"] .tyl-p-cnt{
    font-size: 30px;
}
[data-dpr="3"] .tyl-p-cnt{
    font-size: 45px;
}
.list-title{
  width:3.1rem;
}
.btn-wrap{
  width:1.79rem;
}
.btn-wrap.ts{
  width:2.2rem;
  margin-right: .53rem;
  border-right:1px solid #e9eff2;
}
.btn-wrap span{
  display: inline-block;
  width:.37rem;
  height: .37rem;
  border-radius: 50%;
  background-color: #dce4e8;
  vertical-align: -0.053rem;
  margin-right: .27rem;
}
.btn-wrap span.current{
  background-color: #50c032;
}
.wd-value .text{
  padding-right: 10px;
}
.wd-value .icon{
  width:.4rem;
  height: 1.2rem;
  background:url("arrows-down.png") no-repeat center center;
  background-size: .27rem .173rem;
}
.tyl-cnt-wrap3{
  padding: .27rem .4rem 0 0;
  overflow: hidden;
}
.year-total{
  width: 2.62rem;
  height: .76rem;
  line-height: .76rem;
  text-align: center;
  background-color: #bfcdd5;
  font-size: 12px;
  color:#333;
  border-radius: 5px;
}
[data-dpr="2"] .tyl-p-cnt{
    font-size: 24px;
}
[data-dpr="3"] .tyl-p-cnt{
    font-size: 36px;
}
.ty-wendu-label{
  display: block;
  width: 1.73rem;
  height: 1rem;
}
.ty-wendu{
  width:2rem;
  height: .7rem;
  line-height: .7rem;
  padding-left: .27rem;
  border:1px solid #d8d8d8;
  background-color: #fff;
}
</style>
