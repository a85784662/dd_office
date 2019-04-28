<template>
  <div>
    <div class="tabnav-wrapper">
      <div class="tabnav">
        <div  v-for="(item,index) in navtexts" v-on:click="$emit('navClicked',index);bgChange(index)" class="item" :class="currentId===index?'current':''">{{item}}</div>
<!--         <div v-on:click="$emit('navClicked',1);bgChange(1)" class="item" :class="currentId===1?'current':''">{{tipstext[1]}}</div>
        <div v-on:click="$emit('navClicked',2);bgChange(2)" class="item" :class="currentId===2?'current':''">{{tipstext[2]}}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    headtext:{
      type:String,
      default:'办公系统'
    },
    navtexts:{
      type:Array,
      default:[]
    }
  },
  data () {
    return {
      currentId:0
    }
  },
  mounted(){

  },
  methods:{
    bgChange(currentId){
      this.currentId = currentId
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabnav-wrapper{
  width: 100%;
  height:.96rem;
  padding-top: 12px;
  overflow:hidden;
  background-color: #fff;
  font-size: 18px;
  color:#333;
}
[data-dpr="2"] .tabnav-wrapper{
    font-size: 36px;
}
[data-dpr="3"] .tabnav-wrapper{
    font-size: 54px;
}
.tabnav::-webkit-scrollbar{width:0;height:0}
.tabnav{
  height:.96rem; 
  overflow-x:auto;
  overflow-y: hidden;
  display: flex;
}
.item{
  height: .96rem;
  text-align: center;
  margin-left: .4rem;
  -webkit-box-flex: 0;
  flex: 0 0 24%;
  box-sizing: border-box;
}
.item.current{
  color:#ff9900;
  border-bottom:2px solid #ff9900;
}

</style>
