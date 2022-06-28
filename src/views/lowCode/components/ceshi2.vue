<template>
  <div class="aaa">
    <p>建议</p>
    <a-input :disabled="!focusIndex"></a-input>
  </div>
</template>
<script>
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
  data () {
    return {

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
