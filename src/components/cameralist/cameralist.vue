<template>
  <div class="cameralist-coat">
      <template v-for="item in allUrl">
        <div :id="item.id" class="video-item"></div>
        <h3>{{item.name}}</h3>
      </template>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'cameralist',
  data () {
    return {
      allUrl:[],
      userID:"",
      token:""
    }
  },
  created(){

    this.userID = sessionStorage.getItem('userID');
    this.token = sessionStorage.getItem('token');

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
    var _this = this
    this.$http.get(this.apiurl+'/api/security/monitor?token='+this.token+'&userid='+this.userID).then(function(res){
      var msg = res.body;
      if(msg.code===0){
        this.allUrl = msg.data;
        this.$nextTick(function () {
            for(var i=0;i<msg.data.length;i++){
                var varname=msg.data[i].id

                window[varname+'a'] = {
                  live:true,
                  autoplay:false,
                  container: '#'+varname,//“#”代表容器的ID，“.”或“”代表容器的class
                  variable: varname,//该属性必需设置，值等于下面的new chplayer()的对象
                  flashplayer:false,//如果强制使用flashplayer则设置成true
                  video:_this.allUrl[i].url//视频地址
                }; 
                window[varname] =new ckplayer(window[varname+'a']);
              } 
        })       
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
.cameralist-coat h3{
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  font-size: 18px;
  color:#333;
  text-align: center;
}
[data-dpr="2"] .cameralist-coat h3{
    font-size: 36px;
}
[data-dpr="3"] .cameralist-coat h3{
    font-size: 54px;
}
</style>
