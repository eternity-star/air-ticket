<template>
  <a-list item-layout="horizontal"
          :pagination="pagination"
          :data-source="messageList">
    <a-list-item @click="$emit('showDetail',item)"
                 slot="renderItem"
                 slot-scope="item">
      <a slot="actions"
         class="mt10"
         @click="$emit('showDetail',item)">详情</a>
      <a slot="actions"
         class="mt10"
         v-if="revokeShow"
         @click.stop="revoke(item)">撤销</a>
      <a-list-item-meta style="width:100%;">
        <div slot="title">{{ item.title }}
          <span class="time">发布时间:{{$moment(item.sendTime).format("YYYY-MM-DD HH:mm")}}</span>
        </div>
        <div slot="avatar"
             class="avatar">{{ item.userName||'系统' }}</div>
        <div slot="description"
             class="content">
             {{item.content}}
        </div>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>


<script>
export default {
  props: {
    revokeShow: {
      type: Boolean,
      default: false
    },
    messageList: {
      type: Array,
      default: () => {
        return []
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 10
    }
  },
  watch: {
    total (newValue, oldValue) {
      this.pagination.total = newValue
    }
  },
  data () {
    return {
      pagination: {
        onChange: page => {
          this.$emit('pageChange', page)
        },
        pageSize: this.pageSize,
        total: this.total,
      },
    }
  },
  methods: {
    revoke (item) {
      // this.$confirm({
      //   title: "提示",
      //   content: "是否确定撤销？",
      //   okText: "确定",
      //   cancelText: "取消",
      //   onOk: () => {
      //     console.log('[ item ]', item)
      //     this.axios
      //       .post('api/ajax/mc/inbox/delete', this.$qs.stringify({
      //         id: item.msgId
      //       }))
      //       .then(({ data }) => {
      //         const { result, map = {}, resultMsg } = data;
      //         if (result === "SUCCESS") {
      //           this.$message.success('已撤销')
      //           let index = this.messageList.findIndex(it => it.msgId === item.msgId)
      //           if (index > -1) this.messageList.splice(index, 1)
      //         } else {
      //           this.$message.error(resultMsg);
      //         }
      //       });
      //   }
      // });
    }
  },
}
</script>

<style lang="less" scoped>
/deep/ .ant-list-item-action {
  margin-top: 25px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 50px;
  background: gainsboro;
  font-size: 14px;
  font-weight: 600;
}
.time {
  position: absolute;
  display: inline-block;
  right: 30px;
  font-size: small;
}

.content {
  width: 600px;
  /deep/ p {
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
  }
  /deep/ img {
    max-width: 100px;
    max-height: 100px;
  }
}
</style>
