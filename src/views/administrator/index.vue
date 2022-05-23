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
            <a-radio-group v-model="quanxian"
                           @change="quanxianChange"
                           class="marb10">
              <a-radio :value="1">用户</a-radio>
              <a-radio :value="2">航空公司</a-radio>
            </a-radio-group>
            <a-table :columns="quanxianColumns"
                     :data-source="quanxianData"
                     :pagination="pagination">
              <span slot="name"
                    slot-scope="text">
                <a-icon type="user"
                        style="margin-right: 10px" />{{text}}
              </span>
              <span slot="state"
                    slot-scope="text">
                <a-icon type="laptop"
                        style="margin-right: 10px" />{{filterState(text)}}
              </span>
              <span slot="operation"
                    slot-scope="text, record">
                <a-popconfirm title="确定启用吗？"
                              ok-text="确定"
                              cancel-text="取消"
                              @confirm="qiyong(record)">
                  <a-button type="primary"
                            v-if="record.state === 0"
                            style="margin-right: 5px">启用</a-button>
                </a-popconfirm>
                <a-popconfirm title="确定禁用吗？"
                              ok-text="确定"
                              cancel-text="取消"
                              @confirm="jinyong(record)">
                  <a-button type="danger"
                            v-if="record.state === 1"
                            style="margin-right: 5px">禁用</a-button>
                </a-popconfirm>
              </span>
            </a-table>
          </div>
          <div class="myTripInfo"
               v-else-if="currentIndex === 2">
            <airLineList v-if="currentIndex === 2" />
          </div>
          <div class="myBalance"
               v-else-if="currentIndex === 3">
            <a-radio-group v-model="weizhi"
                           @change="weizhiChange"
                           class="marb10">
              <a-radio :value="1">用户</a-radio>
              <a-radio :value="2">航空公司</a-radio>
            </a-radio-group>
            <div class="my-balance-bottom">
              <a-table :columns="moneyColumns"
                       :data-source="moneyData"
                       :pagination="pagination">
                <span slot="name"
                      slot-scope="text">
                  <a-icon type="user"
                          style="margin-right: 10px" />{{text}}
                </span>
                <span slot="money"
                      slot-scope="text">
                  <a-icon type="money-collect"
                          style="margin-right: 10px" />{{text}}
                </span>
              </a-table>
            </div>
          </div>
          <div class="myOrder"
               v-else-if="currentIndex === 4">
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
              <span slot="state"
                    slot-scope="text">
                <a-icon type="laptop"
                        style="margin-right: 10px" />{{text}}
              </span>
              <template slot="operation"
                        slot-scope="text, record">
                <div>
                  <!-- <a-popconfirm title="确定退票吗？"
                                ok-text="确定"
                                cancel-text="取消"
                                @confirm="returnTicket">
                    <a-button type="primary"
                              v-if="record.departure_time > $moment().format('YYYY-MM-DD HH:mm:ss')"
                              style="margin-right: 5px">退票</a-button>
                  </a-popconfirm> -->
                  <a-button type="danger"
                            style="margin-left: 5px"
                            @click="returnVisible = true; currentRecord = record">详情</a-button>
                  <!-- <a-button type="danger"
                            style="margin-left: 5px"
                            @click="returnVisible = true">改签</a-button> -->
                </div>
              </template>
            </a-table>
            <a-modal title="机票信息"
                     :visible="returnVisible"
                     @ok="returnVisible = false"
                     width="80%"
                     destroyOnClose
                     @cancel="returnVisible = false">
              <a-form-model ref="ticketForm"
                            :label-col="labelCol"
                            :wrapper-col="wrapperCol">
                <a-row :gutter="10">
                  <a-col :span="12">
                    <a-form-model-item label="航班编号">
                      <span class="spanClass">{{currentRecord.line_id}}</span>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-model-item label="订票时间">
                      <span class="spanClass">{{currentRecord.date}}</span>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :span="12">
                    <a-form-model-item label="操作人">
                      <span class="spanClass">{{currentRecord.user_name}}</span>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :span="12">
                    <a-form-model-item label="舱位等级">
                      <span class="spanClass">{{currentRecord.cabin_type}}</span>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :span="12">
                    <a-form-model-item label="出发时间">
                      <span class="spanClass">{{currentRecord.departure_time}}</span>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-model-item label="到达时间">
                      <span class="spanClass">{{currentRecord.destination_time}}</span>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :span="12">
                    <a-form-model-item label="出发地">
                      <span class="spanClass">{{currentRecord.departure}}</span>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-model-item label="目的地">
                      <span class="spanClass">{{currentRecord.destination}}</span>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :span="12">
                    <a-form-model-item label="订票数">
                      <span class="spanClass">{{currentRecord.num}}</span>
                    </a-form-model-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-model-item label="总金额">
                      <span class="spanClass">{{currentRecord.money}}</span>
                    </a-form-model-item>
                  </a-col>
                </a-row>
                <a-row :gutter="10">
                  <a-col :span="24"
                         :push="1">
                    <p style="font-size: 16px">乘客信息:</p>
                    <a-row v-for="(item, index) in currentRecord.passenger_information"
                           :key="index">
                      <a-col :span="6">
                        <a-form-model-item label="姓名">
                          <span class="spanClass">{{item.name}}</span>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="6">
                        <a-form-model-item label="身份证">
                          <span class="spanClass">{{item.idCard}}</span>
                        </a-form-model-item>
                      </a-col>
                      <a-col :span="6">
                        <a-form-model-item label="手机号">
                          <span class="spanClass">{{item.mobile}}</span>
                        </a-form-model-item>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-form-model>
            </a-modal>
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
import airLineList from './components/airLineList.vue'
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
    airLineList,
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
      quanxian: 1,
      weizhi: 1,
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
      currentRecord: {},
      returnVisible: false,
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
      quanxianData: [],
      quanxianColumns: [
        {
          title: '用户名',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          scopedSlots: { customRender: 'name' },
          width: '10%',
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'state' },
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
      orderData: [],
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
        {
          title: '购买人',
          dataIndex: 'user_name',
          key: 'user_name',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'user_name' },
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
      pagination: {
        pageSize: 5,
        hideOnSinglePage: true,
      },
      user: JSON.parse(window.sessionStorage.getItem('user')),
      userMoney: [],
      companyMoney: [],
      moneyData: [],
      moneyColumns: [
        {
          title: '用户名',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          scopedSlots: { customRender: 'name' },
          width: '10%',
        },
        {
          title: '资金',
          dataIndex: 'money',
          key: 'money',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'money' },
          width: '10%',
        },
      ],
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
  async mounted () {
    await this.selectAllUser()
    // await this.selectAllCompany()
    await this.selectAllUser(2)
    console.log('%c [ this.moneyData ]-404', 'font-size:13px; background:pink; color:#bf2c9f;', this.moneyData)
    await this.getAllCity()
    await this.selectAllTicket()
  },
  methods: {
    quanxianChange (val) {
      if (parseInt(val.target.value) === 1) {
        this.selectAllUser()
      } else {
        this.selectAllCompany()
      }
    },
    weizhiChange (val) {
      if (parseInt(val.target.value) === 1) {
        this.selectAllUser(2)
      } else {
        this.selectAllCompany(2)
      }
    },
    // 查询我的订单
    async selectAllTicket () {
      const { data } = await this.axios.post('/api/Air/selectAllTicket')
      if (data.msg === '请求成功') {
        this.orderData = data.data.map((it, index) => {
          return {
            key: it.ticket_id,
            date: this.$moment(it.created_time).format("YYYY-MM-DD HH:mm:ss"),
            // unitPrice: it.price,
            company_id: it.company_id,
            plane_id: it.plane_id,
            line_id: it.line_id,
            user_id: it.user_id,
            user_name: it.user_name,
            num: JSON.parse(it.passenger_information).length,
            passenger_information: JSON.parse(it.passenger_information),
            cabin_type: parseInt(it.cabin_type) === 1 ? '经济舱' : '商务舱',
            departure: this.filterCity(it.departure),
            destination: this.filterCity(it.destination),
            departure_time: this.$moment(it.departure_time).format("YYYY-MM-DD HH:mm:ss"),
            destination_time: this.$moment(it.destination_time).format("YYYY-MM-DD HH:mm:ss"),
            money: it.price,
          }
        })
        this.orderData.reverse()
      } else {
        this.$message.error(data.msg)
      }
    },
    logout () {
      this.$message.error('退出登录')
      window.sessionStorage.clear()
      this.$router.push('/')
    },
    async selectAllUser (type = 1) {
      const { data } = await this.axios.post('/api/Air/selectAllUser')
      if (data.msg === '请求成功') {
        if (type !== 1) {
          this.userMoney = data.data.map((it, index) => {
            return {
              key: index,
              id: it.id,
              name: it.name,
              state: it.state,
              money: it.money,
            }
          })
          this.moneyData = [...this.userMoney]
        } else {
          this.quanxianData = data.data.map((it, index) => {
            return {
              key: index,
              id: it.id,
              name: it.name,
              state: it.state,
              money: it.money,
            }
          })
        }
      } else {
        this.$message.error(data.msg)
        return
      }
    },
    async selectAllCompany (type = 1) {
      const { data } = await this.axios.post('/api/Air/selectAllCompany')
      if (data.msg === '请求成功') {
        if (type !== 1) {
          this.companyMoney = data.data.map((it, index) => {
            return {
              key: index,
              id: it.id,
              name: it.name,
              state: it.state,
              money: it.money,
            }
          })
          this.moneyData = [...this.companyMoney]
        } else {
          this.quanxianData = data.data.map((it, index) => {
            return {
              key: index,
              id: it.company_id,
              name: it.name,
              state: it.state,
              money: it.money,
            }
          })
        }
      } else {
        this.$message.error(data.msg)
        return
      }
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
        this.messageList.reverse()
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
    async qiyong (item) {
      const params = {
        state: 1,
        id: item.id
      }
      let url = '/api/Air/qupdateUser'
      if (parseInt(this.quanxian) === 2) {
        url = '/api/Air/qupdateCompany'
      }
      const { data } = await this.axios.post(url, params)
      if (data.msg === '请求成功') {
        this.$message.success('启用成功')
        if (parseInt(this.quanxian) === 1) {
          this.selectAllUser()
        } else {
          this.selectAllCompany()
        }
      } else {
        this.$message.error(data.msg)
        return
      }
    },
    async jinyong (item) {
      const params = {
        state: 0,
        id: item.id
      }
      let url = '/api/Air/qupdateUser'
      if (parseInt(this.quanxian) === 2) {
        url = '/api/Air/qupdateCompany'
      }
      const { data } = await this.axios.post(url, params)
      if (data.msg === '请求成功') {
        this.$message.success('禁用成功')
        if (parseInt(this.quanxian) === 1) {
          this.selectAllUser()
        } else {
          this.selectAllCompany()
        }
      } else {
        this.$message.error(data.msg)
        return
      }
    },
    filterState (val) {
      switch (parseInt(val)) {
        case 1:
          return '启用'
        case 0:
          return '禁用'
      }
    },
    filterCity (val) {
      let find = this.allCityList.find(it => it.city_id === val)
      if (find) {
        return find.city
      }
    },
    async getAllCity (id) {
      const { data } = await this.axios.post('/api/Air/getCity')
      if (data.msg === '请求成功') {
        this.allCityList = data.data
      } else {
        this.$message.error(data.msg)
      }
    },
    filterOrderState (val) {
      switch (val) {
        case 1:
          return '订票';
        case 2:
          return '退票';
        default:
          return '订票';
      }
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
.spanClass {
  font-size: 18px;
  font-weight: bold;
}
</style>
