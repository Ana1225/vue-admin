<template>
  <div>
    <svg :class="svgClass" aria-hidden="true">
          <use :xlink:href="iconName"></use>
        </svg>
  </div>
</template>
<script>
import { reactive, ref, isRef, onMounted, computed } from '@vue/composition-api'

export default {
  name: 'svgIcon',
  props: {
    iconClass: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      defalut: ''
    }
    // testArray: {
    //   type: Array,
    //   default: () => [],
    //   required: true
    // }
  },
  setup(props) {
    console.log(props.iconClass)
    //   data
    const msg = ref('hello world')

    //    computed
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`
      } else {
        return `svg-icon`
      }
    })
    return {
      msg,
      iconName,
      svgClass
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>