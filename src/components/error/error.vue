<template>
  <div class="error-coat">
      <div class="error-cnt"></div>
      <div @click="toIndex" class="return-btn">点击返回</div>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'error',
  data () {
    return {

    }
  },
  created(){
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '智能办公室',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });
  },
  mounted(){

  },
  methods:{
    toIndex(){
      this.$router.push({path:'/'})
    }
  },
  components:{

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error-cnt{
  width: 100%;
  height:9rem;
  background:url("404.gif") no-repeat center 2rem ;
  background-size: 8.29rem 6.68rem;
}

.return-btn{
  width: 8.1rem;
  height: 1.2rem;
  line-height: 1.2rem;
  background-color: #ff8400;
  color:#fff;
  text-align: center;
  font-size: 15px;
  margin: .27rem auto;
}

[data-dpr="2"] .return-btn{
    font-size: 30px;
}
[data-dpr="3"] .return-btn{
    font-size: 45px;
}

</style>
