<template>
  <div class="myInfo">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed"
                      :trigger="null"
                      collapsible>
        <div class="logo"
             v-if="!collapsed">平台后台管理</div>
        <div v-else
             style="text-align: center; margin-top: 30px">
          <a-icon type="crown"
                  theme="filled"
                  style="color: #ffffff; font-size: 20px" />
        </div>
        <a-menu theme="dark"
                mode="inline"
                :default-selected-keys="defaultIndex"
                @click="typeClick">
          <a-menu-item key="1">
            <a-icon type="home" />
            <span>权限管理</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="unordered-list" /><span>航班管理</span>
            </span>
            <a-menu-item key="2">查看航班</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="wallet" /><span>资金管理</span>
            </span>
            <a-menu-item key="3">查看资金</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="menu" /><span>订单管理</span>
            </span>
            <a-menu-item key="4">查看订单</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <span slot="title">
              <a-icon type="home" />
              <span>公告管理</span>
            </span>
            <a-menu-item key="5">发布公告</a-menu-item>
            <a-menu-item key="6">查看公告</a-menu-item>
          </a-sub-menu>
          <a-menu-item key="7">
            <a-icon type="home" />
            <span>投诉与建议</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon class="trigger"
                  :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                  @click="() => (collapsed = !collapsed)" />
          <span>管理员</span>
          <div style="float: right; margin-right: 20px; cursor: pointer">
            <a-dropdown :trigger="['click']">
              <a-avatar size="large"
                        icon="user"
                        @click="(e) => e.preventDefault()" />
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <div style="width: 170px; font-size: 14px"
                       @click="logout">
                    <a-icon type="logout" /> 退出登录
                  </div>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </a-layout-header>
        <a-layout-content :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }">
          <div class="myCompanyInfo"
               v-if="currentIndex === 1">

          </div>
          <div class="myTripInfo"
               v-else-if="currentIndex === 2">
          </div>
          <div class="myBalance"
               v-else-if="currentIndex === 3">
            <div class="my-balance-bottom">
              <a-table :columns="balanceColumns"
                       :data-source="balanceData">
                <span slot="date"
                      slot-scope="text">
                  <a-icon type="clock-circle"
                          style="margin-right: 10px" />{{text}}
                </span>
                <span slot="name"
                      slot-scope="text">
                  <a-icon type="user"
                          style="margin-right: 10px" />{{text}}
                </span>
                <span slot="idCard"
                      slot-scope="text">
                  <a-icon type="key"
                          style="margin-right: 10px" />{{text}}
                </span>
                <span slot="mobile"
                      slot-scope="text">
                  <a-icon type="phone"
                          style="margin-right: 10px" />{{text}}
                </span>
                <span slot="money"
                      slot-scope="text">
                  <a-icon type="money-collect"
                          style="margin-right: 10px" />{{text}}
                </span>
                <span slot="operation"
                      slot-scope="text">
                  <a-icon type="laptop"
                          style="margin-right: 10px" />{{text}}
                </span>
              </a-table>
            </div>
          </div>
          <div class="myOrder"
               v-else-if="currentIndex === 4">
          </div>
          <div class="addNotice"
               v-else-if="currentIndex === 5">
            <span style="font-size: 24px">发布公告</span>
            <a-row :gutter="[16, 24]">
              <a-col>公告标题：</a-col>
              </a-col>
            </a-row>
            <a-row :gutter="[16, 8]">
              <a-col>
                <a-input v-model="notice.title"
                         allowClear
                         placeholder="请输入公告标题"
                         style="width: 50%" />
              </a-col>
            </a-row>
            <a-row :gutter="[16, 24]">
              <a-col>公告内容：</a-col>
              </a-col>
            </a-row>
            <a-row :gutter="[16, 8]">
              <a-col>
                <a-input v-model="notice.description"
                         :auto-size="{ minRows: 5}"
                         type="textarea"
                         placeholder="请输入公告内容"
                         style="width: 50%" />
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-button class="mart10"
                          type="primary"
                          @click="addNotice">发布</a-button>
              </a-col>
            </a-row>
          </div>
          <div class="showNotice"
               v-else-if="currentIndex === 6">
            <message :messageList="messageList" />
          </div>
          <div class="showSuggestion"
               v-else-if="currentIndex === 7">
            <suggestList />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import suggestList from './components/suggestList.vue'
import message from '../message/index.vue'
export default {
  name: 'admin',
  props: {
    currentClick: {
      type: Number,
      default: 1,
    },
  },
  components: {
    message,
    suggestList,
  },
  data () {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      collapsed: false,
      currentIndex: this.currentClick,
      defaultIndex: [],
      disabled: true,
      rules: {

      },
      old_password: '', //原密码
      new_password: '', //新密码
      confirm_password: '', //确认密码
      infoForm: {},
      wallet: 0, //钱包金额
      payAmount: 1000, //充值金额
      mark: this.$route.query.mark || '',
      // avatar: '',
      loading: false,
      imageUrl: '',
      payVisible: false,
      messageList: [],
      notice: {
        title: '',
        description: '',
      },
      balanceData: [
        {
          key: '1',
          no: String(Math.round(Math.random())),
          date: '2022-02-08 09:51:55',
          name: '航空公司',
          money: '-1000',
          operation: '提现',
        },
        {
          key: '2',
          no: String(Math.round(Math.random())),
          date: '2022-02-07 10:51:55',
          name: '管理员',
          money: '+1000',
          operation: '售卖机票',
        },
        {
          key: '3',
          no: String(Math.round(Math.random())),
          date: '2022-02-06 11:51:55',
          name: '管理员',
          money: '+1000',
          operation: '售卖机票',
        },
      ],
      balanceColumns: [
        {
          title: '操作人',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          scopedSlots: { customRender: 'name' },
          width: '10%',
        },
        {
          title: '款项日期',
          dataIndex: 'date',
          key: 'date',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'date' },
          width: '17%',
        },
        {
          title: '资金明细',
          dataIndex: 'money',
          key: 'money',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'money' },
          width: '10%',
        },
        {
          title: '操作类型',
          dataIndex: 'operation',
          key: 'operation',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'operation' },
          width: '10%',
        },
      ],
      user: JSON.parse(window.sessionStorage.getItem('user')),
    }
  },

  created () {
  },
  watch: {
    currentClick: {
      immediate: true,
      handler (val) {
        this.currentIndex = val
        this.defaultIndex = [`${val}`]
      },
    },
    defaultIndex: {
      immediate: true,
      handler (val) {
        this.defaultIndex = val
      },
    },
    // form: {
    //   deep: true,
    //   handler(newVal, oldVal) {
    //     if (newVal.ticket_count !== oldVal.ticket_count) {
    //       console.log('[ 111 ] >', 111)
    //       newVal.business_cabin_count = newVal.ticket_count / 10
    //       newVal.economy_cabin_count =
    //         newVal.ticket_count - newVal.business_cabin_count
    //     }
    //   },
    // },
  },
  computed: {
    business_cabin_count () {
      return this.form.ticket_count / 10
    },
    economy_cabin_count () {
      return this.form.ticket_count - this.form.business_cabin_count
    },
  },
  mounted () {
  },
  methods: {
    logout () {
      this.$message.error('退出登录')
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    async addNotice () {
      if (!this.notice.title) {
        this.$message.error('请填写公告标题')
        return
      }
      if (!this.notice.description) {
        this.$message.error('请填写公告内容')
        return
      }
      const params = {
        // notice_id, user_id, user_name, title, description, created_time, type
        notice_id: 'NO' + new Date().getTime() + String(Math.round(Math.random() * 10000)),
        user_id: this.user.id,
        user_name: this.user.name,
        title: this.notice.title,
        description: this.notice.description,
        created_time: this.$moment().format("YYYY-MM-DD HH:mm:ss"),
        type: 1,
        state: '',
      }
      const { data } = await this.axios.post('/api/Air/addNotice', params)
      if (data.msg === '请求成功') {
        this.$message.success('发布成功')
        setTimeout(() => {
          this.currentIndex = 6
          this.showNotice(1)
        }, 1000)
      } else {
        this.$message.error(data.msg)
        return
      }
    },
    async showNotice (type) {
      const params = {
        type,
      }
      const { data } = await this.axios.post('/api/Air/showNotice', params)
      if (data.msg === '请求成功') {
        console.log('[ data.data ] >', data.data)
        this.messageList = data.data.map((it, index) => {
          return {
            title: it.title,
            sendTime: this.$moment(it.created_time).format("YYYY-MM-DD HH:mm:ss"),
            content: it.description,
            user_name: it.user_name
          }
        })
      } else {
        this.$message.error(data.msg)
        return
      }
    },
    recharge () {
      this.wallet += parseInt(this.payAmount)
      this.payVisible = false
      this.$message.success('充值成功')
    },
    test (e) {
      console.log('[ e ] >', e)
    },
    typeClick (event) {
      this.currentIndex = parseInt(event.key)
      console.log(
        '%c [ this.currentIndex ]-131',
        'font-size:13px; background:pink; color:#bf2c9f;',
        this.currentIndex
      )
      if (this.currentIndex === 6) {
        this.showNotice(1)
      }
      if (this.currentIndex === 7) {
        this.showNotice(3)
      }
    },
    disabledDate (time) {
      return time < this.$moment().subtract(1, 'days')
    },
  },
}
</script>

<style lang="less" scoped>
@import url("../current.less");
#components-layout-demo-custom-trigger {
  min-height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  color: #ffffff;
  font-weight: bold;
  font-size: 24px;
  /* background: rgba(255, 255, 255, 0.2); */
  margin: 16px;
}
.addNotice {
  margin-left: 25%;
}
</style>
