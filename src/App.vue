<template>
  <div id="app">

    <!-- <div style="height:50px"></div> -->

    <main-nav-bar />
    
      <div style="margin-top: 50px;">
        <keep-alive exclude="Detail,Cart,List,pending,allList,Profile">
          <!--exclude可以理解为不缓存，关闭就是关闭了-->
          <router-view />
        </keep-alive>
      </div>
    <!-- 撑起被tabbar盖住的部分 -->
    <div style="height:60px"></div>
    
    <main-tab-bar/>

  </div>
</template>

<script>
import MainNavBar from 'components/content/mainNavBar/mainNavBar'
import MainTabBar from 'components/content/mainTabBar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar,
    MainNavBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
