<template>
  <div class="tyl-body">
      <div class="in-photo-wrap">

          <div @click="toForge(index)" class="in-photo" v-for="(item,index) in initdata.zones">
            <img :src="item.background">
            <div class="mask">
              <div class="ms-lie">
                <div class="ms-l left"><tyldot></tyldot><span>设备运转</span></div>
                <div class="ms-r left">{{item.count}}</div>
              </div>
              <div class="ms-lie">
                <div class="ms-l left tts">区能耗</div>
                <div class="ms-r left ">{{item.consume}}</div>
              </div>
              <div class="ms-lie">
                <div class="ms-l left tts2">{{item.name}}</div>
              </div>
            </div>
          </div>

      </div>
      <div v-if="initdata.energy" class="tyl-msg">
        <div class="lie">
            <div class="lie-cnt1 left">
              <div class="lie-l left">总耗能</div>
              <div class="lie-r left"><strong>{{initdata.energy.total}}</strong> 瓦</div>
            </div>
            <div class="lie-cnt2 left">
              <div class="lie-l left">能耗评级</div>
              <div class="lie-r left"><strong>{{initdata.energy.level}}</strong></div>
            </div>
        </div> 
        <div class="lie">
            <div class="lie-ts-cnt1 left">
              <div class="lie-ts-l left">考勤统计</div>
              <div class="lie-ts-r left"><strong>{{initdata.attendance.normal}}</strong>人 正常</div>
            </div>
            <div class="lie-ts-cnt2 left">
              <strong>{{initdata.attendance.late}}人</strong> 迟到
            </div>
            <div class="lie-ts-cnt3 left">
              <strong>{{initdata.attendance.innormal}}人</strong> 异常
            </div>
        </div>
        <div class="lie ts">
            <div class="lie-cnt1 left">
              <div class="lie-l left">来访人数</div>
              <div class="lie-r left"><strong>{{initdata.visitor}}</strong> 人</div>
            </div>
        </div>
      </div>
      <div class="nav-coat">
        <navigation></navigation>
      </div>
      <loading :isshow="loading"></loading>
  </div>
</template>

<script>
import navigation from '../common/navigation/navigation';
import headtop from '../common/headtop/headtop';
import tyldot from '../common/tyldot/tyldot';
import loading from '../common/loading/loading';
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'index',
  data () {
    return {
      initdata:{},
      loading:true
    }
  },
  created(){
    var _this = this;
    //token是不变的，写死的，所有直接存，供后续页面使用
    sessionStorage.setItem('token','4eeab969750db4ccf8b0ddbf23c88f69');
    
    dd.ready(function() {
      //获取用户ID
      dd.runtime.permission.requestAuthCode({
          corpId: "ding868af02b0cfc19c635c2f4657eb6378f",
          onSuccess: function(result) {
          //向服务端发请求，获取初始数据。
          _this.$http.get(_this.apiurl+'/api/statistic?authcode='+result.code+'&token=4eeab969750db4ccf8b0ddbf23c88f69').then(function(res){
            var msg = res.body;
            if(msg.code===0){
              _this.initdata = msg.data;
              //保存从服务器获取的userID
              sessionStorage.setItem('userID',msg.data.userid);
            }else{
              alert(msg.msg)
            }
            
          },function(err){
            alert(JSON.stringify(err))
          }).finally(function(){
            _this.loading = false;
          })
          },
          onFail : function(err) {
            alert(err)
             _this.loading = false;
          }
       
      });

      //设置导航栏标题
      dd.biz.navigation.setTitle({
          title : '统计',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });
         
    });
  },
  mounted(){

  },
  methods:{
    toForge(index){
      //alert(index)
      this.$router.push({path:'/forge',query:{navid:index}})      
    } 
  },
  components:{
    navigation,
    headtop,
    tyldot,
    loading
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tyl-body{

}
.in-photo-wrap{
  width: 100%;
  overflow: hidden;
  margin-top: .26rem;
}
.in-photo{
  width:4.58rem;
  height: 4.18rem;
  background-color: #666;
  margin:0 0 .28rem .28rem;
  float: left;
  position: relative;
}
.in-photo:first-child{
  width:9.48rem;
  height: 4.18rem;
  margin:0 0 .28rem .28rem;
  float: left;
  position: relative;
}
.in-photo:first-child img{
  width:9.48rem;
  height: 4.18rem;
}
.in-photo img{
  width:4.58rem;
  height: 4.18rem;
}
.tyl-msg{
  width:9.44rem;
  height: 3.3rem;
  padding:0 .25rem;
  box-sizing: border-box;;
  border-radius: 4px;
  box-sizing: border-box;
  margin:.26rem auto 0;
  background-color: #fff;
}

.tyl-msg .lie{
  height: 1.1rem;
  line-height: 1.1rem;
  overflow: hidden;
  border-bottom: 1px solid #d8d8d8;
  color:#333;
  font-size: 14px;
}
[data-dpr="2"] .tyl-msg .lie{
    font-size: 24px;
}
[data-dpr="3"] .tyl-msg .lie{
    font-size: 36px;
}



.tyl-msg .lie-l{
  width:1.84rem;
}

.tyl-msg .lie.ts{
  border-bottom: none;
}
.lie-cnt1{
  width:6rem;
}
.lie-cnt2{
  width:2.8rem;
}

.lie-ts-cnt1{
  width:4.1rem;
}
.lie-ts-cnt2{
  width:2.3rem;
}
.lie-ts-cnt3{
  width:2.24rem;
}
.lie-ts-l{
  width:1.85rem;
}

.mask{
  width:4.1rem;
  height: 2rem;
  color:#fff;
  background-color: rgba(0,0,0,0.4);
  position: absolute;
  left: .26rem;
  top:.26rem;
  padding: .26rem .26rem 0;
  box-sizing: border-box;
}
.ms-lie{
  height: .6rem;
  overflow: hidden;

}

.ms-lie .ms-l{
  width:2rem;
}

.ms-lie .ms-l span{
  padding-left:.27rem;
}
.ms-lie .ms-r{
  padding-left: .37rem;
}

.ms-lie .ms-l.tts{
  padding-left: .4rem;
  box-sizing: border-box;
}
.ms-lie .ms-l.tts2{
  width: 100%;
  padding-left: .4rem;
  box-sizing: border-box;
}
strong{
  font-weight: bold;
}


</style>
