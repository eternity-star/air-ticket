<template>
  <div class="myInfo">
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider v-model="collapsed"
                      :trigger="null"
                      collapsible>
        <div class="logo" />
        <a-menu theme="dark"
                mode="inline"
                :default-selected-keys="defaultIndex"
                @click="typeClick">
          <a-menu-item key="1">
            <a-icon type="user" />
            <span>个人中心</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="pay-circle" />
            <span>我的余额</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="appstore" />
            <span>我的订单</span>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="message" />
            <span>通知消息</span>
          </a-menu-item>
          <a-menu-item key="5">
            <a-icon type="form" />
            <span>投诉与建议</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon class="trigger"
                  :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                  @click="() => (collapsed = !collapsed)" />
        </a-layout-header>
        <a-layout-content :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }">
          <div class="myPersonInfo"
               v-if="currentIndex === 1">
            <a-form-model :model="form"
                          :rules="rules"
                          :label-col="labelCol"
                          :wrapper-col="wrapperCol">
              <a-spin :spinning="loading"
                      tip="加载中...">
                <a-form-model-item>
                  <div :class="{ imgDiv: true }"
                       @mouseover="overVisible"
                       @mouseout="outVisible">
                    <img v-if="avatar"
                         :src="avatar"
                         alt="avatar" />
                    <a-icon v-else
                            type="user"
                            class="iconClass" />
                    <div :class="{
                        edit: true,
                        visible: !isVisible,
                        grey: isVisible,
                      }">
                      <a-icon type="eye"
                              :class="{
                          icon: uploadVisible,
                          iconLeft: !uploadVisible,
                        }"
                              @click="preview" />
                      <div class="uploadDiv"
                           v-if="uploadVisible">
                        <!-- :action="`${$globalPath}/hospitalUpload/file`" -->
                        <a-upload name="avatar"
                                  class="avatar-uploader"
                                  :show-upload-list="false"
                                  :before-upload="beforeUpload"
                                  @change="handleChange">
                          <a-icon type="edit"
                                  style="margin-left: 25px"
                                  class="icon" />
                        </a-upload>
                      </div>
                    </div>
                  </div>
                  <a-modal :visible="previewVisible"
                           :footer="null"
                           @cancel="handleCancel">
                    <img v-if="avatar"
                         alt="example"
                         style="width: 100%"
                         :src="avatar" />
                  </a-modal>
                </a-form-model-item>
              </a-spin>
              <a-form-model-item prop="name"
                                 label="姓名">
                <a-input v-model="form.name"
                         placeholder="请输入"
                         style="width: 75%" />
              </a-form-model-item>
              <a-form-model-item label="性别">
                <a-radio-group v-model="form.sex">
                  <a-radio :value="1">男</a-radio>
                  <a-radio :value="2">女</a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item prop="idCard"
                                 label="身份证号">
                <a-input v-model="form.idCard"
                         placeholder="请输入"
                         style="width: 75%" />
              </a-form-model-item>
              <a-form-model-item prop="mobile"
                                 label="手机号">
                <a-input v-model="form.mobile"
                         placeholder="请输入"
                         type="number"
                         @change="test"
                         style="width: 75%" />
              </a-form-model-item>
            </a-form-model>
            <a-button type="primary"
                      shape="round"
                      style="margin-left: 43%"
                      @click="updateInfo">更新信息</a-button>
          </div>
          <div class="myBalance"
               v-else-if="currentIndex === 2">
            <wallet />
          </div>
          <div class="myOrder"
               v-else-if="currentIndex === 3">
            <a-table :columns="orderColumns"
                     :data-source="orderData"
                     :pagination="pagination">
              <span slot="date"
                    slot-scope="text">
                <a-icon type="clock-circle"
                        style="margin-right: 10px" />{{
                  text
                }}
              </span>
              <span slot="name"
                    slot-scope="text">
                <a-icon type="user"
                        style="margin-right: 10px" />{{
                  text
                }}
              </span>
              <span slot="idCard"
                    slot-scope="text">
                <a-icon type="key"
                        style="margin-right: 10px" />{{
                  text
                }}
              </span>
              <span slot="mobile"
                    slot-scope="text">
                <a-icon type="phone"
                        style="margin-right: 10px" />{{
                  text
                }}
              </span>
              <span slot="money"
                    slot-scope="text">
                <a-icon type="money-collect"
                        style="margin-right: 10px" />{{
                  text
                }}
              </span>
              <span slot="state"
                    slot-scope="text">
                <a-icon type="laptop"
                        style="margin-right: 10px" />{{
                  text
                }}
              </span>
              <template slot="operation"
                        slot-scope="text, record">
                <div>
                  <a-popconfirm title="确定退票吗？"
                                ok-text="确定"
                                cancel-text="取消"
                                @confirm="returnTicket">
                    <a-button type="primary"
                              style="margin-right: 5px">退票</a-button>
                  </a-popconfirm>
                  <a-button type="danger"
                            style="margin-left: 5px"
                            @click="returnVisible = true">改签</a-button>
                </div>
              </template>
            </a-table>
            <a-modal title="机票信息"
                     :visible="returnVisible"
                     @ok="returnVisible = false"
                     @cancel="returnVisible = false">
            </a-modal>
          </div>
          <div class="myMessage"
               v-else-if="currentIndex === 4">
            <span>通知消息</span>
            <message />
          </div>
          <div class="mySuggestion"
               v-else-if="currentIndex === 5">
            <span>投诉与建议</span>
            <suggestion @suggestEvent="suggestEvent" />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import suggestion from '../../suggestion/index.vue'
import message from '../../message/index.vue'
import wallet from '../../wallet/index.vue'
import { getUser } from '@/common/api/index'
export default {
  name: 'myInfo',
  props: {
    currentClick: {
      type: Number,
      default: 1,
    },
  },
  data () {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      collapsed: false,
      currentIndex: this.currentClick,
      defaultIndex: [],
      rules: {
        name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        idCard: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        mobile: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
      },
      form: {
        name: '', //姓名
        sex: '', //性别
        idCard: '', //身份证
        mobile: '', //手机号
      },
      mark: this.$route.query.mark || '',
      avatar: '',
      isVisible: false,
      uploadVisible: false,
      loading: false,
      previewVisible: false,
      returnVisible: false,
      pagination: {
        pageSize: 2,
        hideOnSinglePage: true,
      },
      orderData: [
        {
          key: '1',
          date: '2022-02-08 09:51:55',
          unitPrice: '600',
          num: '1',
          departure: '北京',
          destination: '深圳',
          money: '600',
          state: '支付成功',
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
        {
          title: '机票价格',
          dataIndex: 'unitPrice',
          key: 'unitPrice',
          align: 'center',
          scopedSlots: { customRender: 'unitPrice' },
          width: '10%',
        },
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
        {
          title: '订单状态',
          dataIndex: 'state',
          key: 'state',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'state' },
          width: '10%',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'operation' },
          width: '15%',
        },
      ],
    }
  },
  components: {
    suggestion,
    message,
    wallet,
  },
  created () {
    if (this.mark === 'owner') {
      this.uploadVisible = true
    }
    this.init()
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
  },
  mounted () { },
  methods: {
    // 初始化个人信息
    async init () {
      let infoData = JSON.parse(window.sessionStorage.getItem('user'))
      this.form = {
        name: infoData.name, //姓名
        sex: infoData?.sex, //性别
        idCard: infoData.idCard, //身份证
        mobile: infoData.mobile, //手机号
      }
    },
    // 提交投诉与建议
    suggestEvent (params) {
      console.log('[ params ] >', params)
      /**
       * 监听到子组件传来的事件后，加一个state来判断是用户发出的还是航空公司发出的，state 1用户 2航空公司
       */
      this.$message.success('提交成功')
    },
    // 更新信息
    updateInfo () {
      console.log(
        '[ JSON.parse(window.sessionStorage.getItem("user")).id ] >',
        JSON.parse(window.sessionStorage.getItem('user')).id
      )
      let id = JSON.parse(window.sessionStorage.getItem('user')).id
      const params = {
        name: this.form.name, //姓名
        sex: this.form?.sex, //性别
        idCard: this.form.idCard, //身份证
        mobile: this.form.mobile, //手机号
        id,
      }
      this.axios.post('/api/Air/updateUser', params).then(({ data }) => {
        console.log('[ data ] >', data)
        if (data.msg === '请求成功') {
          console.log('[ getUser() ] >', getUser())
          this.axios.post('/api/Air/getUser', { id }).then(({ data }) => {
            console.log(
              '%c [ data.data[0] ]-10',
              'font-size:13px; background:pink; color:#bf2c9f;',
              data.data[0]
            )
            if (data.msg === '请求成功') {
              window.sessionStorage.setItem(
                'user',
                JSON.stringify(data.data[0])
              )
            } else {
              this.$message.error('已被使用，请重新填写')
            }
          })
          this.$message.success('更新成功')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    test (e) {
      console.log('[ e ] >', e)
    },
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    typeClick (event) {
      this.currentIndex = parseInt(event.key)
      if (this.currentIndex === 1) {
        this.init()
      }
      console.log(
        '%c [ this.currentIndex ]-131',
        'font-size:13px; background:pink; color:#bf2c9f;',
        this.currentIndex
      )
    },
    /**
     * 个人中心相关函数
     */
    overVisible () {
      this.isVisible = true
    },
    outVisible () {
      this.isVisible = false
    },
    preview () {
      this.previewVisible = true
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('只能上传图片!')
      }
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      //   this.$message.error("Image must smaller than 2MB!");
      // }
      // return isJpgOrPng && isLt2M;
      return isJpgOrPng
    },
    handleCancel () {
      this.previewVisible = false
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        if (info.file?.response?.result === 'SUCCESS') {
          this.avatar = info.file?.response?.map?.url || ''
          let name = info.file.name
          console.log('[ this.avatar ] >', this.avatar)
          let params = {
            url: this.avatar,
          }
          // /api/ajax/manage/updateUserInfo
          new Promise((resolve, reject) => {
            const { data } = this.axios.post(
              'api/ajax/manage/updateUserInfo',
              params,
              {
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                },
              }
            )
            // const { result, map = {}, resultMsg } = data;
            // if (result === "SUCCESS") {
            //   // this.$message.success(result);
            // } else {
            //   // this.$message.error(resultMsg);
            // }
            // resolve();
          })
          this.loading = false
        }
      }
    },
    /**
     * 我的订单相关函数
     */
    returnTicket () {
      this.$message.success('退票成功')
    },
  },
}
</script>

<style lang="less" scoped>
@import url("../../current.less");
#components-layout-demo-custom-trigger {
  height: calc(100vh - 50px);
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
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
/**
  头像相关css
*/
.imgDiv {
  position: relative;
  margin-left: 70%;
  width: 200px;
  height: 200px;
}
.uploadDiv {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
.avatar-uploader > .ant-upload {
  width: 50px;
  height: 50px;
  margin-left: 100px;
  /* position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 100px; */
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
img {
  width: 200px;
  height: 200px;
  z-index: 0;
  border-radius: 100px;
}
.iconClass {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 100px;
}
.edit {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100px;
}

.icon {
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  color: #000;
}
.iconLeft {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
}
.visible {
  display: none;
}
</style>
