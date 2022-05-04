<template>
  <div class="myInfo">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed"
                      :trigger="null"
                      collapsible>
        <div class="logo"
             v-if="!collapsed">公司后台管理</div>
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
            <span>系统首页</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="unordered-list" /><span>航班管理</span>
            </span>
            <a-menu-item key="2"> 发布航班 </a-menu-item>
            <a-menu-item key="3"> 航班管理 </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="4">
            <a-icon type="wallet" />
            <span>资金管理</span>
          </a-menu-item>
          <a-menu-item key="5">
            <a-icon type="wallet" />
            <span>订单管理</span>
          </a-menu-item>
          <!-- <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="menu" /><span>订单管理</span>
            </span>
            <a-menu-item key="5"> 发布航班 </a-menu-item>
            <a-menu-item key="6"> 航班管理 </a-menu-item>
          </a-sub-menu> -->
          <a-menu-item key="7">
            <a-icon type="message" />
            <span>通知消息</span>
          </a-menu-item>
          <a-menu-item key="8">
            <a-icon type="form" />
            <span>投诉与建议</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0;">
          <a-icon class="trigger"
                  :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                  @click="() => (collapsed = !collapsed)" />
          <span>航空公司</span>
          <div style="float: right; margin-right: 20px; cursor: pointer">
            <a-dropdown :trigger="['click']">
              <a-avatar size="large"
                        icon="user"
                        @click="(e) => e.preventDefault()" />
              <a-menu slot="overlay">
                <a-menu-item key="0">
                  <div style="width: 170px; font-size: 14px"
                       @click="changePassword">
                    <a-icon type="lock"
                            theme="filled" /> 修改密码
                  </div>
                </a-menu-item>
                <a-menu-item key="1">
                  <div style="width: 170px; font-size: 14px"
                       @click="logout">
                    <a-icon type="logout" /> 退出登录
                  </div>
                </a-menu-item>
                <!-- <a-menu-divider /> -->
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
            <a-form-model :model="infoForm"
                          :rules="rules"
                          :label-col="labelCol"
                          :wrapper-col="wrapperCol">
              <a-form-model-item prop="name"
                                 label="公司名称">
                <a-input v-model="infoForm.name"
                         :disabled="disabled"
                         placeholder="请输入"
                         style="width: 75%" />
              </a-form-model-item>
              <a-form-model-item prop="idCard"
                                 label="公司编号">
                <a-input v-model="infoForm.id"
                         :disabled="true"
                         style="width: 75%" />
              </a-form-model-item>
              <a-form-model-item prop="idCard"
                                 label="公司地址">
                <a-input v-model="infoForm.address"
                         :disabled="disabled"
                         placeholder="请输入"
                         style="width: 75%" />
              </a-form-model-item>
              <a-form-model-item prop="mobile"
                                 label="法定责任人">
                <a-input v-model="infoForm.mobile"
                         :disabled="disabled"
                         placeholder="请输入"
                         @change="test"
                         style="width: 75%" />
              </a-form-model-item>
              <a-form-model-item prop="mobile"
                                 label="法定责任人身份证号">
                <a-input v-model="infoForm.idCard"
                         :disabled="disabled"
                         placeholder="请输入"
                         @change="test"
                         style="width: 75%" />
              </a-form-model-item>
              <a-form-model-item prop="mobile"
                                 label="法定责任人手机号">
                <a-input v-model="infoForm.mobile"
                         :disabled="disabled"
                         placeholder="请输入"
                         @change="test"
                         style="width: 75%" />
              </a-form-model-item>
              <a-form-model-item prop="description"
                                 label="描述">
                <a-input v-model="infoForm.description"
                         :disabled="disabled"
                         placeholder="请输入"
                         type="textarea"
                         :auto-size="{ minRows: 5}"
                         @change="test"
                         style="width: 75%" />
              </a-form-model-item>
            </a-form-model>
            <a-button v-if="disabled"
                      type="primary"
                      shape="round"
                      style="margin-left: 43%"
                      @click="disabled = false">修改信息</a-button>
            <div v-else>
              <a-button type="primary"
                        shape="round"
                        style="margin-left: 36%"
                        @click="
                  disabled = true
                  $message.success('修改成功')
                ">保存</a-button>
              <a-button type="primary"
                        shape="round"
                        style="margin-left: 5%"
                        @click="disabled = true">取消</a-button>
            </div>
          </div>
          <div class="myTripInfo"
               v-else-if="currentIndex === 2">
            <airLineCreate v-if="currentIndex === 2"
                           @changeCurrentIndex="changeCurrentIndex" />
          </div>
          <div class="myOrder"
               v-else-if="currentIndex === 3">
            <airLineManage v-if="currentIndex === 3" />
          </div>
          <div class="myBalance"
               v-else-if="currentIndex === 4">
            <companyWallet />
          </div>
          <div class="myOrder"
               v-else-if="currentIndex === 5">
            <a-table :columns="orderColumns"
                     :data-source="orderData"
                     :pagination="pagination">
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
              <!-- <span slot="state"
                    slot-scope="text">
                <a-icon type="laptop"
                        style="margin-right: 10px" />{{text}}
              </span> -->
              <!-- <template slot="operation"
                        slot-scope="text, record">
                <div>
                  <a-button type="danger"
                            style="margin-left: 5px"
                            @click="returnVisible = true">详情</a-button>
                </div>
              </template> -->
            </a-table>
            <a-modal title="机票信息"
                     :visible="returnVisible"
                     @ok="returnVisible = false"
                     @cancel="returnVisible = false">
            </a-modal>
          </div>
          <div class="myMessage"
               v-else-if="currentIndex === 7">
            <message :messageList="messageList" />
          </div>
          <div class="mySuggestion"
               v-else-if="currentIndex === 8">
            <suggestion @suggestEvent="suggestEvent" />
          </div>
          <a-modal v-model="passwordVisible"
                   title="修改密码"
                   okText="保存"
                   @ok="changePassOk"
                   @cancel="changePassCancel">
            <a-form-model :label-col="{ span: 6 }"
                          :wrapper-col="{ span: 24 }"
                          :rules="rules">
              <a-form-model-item>
                <a-row :gutter="16">
                  <a-col :span="24">
                    <span class="text-red">*</span> 原密码：
                    <a-input-password v-model="old_password"
                                      style="width: 60%"
                                      @blur="passwordBlur"
                                      @change="passwordChange"
                                      placeholder="请输入原密码" />
                  </a-col>
                </a-row>
              </a-form-model-item>
              <a-form-model-item>
                <a-row :gutter="16">
                  <a-col :span="24">
                    <span class="text-red">*</span> 新密码：
                    <a-input-password v-model="new_password"
                                      style="width: 60%"
                                      @change="passwordChange"
                                      placeholder="请输入新密码" />
                  </a-col>
                </a-row>
              </a-form-model-item>
              <a-form-model-item>
                <a-row :gutter="16">
                  <a-col :span="24">
                    <span class="text-red">*</span> 确认密码：
                    <a-input-password v-model="confirm_password"
                                      style="width: 60%"
                                      @blur="passwordBlur"
                                      @change="passwordChange"
                                      placeholder="请确认密码" />
                    <p v-if="new_password !== confirm_password"
                       class="text-red">
                      密码不一致，请重新输入
                    </p>
                  </a-col>
                </a-row>
              </a-form-model-item>
            </a-form-model>
          </a-modal>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { randomWord } from '@/common/utils'
import suggestion from '../suggestion/index.vue'
import message from '../message/index.vue'
import airLineCreate from './components/airLine/airLineCreate.vue'
import airLineManage from './components/airLine/airLineManage.vue'
import CompanyWallet from './components/wallet/companyWallet.vue'
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'company',
  props: {
    currentClick: {
      type: Number,
      default: 1,
    },
  },
  components: {
    airLineCreate,
    airLineManage,
    message,
    suggestion,
    CompanyWallet,
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
      pagination: {
        pageSize: 5,
        hideOnSinglePage: true,
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
      passwordVisible: false,
      messageList: [],
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
        // {
        //   title: '操作类型',
        //   dataIndex: 'operation',
        //   key: 'operation',
        //   ellipsis: true,
        //   align: 'center',
        //   scopedSlots: { customRender: 'operation' },
        //   width: '10%',
        // },
      ],
      orderData: [
        {
          key: '1',
          date: '2022-02-08 09:51:55',
          unitPrice: '600',
          num: '1',
          departure: '北京',
          destination: '深圳',
          money: '600',
        },
        {
          key: '2',
          date: '2022-02-08 09:51:55',
          unitPrice: '600',
          num: '1',
          departure: '广州',
          destination: '深圳',
          money: '600',
          state: '支付成功',
        },
        {
          key: '3',
          date: '2022-02-08 09:51:55',
          unitPrice: '600',
          num: '1',
          departure: '东莞',
          destination: '深圳',
          money: '600',
          state: '支付成功',
        },
      ],
      // date unitPrice num departure destination money state operation
      orderColumns: [
        {
          title: '购买日期',
          dataIndex: 'date',
          key: 'date',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'date' },
          width: '15%',
        },
        // {
        //   title: '机票价格',
        //   dataIndex: 'unitPrice',
        //   key: 'unitPrice',
        //   align: 'center',
        //   scopedSlots: { customRender: 'unitPrice' },
        //   width: '10%',
        // },
        {
          title: '购买数量',
          dataIndex: 'num',
          key: 'num',
          align: 'center',
          scopedSlots: { customRender: 'num' },
          width: '10%',
        },
        {
          title: '出发地',
          dataIndex: 'departure',
          key: 'departure',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'departure' },
          width: '10%',
        },
        {
          title: '目的地',
          dataIndex: 'destination',
          key: 'destination',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'destination' },
          width: '10%',
        },
        {
          title: '总金额',
          dataIndex: 'money',
          key: 'money',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'money' },
          width: '10%',
        },
        // {
        //   title: '订单状态',
        //   dataIndex: 'state',
        //   key: 'state',
        //   ellipsis: true,
        //   align: 'center',
        //   scopedSlots: { customRender: 'state' },
        //   width: '10%',
        // },
        // {
        //   title: '操作',
        //   dataIndex: 'operation',
        //   key: 'operation',
        //   ellipsis: true,
        //   align: 'center',
        //   scopedSlots: { customRender: 'operation' },
        //   width: '15%',
        // },
      ],
      user: JSON.parse(window.sessionStorage.getItem('user')),
    }
  },
  created () {
    this.infoForm = {
      name: this.user.name,
      id: this.user.company_id,
      address: this.user.address,
      mobile: this.user.mobile,
      idCard: this.user.idCard,
      description: this.user.description,
    }
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
        console.log('%c [ this.defaultIndex ]-436', 'font-size:13px; background:pink; color:#bf2c9f;', this.defaultIndex)
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
    console.log('[ randomWord ] >', randomWord(true, 8, 8))
    console.log(
      '[ new Date().getTime() + String(Math.round(Math.random() * 10000)) ] >',
      new Date().getTime() + String(Math.round(Math.random() * 10000))
    )
  },
  methods: {
    async changePassOk () {
      /**
        先判断原密码对不对
        在判断新密码和确认密码正不正确
       */
      let type = await this.judgeComPassword(this.old_password)
      if (!type) {
        return
      }
      if (this.new_password === this.old_password) {
        this.$message.error('与旧密码一致，请重新输入')
        return
      }
      if (this.new_password !== this.confirm_password) {
        this.$message.error('密码不一致，请重新输入')
        return
      }
      const params = {
        password: this.new_password,
        company_id: this.user.company_id
      }
      const { data } = await this.axios.post('/api/Air/updatePassword', params);
      console.log('%c [ data ]-508', 'font-size:13px; background:pink; color:#bf2c9f;', data)
      if (data.msg === '请求成功') {
        this.$message.success("修改成功")
        setTimeout(() => {
          this.passwordVisible = false
          this.old_password = '' //原密码
          this.new_password = '' //新密码
          this.confirm_password = '' //确认密码
        }, 1000)
      } else {
        this.$message.error(data.msg)
      }
    },
    async judgeComPassword (password) {
      const params = {
        password
      }
      const { data } = await this.axios.post('/api/Air/judgeComPassword', params)
      if (data.msg === '请求成功') {
        if (data.data.length) {
          let type = false
          data.data.forEach(it => {
            if (it.company_id === this.user.company_id) {
              console.log('[ 222 ] >', 222)
              type = true
            }
          })
          console.log('[ type ] >', type)
          if (!type) {
            this.$message.error('密码错误，请重新输入')
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      } else {
        this.$message.error(data.msg)
        return false
      }
    },
    changePassCancel () {
      this.passwordVisible = false
      this.old_password = '' //原密码
      this.new_password = '' //新密码
      this.confirm_password = '' //确认密码
    },
    passwordChange (val) {
      console.log('[ val ] >', val)
      this.old_password = this.old_password.trim() //原密码
      this.new_password = this.new_password.trim() //新密码
      this.confirm_password = this.confirm_password.trim() //确认密码
    },
    changeCurrentIndex (val) {
      this.currentIndex = val
      this.defaultIndex = [`${val}`]
    },
    passwordBlur (val) {
      console.log('[ val ] >', val)
    },
    updateInfo () {
      console.log('[ this.infoForm ] >', this.infoForm)
    },
    tripChange (val) {
      console.log('[ val ] >', val)
    },
    searchTrip () {
      console.log('[ 11 ] >', 11)
    },
    changePassword () {
      this.passwordVisible = true
    },
    logout () {
      this.$message.error('退出登录')
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    test (e) {
      console.log('[ e ] >', e)
    },
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    typeClick (event) {
      this.currentIndex = parseInt(event.key)
      console.log(
        '%c [ this.currentIndex ]-131',
        'font-size:13px; background:pink; color:#bf2c9f;',
        this.currentIndex
      )
      if (this.currentIndex === 7) {
        this.showNotice()
      }
    },
    disabledDate (time) {
      return time < this.$moment().subtract(1, 'days')
    },
    /**
     * 公告
     */
    // 提交投诉与建议
    async suggestEvent (form) {
      console.log('%c [ form ]-425', 'font-size:13px; background:pink; color:#bf2c9f;', form)
      /**
       * 监听到子组件传来的事件后，加一个state来判断是用户发出的还是航空公司发出的，state 1用户 2航空公司
       */
      const params = {
        // notice_id, user_id, user_name, title, description, created_time, type, state
        notice_id: 'NO' + new Date().getTime() + String(Math.round(Math.random() * 10000)),
        user_id: this.user.company_id,
        user_name: this.user.name,
        title: '',
        created_time: this.$moment().format("YYYY-MM-DD HH:mm:ss"),
        state: 2,
      }
      if (form.type === 1) {
        params.type = 4
        params.description = form.suggest
      } else if (form.type === 2) {
        params.type = 3
        params.description = form.complaint
      }
      const { data } = await this.axios.post('/api/Air/addNotice', params)
      if (data.msg === '请求成功') {
        this.$message.success('提交成功')
      } else {
        this.$message.error(data.msg)
        return
      }
    },
    async showNotice () {
      const params = {
        type: 1,
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
    /**
     * 图片相关函数
     */
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
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
/**
  头像相关css
*/
.avatar-uploader {
  margin-left: 70%;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
