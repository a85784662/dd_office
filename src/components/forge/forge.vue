<template>
  <div class="forge-coat">
    <div class="forge-cnt">
        <iframe class="tyl-iframe" :src="forgeUrl"></iframe>
    </div>    
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
export default {
  name: 'forge',
  data () {
    return {
      forgeUrl:"http://183.66.213.82:8888/office-locate?dbid=30"
    }
  },
  created(){
    dd.ready(function() {
      dd.biz.navigation.setTitle({
          title : '模型展示',
          onSuccess : function(result) {

          },
          onFail : function(err) {}
      });

    });
    switch(this.$route.query.navid){
        case 0:
        this.forgeUrl = "http://183.66.213.82:8888/office-locate?dbid=26"
        break;
        case 1:
        this.forgeUrl = "http://183.66.213.82:8888/office-locate?dbid=19"
        break;
        case 2:
        this.forgeUrl = "http://183.66.213.82:8888/office-locate?dbid=15"
        break;
    };




  },
  mounted(){

  },
  methods:{

  },
  components:{

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.forge-cnt{
  width: 100%;
  position: absolute;
  left:0;
  top:0;
  bottom:0;
}
.tyl-iframe{
  width: 100%;
  height: 100%;
}

</style>
