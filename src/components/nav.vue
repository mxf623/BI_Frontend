<template>
    <h1>新闻数据可视化</h1>
    <div id="aa">
      <el-col :span="20">
        <el-menu
          default-active="/Compare"
          @open="handleOpen"
          @close="handleClose"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
         
          <el-menu-item index="/categoryLine">
            <i class="el-icon-setting"></i>
            某种新闻变化
          </el-menu-item>
          <el-menu-item index="/NewsLine">
            <i class="el-icon-setting"></i>
            单个新闻变化
          </el-menu-item>
          <el-menu-item index="/UserLine">
            <i class="el-icon-setting"></i>
            用户兴趣变化
          </el-menu-item>
          <el-menu-item index="/recommend">
            <i class="el-icon-setting"></i>
            新闻推荐
          </el-menu-item>
  
          <el-menu-item index="/Compose">
            <i class="el-icon-setting"></i>
            组合查询
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
  </template>
  
  <script>
  import { ElMenu, ElMenuItem } from 'element-plus';
  
  export default {
    components: {
      ElMenu,
      ElMenuItem,
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },
  };
  </script>
  
  <style scoped>
  h1 {
    font-weight: 500;
    font-size: 1.3625rem;
    color: rgb(167, 191, 32);
    display: flex;
    justify-content: center;
    line-height: 3.75rem;
  }
  
  #aa {
    height: 100%;
  }
  </style>
  