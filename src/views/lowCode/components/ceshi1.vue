<template>
  <div class="aaa">
    <p>文本</p>
    <a-input v-if="show"
             :disabled="!focusIndex"></a-input>
    <!-- @click="window.event.cancelBubble = true;" -->
    <cFooter />
  </div>
</template>
<script>
import cFooter from './cFooter.vue'
export default {
  props: {
    infoData: {
      type: Object,
      default: () => { }
    },
    focusIndex: {
      type: Boolean,
      default: true
    },
  },
  components: {
    cFooter,
  },
  data () {
    return {
      show: true
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
}
</script>
<style lang="less" scoped>
.aaa {
  margin: 10px;
  padding: 10px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid rgba(213, 213, 213, 0.6);
}
</style>
