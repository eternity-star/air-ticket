<template>
  <div class="air-line-manage">
    <a-table :columns="orderColumns"
             :data-source="orderData"
             :pagination="pagination">
      <template slot="operation"
                slot-scope="text, record">
        <div>
          <!-- <a-popconfirm title="确定取消航班吗？"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="contorlAction(record, 1)">
            <a-button v-if="$moment() < $moment(record.departure_time)"
                      type="danger"
                      style="margin-right: 5px">取消</a-button> -->
          </a-popconfirm>
          <a-button type="primary"
                    style="margin-left: 5px"
                    @click="contorlAction(record, 2)">详情</a-button>
        </div>
      </template>
    </a-table>
    <a-modal title="机票信息"
             width="80%"
             :visible="returnVisible"
             destroyOnClose
             @ok="returnVisible = false"
             @cancel="returnVisible = false">
      <airLineCreate :id="currentId"
                     :isAdmin="true" />
    </a-modal>
  </div>
</template>
<script>
import airLineCreate from '../../company/components/airLine/airLineCreate.vue'
export default {
  components: {
    airLineCreate,
  },
  data () {
    return {
      returnVisible: false,
      pagination: {
        pageSize: 10,
        hideOnSinglePage: true,
      },
      user: JSON.parse(window.sessionStorage.getItem('user')),
      currentId: '',
      orderData: [],
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
      allCityList: [],
    }
  },
  async created () {
    await this.getAllCity()
    await this.getAirLineList()
  },
  mounted () {
    console.log('[ this.getAirLineList() ] >', this.getAirLineList())
  },
  methods: {
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
    // /api/Air/searchAirLine
    async getAirLineList () {
      const params = {
        company_id: this.user.company_id
      }
      const { data } = await this.axios.post('/api/Air/selectAirLine')
      console.log('[ data ] >', data)
      if (data.msg === '请求成功') {
        console.log('[ data.data ] >', data.data)
        this.orderData = data.data.map(it => {
          if (it.is_show === 1) {
            return {
              key: it.line_id,
              no: it.line_id,
              departure: this.filterCity(it.departure),
              destination: this.filterCity(it.destination),
              departure_time: this.$moment(it.departure_time).format("YYYY-MM-DD HH:mm:ss"),
              destination_time: this.$moment(it.destination_time).format("YYYY-MM-DD HH:mm:ss"),
              ticket_count: it.ticket_count,
              bookedCount: it.have_ticket_count,
            }
          }
        })
        this.orderData.reverse()
      } else {
        this.$message.error(data.msg)
      }
    },
    async contorlAction (item, type) {
      console.log('[ item ] >', item)
      if (type === 1) {
        const params = {
          line_id: item.key
        }
        console.log('[ params ] >', params)
        const { data } = await this.axios.post('/api/Air/updateAirLine', params)
        if (data.msg === '请求成功') {
          this.$message.success('取消航班成功')
          await this.getAirLineList()
        } else {
          this.$message.error(data.msg)
        }
      } else {
        this.currentId = item.no
        this.returnVisible = true
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import url("../../current.less");
</style>
