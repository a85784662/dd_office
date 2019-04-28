<template>
  <div class="listcheckingIn-coat">
    <div class="tyl-cnt-wrap1">
      <div class="tyl-cnt-l left">
        <div class="tyl-photo left">
            <img v-if="pageDate.avatar" :src="pageDate.avatar">
        </div>
        <div class="tyl-name left">
            <div class="item1">{{pageDate.username}}</div>
            <div class="item2">{{pageDate.deptname}}</div>
        </div>
      </div>
      <div class="tyl-cnt-r right">
        
        <select v-model="monthValue"  class="select-timer">
          <option value="1">1月</option>
          <option value="2">2月</option>
          <option value="3">3月</option>
          <option value="4">4月</option>
          <option value="5">5月</option>
          <option value="6">6月</option>
          <option value="7">7月</option>
          <option value="8">8月</option>
          <option value="9">9月</option>
          <option value="10">10月</option>
          <option value="11">11月</option>
          <option value="12">12月</option>
        </select>
      </div>
    </div>
    <div class="tyl-cnt-wrap2">
        <div class="tyl-cnt2-l tyl-p-cnt left">
            <div class="item-icon p1"></div>
            <div class="item-test">出勤天数 {{pageDate.days}}天</div>
        </div>
        <div class="tyl-cnt2-r tyl-p-cnt left">
            <div class="item-icon p2"></div>
            <div class="item-test">异常次数  {{pageDate.innormal}}次</div>
        </div>
    </div>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'listcheckingIn',
  data () {
    return {
      pageDate:{},
      monthValue:"",
      userID:"",
      token:"",
      isfirstM:true
    }
  },
  created(){
    //设置导航栏标题
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '我的考勤',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });

    this.userID = sessionStorage.getItem('userID');
    this.token = sessionStorage.getItem('token');
    
  },
  watch:{
    monthValue: function (val, oldVal) {
      if(this.isfirstM){
        this.isfirstM = false;
        return false  
      }
      //改变月份向服务端发起新的请求
      this.loading = true
      this.$http.get(this.apiurl+'/api/attendance/employee?token='+this.token+'&userid='+this.userID+'&date='+val).then(function(res){
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
  mounted(){
   var nowTime = this.getNowFormatDate();
   this.monthValue = nowTime;
   //首次进入页面获取初始数据
    this.$http.get(this.apiurl+'/api/attendance/employee?token='+this.token+'&userid='+this.userID+'&date='+this.monthValue).then(function(res){
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
  methods:{
    getNowFormatDate(time) {
      if(!time){
        var date = new Date();
      }else{
        var date = new Date(time);
      }
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      /*if (month >= 1 && month <= 9) {
          month = "0" + month;
      }*/ //我不需要再月前加0
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      //return currentdate; //返回所有年月日
      return month //我只需要返回月
    },

  },
  components:{

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tyl-cnt-wrap1{
  width: 9.45rem;
  height: 2.1rem;
  box-sizing: border-box;
  padding: .4rem;
  background-color: #fff;
  margin:.4rem auto 0;
  border-radius: 5px;
}
.tyl-cnt-l{
  width:60%;
}
.tyl-photo{
  width: 1.2rem;
  height: 1.2rem;
  background-color:#e9eff2;
  border-radius: 50%;
}
.tyl-photo img{
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
}
.tyl-photo img{
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
}
.tyl-name{
  width: 3.53rem;
  padding-top:.11rem;
  padding-left:.267rem;
}
.tyl-name .item1{
  color:#333;
  font-size: 15px;
}
[data-dpr="2"] .tyl-name .item1{
    font-size: 30px;
}
[data-dpr="3"] .tyl-name .item1{
    font-size: 45px;
}
.tyl-name .item2{
  color:#999;
  font-size: 12px;
  padding-top:.266rem;
}
[data-dpr="2"] .tyl-name .item2{
    font-size: 24px;
}
[data-dpr="3"] .tyl-name .item2{
    font-size: 36px;
}

.tyl-cnt-wrap2{
  width: 9.45rem;
  height: 4.15rem;
  box-sizing: border-box;
  padding: .4rem;
  background-color: #fff;
  margin:.4rem auto 0;
  border-radius: 6px;
}
.tyl-p-cnt{
  width: 50%;
  height: 3.62rem;
  box-sizing: border-box;
  font-size: 15px;
  color:#333;
  text-align: center;
}
[data-dpr="2"] .tyl-p-cnt{
    font-size: 30px;
}
[data-dpr="3"] .tyl-p-cnt{
    font-size: 45px;
}
.tyl-cnt2-l{
  border-right:2px solid #e9eff2;
}
.item-icon{
  display: inline-block;
  width: 1.28rem;
  height: 1.28rem;
  margin-top:.6rem; 
}
.item-icon.p1{
  background:url("icon1.png") no-repeat center center;
  background-size: 1.28rem 1.28rem;
}
.item-icon.p2{
  background:url("icon2.png") no-repeat center center;
  background-size: 1.28rem 1.28rem;
}
.item-test{
  padding-top:.66rem;
}
.tyl-cnt-r{
  padding-top: .27rem;
}
.select-timer{
  width: 1.5rem;
  height: .64rem;
  line-height: .64rem;
  background-color: #fff;
  border:1px solid #bfcdd5;
  color:#333;
  border-radius: 5px;
  padding-left: .37rem;
  
}

.select-timer option{
    text-align: center;
}

</style>
