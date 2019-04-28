<template>
  <div class="lightcontrol-coat">
    <h3 class="title">照明</h3>
    <div class="cnt-wrap">
      <div class="cnt-item">
        <div class="item left border-r">
          <p class="light-tips">第三排灯带</p>
          <span class="light-icon"></span>
        </div>
        <div class="item left">
           <div class="tyl-btn control-btn">关闭</div>
           <div class="tyl-btn model-btn">智能</div>
        </div>
      </div>
      <div class="cnt-item off">
        <div class="item left border-r">
          <p class="light-tips">第三排灯带</p>
          <span class="light-icon"></span>
        </div>
        <div class="item left">
           <div class="tyl-btn control-btn">打开</div>
           <div class="tyl-btn model-btn">智能</div>
        </div>
      </div>
    </div>
    

    <loading :isshow="loading"></loading>
  </div>
</template>

<script>
import loading from '../common/loading/loading';
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'lightcontrol',
  data () {
    return {
      currentindex:'hand',
      code:'',
      identification:"",
      token:'',
      loading:false,
      ischecked:false
    }
  },
  created(){
    //获取参数
    this.code = this.$route.query.code;
    this.identification = this.$route.query.identification;
    this.ischecked = (this.$route.query.isopen=='开' ? true :false);
    this.token = sessionStorage.getItem('token');
    //设置导航栏标题
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '灯光控制',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });
  },
  mounted(){

  },
  methods:{
    tablechange(index){
      this.currentindex = index;
    },
    switchClicked(switchState){
      /*var _this =this;
      if(switchState){
        //开灯
        _this.loading = true
        this.$http.post(this.apiurl+'/api/equipment/control/light?token='+this.token,{'code':this.code,'ordertype':1,'identification':this.identification}).then(function(res){
          var msg = res.body;
          if(msg.code===0){
            _this.ischecked = true;
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
        this.$http.post(this.apiurl+'/api/equipment/control/light?token='+this.token,{'code':this.code,'ordertype':2,'identification':this.identification}).then(function(res){
          var msg = res.body;
          if(msg.code===0){
            _this.ischecked = false
          }else{
            alert(msg.msg)
          }         
        },function(err){
          alert(JSON.stringify(err))
        }).finally(function(){
          _this.loading = false
        })

      }*/
    }
  },
  components:{
    loading
  }
  
}
</script>


<style scoped>
.lightcontrol-coat{
  width: 100%;
  position: absolute;
  left: 0;
  top:0;
  bottom: 0;
  background-color: #fff;
}
.title{
  padding:.67rem .27rem 0;
  font-size: 18px;
}
[data-dpr="2"] .title{
    font-size: 36px;
}
[data-dpr="3"] .title{
    font-size: 54px;
}
.cnt-wrap{
  padding:0 .27rem;
  overflow: hidden;
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
  padding-top: .092rem
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
  width: .866rem;
  height: 1.21rem;
  background:url("light-open.png") no-repeat center center;
  background-size: .866rem 1.21rem;
  margin-top: .33rem;
}
.cnt-item.off .light-icon{
  background:url("light-off.png") no-repeat center center;
  background-size: .866rem 1.21rem;
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
