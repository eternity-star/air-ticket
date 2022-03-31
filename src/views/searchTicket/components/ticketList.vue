<template>
  <div class="ticket-list">
    <div class="ticket-info">
      <div class="info-left">
        <a-timeline>
          <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
          <a-timeline-item
            >Solve initial network problems 2015-09-01</a-timeline-item
          >
          <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
          <a-timeline-item
            >Network problems being solved 2015-09-01</a-timeline-item
          >
        </a-timeline>
      </div>
      <div class="info-center"></div>
      <div class="info-right"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
@import url('../../current.less');
.ticket-list {
  .ticket-info {
    padding: 10px;
    border: 2px solid #ebebeb;
    display: flex;
    .info-left {
      flex:1;
      align-content: center;
      /deep/ ant-timeline {
        margin-top: 50px
      }
    }
    .info-center {
      flex:2;
    }
    .info-right {
      flex:1;
    }
  }
}
</style>
