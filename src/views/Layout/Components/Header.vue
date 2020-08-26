<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState"><i class="el-icon-watermelon"></i></div>
    <div class="pull-right ">
      <div class="user-info pull-left">
        {{username}}
      </div>
      <div class="header-icon pull-left" @click="exit"><i class="el-icon-switch-button"></i></div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, isRef, onMounted, computed } from '@vue/composition-api'

export default {
  name: 'header-wrap',
  setup(props, { root }) {
    // data

    // computed
    const username = computed(() => {
      return root.$store.state.app.username
    })
    // menthod
    const navMenuState = () => {
      root.$store.commit('app/SET_COLLAPSE')
    }
    const exit = () => {
      root.$store.dispatch('app/logout').then(() => {
        root.$router.push({ name: 'Login' })
      })
    }

    return {
      navMenuState,
      username,
      exit
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/config.scss';
#header-wrap {
  position: fixed;
  top: 0;
  left: $navMenu;
  @include webkit(transition, all 0.3s ease);
  right: 0;
  height: 75px;
  line-height: 75px;
  background: #fff;
  // box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
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