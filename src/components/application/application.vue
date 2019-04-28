<template>
  <div class="application-coat">
     <div class="personal">
        <div class="photo">
          <img v-if="pageDate.avatar" :src="pageDate.avatar">
        </div>
        <p class="name">{{pageDate.username}}</p>
        <p class="tips">{{pageDate.deptname}}</p>
     </div> 
     <div class="list-cnt">
        <div class="list" @click="toindex">
          <div class="icon p1"></div>
          <div class="cnt">
            整体统计
            <span class="arrow"></span>
          </div>
        </div>
        <div v-if="false" class="list" @click="toorderpending">
          <div class="icon p2"></div>
          <div class="cnt">
            待处理
            <span class="arrow"></span>
          </div>
        </div>
        <div v-if="false" class="list" @click="toordersystem">
          <div class="icon p3"></div>
          <div class="cnt">
            工单系统
            <span class="arrow"></span>
          </div>
        </div>
        <div v-if="false" class="list" @click="tomyassets">
          <div class="icon p4"></div>
          <div class="cnt">
            我的资产
            <span class="arrow"></span>
          </div>
        </div>
     </div>

    <div class="nav-coat">
        <navigation pronavigationId="2"></navigation>
    </div>
  </div>
</template>

<script>
import navigation from '../common/navigation/navigation';
import loading from '../common/loading/loading';
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'application',
  data () {
    return {
      pageDate:{},
      userID:"",
      token:"",
      loading:true
    }
  },
  created(){
    this.userID = sessionStorage.getItem('userID');
    this.token = sessionStorage.getItem('token');
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '我的',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });
    //首次进入页面获取初始数据
    this.$http.get(this.apiurl+'/api/attendance/employee?token='+this.token+'&userid='+this.userID).then(function(res){
        var msg = res.body;

        if(msg.code===0){
          this.pageDate = msg.data;
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
    tablechange(index){
      this.currentindex = index;
    },
    toindex(){
      this.$router.push({path:'/'})
    },
    tomyassets(){
      this.$router.push({path:'/myassets'})
    },
    toorderpending(){
      this.$router.push({path:'/orderpending'})
    },
    toordersystem(){
      this.$router.push({path:'/ordersystem'})
    }
  },
  components:{
    navigation,
    loading
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.application-coat{
  background-color: #fff;
  width: 100%;
  position: absolute;
  left: 0;
  top:0;
  bottom:0;
}
.personal{
  height: 3.9rem;
  background-color:#ff771c;
  text-align: center;
  color:#fff;
}
.personal .photo{
  display: inline-block;
  width:1.7rem;
  height: 1.7rem;
  background-color: #fff;
  border-radius: 50%;
  margin-top: .4rem;
}
.personal .photo img{
  width:1.7rem;
  height: 1.7rem;
  border-radius: 50%;
}
.personal .name{
  font-size: 15px;
  padding-top: .27rem;
}
[data-dpr="2"] .personal .name{
    font-size: 30px;
}
[data-dpr="3"] .personal .name{
    font-size: 45px;
}
.personal .tips{
  font-size: 12px;
  padding-top: .27rem;
}
[data-dpr="2"] .personal .tips{
    font-size: 24px;
}
[data-dpr="3"] .personal .tips{
    font-size: 36px;
}
.list-cnt{
  width:100%;
  overflow: hidden;
  background-color:#fff;
  color:#333;
  font-size: 15px;
}
[data-dpr="2"] .list-cnt{
    font-size: 30px;
}
[data-dpr="3"] .list-cnt{
    font-size: 45px;
}
.list-cnt .list{
  height: 1.2rem;
  line-height: 1.2rem;
  padding:0 .27rem;
  box-sizing: border-box;
}
.list-cnt .icon{
  float: left;
  width:.466rem;
  height: .466rem;
  margin-top:.4rem;
}
.list-cnt .icon.p1{
  background:url("icon1.png") no-repeat center center;
  background-size: .466rem .466rem;
}
.list-cnt .icon.p2{
  background:url("icon2.png") no-repeat center center;
  background-size: .466rem .466rem;
}
.list-cnt .icon.p3{
  background:url("icon3.png") no-repeat center center;
  background-size: .466rem .466rem;
}
.list-cnt .icon.p4{
  background:url("icon4.png") no-repeat center center;
  background-size: .466rem .466rem;
}
.list-cnt .cnt{
  float: right;
  width:8.8rem;
  border-bottom: 1px solid #e9eff2;
}
.list-cnt .arrow{
  float: right;
  width:.253rem;
  height:.373rem;
  background:url("arrow-right.png") no-repeat center center;
  background-size: .253rem .253rem;
  margin-top: .4rem;
}
</style>
