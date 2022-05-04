<template>
  <div class="message">
    <a-tabs default-active-key="personal"
            @change="tabChange">
      <a-tab-pane key="personal">
        <span slot="tab">
          <a-icon type="bell" />
          投诉
        </span>
        <a-spin :spinning="loading"
                tip="加载中...">
          <message-list :messageList="complaintList"
                        :pageSize="pageSize"
                        :total="total"
                        @pageChange="pageChange"
                        @showDetail="showDetail"></message-list>
        </a-spin>
      </a-tab-pane>
      <a-tab-pane key="notice">
        <span slot="tab">
          <a-icon type="notification" />
          建议
        </span>
        <a-spin :spinning="loading"
                tip="加载中...">
          <message-list :messageList="suggestList"
                        :pageSize="pageSize"
                        :revokeShow="revokeShow"
                        :total="total"
                        @pageChange="pageChange"
                        @showDetail="showDetail"></message-list>
        </a-spin>
      </a-tab-pane>
    </a-tabs>
    <a-modal v-model="detailVisible"
             :footer="null">
      <div slot="title">{{ currentItem.user_name }}</div>
      <div class="detail-contet">{{ currentItem.content }}</div>
    </a-modal>
  </div>
</template>

<script>
import messageList from './messageList.vue'
export default {
  data () {
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
      complaintList: [],
      suggestList: [],
      pageSize: 15,
      currentPage: 1,
      total: 1,
      detailVisible: false,
      loading: false,
      revokeShow: false,
      current: 'personal'
    }
  },
  components: {
    messageList,
  },
  mounted () {
    this.showNotice(3)
    console.log('[ this.$moment() ] >', this.$moment())
  },
  methods: {
    tabChange (val) {
      this.current = val
      console.log('[ val ] >', val)
      if (val === 'personal') {
        this.showNotice(3)
      } else if (val === 'notice') {
        this.showNotice(4)
      }
    },
    async showNotice (type) {
      const params = {
        type,
      }
      const { data } = await this.axios.post('/api/Air/showNotice', params)
      if (data.msg === '请求成功') {
        console.log('[ data.data ] >', data.data)
        let messageList = data.data.map((it, index) => {
          return {
            title: it.title,
            sendTime: this.$moment(it.created_time).format("YYYY-MM-DD HH:mm:ss"),
            content: it.description,
            user_name: it.user_name
          }
        })
        if (this.current === 'personal') {
          this.complaintList = messageList;
        } else if (this.current === 'notice') {
          this.suggestList = messageList;
        }
      } else {
        this.$message.error(data.msg)
        return
      }
    },
    pageChange (page) {
      this.currentPage = page
      this.getData()
    },
    showDetail (item) {
      this.detailVisible = true
      this.currentPage = 1
      this.currentItem = item
    },
    getData () {
      console.log('[ 发起一个网络请求 ] >', '请求公告信息')
    },
  },
}
</script>

<style lang="less" scoped>
@import url("../../current.less");
</style>
