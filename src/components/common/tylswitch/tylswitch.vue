<template>
  <div class="tylswitch-wrap">
      <div class="switch-container">
          <input v-model="ischecked" id="tyl-switch" type="checkbox" class="tyl-switch" />
          <label for="tyl-switch" @click="test"></label>
      </div>
  </div>
</template>

<script>
export default {
  props:{
    dotcolor:{
      type:String,
      default:'green'
    },
    ischecked:{
      type:Boolean,
      default:true
    }
  },
  data () {
    return {

    }
  },
  mounted(){

  },
  methods:{
    test(){
      this.$emit('switchClicked',!this.ischecked)
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*开关的大小*/
.switch-container {
    display: inline-block;
    width: 1.31rem;
    height: .6rem;
    vertical-align: -7px
}

/*设置checkbox不显示*/
.tyl-switch {
    display: none;
}

/*设置label标签为椭圆状*/
label {
    display: block;
    background-color: #EEEEEE;
    height: 100%;
    width: 100%;
    cursor: pointer;
    border-radius: .8rem;
}

/*在label标签内容之前添加如下样式，形成一个未选中状态*/
label:before {
    content: '';
    display: block;
    border-radius: 30px;
    height: 100%;
    width: .655rem;
    background-color: white;
    opacity: 1;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
    -webkit-transition: all 0.2s ease;
}

/*在label标签内容之后添加如下样式，形成一个选中状态*/
label:after {
    position: relative;
    top: -0.61rem;
    left: .67rem;
    content: '';
    display: block;
    border-radius: .8rem;
    height: 100%;
    width: .655rem;
    background-color: white;
    opacity: 0;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
    -webkit-transition: all 0.2s ease;
}


/*选中后，选中样式显示*/
#tyl-switch:checked~label:after {
    opacity: 1;
}

/*选中后，未选中样式消失*/
#tyl-switch:checked~label:before {
    opacity: 0;
}

/*选中后label的背景色改变*/
#tyl-switch:checked~label {
    background-color: #52be52;
}

</style>
