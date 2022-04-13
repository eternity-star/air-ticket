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
            <a-menu-item key="2"> 添加航班 </a-menu-item>
            <a-menu-item key="3"> 航班管理 </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="wallet" /><span>资金管理</span>
            </span>
            <a-menu-item key="4"> 收益管理 </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="menu" /><span>乘客管理</span>
            </span>
            <a-menu-item key="5"> 添加航班 </a-menu-item>
            <a-menu-item key="6"> 航班管理 </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
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
                         type="number"
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
                         type="number"
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
            <a-form-model ref="form"
                          :model="form"
                          :rules="rules"
                          :label-col="labelCol"
                          :wrapper-col="wrapperCol">
              <!-- <a-spin :spinning="loading"
                      tip="加载中...">
                <a-form-model-item>
                  <a-upload name="avatar"
                            list-type="picture-card"
                            class="avatar-uploader"
                            :show-upload-list="false"
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            :before-upload="beforeUpload"
                            @change="handleChange">
                    <img v-if="imageUrl"
                         :src="imageUrl"
                         alt="avatar" />
                    <div v-else>
                      <a-icon :type="loading ? 'loading' : 'plus'" />
                      <div class="ant-upload-text">Upload</div>
                    </div>
                  </a-upload>
                </a-form-model-item>
              </a-spin> -->
              <a-row>
                <a-col :span="12">
                  <a-form-model-item prop="departure"
                                     label="出发地">
                    <a-cascader :options="cityList"
                                :load-data="loadData"
                                v-model="form.departure"
                                style="width: 70%"
                                placeholder="请选择出发地" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <a-form-model-item prop="destination"
                                     label="目的地">
                    <a-cascader :options="cityList"
                                v-model="form.destination"
                                :load-data="loadData"
                                style="width: 70%"
                                placeholder="请选择目的地" />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="12">
                  <a-form-model-item prop="departure_time"
                                     label="预计出发时间">
                    <a-date-picker :allowClear="false"
                                   inputReadOnly
                                   show-time
                                   style="width: 100%"
                                   :disabled-date="disabledDate"
                                   v-model="form.departure_time"
                                   format="YYYY-MM-DD HH:mm:ss"
                                   placeholder="请选择" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="12">
                  <a-form-model-item prop="destination_time"
                                     label="预计抵达时间">
                    <a-date-picker :allowClear="false"
                                   inputReadOnly
                                   show-time
                                   style="width: 100%"
                                   :disabled-date="disabledDate"
                                   v-model="form.destination_time"
                                   format="YYYY-MM-DD HH:mm:ss"
                                   placeholder="请选择" />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col>
                  <a-form-model-item prop="ticket_count"
                                     label="机票总数量"
                                     :label-col="{ span: 3 }"
                                     :wrapper-col="{ span: 10 }">
                    <a-input-number v-model="form.ticket_count"
                                    disabled
                                    @blur="ticketCountChange"
                                    placeholder="请输入"
                                    style="width: 75%"
                                    :min="0"
                                    :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')" />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col>
                  <a-form-model-item prop="business_cabin_count"
                                     label="商务/头等舱数量"
                                     :label-col="{ span: 3 }"
                                     :wrapper-col="{ span: 10 }">
                    <a-input-number v-model="form.business_cabin_count"
                                    disabled
                                    @blur="businessCabinCountChange"
                                    placeholder="请输入"
                                    style="width: 75%"
                                    :min="0"
                                    :parser="(value) => value.replace(/\s?|(,*)/g, '')" />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <a-form-model-item prop="economy_cabin_count"
                                     label="经济舱数量"
                                     :label-col="{ span: 3 }"
                                     :wrapper-col="{ span: 10 }">
                    <a-input-number v-model="form.economy_cabin_count"
                                    disabled
                                    @blur="economyCabinCountChange"
                                    placeholder="请输入"
                                    style="width: 75%"
                                    :parser="(value) => value.replace(/\s?|(,*)/g, '')"
                                    :min="0" />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-model-item prop="economy_column"
                                     label="经济舱列数"
                                     :label-col="{ span: 9 }"
                                     :wrapper-col="{ span: 15 }">
                    <a-select v-model="form.economy_column"
                              @change="colChange"
                              style="width: 75%"
                              :show-arrow="true"
                              :allowClear="false"
                              :default-active-first-option="true"
                              :not-found-content="null"
                              :filter-option="false"
                              option-filter-prop="children"
                              placeholder="请选择列">
                      <a-select-option v-for="item in columnList"
                                       :key="item"
                                       :value="item">
                        {{ item }}
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item prop="economy_row"
                                     label="经济舱排数"
                                     :label-col="{ span: 9 }"
                                     :wrapper-col="{ span: 15 }">
                    <a-input-number v-model="form.economy_row"
                                    @change="rowChange($event, 1)"
                                    placeholder="请输入"
                                    style="width: 75%"
                                    :min="0" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item prop="economy_cabin_price"
                                     label="经济舱单价"
                                     :label-col="{ span: 9 }"
                                     :wrapper-col="{ span: 15 }">
                    <a-input-number :default-value="1000"
                                    :formatter="
                    (value) =>
                      `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  "
                                    :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
                                    style="width: 40%"
                                    :min="0"
                                    v-model="form.economy_cabin_price" />
                  </a-form-model-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <a-form-model-item prop="business_column"
                                     label="商务舱列数"
                                     :label-col="{ span: 9 }"
                                     :wrapper-col="{ span: 15 }">
                    <a-input v-model="form.business_column"
                             disabled
                             placeholder="请输入"
                             style="width: 75%" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item prop="business_row"
                                     label="商务舱排数"
                                     :label-col="{ span: 9 }"
                                     :wrapper-col="{ span: 15 }">
                    <a-input-number v-model="form.business_row"
                                    @change="rowChange($event, 2)"
                                    placeholder="请输入"
                                    style="width: 75%"
                                    :min="0" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item prop="business_cabin_price"
                                     label="商务舱单价"
                                     :label-col="{ span: 9 }"
                                     :wrapper-col="{ span: 15 }">
                    <a-input-number :default-value="1000"
                                    :formatter="
                    (value) =>
                      `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  "
                                    :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
                                    style="width: 40%"
                                    :min="0"
                                    v-model="form.business_cabin_price" />
                  </a-form-model-item>
                </a-col>
              </a-row>
            </a-form-model>
            <a-button type="primary"
                      shape="round"
                      style="margin-left: 43%"
                      @click="submit">提交</a-button>
            <a-button type="primary"
                      shape="round"
                      style="margin-left: 10px"
                      @click="reset">重置</a-button>
          </div>
          <div class="myOrder"
               v-else-if="currentIndex === 3">
            333
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
                  <a-popconfirm title="确定取消航班吗？"
                                ok-text="确定"
                                cancel-text="取消"
                                @confirm="returnTicket">
                    <a-button type="danger"
                              style="margin-right: 5px">取消</a-button>
                  </a-popconfirm>
                  <a-button type="primary"
                            style="margin-left: 5px"
                            @click="returnVisible = true">详情</a-button>
                </div>
              </template>
            </a-table>
            <a-modal title="机票信息"
                     :visible="returnVisible"
                     @ok="returnVisible = false"
                     @cancel="returnVisible = false">
            </a-modal>
          </div>
          <div class="myBalance"
               v-else-if="currentIndex === 4">
            <div class="my-balance-top">
              <a-row>
                <a-col :span="16">
                  <p>我的余额</p>
                  <p>￥{{ wallet }}</p>
                </a-col>
                <a-col :span="8">
                  <a-icon type="pay-circle"
                          style="font-size: 60px; color: #ffd700; float: right" />
                </a-col>
              </a-row>
              <a-button shape="round"
                        @click="payVisible = true">提现</a-button>
              <a-modal :visible="payVisible"
                       @ok="recharge"
                       @cancel="payVisible = false"
                       title="提现">
                <span>您选择的提现金额为: </span>
                <a-input-number :default-value="1000"
                                :formatter="
                    (value) =>
                      `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  "
                                :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
                                style="width: 40%"
                                v-model="payAmount" />
              </a-modal>
            </div>
            <div class="my-balance-bottom">
              <p>余额明细</p>
              <!-- // date name idCard mobile money operation -->
              <a-table :columns="balanceColumns"
                       :data-source="balanceData">
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
                <span slot="operation"
                      slot-scope="text">
                  <a-icon type="laptop"
                          style="margin-right: 10px" />{{
                    text
                  }}
                </span>
              </a-table>
            </div>
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
      default: 2,
    },
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
        departure: [
          { required: true, message: '请填写出发地', trigger: 'change' },
        ],
        destination: [
          { required: true, message: '请填写目的地', trigger: 'change' },
        ],
        departure_time: [
          { required: true, message: '请填写出发时间', trigger: 'blur' },
        ],
        destination_time: [
          { required: true, message: '请填写到达时间', trigger: 'blur' },
        ],
        business_cabin_count: [
          {
            required: true,
            message: '请填写商务/头等舱机票数量',
            trigger: 'blur',
          },
        ],
        economy_cabin_count: [
          { required: true, message: '请填写经济舱机票数量', trigger: 'blur' },
        ],
        ticket_count: [
          { required: true, message: '请填写机票数量', trigger: 'blur' },
        ],
        business_column: [
          { required: true, message: '请选择商务舱列数', trigger: 'blur' },
        ],
        business_row: [
          { required: true, message: '请选择商务舱行数', trigger: 'blur' },
        ],
        economy_column: [
          { required: true, message: '请选择经济舱列数', trigger: 'blur' },
        ],
        economy_row: [
          { required: true, message: '请选择经济舱行数', trigger: 'blur' },
        ],
        business_cabin_price: [
          { required: true, message: '请填写经济舱单价', trigger: 'blur' },
        ],
        economy_cabin_price: [
          { required: true, message: '请填写商务舱单价', trigger: 'blur' },
        ],
      },
      form: {
        departure: [], //出发地
        destination: [], //目的地
        departure_time: this.$moment(), //出发时间
        destination_time: this.$moment().add(2, 'hour'), //到达时间
        business_column: '',//商务舱列数
        business_row: '',//商务舱行数
        economy_column: '',//经济舱列数
        economy_row: '',//经济舱行数
        ticket_count: 0, //机票数量
        business_cabin_count: 0, //商务舱数量
        economy_cabin_count: 0, //经济舱数量
        business_cabin_price: 0, //商务舱单价
        economy_cabin_price: 0, //经济舱单价
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
      returnVisible: false,
      payVisible: false,
      passwordVisible: false,
      pagination: {
        pageSize: 5,
        hideOnSinglePage: true,
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
      orderData: [
        {
          key: '1',
          no: randomWord(true, 8, 8),
          departure: '北京', //出发地
          destination: '深圳', //目的地
          departure_time: '2022-02-08 09:51:55', //出发时间
          destination_time: '2022-02-08 11:51:55', //到达时间
          ticket_count: 600, //机票数量
          bookedCount: 500, //已订机票
          // business_cabin_count: 100, //商务舱数量
          // economy_cabin_count: 500, //商务舱数量
        },
        {
          key: '2',
          no: randomWord(true, 8, 8),
          departure: '东莞', //出发地
          destination: '深圳', //目的地
          departure_time: '2022-02-28 15:56:55', //出发时间
          destination_time: '2022-02-08 18:51:55', //到达时间
          ticket_count: 1500, //机票数量
          bookedCount: 500, //已订机票
          // business_cabin_count: 150, //商务舱数量
          // economy_cabin_count: 1350, //商务舱数量
        },
        {
          key: '3',
          no: randomWord(true, 8, 8),
          departure: '中山', //出发地
          destination: '广州', //目的地
          departure_time: '2022-03-01 22:51:55', //出发时间
          destination_time: '2022-03-02 01:51:55', //到达时间
          ticket_count: 300, //机票数量
          bookedCount: 500, //已订机票
          // business_cabin_count: 20, //商务舱数量
          // economy_cabin_count: 280, //商务舱数量
        },
      ],
      orderColumns: [
        {
          title: '航班编号',
          dataIndex: 'no',
          key: 'no',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'no' },
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
          title: '预计出发时间',
          dataIndex: 'departure_time',
          key: 'departure_time',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'departure_time' },
          width: '15%',
        },
        {
          title: '预计抵达时间',
          dataIndex: 'destination_time',
          key: 'destination_time',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'destination_time' },
          width: '15%',
        },
        {
          title: '机票总数量',
          dataIndex: 'ticket_count',
          key: 'ticket_count',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'ticket_count' },
          width: '10%',
        },
        {
          title: '已订机票',
          dataIndex: 'bookedCount',
          key: 'bookedCount',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'bookedCount' },
          width: '10%',
        },
        // {
        //   title: '商务舱数量',
        //   dataIndex: 'business_cabin_count',
        //   key: 'business_cabin_count',
        //   ellipsis: true,
        //   align: 'center',
        //   scopedSlots: { customRender: 'business_cabin_count' },
        //   width: '10%',
        // },
        // {
        //   title: '商务舱单价',
        //   dataIndex: 'business_cabin_price',
        //   key: 'business_cabin_price',
        //   ellipsis: true,
        //   align: 'center',
        //   scopedSlots: { customRender: 'business_cabin_price' },
        //   width: '10%',
        // },
        // {
        //   title: '经济舱数量',
        //   dataIndex: 'economy_cabin_count',
        //   key: 'economy_cabin_count',
        //   ellipsis: true,
        //   align: 'center',
        //   scopedSlots: { customRender: 'economy_cabin_count' },
        //   width: '10%',
        // },
        // {
        //   title: '经济舱单价',
        //   dataIndex: 'economy_cabin_price',
        //   key: 'economy_cabin_price',
        //   ellipsis: true,
        //   align: 'center',
        //   scopedSlots: { customRender: 'economy_cabin_price' },
        //   width: '10%',
        // },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'operation' },
          width: '20%',
        },
      ],
      columnList: [5, 7, 8, 9],
      rowList: [2, 3, 4, 5],
      cityList: [
        { no: 1, city: '深圳' },
        { no: 2, city: '广州' },
        { no: 3, city: '东莞' },
        { no: 4, city: '中山' },
        { no: 5, city: '珠海' },
        { no: 6, city: '惠州' },
      ], //城市
    }
  },
  components: {},
  created () {
    console.log('[ this.$moment() ] >', this.$moment().valueOf())
    console.log('[ <= new Date().valueOf() ] >', new Date().valueOf())
    console.log(
      '[ String(Math.round(Math.random())) ] >',
      String(Math.round(Math.random()))
    )
    console.log('[ new Date().getTime() ] >', new Date().getTime())
    console.log('[ new Date().valueOf() ] >', new Date().valueOf())
    console.log(
      '[ String(Math.round(Math.random())) ] >',
      Math.random() * 100000
    )
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
    console.log('[ randomWord ] >', randomWord(true, 8, 8))
    console.log(
      '[ new Date().getTime() + String(Math.round(Math.random() * 10000)) ] >',
      new Date().getTime() + String(Math.round(Math.random() * 10000))
    )
    this.getProvince()
  },
  methods: {
    colChange (val, type) {
      console.log('[ val ] >', val)
      let index = this.columnList.findIndex(it => parseInt(it) === parseInt(val))
      this.form.business_column = this.rowList[index]
      if (this.form.economy_row) {
        this.form.economy_cabin_count = this.form.economy_row * this.form.economy_column
      }
      if (this.form.business_column) {
        this.form.business_cabin_count = this.form.business_row * this.form.business_column
      }
    },
    rowChange (val, type) {
      if (type === 1) {
        if (this.form.economy_column) {
          this.form.economy_cabin_count = this.form.economy_row * this.form.economy_column
        }
      } else {
        if (this.form.business_column) {
          this.form.business_cabin_count = this.form.business_row * this.form.business_column
        }
      }
    },
    ticketCountChange () {
      if (this.form.ticket_count < this.form.business_cabin_count) {
        this.form.business_cabin_count = this.form.ticket_count
      }
      this.form.economy_cabin_count =
        this.form.ticket_count - this.form.business_cabin_count
    },
    businessCabinCountChange () {
      if (
        parseInt(this.form.business_cabin_count) > parseInt(this.form.ticket_count)
      ) {
        this.$message.error('不允许数量超过机票总数量')
        this.form.business_cabin_count =
          this.form.ticket_count - this.form.economy_cabin_count
      }
      this.form.economy_cabin_count =
        this.form.ticket_count - this.form.business_cabin_count
    },
    economyCabinCountChange () {
      if (
        parseInt(this.form.economy_cabin_count) > parseInt(this.form.ticket_count)
      ) {
        this.$message.error('不允许数量超过机票总数量')
        this.form.economy_cabin_count =
          this.form.ticket_count - this.form.business_cabin_count
      }
      this.form.business_cabin_count =
        this.form.ticket_count - this.form.economy_cabin_count
    },
    changePassOk () {
      /**
        先判断原密码对不对
        在判断新密码和确认密码正不正确
       */
      if (this.new_password !== this.confirm_password) {
        this.$message.error('密码不一致，请重新输入')
        return
      }
      this.passwordVisible = false
      this.old_password = '' //原密码
      this.new_password = '' //新密码
      this.confirm_password = '' //确认密码
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
    passwordBlur (val) {
      console.log('[ val ] >', val)
    },
    updateInfo () {
      console.log('[ this.infoForm ] >', this.infoForm)
    },
    submit () {
      this.$message.success('提交成功')
      console.log('[ this.form ] >', this.form)
    },
    reset () {
      this.$refs.form.resetFields()
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
    recharge () {
      this.wallet += parseInt(this.payAmount)
      this.payVisible = false
      this.$message.success('充值成功')
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
    },
    disabledDate (time) {
      return time < this.$moment().subtract(1, 'days')
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
    /**
     * 查询城市
     */
    getProvince () {
      this.axios.get('/api/Air/getProvince').then(({ data }) => {
        if (data.msg === '请求成功') {
          this.cityList = data.data.map((it) => {
            return {
              value: it.province_id,
              label: it.province,
              isLeaf: false,
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    getCity (id, targetOption) {
      const params = {
        province_id: id,
      }
      console.log('[ params ] >', params)
      this.axios.post('/api/Air/getCity', params).then(({ data }) => {
        console.log('[ data ] >', data)
        if (data.msg === '请求成功') {
          targetOption.children = data.data.map((it) => {
            return {
              value: it.city_id,
              label: it.city,
            }
          })
        } else {
          this.$message.error(data.msg)
        }
        this.cityList = [...this.cityList]
      })
      targetOption.loading = false
    },
    loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      this.getCity(targetOption.value, targetOption)
    },

    /**
     * 我的订单相关函数
     */
    returnTicket () {
      this.$message.success('取消航班成功')
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

/**
  我的余额相关css
*/
.my-balance-top {
  height: 230px;
  background-color: #00acff;
  padding: 40px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.my-balance-top p {
  color: #ffffff;
  font-size: 16px;
}
.my-balance-top p:last-child {
  color: #ffffff;
  font-size: 32px;
  font-weight: bold;
}
.my-balance-bottom {
  /* height: 230px; */
  /* background-color: #00acff; */
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #cacaca;
}
.my-balance-bottom p {
  /* color: #ffffff; */
  font-size: 16px;
}
</style>
