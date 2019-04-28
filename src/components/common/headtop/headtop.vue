<template>
  <div>
    <div class="head">{{headtext}}<slot></slot></div>
  </div>
</template>

<script>
export default {
  props:{
    headtext:{
      type:String,
      default:'办公系统'
    }
  },
  data () {
    return {

    }
  },
  mounted(){

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head{
  height:1rem;
  line-height:1.2rem;
  text-align:center;
  background-color: #fff;
  font-size: 18px;
  position: relative;
}
[data-dpr="2"] .head{
    font-size: 36px;
}
[data-dpr="3"] .head{
    font-size: 54px;
}

</style>
