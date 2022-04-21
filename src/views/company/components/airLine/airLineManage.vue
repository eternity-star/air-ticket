<template>
  <div class="air-line-manage">
    <a-table :columns="orderColumns"
             :data-source="orderData"
             :pagination="pagination">
      <template slot="operation"
                slot-scope="text, record">
        <div>
          <a-popconfirm title="确定取消航班吗？"
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="contorlAction(record, 1)">
            <a-button type="danger"
                      style="margin-right: 5px">取消</a-button>
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
      <airLineCreate :id="currentId" />
    </a-modal>
  </div>
</template>
<script>
import { randomWord } from '@/common/utils'
import airLineCreate from './airLineCreate.vue'
export default {
  components: {
    airLineCreate,
  },
  data () {
    return {
      returnVisible: false,
      pagination: {
        pageSize: 5,
        hideOnSinglePage: true,
      },
      user: JSON.parse(window.sessionStorage.getItem('user')),
      currentId: '',
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
    }
  },
  created () {

  },
  mounted () {
    console.log('[ this.getAirLineList() ] >', this.getAirLineList())
  },
  methods: {
    // /api/Air/searchAirLine
    async getAirLineList () {
      const params = {
        company_id: this.user.company_id
      }
      const { data } = await this.axios.post('/api/Air/searchAirLine', params)
      console.log('[ data ] >', data)
      if (data.msg === '请求成功') {
        console.log('[ data.data ] >', data.data)
        this.orderData = data.data.map(it => {
          return {
            key: it.line_id,
            no: it.line_id,
            departure: it.departure,
            destination: it.destination,
            departure_time: this.$moment(it.departure_time).format("YYYY-MM-DD HH:mm:ss"),
            destination_time: this.$moment(it.destination_time).format("YYYY-MM-DD HH:mm:ss"),
            ticket_count: it.ticket_count,
            bookedCount: it.have_ticket_count,
          }
        })
      } else {
        this.$message.error(data.msg)
      }
    },
    contorlAction (item, type) {
      console.log('[ item ] >', item)
      if (type === 1) {
        this.$message.success('取消航班成功')
      } else {
        this.currentId = item.no
        this.returnVisible = true
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import url("../../../current.less");
</style>
