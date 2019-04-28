<template>
  <div class="list-coat">
    <loading :isshow="loading"></loading>
    <tabnav :navtexts="['项目管理部','市场部','创新中心','技术咨询部','监理事业部','综合部']" v-on:navClicked="navitemClicked"></tabnav>
    <div class="cnt-list-coat">
      <div class="scroll-wrap">
        <div class="list-wrap">
          <div class="list" v-for="item in pageDate.checkinlist">
            <div class="photo left"><img v-if="item.avatar" :src="item.avatar"></div>
            <div class="name left">{{item.name}}</div>
            <div class="action left" :class="item.state=='已打卡'?'':'warn'">{{item.state}}</div>
            <div class="time left">{{item.userCheckTime | formatDate}}</div>
          </div>
        </div>
      </div>
      <div v-if="pageDate.day" class="statistics">
        <div class="item1 left">日统计</div>
        <div class="item1 left">{{pageDate.day.normal}}人 正常</div>
        <div class="item1 left"><span>{{pageDate.day.late}}人</span> 迟到</div>
        <div class="item1 left"><span>{{pageDate.day.innormal}}人</span> 异常</div>
      </div>
    </div>
  </div>
</template>

<script>

import loading from '../common/loading/loading';
import tabnav from '../common/tabnav/tabnav';
import * as dd from 'dingtalk-jsapi';

export default {
  name: 'energy',
  data () {
    return {
      pageDate:{},
      token:" ",
      loading:true,
      userID:""
    }
  },
  created(){
    //设置导航栏标题
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '考勤列表',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });
    this.userID = sessionStorage.getItem('userID');
    this.token = sessionStorage.getItem('token');
    //首次进入页面获取初始数据
    this.$http.get(this.apiurl+'/api/attendance/dept?token='+this.token+'&did=75190235&userid='+this.userID).then(function(res){
        var msg = res.body;
        if(msg.code===0){

          this.pageDate = msg.data

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
   navitemClicked(index){
      var currentDid;
      switch(index){
        case 0:
        currentDid = 75190235;
        break;
        case 1:
        currentDid = 75331238;
        break;
        case 2:
        currentDid = 75330239;
        break;
        case 3:
        currentDid = 98763303;
        break;
        case 4:
        currentDid = 75394244;
        break;
        case 5:
        currentDid = 75242234;
        break;
      };

      //点击导航向服务端获取新数据
    this.loading = true;
    this.$http.get(this.apiurl+'/api/attendance/dept?token='+this.token+'&did='+currentDid).then(function(res){
        var msg = res.body;
        if(msg.code===0){

          this.pageDate = msg.data
        }else{
          alert(msg.msg)
        }
        
      },function(err){
        alert(JSON.stringify(err))
      }).finally(function(){
        this.loading = false;
      })



    }
  },
  components:{
    tabnav,
    loading

  },
  filters: {
      formatDate: function (value) {
        if(!value){
          return ""
        }
        let date = new Date(value);
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return h + ':' + m + ':' + s;
      }
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-wrap{
  background-color: #fff;
  overflow: hidden;
  color:#333;
  margin-top:.8rem;
}
.list{
  height:1.64rem;
  line-height: 1.64rem;
  box-sizing: border-box;
  border-bottom: 1px solid #e9eff2;
  padding:0 .27rem;
  font-size: 15px;
}
[data-dpr="2"] .list{
    font-size: 30px;
}
[data-dpr="3"] .list{
    font-size: 45px;
}
.list .photo{
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: #e9eff2;
  margin-top:.2rem;
}
.list .photo img{
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
}
.list .name{
  width: 1.96rem;
  height: 1.2rem;
  padding-left:.12rem;
}
.list .state{
  width: 1.55rem;
  height: 1.2rem;
}
.list .state.warn{
  color:#ff6600;
}
.list .action{
  width: 2.7rem;
  height: 1.2rem;
}
.list .action.warn{
  color:#ff6600;
}
.list .time{
  width: 1.2rem;
  height: 1.2rem;
}
.statistics{
  width: 100%;
  height: 1.31rem;
  line-height: 1.31rem;
  background-color: #fff;
  border-top:1px solid #c7c7c7;
  position: fixed;
  left: 0;
  bottom:0;
  box-sizing: border-box;
  padding:0 .27rem;
}
.statistics span{
  color:#ff6600;
}
.statistics .item1{
  width:2.2rem;
  color:#333;
  font-size:15px; 
}
[data-dpr="2"] .item1{
    font-size: 30px;
}
[data-dpr="3"] .item1{
    font-size: 45px;
}
.scroll-wrap{
  width: 100%;
  position: absolute;
  left:0;
  top:1.3rem;
  bottom:1.4rem;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
