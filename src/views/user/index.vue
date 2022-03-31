<template>
  <div class="user">
    <a-affix :offset-top="0">
      <div class="user-top">
        <a-button
          type="primary"
          shape="round"
          style="margin-right: 10px"
          @click="barClick(1)"
          >首页</a-button
        >
        <a-button shape="round" style="margin-right: 10px" @click="barClick(2)"
          >个人中心</a-button
        >
        <a-button shape="round" style="margin-right: 10px" @click="barClick(3)"
          >我的余额</a-button
        >
        <a-button shape="round" style="margin-right: 10px" @click="barClick(4)"
          >我的订单</a-button
        >
        <a-button type="danger" shape="round" @click="barClick(5)"
          >退出登录</a-button
        >
      </div>
    </a-affix>
    <home v-if="currentIndex === 1 && !searchShow" @ticketSearch="ticketSearch" />
    <my-info
      v-else-if="currentIndex !== 1 && currentIndex !== 5 && hackReset == true & !searchShow"
      :currentClick="currentClick"
      ref="myInfo"
    />
    <search-ticket v-if="searchShow" />
  </div>
</template>

<script>
import home from './components/home.vue'
import myInfo from './components/myInfo.vue'
import searchTicket from '../searchTicket/index.vue'
export default {
  name: 'user',
  data() {
    return {
      currentIndex: 1,
      currentClick: 1,
      hackReset: false,
      searchShow: false,
    }
  },
  components: {
    home,
    myInfo,
    searchTicket,
  },
  mounted() {
    console.log('[ 111 ] >', 111)
    console.log(
      '[ window.sessionStorage.getItem("user") ] >',
      JSON.parse(window.sessionStorage.getItem('user'))
    )
    // http://localhost:3000
    const params = {
      key: '1',
    }
    this.axios
      .post('/api/Air/searchAir', {
        id: '-1',
      })
      .then((res) => {
        console.log('[ res222 ] >', res)
      })
      .catch((err) => {
        console.log('[ err ] >', err)
      })
  },
  watch: {},
  methods: {
    ticketSearch(airline, trip) {
      console.log('[ airline ] >', airline)
      this.ticketId = airline.id
      this.roundShow = parseInt(trip) === 2
      this.searchShow = true
    },
    /**
     * 导航栏点击事件
     */
    barClick(type) {
      this.currentIndex = type
      this.searchShow = false
      if (type === 1) {
        this.$message.loading('哈利波特骑着扫帚飞')
      } else if (type === 5) {
        this.$message.error('你xx')
        window.sessionStorage.clear()
        this.$router.push('/')
      } else {
        this.hackReset = false
        this.currentClick = type - 1
        this.$nextTick(() => {
          this.hackReset = true
        })
        if (type === 2) {
          this.$message.info('唱日落')
        } else if (type === 3) {
          this.$message.success('冲哈哈')
        } else {
          this.$message.warning('唱日出')
        }
      }
    },
    // 首页
    home() {
      this.$message.loading('哈利波特骑着扫帚飞')
    },
    // 个人中心
    myInfo() {
      this.$message.info('唱日落')
    },
    // 我的余额
    myBalance() {
      this.$message.success('冲哈哈')
    },
    // 我的订单
    myOrder() {
      this.$message.warning('唱日出')
    },
    // 退出登录
    logOut() {
      this.$message.error('你xx')
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
@import url('../current.less');
/* .user {
  
} */
.user-top {
  background-color: #ffffff;
  text-align: right;
  height: 50px;
  padding: 10px 10px 2px 10px;
  margin: 0 0;
}
/* .user-top:after{
  content: '';
  display: block;
  height: 0;
  clear: both;
  visibility:hidden; 
} */
</style>
