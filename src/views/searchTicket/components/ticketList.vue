<template>
  <div class="ticket-list">
    <div class="ticket-info"
         v-for="(item, index) in ticketList"
         :key="index">
      <div class="info">
        <div class="info-left">
          <span style="margin-bottom: 10px; display: block">{{item.departure_time}} - {{item.destination_time}}</span>
          <a-timeline>
            <a-timeline-item>{{item.departure}}</a-timeline-item>
            <a-timeline-item>{{item.destination}}</a-timeline-item>
          </a-timeline>
        </div>
        <div class="info-center">
          <span>{{item.plane}}</span>
          <span>行程时长:
            <a-icon type="clock-circle"
                    theme="filled"
                    style="margin-right: 2px; margin-left: 10px" />{{changeTime(item.duration)}}
          </span>
        </div>
        <div class="info-right">
          <span>￥<span style="font-size: 30px">{{item.economy_cabin_price}}</span></span>
          <span class="text-red">该价格剩余{{item.surplus}}个座位！</span>
        </div>
        <div class="operation"
             v-if="!changeShow">
          <div class="book"
               v-if="bookShow"
               @click="book">
            订票
            <a-icon type="down" />
          </div>
          <div class="cancel"
               v-else
               @click="bookShow = true">
            收起
            <a-icon type="up" />
          </div>
        </div>
        <div v-else
             class="operation"
             @click="change">
          <div class="change">变更</div>
        </div>
      </div>
      <div class="show"
           v-if="!bookShow">
        <a-row :gutter="10">
          <a-col :span="6">
            <div style="text-align: center; line-height: 100px">航空公司</div>
          </a-col>
          <a-col :span="12">
            <div style="text-align: center; line-height: 100px">
              <a>退改￥138起</a> | <a>托运行李额20KG</a> 经典经济舱
            </div>
          </a-col>
          <a-col :span="6">
            <div style="text-align: center; line-height: 100px">
              ￥2750
              <span class="prebook"
                    @click="prebook"> 预订 </span>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { toHourMinute } from '@/common/utils'
export default {
  props: {
    changeShow: {
      type: Boolean,
      default: false,
    },
    infoData: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      ticketList: [1, 2, 3, 4, 5],
      bookShow: true,
    }
  },
  watch: {
    infoData: {
      immediate: true,
      deep: true,
      handler (val) {
        console.log('[ val ] >', val)
        this.ticketList = [...val]
        this.ticketList.forEach((it, index) => {
          it.departure_time = this.$moment(it.departure_time).format("YYYY-MM-DD HH:mm")
          it.destination_time = this.$moment(it.destination_time).format("YYYY-MM-DD HH:mm")
          it.duration = this.$moment(it.destination_time).diff(this.$moment(it.departure_time), 'minutes')
          it.surplus = it.ticket_count - it.have_ticket_count //剩余数量
          it.plane = this.planeList[index]
        })
        console.log('[ this.ticketList ] >', this.ticketList)
      },
    }
  },
  mounted () {
  },
  methods: {
    async getPlaneName (list) {
      const params = {
        ids: id
      }
      const { data } = await this.axios.post('/api/Air/getPlaneList', params)
      console.log('%c [ data ]-115', 'font-size:13px; background:pink; color:#bf2c9f;', data)
      if (data.msg === '请求成功') {
        return data.data[0].plane_name
      } else {
        this.$message.error(data.msg)
      }
    },
    changeTime (val) {
      console.log('[ val ] >', val)
      return toHourMinute(val)
    },
    book () {
      this.bookShow = false
    },
    prebook () {
      console.log('[ 111 ] >', 111)
      this.$emit('prebook', 1)
    },
    change () {
      console.log('[ 333 ] >', 333)
      this.$emit('change', 2)
    },
  },
}
</script>

<style lang="less" scoped>
@import url("../../current.less");
.ticket-list {
  .info:hover {
    box-shadow: 0 5px 5px rgba(192, 221, 252);
  }
  .info {
    transition: box-shadow 0.2s ease-in-out;
    padding: 20px 10px 0 30px;
    border: 1px solid #efefef;
    display: flex;
    .info-left {
      flex: 2;
      align-content: center;
    }
    .info-center {
      flex: 2;
      padding: 20px;
      position: relative;
      span:first-child {
        position: absolute;
        top: 30%;
        transform: translateY(-50%);
      }
      span:last-child {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .info-right {
      flex: 2;
      padding: 20px;
      position: relative;
      span:first-child {
        position: absolute;
        top: 30%;
        transform: translateY(-50%);
        color: #ff7d13;
        font-size: 18px;
      }
      span:last-child {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .operation {
      flex: 1;
      padding: 20px;
      position: relative;
      .book {
        width: 80px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        background-color: #ff7d13;
        position: absolute;
        top: 30%;
        transform: translateY(-50%);
        color: #ffffff;
        font-size: 18px;
      }
      .book:hover {
        background-color: #ff9b1e;
      }
      .cancel {
        width: 80px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        background-color: #ff7d13;
        position: absolute;
        top: 30%;
        transform: translateY(-50%);
        color: #ffffff;
        font-size: 18px;
      }
      .cancel:hover {
        background-color: #ff9b1e;
      }
      .change {
        width: 80px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
        position: absolute;
        top: 30%;
        transform: translateY(-50%);
        color: #00a1de;
        font-size: 18px;
      }
      .change:hover {
        background-color: #edefef;
      }
    }
  }
  .show {
    min-height: 100px;
    background-color: #f8fafb;
    .prebook {
      display: inline-block;
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 2px;
      cursor: pointer;
      background-color: #ff7d13;
      color: #ffffff;
    }
  }
}
</style>
