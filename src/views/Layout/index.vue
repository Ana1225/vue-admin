<template>
  <div id="layout" :class="[menuStatus?'close':'open']">
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>
    <LayoutMain></LayoutMain>
  </div>
</template>
<script>
import LayoutNav from './Components/Nav'
import LayoutHeader from './Components/Header'
import LayoutMain from './Components/Main'
import { computed } from '@vue/composition-api'

export default {
  name: 'layout',
  components: { LayoutNav, LayoutHeader, LayoutMain },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse)
    return {
      menuStatus
    }
  }
}
</script>
<style lang="scss" scoped>
#layout {
}
</style>