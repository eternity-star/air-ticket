<template>
  <div class="air-line-create">
    <a-form-model ref="form"
                  :model="form"
                  :rules="rules"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">
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
                           @change="timeChange"
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
                           @change="timeChange"
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
                      label-in-value
                      placeholder="请选择飞机">
              <a-select-option v-for="item in planeList"
                               :key="item.plane_id"
                               :value="item.plane_id">
                {{ item.plane_name }}
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
                            @change="aaa"
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
        plane: [
          { required: true, message: '请选择飞机', trigger: 'blur' },
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
        plane: '',//选择的飞机
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
      cityList: [], //城市
      planeList: '',
      user: JSON.parse(window.sessionStorage.getItem('user')),
    }
  },
  created () {

  },
  mounted () {
    this.getPlaneList()
    this.getProvince()
  },
  methods: {
    aaa (val) {
      console.log('[ typeof(val) ] >', typeof (val))
    },
    async getPlaneList () {
      const params = {
        ids: this.user.own_plane
      }
      console.log('[ this.user.own_plane ] >', this.user.own_plane)
      this.axios.post('/api/Air/getPlaneList', params).then(({ data }) => {
        console.log('[ data ] >', data)
        if (data.msg === '请求成功') {
          console.log('[ data.data ] >', data.data)
          this.planeList = data.data
        }
      })
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
    // 查询是否在飞
    async searchAirLine (id) {
      const params = {
        plane_id: id
      }
      const { data } = await this.axios.post('/api/Air/searchAirLine', params)
      console.log('[ data ] >', data)
      if (data.msg === '请求成功') {
        if (!data.data.length) {
          return true
        } else {
          console.log('[ data.data ] >', data.data)
          let infoData = data.data
          infoData.forEach(it => {
            // 起飞时间大于查出来的到达时间
            // 到达时间小于查出来的起飞时间
            if (this.$moment(it.destination_time) < this.$moment(this.form.departure_time) || this.$moment(it.departure_time) > this.$moment(this.form.destination_time)) {
              // 则可以飞行
              return true
            } else {
              this.$message.error("在该时段，此飞机已有行程，请重新选择时间")
              return false;
            }
          })
          console.log('[ this.$moment(infoData[0].departure_time).format("") ] >',)
        }
      } else {
        this.$message.error(data.msg)
        return false;
      }
    },
    loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      this.getCity(targetOption.value, targetOption)
    },
    disabledDate (time) {
      return time < this.$moment().subtract(1, 'days')
    },
    async planeChange (val) {
      console.log('[ val ] >', val)
      await this.searchAirLine(val.key);
      let find = this.planeList.find(it => it.plane_id === val.key)
      console.log('%c [ find ]-386', 'font-size:13px; background:pink; color:#bf2c9f;', find)
      if (find) {
        this.form.ticket_count = find.capacity;
        this.form.business_cabin_count = find.business_capacity
        this.form.economy_cabin_count = find.economy_capacity
      }
    },
    timeChange (val) {
      this.form.plane = ''
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
    vailForm () {
      if (!this.form.departure.length) {
        this.$message.error("请填写出发地！")
        return false
      }
      if (!this.form.destination.length) {
        this.$message.error("请填写目的地！")
        return false
      }
      if (!this.form.plane) {
        this.$message.error("请选择飞机！")
        return false
      }
      if (!this.form.business_cabin_price) {
        this.$message.error("请填写商务舱单价！")
        return false
      }
      if (!this.form.economy_cabin_price) {
        this.$message.error("请填写经济舱单价！")
        return false
      }
      return true
    },
    async submit () {
      if (!this.vailForm()) {
        return
      }
      let type = await this.searchAirLine(this.form.plane.key)
      if (!type) {
        return
      }
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
  /**

  */
}
</style>
