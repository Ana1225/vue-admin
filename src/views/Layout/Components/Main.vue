<template>
  <div id="main">
    <el-card shadow="always">
      <router-view></router-view>
    </el-card>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
#main {
  position: fixed;
  left: $navMenu;
  top: 75px;
  right: 0;
  bottom: 0;
  // border: 30px solid #f7f7f7;
  background: #f7f7f7;
  padding: 20px;
  padding-bottom: none;
  box-sizing: border-box;
}
</style>