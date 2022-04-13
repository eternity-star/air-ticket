<template>
  <div class="cabin-list">
    <a-row :push="1">
      <a-col v-for="(item, index) in colList"
             :key="index"
             :span="spanWidth">
        <span>{{item}}</span>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="4">
        <span>1</span>
      </a-col>
      <a-col v-for="item in 5"
             :key="item"
             :span="4">
        <div class="seat">
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      colList: ['', 'A', 'B', 'C', 'D', 'E']
    }
  },
  computed: {
    spanWidth () {
      return Math.floor(24 / this.colList.length)
    },
  },
  created () {

  },
  mounted () {
    console.log('[ spanWidth ] >', this.spanWidth)
  },
  methods: {

  },
}
</script>
<style lang="less" scoped>
@import url("../../current.less");
.cabin-list {
  padding: 10px;
  .seat {
    width: 30px;
    height: 30px;
    background-color: aquamarine;
  }
}
</style>
