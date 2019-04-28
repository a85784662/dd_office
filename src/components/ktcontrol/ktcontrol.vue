<template>
  <div class="ktcontrol-coat">

    <div class="tyl-cnt-wrap2">
        <mt-swipe :show-indicators="false" :auto="0">
          <mt-swipe-item v-for="(item,index) in initdata">
            <div class="list">
                    <div class="list-title left">空调位置</div>
                    <div class="wd-value right">{{item.comment}}</div>
                </div>
              <div class="list">
                    <div class="list-title left">区域室温</div>
                    <div class="wd-value right">{{item.temperature}}度</div>
                </div>
                <div class="list">
                  <div class="list-title left">空调驱动</div>
                  <div class="btn-wrap right" @click="tablechange('hand')"><span :class="currentindex==='hand'?'current':''"></span>手动</div>
                  <div class="btn-wrap right ts" ><span :class="currentindex==='auto'?'current':''"></span>智能</div>
                </div>
                <div v-if="currentindex==='hand'" class="gejian">
                  <div class="list">
                    <div class="list-title left">空调控制</div>
                    <div class="switch-wrap right">
                        <!-- <mt-switch @change="kgbtn(index)" v-model="bindData[index].kgmodel"></mt-switch> -->
                        <div @click="kgbtn(index,'k')" class="tyl-btn left" >开启</div>
                        <div @click="kgbtn(index,'g')" class="tyl-btn left" >关闭</div>
                    </div>
                  </div>
                  <div class="list">
                    <div class="list-title left">温度设置</div>
                    <div class="wd-value right">
                      <select v-model="wdData[index].wdmodel" id="ty-wendu" class="ty-wendu" @change="wdchange(index)">
                          <option v-for="va in wdvalue">{{va}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="list">
                    <div class="list-title left">模式设置</div>
                    <div class="wd-value right">
                        <select  v-model="msData[index].msmodel" id="ty-mshi" class="ty-wendu" @change="mschange(index)">
                            <option>制冷</option>
                            <option>制热</option>
                        </select>

                    </div>
                  </div>
                </div>

                <div v-if="currentindex==='auto'" class="gejian2">
                  <div class="list">
                    <div class="list-title left">温度</div>
                    <div class="wd-value right">
                        <div class="text right">27</div>
                    </div>
                  </div>
                  <div class="list">
                    <div class="list-title left">模式</div>
                    <div class="wd-value right">
                        <div class="text right">吹风</div>
                    </div>
                  </div>
                </div>
          </mt-swipe-item>
          
        </mt-swipe>
    </div>

  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'ktcontrol',
  data () {
    return {
      initdata:[],
      currentindex:'hand',
      wdvalue:['18','19','20','21','22','23','24','25','26','27','28'],
      token:"",
      code:"",
      identification:"",
      temperature:"",
      bindData:[],
      msData:[],
      wdData:[]
    }
  },
  created(){
    var _this = this;
    //获取参数
    this.code = this.$route.query.code;
    this.identification = this.$route.query.identification;
    this.ischecked = (this.$route.query.isopen=='开' ? true :false);
    this.token = sessionStorage.getItem('token');

    //设置导航栏标题
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '空调控制',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });

    //获取初始数据
    this.$http.get(this.apiurl+'/api/consumption/airconditioners?code='+this.code+'&token='+this.token+'&identification='+this.identification).then(function(res){
          var msg = res.body;
          if(msg.code===0){
            for(var i=0;i<msg.data.length;i++){
              this.bindData.push({'kgmodel':false});
              this.msData.push({'msmodel':''});
              this.wdData.push({'wdmodel':""});
              //设置空调开关、温度、模式的初始显示状态,
              this.$set(this.bindData[i],'kgmodel',msg.data[i].isopen);
              this.$set(this.msData[i],'msmodel',msg.data[i].mode);
              this.$set(this.wdData[i],'wdmodel',msg.data[i].setTemp);
            }

            this.initdata = msg.data
          }else{
            alert(msg.msg)
          }
          
        },function(err){
          alert(JSON.stringify(err))
        }).finally(function(){
          _this.loading = false
        })
  },
  mounted(){

  },
  methods:{
    tablechange(index){
      this.currentindex = index;
    },
    switchClicked(){

    },
    kgbtn(index,isopen){
      var _this =this;
      var equipcode = this.initdata[index].code;
      var name = this.initdata[index].name;

      if(isopen=='k'){
        //开空调   
        _this.loading = true
        this.$http.get(this.apiurl+'/api/equipment/control/conditioner?equipcode='+equipcode+'&ordertype=1&token='+this.token+'&equipname='+name).then(function(res){
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
      }else{
        //关空调
        _this.loading = true
        this.$http.get(this.apiurl+'/api/equipment/control/conditioner?equipcode='+equipcode+'&ordertype=0&token='+this.token+'&equipname='+name).then(function(res){
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
    wdchange(index){
      var equipcode = this.initdata[index].code;
      var name = this.initdata[index].name;
      var temperature = this.wdData[index].wdmodel;
      //设置空调温度
      var _this = this
      _this.loading = true
      this.$http.get(this.apiurl+'/api/equipment/control/conditioner?equipcode='+equipcode+'&ordertype=4&token='+this.token+'&equipname='+name+'&temperature='+temperature).then(function(res){
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

    },
    mschange(index){
      var equipcode = this.initdata[index].code;
      var name = this.initdata[index].name;
      var moshiVal = this.msData[index].msmodel;


      //设置空调模式
      var _this = this
      _this.loading = true
      this.$http.get(this.apiurl+'/api/equipment/control/conditioner?equipcode='+equipcode+'&ordertype='+moshiVal+'&token='+this.token+'&equipname='+name).then(function(res){
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

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tyl-cnt-wrap1{
  width: 9.45rem;
  height: 3.37rem;
  box-sizing: border-box;
  padding: .4rem;
  background-color: #44ba37;
  margin:.4rem auto 0;
  border-radius: 5px;
  position: relative;
}
.tyl-cnt-wrap1 .text{
  position: absolute;
  left: .27rem;
  top:.27rem;
  color:#fff;
  font-size: 15px;
}
[data-dpr="2"] .tyl-cnt-wrap1 .text{
    font-size: 30px;
}
[data-dpr="3"] .tyl-cnt-wrap1 .text{
    font-size: 45px;
}
.tyl-p-cnt{
  width: 50%;
  height: 2.61rem;
  box-sizing: border-box;
  font-size: 15px;
  color:#fff;
  text-align: center;
}
[data-dpr="2"] .tyl-p-cnt{
    font-size: 30px;
}
[data-dpr="3"] .tyl-p-cnt{
    font-size: 45px;
}
.tyl-cnt2-l{
  border-right:1px solid #549d54;
}
.item-icon{
  display: inline-block;
  width: 1.28rem;
  height: 1.28rem;
  margin-top:.44rem; 
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
  padding-top:.2rem;
}
.tyl-cnt-wrap2{
  width:100%;
  overflow: hidden;
  background-color: #fff;
  min-height: 10.6rem;
}
.tyl-cnt-wrap2 .list{
  height: 1.2rem;
  line-height: 1.2rem;
  padding:.27rem;
  border-bottom:1px solid #e9eff2;
  color:#333;
  font-size: 15px;
}
[data-dpr="2"] .tyl-p-cnt{
    font-size: 30px;
}
[data-dpr="3"] .tyl-p-cnt{
    font-size: 45px;
}
.list-title{
  width:3.1rem;
}
.btn-wrap{
  width:1.79rem;
}
.btn-wrap.ts{
  width:2.2rem;
  margin-right: .53rem;
  border-right:1px solid #e9eff2;
}
.btn-wrap span{
  display: inline-block;
  width:.37rem;
  height: .37rem;
  border-radius: 50%;
  background-color: #dce4e8;
  vertical-align: -0.053rem;
  margin-right: .27rem;
}
.btn-wrap span.current{
  background-color: #50c032;
}
.wd-value .text{
  padding-right: 10px;
}
.wd-value .icon{
  width:.4rem;
  height: 1.2rem;
  background:url("arrows-down.png") no-repeat center center;
  background-size: .27rem .173rem;
}
.tyl-cnt-wrap3{
  padding: .27rem .4rem 0 0;
  overflow: hidden;
}
.year-total{
  width: 2.62rem;
  height: .76rem;
  line-height: .76rem;
  text-align: center;
  background-color: #bfcdd5;
  font-size: 12px;
  color:#333;
  border-radius: 5px;
}
[data-dpr="2"] .tyl-p-cnt{
    font-size: 24px;
}
[data-dpr="3"] .tyl-p-cnt{
    font-size: 36px;
}
.ty-wendu-label{
  display: block;
  width: 1.73rem;
  height: 1rem;
}
.ty-wendu{
  border:none;
}

.ty-wendu{
  width:2rem;
  height: .7rem;
  line-height: .7rem;
  padding-left: .27rem;
  border:1px solid #d8d8d8;
  background-color: #fff;
}
.tyl-cnt-wrap2 .mint-swipe{
  height: 10.6rem;
}
.tyl-btn{
  width: 1.8rem;
  height: .65rem;
  line-height: .65rem;
  text-align: center;
  background-color: #50c032;
  color:#fff;
  border-radius: 5px;
  font-size: 12px;
  margin: .4rem .26rem 0 0;
}

</style>
