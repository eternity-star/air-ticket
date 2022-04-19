<template>
  <div class="air-line-create">
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
        <a-col :span="12">
          <a-form-model-item prop="plane"
                             label="选择的飞机">
            <a-select v-model="form.plane"
                      @change="planeChange"
                      style="width: 75%"
                      :show-arrow="true"
                      :allowClear="false"
                      :default-active-first-option="true"
                      :not-found-content="null"
                      :filter-option="false"
                      option-filter-prop="children"
                      placeholder="请选择飞机">
              <a-select-option v-for="item in planeList"
                               :key="item.id"
                               :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item prop="ticket_count"
                             label="机票总数量">
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
        <a-col :span="12">
          <a-form-model-item prop="business_cabin_count"
                             label="商务/头等舱数量">
            <a-input-number v-model="form.business_cabin_count"
                            disabled
                            @blur="businessCabinCountChange"
                            placeholder="请输入"
                            style="width: 75%"
                            :min="0"
                            :parser="(value) => value.replace(/\s?|(,*)/g, '')" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item prop="business_cabin_price"
                             label="商务舱单价">
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
      <a-row>
        <a-col :span="12">
          <a-form-model-item prop="economy_cabin_count"
                             label="经济舱数量">
            <a-input-number v-model="form.economy_cabin_count"
                            disabled
                            @blur="economyCabinCountChange"
                            placeholder="请输入"
                            style="width: 75%"
                            :parser="(value) => value.replace(/\s?|(,*)/g, '')"
                            :min="0" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item prop="economy_cabin_price"
                             label="经济舱单价">
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
      <!-- <a-row>
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
      </a-row> -->
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
</template>
<script>
export default {
  data () {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
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
      planeList: '',
      user: JSON.parse(window.sessionStorage.getItem('user')),
    }
  },
  created () {

  },
  mounted () {
    this.getPlaneList()
  },
  methods: {
    async getPlaneList () {
      const params = {
        ids: this.user.own_plane
      }
      console.log('[ this.user.own_plane ] >', this.user.own_plane)
      this.axios.post('/api/Air/getPlaneList', params).then(({ data }) => {
        console.log('[ data ] >', data)
        if (data.msg === '请求成功') {
          console.log('[ data.data ] >', data.data)
          this.planeList = data.data.map(it => {
            return {
              id: it.plane_id,
              name: it.plane_name,
            }
          })
        }
      })
    },
    loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      this.getCity(targetOption.value, targetOption)
    },
    disabledDate (time) {
      return time < this.$moment().subtract(1, 'days')
    },
    planeChange (val) {
      console.log('[ val ] >', val)
    },
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
    submit () {
      this.$message.success('提交成功')
      console.log('[ this.form ] >', this.form)
    },
    reset () {
      this.$refs.form.resetFields()
    },
  },
}
</script>
<style lang="less" scoped>
@import url("../../../current.less");
.air-line-create {
}
</style>
