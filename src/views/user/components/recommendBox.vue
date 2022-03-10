<template>
  <div class="recommend-box">
    <a-row>
      <a-col :span="3">
        <div class="index">{{ infoData.index }}</div>
      </a-col>
      <a-col :span="7">
        <!-- <img :src="infoData.imgUrl" alt="" width="100px" height="100px" /> -->
        <img
          src="../../../assets/image/test.jpg"
          alt=""
          width="100%"
          height="100%"
          style="border-radius: 6px"
        />
      </a-col>
      <a-col :span="9">
        <div class="toAddress">
          <p>深圳<a-icon type="swap" />南京</p>
          <p>02-25 去 02-28 回</p>
        </div>
      </a-col>
      <a-col :span="5">
        <div class="toMoney">
          <p>￥<span>480</span>起</p>
          <p>1.1折</p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'recommendBox',
  props: {
    infoData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isShow: true,
    }
  },
  mounted() {
    if (!this?.infoData?.index) {
      this.isShow = false
    } else {
      this.isShow = true
    }
  },
}
</script>

<style lang="less" scoped>
.recommend-box {
  margin: 2px 0 2px 0;
  padding: 2px 10px 2px 10px;
  background-color: white ;
}
.recommend-box:hover {
  color: #0086f6;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
}
.index {
  background-color: #ff6257;
  width: 30px;
  height: 30px;
  color: black;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  margin-top: 40%;
  margin-left: 10%;
}

.toAddress {
  margin-top: 6%;
  margin-left: 5%;
}
.toMoney {
  margin-top: 4%;
}
.toMoney p:first-child,
.toAddress p:first-child {
  font-size: 14px;
  font-weight: bold;
}
.toMoney p:first-child {
  color: #0086f6;
}
.toMoney span:first-child {
  font-size: 18px;
}
.toMoney p:last-child,
.toAddress p:last-child {
  color: #c4a6a6;
  font-size: 12px;
}
</style>
