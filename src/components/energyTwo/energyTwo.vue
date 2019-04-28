<template>
  <div class="energyTwo-coat">
    <loading :isshow="loading"></loading>
      <div class="kt-wrap">
        <h4>空调</h4>
        <div class="kt-list-wrap">
          <div class="kt-list left" @click="toktcontrol({'code':item.code,'identification':item.identification})" v-for="item in pageDate.conditioner" :class="item.isopen == '开'? '' : 'breakdown'">
              <span class="icon-a"></span>
              <div class="tips1">
                <span :class="item.mode == '制冷'? 'icon-ic' : 'icon-ir'" ></span>
                {{item.mode}} {{item.temperature}}度
              </div>
              <div class="tips2">
                {{item.location}}
              </div>
          </div>
        </div>

      </div>

      <div class="zm-wrap">
        <h4>照明</h4>
        <div class="zm-list-wrap">
          <div class="zm-list left" @click="lightcontrol(index)"  v-for="(item,index) in pageDate.light" :class="[item.isopen?'':'breakdown']">
              <span class="icon-a"></span>
              <div class="tips1">
                {{item.isopen?'开启':'关闭'}}
              </div>
              <div class="tips2">
                {{item.name}}
              </div>
          </div>
        </div>

      </div>

      <div class="led-wrap" v-if="pageDate.led">
        <h4>LED</h4>
        <div class="led-list-wrap">
          <div class="led-list left" @click="ledcontrol({'eid':item.eid,'thisindex':index})" v-for="(item,index) in pageDate.led" :class="[item.isopen?'':'breakdown']">
              <span class="icon-a"></span>
              <div class="tips2">
                {{item.name}}
              </div>
          </div>
        </div>
      </div>

      <div class="projector-wrap" v-if="pageDate.projector">
        <h4>投影仪</h4>
        <div class="projector-list-wrap" v-for="item in pageDate.projector">
          <div class="cnt-item">
            <div class="item left border-r">
              <p class="light-tips">{{item.name}}</p>
              <span class="light-icon"></span>
            </div>
            <div class="item left">
               <div class="tyl-btn control-btn" @click="projectorcontrol({'eid':item.eid,'ordertype':1})">开启</div>
               <div class="tyl-btn model-btn" @click="projectorcontrol({'eid':item.eid,'ordertype':2})">关闭</div>
            </div>
          </div>

        </div>
      </div>

  </div>
</template>

<script>
import loading from '../common/loading/loading';
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'energyTwo',
  data () {
    return {
      userID:"",
      token:"",
      pageDate:{},
      loading:true,
      currentZid:1,
      lid:"",
      isbreakdown:true,
      islightopen:false
    }
  },
  created(){

    var _this = this;
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : _this.$route.query.name,
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });

    this.lid = this.$route.query.lid;
    this.token = sessionStorage.getItem('token'); 
    //首次进入页面获取初始数据
    this.$http.get(this.apiurl+'/api/consumption/equipments?token='+this.token+'&lid='+this.lid).then(function(res){
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
  mounted(){

  },
  methods:{
    toktcontrol(queryData){
      this.$router.push({path:'/ktcontrol',query:{code:queryData.code,identification:queryData.identification}})
    },
    lightcontrol(index){    
      var _this = this;
      var code = this.pageDate.light[index].code;
      var identification = this.pageDate.light[index].identification;

      if(!this.pageDate.light[index].isopen){
        //开灯
        _this.loading = true
        this.$http.post(this.apiurl+'/api/equipment/control/light?token='+this.token,{'code':code,'ordertype':1,'identification':identification}).then(function(res){
          var msg = res.body;
          if(msg.code===0){
            _this.$set(_this.pageDate.light[index],'isopen',true);
          }else{
            alert(msg.msg)
          }
          
        },function(err){
          alert(JSON.stringify(err))
        }).finally(function(){
          _this.loading = false
        })

      }else{
        
        //关灯
        _this.loading = true
        this.$http.post(this.apiurl+'/api/equipment/control/light?token='+this.token,{'code':code,'ordertype':2,'identification':identification}).then(function(res){
            var msg = res.body;
            if(msg.code===0){
              _this.$set(_this.pageDate.light[index],'isopen',false);
            }else{
              alert(msg.msg)
            }         
        },function(err){
          alert(JSON.stringify(err))
        }).finally(function(){
          _this.loading = false
        })


      }
    },
    ledcontrol(queryData){
      var  _this = this;
      _this.loading = true;
      if(!this.pageDate.led[queryData.thisindex].isopen){
        //开LED
        var ordertype = 1;
        var thisisopen = true;
      }else{
        //关LED
        var ordertype = 2;
        var thisisopen = false;
      }
      //控制LED的显示和关闭
      this.$http.post(this.apiurl+'/api/equipment/control/monitor?token='+this.token,{'eid':queryData.eid,'ordertype':ordertype}).then(function(res){
            var msg = res.body;
            if(msg.code===0){
              _this.$set(_this.pageDate.led[queryData.thisindex],'isopen',thisisopen);
              alert(msg.msg)
            }else{
              alert(msg.msg)
            }         
        },function(err){
          alert(JSON.stringify(err))
        }).finally(function(){
          _this.loading = false
        })


    },
    projectorcontrol(queryData){
      var  _this = this;
      //控制投影仪的显示和关闭
      _this.loading = true;
      this.$http.post(this.apiurl+'/api/equipment/control/monitor?token='+this.token,{'eid':queryData.eid,'ordertype':queryData.ordertype}).then(function(res){
            var msg = res.body;
            if(msg.code===0){
              alert(msg.msg)
            }else{
              alert(msg.msg)
            }         
        },function(err){
          alert(JSON.stringify(err))
        }).finally(function(){
          _this.loading = false
        })
    }
  },
  components:{
    loading
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.kt-wrap{
  width: 100%;
  overflow: hidden;
  padding:.4rem 0;
  background-color: #fff;
}
.kt-wrap h4{
  color:#333;
  font-size: 18px;
  padding: 0 .27rem;
}

[data-dpr="2"] .kt-wrap h4{
    font-size: 36px;
}
[data-dpr="3"] .kt-wrap h4{
    font-size: 54px;
}

.kt-wrap .kt-list-wrap{
  background-color: #fff;
}

.kt-wrap .kt-list{
  width: 4.6rem;
  height: 2.39rem;
  margin: .2rem 0 0 .27rem;
  text-align: center;
  border-radius: 5px;
  background-color: #44ba37;
  box-sizing: border-box;
  padding: .27rem;
  color:#fff;
  font-size: 12px;
  position: relative;
}
[data-dpr="2"] .kt-wrap .kt-list{
    font-size: 24px;
}
[data-dpr="3"] .kt-wrap .kt-list{
    font-size: 36px;
}

.kt-wrap .icon-a{
  display: inline-block;
  width: 1.51rem;
  height: .75rem;
  background: url("icon4.png") no-repeat center center;
  background-size: 1.51rem .75rem;
}

.kt-wrap .tips1{
  padding-top:.24rem;
}

.kt-wrap .tips2{
  padding-top:.22rem;
}


.kt-wrap .icon-ic{
  display: inline-block;
  width: .36rem;
  height: .36rem;
  background: url("icon1.png") no-repeat center center;
  background-size: .36rem .36rem;
  vertical-align: -3px;
}

.kt-wrap .icon-ir{
  display: inline-block;
  width: .36rem;
  height: .36rem;
  background: url("icon2.png") no-repeat center center;
  background-size: .36rem .36rem;
  vertical-align: -3px;
}

.kt-wrap .kt-list.breakdown  .icon-ic{
  background: url("icon1-grey.png") no-repeat center center;
  background-size: .36rem .36rem;

}

.kt-wrap .kt-list.breakdown  .icon-ir{
  background: url("icon2-grey.png") no-repeat center center;
  background-size: .36rem .36rem;
}


.kt-wrap .code{
  color:#fff;
  font-size: 12px;
  position: absolute;
  left:.27rem;
  top:.274rem;
}
[data-dpr="2"] .kt-wrap .code{
    font-size: 24px;
}
[data-dpr="3"] .kt-wrap .code{
    font-size: 36px;
}


.kt-wrap .kt-list.breakdown{
  background-color: #ccdce6;
  color:#666;
}
[data-dpr="2"] .kt-wrap .kt-list{
    font-size: 24px;
}
[data-dpr="3"] .kt-wrap .kt-list{
    font-size: 36px;
}

.kt-wrap .kt-list.breakdown .icon-a{
  background: url("icon5.png") no-repeat center center;
  background-size: 1.51rem .75rem;
}

.kt-wrap .kt-list.breakdown .code{
  color:#666;
}




.zm-wrap{
  width: 100%;
  overflow: hidden;
  margin-top:.48rem; 
  padding:.4rem 0;
  background-color: #fff;
}
.zm-wrap h4{
  color:#333;
  font-size: 18px;
  padding: 0 .27rem;
}

[data-dpr="2"] .zm-wrap h4{
    font-size: 36px;
}
[data-dpr="3"] .zm-wrap h4{
    font-size: 54px;
}

.zm-wrap .zm-list-wrap{
  background-color: #fff;
}

.zm-wrap .zm-list{
  width: 4.6rem;
  height: 2.39rem;
  margin: .27rem 0 0 .27rem;
  text-align: center;
  border-radius: 5px;
  background-color: #44ba37;
  box-sizing: border-box;
  padding: .27rem;
  color:#fff;
  font-size: 12px;
  position: relative;
}
[data-dpr="2"] .zm-wrap .zm-list{
    font-size: 24px;
}
[data-dpr="3"] .zm-wrap .zm-list{
    font-size: 36px;
}

.zm-wrap .icon-a{
  display: inline-block;
  width: .71rem;
  height: 1.01rem;
  background: url("light_oppen.png") no-repeat center center;
  background-size: .71rem 1.01rem;
}

.zm-wrap .tips1{
  padding-top:.15rem;
}

.zm-wrap .tips2{
  padding-top:.14rem;
}

.zm-wrap .code{
  color:#fff;
  font-size: 12px;
  position: absolute;
  left:.27rem;
  top:.274rem;
}
[data-dpr="2"] .zm-wrap .code{
    font-size: 24px;
}
[data-dpr="3"] .zm-wrap .code{
    font-size: 36px;
}


.zm-wrap .zm-list.breakdown{
  background-color: #ccdce6;
  color:#666;
}
[data-dpr="2"] .zm-wrap .zm-list{
    font-size: 24px;
}
[data-dpr="3"] .zm-wrap .zm-list{
    font-size: 36px;
}

.zm-wrap .zm-list.breakdown .icon-a{
  background: url("light_off.png") no-repeat center center;
  background-size: .71rem 1.01rem;
}

.zm-wrap .zm-list.breakdown .code{
  color:#666;
}





.led-wrap{
  width: 100%;
  overflow: hidden;
  margin-top:.48rem; 
  padding:.4rem 0;
  background-color: #fff;
}
.led-wrap h4{
  color:#333;
  font-size: 18px;
  padding: 0 .27rem;
}

[data-dpr="2"] .led-wrap h4{
    font-size: 36px;
}
[data-dpr="3"] .led-wrap h4{
    font-size: 54px;
}

.led-wrap .led-list-wrap{
  background-color: #fff;
}

.led-wrap .led-list{
  width: 4.6rem;
  height: 2.39rem;
  margin: .27rem 0 0 .27rem;
  text-align: center;
  border-radius: 5px;
  background-color: #44ba37;
  box-sizing: border-box;
  padding: .27rem;
  color:#fff;
  font-size: 12px;
  position: relative;
}
[data-dpr="2"] .led-wrap .led-list{
    font-size: 24px;
}
[data-dpr="3"] .led-wrap .led-list{
    font-size: 36px;
}

.led-wrap .icon-a{
  display: inline-block;
  width:1.35rem;
  height: .87rem;
  background: url("led_open.png") no-repeat center center;
  background-size: 1.35rem .87rem;
}

.led-wrap .tips1{
  padding-top:.15rem;
}

.led-wrap .tips2{
  padding-top:.4rem;
}

.led-wrap .code{
  color:#fff;
  font-size: 12px;
  position: absolute;
  left:.27rem;
  top:.274rem;
}
[data-dpr="2"] .led-wrap .code{
    font-size: 24px;
}
[data-dpr="3"] .led-wrap .code{
    font-size: 36px;
}


.led-wrap .led-list.breakdown{
  background-color: #ccdce6;
  color:#666;
}
[data-dpr="2"] .led-wrap .led-list{
    font-size: 24px;
}
[data-dpr="3"] .led-wrap .led-list{
    font-size: 36px;
}

.led-wrap .led-list.breakdown .icon-a{
  background: url("led_off.png") no-repeat center center;
  background-size: 1.35rem .87rem;
}

.led-wrap .led-list.breakdown .code{
  color:#666;
}



.projector-wrap{
  width: 100%;
  overflow: hidden;
  margin-top:.48rem; 
  padding:.4rem 0;
  background-color: #fff;
}
.projector-wrap h4{
  color:#333;
  font-size: 18px;
  padding: 0 .27rem;
}

[data-dpr="2"] .projector-wrap h4{
    font-size: 36px;
}
[data-dpr="3"] .projector-wrap h4{
    font-size: 54px;
}

.projector-wrap .projector-list-wrap{
  background-color: #fff;
  padding:0 .27rem;
}

.projector-wrap .projector-list{
  width: 4.6rem;
  height: 2.39rem;
  margin: .27rem 0 0 .27rem;
  text-align: center;
  border-radius: 5px;
  background-color: #44ba37;
  box-sizing: border-box;
  padding: .27rem;
  color:#fff;
  font-size: 12px;
  position: relative;
}
[data-dpr="2"] .projector-wrap .projector-list{
    font-size: 24px;
}
[data-dpr="3"] .projector-wrap .projector-list{
    font-size: 36px;
}

.projector-wrap .icon-a{
  display: inline-block;
  width: 1.12rem;
  height: .76rem;
  background: url("projector_open.png") no-repeat center center;
  background-size: 1.12rem .76rem;
}

.projector-wrap .tips1{
  padding-top:.15rem;
}

.projector-wrap .tips2{
  padding-top:.2rem;
}

.projector-wrap .code{
  color:#fff;
  font-size: 12px;
  position: absolute;
  left:.27rem;
  top:.274rem;
}
[data-dpr="2"] .projector-wrap .code{
    font-size: 24px;
}
[data-dpr="3"] .projector-wrap .code{
    font-size: 36px;
}

.projector-wrap .projector-list.breakdown{
  background-color: #ccdce6;
  color:#666;
}
[data-dpr="2"] .projector-wrap .projector-list{
    font-size: 24px;
}
[data-dpr="3"] .projector-wrap .projector-list{
    font-size: 36px;
}
.projector-wrap .projector-list.breakdown .icon-a{
  background: url("projector_off.png") no-repeat center center;
  background-size: 1.12rem .76rem;
}
.projector-wrap .projector-list.breakdown .code{
  color:#666;
}


.cnt-item{
  width: 100%;
  height: 3.04rem;
  box-sizing: border-box;
  background-color: #44ba37;
  border-radius: 5px;
  padding:.26rem 0;
  margin-top: .27rem;
}
.cnt-item.off{
  background-color: #ccdce6;
}
.cnt-item .item{
  width: 50%;
  height: 2.4rem;
  box-sizing: border-box;
  text-align: center;
}
.border-r{
  border-right:1px solid #35932b;
}
.cnt-item.off .border-r{
  border-right:1px solid #9daeb9;
}

.light-tips{
  font-size: 15px;
  color: #fff;
  padding-top: .55rem
}

.cnt-item.off .light-tips{
  color: #666;
}


[data-dpr="2"] .light-tips{
    font-size: 30px;
}
[data-dpr="3"] .light-tips{
    font-size: 45px;
}
.light-icon{
  display: inline-block;
  width: 1.12rem;
  height: .76rem;
  background:url("projector_open.png") no-repeat center center;
  background-size: 1.12rem .76rem;
  margin-top: .33rem;
}
.cnt-item.off .light-icon{
  background:url("projector_off.png") no-repeat center center;
  background-size: 1.12rem .76rem;
} 
.tyl-btn{
  width: 2.1rem;
  height: .65rem;
  line-height: .65rem;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
  font-size: 12px;
  margin: .4rem auto 0;
}
[data-dpr="2"] .light-tips{
    font-size: 24px;
}
[data-dpr="3"] .light-tips{
    font-size: 36px;
}

</style>
