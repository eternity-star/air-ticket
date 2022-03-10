<template>
  <div class="message">
    1212
    <a-tabs default-active-key="notice" @change="tabChange">
      <!-- <a-tab-pane key="personal">
        <span slot="tab">
          <a-icon type="bell" />
          通知
        </span>
        <a-spin :spinning="loading"
                tip="加载中...">
          <message-list :messageList="messageList"
                        :pageSize="pageSize"
                        :total="total"
                        @pageChange="pageChange"
                        @showDetail="showDetail"></message-list>
        </a-spin>
      </a-tab-pane> -->
      <a-tab-pane key="notice">
        <span slot="tab">
          <a-icon type="notification" />
          公告
        </span>
        <a-spin :spinning="loading" tip="加载中...">
          <message-list
            :messageList="messageList"
            :pageSize="pageSize"
            :total="total"
            @pageChange="pageChange"
            @showDetail="showDetail"
          ></message-list>
        </a-spin>
      </a-tab-pane>
    </a-tabs>
    <a-modal v-model="detailVisible"
             :footer="null">
      <div slot="title">{{ currentItem.title }}</div>
      <div class="detail-contet">{{ currentItem.content }}</div>
    </a-modal>
  </div>
</template>

<script>
import messageList from './components/messageList.vue'
export default {
  data() {
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      rules: {
        name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
      },
      form: {
        type: 1, // 1建议 2投诉
        suggest: '', // 建议
        complaint: '', // 投诉
      },
      currentItem: {},
      pageSize: 15,
      currentPage: 1,
      total: 1,
      messageList: [
        {
          title: '标题啦啦啦',
          userName: 'fu大帅哥',
          content: '叮叮当叮叮当',
          sendTime: '',
        },
        {
          title: '标题啦啦啦',
          userName: 'fu大帅哥',
          content: '叮叮当叮叮当',
        },
        {
          title: '标题啦啦啦',
          userName: 'fu大帅哥',
          content: '叮叮当叮叮当',
        },
        {
          title: '标题啦啦啦',
          userName: 'fu大帅哥',
          content: '叮叮当叮叮当',
        },
      ],
      detailVisible: false,
      loading: false,
    }
  },
  components: {
    messageList,
  },
  mounted() {
    console.log('[ this.$moment() ] >', this.$moment())
  },
  methods: {
    tabChange(val) {
      console.log('[ val ] >', val)
    },
    pageChange(page) {
      this.currentPage = page
      this.getData()
    },
    showDetail(item) {
      this.detailVisible = true
      this.currentPage = 1
      this.currentItem = item
    },
    getData() {
      console.log('[ 发起一个网络请求 ] >', '请求公告信息')
    },
  },
}
</script>

<style lang="less" scoped></style>
