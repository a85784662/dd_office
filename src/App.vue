<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'App',
  created(){
  	//对需要权签的钉钉jssdk接口进行权签
    this.$http.get('http://183.66.213.82:3000/api/jsapi/register?token=4eeab969750db4ccf8b0ddbf23c88f69').then(function(res){
        var msg = res.body;
        if(msg.code===0){
            //对钉钉的js-api进行权签
            dd.config({
                agentId: msg.data.agentId, // 必填，微应用ID
                corpId: msg.data.corpId,//必填，企业ID
                timeStamp: msg.data.timeStamp, // 必填，生成签名的时间戳
                nonceStr: msg.data.nonceStr, // 必填，生成签名的随机串
                signature: msg.data.signature, // 必填，签名
                type:0,   //选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
                jsApiList : [
                'device.audio.startRecord',
                'device.audio.stopRecord',
                'device.audio.onRecordEnd',
                'device.audio.translateVoice'
              ] // 必填，需要使用的jsapi列表，注意：不要带dd。
            });
        }else{
          alert('权签出错:'+msg.msg)
        }
        
      },function(err){
        alert(JSON.stringify(err))
      }).finally(function(){
      })
      
  },
  components:{
 
  }
}
</script>

<style>

</style>
