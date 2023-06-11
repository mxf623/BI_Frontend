<template>
    <el-container>
    <el-aside style="width: 300px; height: 780px;background-color: #545c64">
      <Navigation></Navigation>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <Topnav></Topnav>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    </el-container>

</template>

<script>
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
    
    //core
import "primevue/resources/primevue.min.css";
import { ref } from 'vue';
import RadioButton from 'primevue/radiobutton';
import global_msg from "../global.js"
import Navigation from "../components/nav.vue"

const ingredient = ref('');

export default {
    components :{
        Navigation
    },

    setup(){
        
    }
}

</script>

<style lang="less">
header{
    height: 3.75rem;
    width: 100%;
    .p-input-icon-left{
            position: absolute;
            right: 15rem;
            top: 10px;
        } 
    .card{
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        position: absolute;
        top: 1.125rem;
        right: 2.5rem;
        .ml-1,.ml-2{
            color: rgb(34, 33, 33);
            font-size: large;
            font-weight: 200;
        }
    }
    .flex {
        display: flex;
        align-items: center;
        gap: 8px;
    }
}
.container{
    //设置最大最小宽度
    min-width: 1200px;
    max-width: 2048px;
    //height: 37.5rem;//后续可能会改
    margin: 0 auto;
    padding: 0.625rem 0.625rem 0;
    display: flex;
    .left{
        flex: 5;
    }
    .right{
        flex: 6;
    }
}
.bottom{
    //设置最大最小宽度
    width: 100%;
    margin: 0 auto;
    padding: 0.625rem 0.625rem 0;
}
.p-inputtext-sm{
    margin-top: 0.3rem;
}
 
</style>
