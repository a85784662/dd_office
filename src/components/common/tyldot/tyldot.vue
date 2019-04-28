<template>
  <div class="dot-wrap">
    <div class="tyldot" :class="dotcolor"></div>
  </div>
</template>

<script>
export default {
  props:{
    dotcolor:{
      type:String,
      default:'green'
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
.dot-wrap{
  display: inline-block;
}
.tyldot{
  display: inline-block;
  width: .27rem;
  height: .27rem;
  border-radius: 50%;
}

.tyldot.orange{
  background-color: #ff5400;
}
.tyldot.green{
  background-color: #65ff37;
}

</style>
