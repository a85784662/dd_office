<template>
  <div class="energy-coat">
    <loading :isshow="loading"></loading>
    <tabnav ref="childnave" :navtexts="['大厅','领导区','会议室']" v-on:navClicked="navitemClicked"></tabnav>

    <div class="scroll-wrap">
      <div class="cnt-item" v-for="item in pageDate" @click="toenergyTwo({'id':item.id,'name':item.name})">
          <span class="icon-wrap" :class="item.icon"></span>
          <h3>{{item.remark}}{{item.name}}</h3>
          <p>设备数 {{item.count}}</p>
      </div>

      
    </div>


    <div class="nh-total-btn" @click="toequipmenttotal"></div>
    <div class="nav-coat">
        <navigation pronavigationId="0"></navigation>
    </div>
  </div>
</template>

<script>
import loading from '../common/loading/loading';
import navigation from '../common/navigation/navigation';
import headtop from '../common/headtop/headtop';
import tabnav from '../common/tabnav/tabnav';
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'energy',
  data () {
    return {
      userID:"",
      token:"",
      pageDate:{},
      loading:true,
      currentZid:1,
      currentClickIndex_tabnav:1
    }
  },
  created(){
    //获取userID
    var userID = sessionStorage.getItem('userID');
    if(userID){
      this.userID = userID
    };

    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '能耗',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });


    this.token = sessionStorage.getItem('token');
    if(sessionStorage.getItem('currentClickIndex_tabnav')){
        this.currentClickIndex_tabnav = sessionStorage.getItem('currentClickIndex_tabnav');
    }
  },
  mounted(){
    this.$refs.childnave.currentId = parseInt(this.currentClickIndex_tabnav-1);
    //首次进入页面获取初始数据
    this.$http.get(this.apiurl+'/api/consumption/locations?token='+this.token+'&zid='+this.currentClickIndex_tabnav+'&userid='+this.userID).then(function(res){
        var msg = res.body;
        if(msg.code===0){
          this.pageDate = msg.data
        }else{
          alert(msg.msg)
        }       
      },function(err){
        alert(JSON.stringify(err))
      }).finally(function(){
          this.loading = false
      })
  },
  methods:{
    navitemClicked(index){
      switch(index){
        case 0:
        this.currentZid = 1;
        break;
        case 1:
        this.currentZid = 2;
        break;
        case 2:
        this.currentZid = 3;
        break;
      };
     

      if(sessionStorage.getItem('currentClickIndex_tabnav')){
        sessionStorage.removeItem("currentClickIndex_tabnav"); 
        sessionStorage.setItem('currentClickIndex_tabnav',this.currentZid);
      }else{
        sessionStorage.setItem('currentClickIndex_tabnav',this.currentZid);
      }

      this.$http.get(this.apiurl+'/api/consumption/locations?token='+this.token+'&zid='+this.currentZid+'&userid='+this.userID).then(function(res){
        var msg = res.body;
        if(msg.code===0){
          this.pageDate = msg.data
        }else{
          alert(msg.msg)
        }
        
      },function(err){
        alert(JSON.stringify(err))
      }).finally(function(){

      })
    },
    toenergyTwo(queryData){
      this.$router.push({path:'/energyTwo',query:{lid:queryData.id,name:queryData.name}})
    },
    toequipmenttotal(){
      this.$router.push({path:'/equipmenttotal',query:{navid:this.currentZid}})
    }

  },
  components:{
    navigation,
    tabnav,
    loading
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroll-wrap{
  width: 100%;
  position: absolute;
  left:0;
  top:1.28rem;
  bottom:1.46rem;
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: 2rem;
  background-color: #fff;
  padding-top:.66rem;
}

.nh-total-btn{
  width: 3.96rem;
  height: 1.57rem;
  position: absolute;
  right:.27rem;
  bottom:1.74rem;
  background: url("total.png") no-repeat center center;
  background-size: 3.96rem 1.57rem;
}

.cnt-item{
  width: 4.6rem;
  height: 2.38rem;
  text-align: center;
  background-color: #e5eff5;
  border-radius: 4px;
  margin:0 0 .27rem .27rem;
  float: left;
  font-size: 12px;
}
[data-dpr="2"] .cnt-item{
    font-size: 24px;
}
[data-dpr="3"] .cnt-item{
    font-size: 36px;
}

.icon-wrap{
  display: inline-block;
  width: 1.4rem;
  height: 1.1rem;
  margin-top: .23rem;
}

.icon-wrap.icon1{
  background:url("icon1.png") no-repeat center center;
  background-size: .88rem .8rem;
}
.icon-wrap.icon2{
  background:url("icon2.png") no-repeat center center;
  background-size: .97rem .93rem;
}
.icon-wrap.icon3{
  background:url("icon3.png") no-repeat center center;
  background-size: .813rem .813rem;
}
.icon-wrap.icon4{
  background:url("icon4.png") no-repeat center center;
  background-size: .72rem .88rem;
}
.icon-wrap.icon5{
  background:url("icon5.png") no-repeat center center;
  background-size: .76rem .85rem;
}
.icon-wrap.icon6{
  background:url("icon6.png") no-repeat center center;
  background-size: .81rem .81rem;
}
.icon-wrap.icon7{
  background:url("icon7.png") no-repeat center center;
  background-size: .85rem .76rem;
}
.icon-wrap.icon8{
  background:url("icon8.png") no-repeat center center;
  background-size: .44rem .84rem;
}
.icon-wrap.icon9{
  background:url("icon9.png") no-repeat center center;
  background-size: .89rem .81rem;
}
.icon-wrap.icon10{
  background:url("icon10.png") no-repeat center center;
  background-size: .89rem .81rem;
}

.cnt-item p{
  color:#999;
  padding-top: .18rem;
}

</style>
