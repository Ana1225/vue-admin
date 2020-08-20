<template>
  <div id="nav">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="transparent" text-color="#fff"
      active-text-color="#fff" router>
      <template v-for="(item,index) in routers">
        <el-submenu :index="index +'' " v-if="!item.hidden" :key="item.id">
          <!-- 一级菜单 -->
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive, ref, isRef, onMounted } from '@vue/composition-api'

export default {
  name: 'navMenu',
  setup(props, { root }) {
    // data
    const isCollapse = ref(false)

    const routers = reactive(root.$router.options.routes)

    // methods
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }

    // return
    return {
      isCollapse,
      routers,

      handleClose,
      handleOpen
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
#nav {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background: #344a5f;
}
</style>