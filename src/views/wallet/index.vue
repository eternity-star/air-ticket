<template>
  <div class="wallet">
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
                @click="payVisible = true">在线充值</a-button>
    </div>
    <a-modal :visible="payVisible"
             @ok="recharge"
             @cancel="payVisible = false"
             title="在线充值">
      <span>您选择的充值金额为: </span>
      <a-input-number :default-value="1000"
                      :formatter="
                  (value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                "
                      :parser="(value) => value.replace(/\￥\s?|(,*)/g, '')"
                      style="width: 40%"
                      v-model="payAmount" />
    </a-modal>
    <div class="my-balance-bottom">
      <p>余额明细</p>
      <!-- // date name idCard mobile money operation -->
      <a-table :columns="balanceColumns"
               :data-source="balanceData"
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
        <span slot="operation"
              slot-scope="text">
          <a-icon type="laptop"
                  style="margin-right: 10px" />{{text}}
        </span>
      </a-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
      wallet: 0, //钱包金额
      payVisible: false,
      payAmount: 0, //充值金额
      pagination: {
        pageSize: 5,
        hideOnSinglePage: true,
      },
      balanceColumns: [
        {
          title: '编号',
          dataIndex: 'key',
          key: 'key',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'key' },
          width: '12%',
        },
        {
          title: '操作日期',
          dataIndex: 'date',
          key: 'date',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'date' },
          width: '17%',
        },
        {
          title: '操作人',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          scopedSlots: { customRender: 'name' },
          width: '10%',
        },
        // {
        //   title: '身份证号',
        //   dataIndex: 'idCard',
        //   key: 'idCard',
        //   align: 'center',
        //   scopedSlots: { customRender: 'idCard' },
        //   width: '20%',
        // },
        // {
        //   title: '手机号',
        //   dataIndex: 'mobile',
        //   key: 'mobile',
        //   ellipsis: true,
        //   align: 'center',
        //   scopedSlots: { customRender: 'mobile' },
        //   width: '15%',
        // },
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
      balanceData: [
        {
          key: '1',
          date: '2022-02-08 09:51:55',
          name: '小明',
          idCard: '441501111111111100',
          mobile: '13333322222',
          money: '-1000',
          operation: '购买机票',
        },
        {
          key: '2',
          date: '2022-02-07 10:51:55',
          name: '小明',
          idCard: '441501111111111100',
          mobile: '13333322222',
          money: '-1000',
          operation: '购买机票',
        },
        {
          key: '3',
          date: '2022-02-06 11:51:55',
          name: '小明',
          idCard: '441501111111111100',
          mobile: '13333322222',
          money: '-1000',
          operation: '购买机票',
        },
      ],
    }
  },
  created () {
    this.wallet = this.user.money
  },
  mounted () {
    this.getBalanceList()
  },
  methods: {
    // key date name money operation
    async getBalanceList () {
      const params = {
        id: this.user.id
      }
      const { data } = await this.axios.post('/api/Air/getBalanceList', params)
      if (data.msg === '请求成功') {
        console.log('[ data.data ] >', data.data)
        this.balanceData = data.data.map(it => {
          return {
            key: it.capital_id,
            date: this.$moment(it.created_time).format("YYYY-MM-DD HH:mm:ss"),
            name: it.user_name,
            money: it.money,
            operation: this.filterType(parseInt(it.control_type))
          }
        })
        this.balanceData.reverse()
      } else {
        this.$message.error(data.msg)
      }
    },
    async recharge () {
      Promise.all([this.doRecharge(), this.doInsertCapital()])
        .then((res) => {
          this.$message.success('充值成功')
          this.axios.post('/api/Air/getUser', { id: this.user.id }).then(({ data }) => {
            if (data.msg === '请求成功') {
              window.sessionStorage.setItem('user', JSON.stringify(data.data[0]))
              this.wallet = JSON.parse(window.sessionStorage.getItem('user')).money
              this.user = JSON.parse(window.sessionStorage.getItem('user'))
              this.payVisible = false
            } else {
              this.$message.error(data.msg)
            }
          })
          this.getBalanceList()
          console.log('[ res ] >', res)
        }).catch(err => {
          this.$message.error(err)
        })

    },
    async doRecharge () {
      const params = {
        money: this.payAmount + this.user.money,
        id: this.user.id,
        type: 1
      }
      const { data } = await this.axios.post('/api/Air/recharge', params)
      console.log('[ data ] >', data)
      if (data.msg === '请求成功') {
        console.log('[ data.data ] >', data.data)
      } else {
        this.$message.error(data.msg)
      }
    },
    async doInsertCapital () {
      const params = {
        capital_id: 'CA' + new Date().getTime() + String(Math.round(Math.random() * 10000)),
        user_id: this.user.id,
        user_name: this.user.name,
        created_time: this.$moment().format("YYYY-MM-DD HH:mm:ss"),
        money: this.payAmount,
        control_type: '3',
        order_id: '',
      }
      const { data } = await this.axios.post('/api/Air/insertCapital', params)
      console.log('[ data ] >', data)
      if (data.msg === '请求成功') {
        console.log('[ data.data ] >', data.data)
      } else {
        this.$message.error(data.msg)
      }
    },
    filterType (type) {
      switch (type) {
        case 1:
          return '购票'
        case 2:
          return '提现'
        case 3:
          return '充值'
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import url("../current.less");
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
