<template>
  <div class="cameralist-coat">

      <div id="video" class="video-item"></div>
      <!-- <div class="video-item" @touchstart="tocameradetails">
          <video class="tyl-video" src="http://172.168.10.124:3000/camera/001" poster="./timg.gif"  autoplay="true"></video>
          <h3>会议室</h3>
      </div>
      <div class="video-item">
          <video class="tyl-video" src="http://172.168.10.124:3000/camera/002" poster="./timg.gif"  autoplay="true"></video>
          <h3>茶水间</h3>
      </div>
      <div class="video-item">
          <video class="tyl-video" src="http://172.168.10.124:3000/camera/003" poster="./timg.gif"  autoplay="true"></video>
          <h3>前台</h3>
      </div> -->
      
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'cameralist',
  data () {
    return {

    }
  },
  created(){
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '安防监控',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });
  },
  mounted(){
    var videoObject = {
      live:true,
      autoplay:true,
      container: '#video',//“#”代表容器的ID，“.”或“”代表容器的class
      variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
      flashplayer:false,//如果强制使用flashplayer则设置成true
      video:'http://172.168.10.124:3000/camera/001'//视频地址
    };
    var player=new ckplayer(videoObject);
  },
  methods:{
    tocameradetails(){
      alert(1111)
    }
  },
  components:{

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video-item{
  width: 100%;
  overflow: hidden;
  margin-top:.8rem;
  
}
.video-item h3{
  font-size: 15px;
  padding:.23rem;
}

[data-dpr="2"] .video-item h3{
    font-size: 30px;
}
[data-dpr="3"] .video-item h3{
    font-size: 45px;
}

.tyl-video{
  width: 100%;
}
.video-cnt{
 width: 100%;
 overflow: hidden;
 background-color: #d8d8d8;
}
</style>
