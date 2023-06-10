<template>
  <router-view/>
</template>

<script>
  import {provide} from "vue"
  import * as echarts from "echarts"

  //axios.defaults.baseURL="http://localhost:5000"

  export default{
    setup(){
      provide("echarts",echarts)
      //provide("axios",axios)
    }
  }
</script>

<style lang="less">
body{

  font-family: var(--font-family);
}
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
</style>
