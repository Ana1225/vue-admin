<template>
  <div id="layout">
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>
    <LayoutMain></LayoutMain>
  </div>
</template>
<script>
import LayoutNav from './Components/Nav'
import LayoutHeader from './Components/Header'
import LayoutMain from './Components/Main'

export default {
  name: 'layout',
  components: { LayoutNav, LayoutHeader, LayoutMain },
  setup() {}
}
</script>
<style lang="scss" scoped>
#layout {
}
</style>