<template>
  <div>
    <loading :isshow="loading"></loading>
    <div class="nav-foot-wrap">
        <div class="nav-item p1 t1 left" :class="pronavigationId==='0'?'current':''"  @click="toEnergy()">
          <p></p>能耗
        </div>
        <div class="nav-item p2 t1 left" :class="pronavigationId==='1'?'current':''" @click="toCheckingIn()">
          <p></p>考勤
        </div>
        <div class="nav-item p4 t2 right" :class="pronavigationId==='2'?'current':''" @click="toapplication()">
          <p></p>我的
        </div>
        <div class="nav-item p3 t2 right" :class="pronavigationId==='3'?'current':''" @click="toSafeguard()">
          <p></p>安防
        </div>
        <div @touchstart.prevent="touchstart"  @touchend.prevent="gotouchend"  class="tyl-voice"></div>
    </div> 


    <div v-if="recordshow1" class="record-alert-v"></div>
    <div v-if="recordshow2" class="record-alert-z">
      <div class="item">
        <div class="item-l left">录入语音</div>
        <div class="item-r left">{{voiceContent}}</div>
      </div>
      <div class="item">
        <div class="item-l left">执行命令</div>
        <div class="item-r left">{{voiceOrder}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import loading from '../loading/loading';
export default {
  props:{
    pronavigationId:{
      type:String,
      default:""
    }
  },
  data () {
    return {
      recordshow1:false,
      recordshow2:false,
      voiceContent:"",
      token:"",
      voiceOrder:"",
      loading:false
    }
  },
  created(){
    
      
  },
  mounted(){
    this.token = sessionStorage.getItem('token');
  },
  components:{
    loading
  },
  methods:{
    toEnergy(){
      this.$router.push({path:'/energy'})
    },
    toCheckingIn(){
      this.$router.push({path:'/checkingIn'})
    },
    toapplication(){
      this.$router.push({path:'/application'})
    },
    toSafeguard(){
      this.$router.push({path:'/Safeguard'})
    },
    touchstart(){
      var _this = this;
      _this.recordshow1 = true
      dd.ready(function() {
        //开始录音
        dd.device.audio.startRecord({
            onSuccess : function () {//支持最长为60秒（包括）的音频录制

            },
            onFail : function (err) {
              _this.recordshow1 = false;
              alert(JSON.stringify(err))
            }
        });

      });
    },
    gotouchend(){
      var _this = this;
       _this.recordshow1 = false;
       dd.ready(function() {
          //停止录音
          dd.device.audio.stopRecord({
              onSuccess : function(res){
                  //res.mediaId; // 返回音频的MediaID，可用于本地播放和音频下载
                  //res.duration; // 返回音频的时长，单位：秒
                  //录音转换为文字
                  dd.device.audio.translateVoice({
                      mediaId : res.mediaId,
                      duration : 1.0,
                      onSuccess : function (res) {
                         // res.mediaId; // 转换的语音的mediaId
                         // res.content; // 语音转换的文字内容
                          _this.voiceContent = res.content;
                          _this.loading = true
                              _this.$http.post(_this.apiurl+'/api/voice/lightcontrol?order='+_this.voiceContent+'&token='+_this.token).then(function(res){
                              var msg = res.body;
                              if(msg.code===0){
                                _this.voiceOrder = msg.order;
                              }else{
                                _this.voiceOrder = msg.msg
                              }
                              
                            },function(err){
                              _this.voiceOrder = '执行失败'
                            }).finally(function(){
                              _this.recordshow2 = true;
                              _this.loading = false;
                              setTimeout(function(){
                                    _this.recordshow2 = false;
                                },2000)
                            })


                      }
                  });





              },
              onFail : function (err) {
                  alert(JSON.stringify(err))
              }
          });

       })
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav-foot-wrap{
    width: 100%;
    height: 1.46rem;
    background-color: #fff;
    border-top:1px solid #d8d8d8;
    position: relative;
  }
  .nav-item{
    width: .9rem;
    height: 1.4rem;
    text-align: center;
    box-sizing: border-box;
    padding-top: .2rem;
  }
  .nav-item.t1{
    margin-left: .93rem
  }
  .nav-item.t2{
    margin-right: .93rem
  }
  .nav-item p{
    margin-bottom: .133rem
  }
  .nav-item.p1 p{
    width: 100%;
    height: .64rem;
    background: url('icon1.png') no-repeat center center;
    background-size: .627rem .64rem;
  }
  .nav-item.p2 p{
    width: 100%;
    height: .64rem;
    background: url('icon2.png') no-repeat center center;
    background-size: .627rem .64rem;
  }
  .nav-item.p3 p{
    width: 100%;
    height: .64rem;
    background: url('icon3.png') no-repeat center center;
    background-size: .627rem .64rem;
  }
  .nav-item.p4 p{
    width: 100%;
    height: .64rem;
    background: url('icon4.png') no-repeat center center;
    background-size: .627rem .64rem;
  }

  .nav-item.current{
    color:#ff9900;
  }
  .nav-item.p1.current p{
    background: url('icon1_click.png') no-repeat center center;
    background-size: .627rem .64rem;
  }
  .nav-item.p2.current p{
    background: url('icon2_click.png') no-repeat center center;
    background-size: .627rem .64rem;
  }
  .nav-item.p3.current p{
    background: url('icon3_click.png') no-repeat center center;
    background-size: .627rem .64rem;
  }
  .nav-item.p4.current p{
    background: url('icon4_click.png') no-repeat center center;
    background-size: .627rem .64rem;
  }

  .tyl-voice{
    width: 1.76rem;
    height: 1.76rem;
    background:url("voice.png") no-repeat center center;
    background-size: 1.7466rem 1.7466rem;
    position: absolute;
    left: 50%;
    top:-0.88rem;
    margin-left: -.875rem;
  }
  .record-alert-v{
    width:5.73rem;
    height: 5.73rem;
    background:url("voice1.png") no-repeat center center;
    background-size: 5.73rem 5.73rem;
    position: fixed;
    left:50%;
    top:27%;
    margin-left: -2.68rem;
  }
  .record-alert-z{
    width:8.25rem;
    height: 7.61rem;
    background:url("voice2.png") no-repeat center center;
    background-size: 8.25rem 7.61rem;
    position: fixed;
    left:50%;
    top:27%;
    margin-left: -4.125rem;
    box-sizing: border-box;
    padding-top: 4.8rem;
  }
  .record-alert-z .item{
    height: 1.6rem;
    padding:0 .4rem;
    font-size: 15px;
  }
[data-dpr="2"] .record-alert-z .item{
    font-size: 30px;
}
[data-dpr="3"] .record-alert-z .item{
    font-size: 45px;
}

.record-alert-z .item-l{
  color:#999;
}

.record-alert-z .item-r{
  width:4.8rem;
  padding-left:.6rem;
}

</style>
