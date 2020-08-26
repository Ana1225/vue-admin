<template>
  <div id="nav-wrap">
    <h1 class="logo">
      <img src="../../../assets/logo.png" alt="">
    </h1>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="transparent" text-color="#fff" active-text-color="#fff" router>
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
import { reactive, ref, isRef, onMounted, computed } from '@vue/composition-api'

export default {
  name: 'navMenu',
  setup(props, { root }) {
    // data
    const routers = reactive(root.$router.options.routes)

    // computed
    const isCollapse = computed(() => {
      return root.$store.state.app.isCollapse
    })

    // methods

    // return
    return {
      isCollapse,
      routers
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background: #001529;
  @include webkit(transition, all 0.3s ease);
  .logo {
    text-align: center;
    img {
      margin: 28px auto 25px;
      width: 92px;
      @include webkit(transition, all 0.3s ease);
    }
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
    .logo {
      img {
        width: 70%;
      }
    }
    .el-submenu {
      &.is-opened {
        > .el-submenu_title {
        }
      }
    }
  }
}
</style>