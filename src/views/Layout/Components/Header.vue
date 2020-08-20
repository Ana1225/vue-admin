<template>
  <div id="header">
    <div class="pull-left header-icon"><i class="el-icon-watermelon"></i></div>
    <div class="pull-right ">
      <div class="user-info pull-left">
        管理员
      </div>
      <div class="header-icon pull-left"><i class="el-icon-switch-button"></i></div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
#header {
  position: fixed;
  top: 0;
  left: $navMenu;
  right: 0;
  height: 75px;
  line-height: 75px;
  background: #fff;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}
.header-icon {
  padding: 0 32px;
  i {
    font-size: 25px;
    // color: #f76968;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
}
</style>