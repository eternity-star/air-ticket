<template>
  <div class="search-ticket">
    <div class="back-header">
      <span style="cursor: pointer" @click="backClick"
        ><a-icon type="left" />返回</span
      >
    </div>
    <div class="show-ticket">
      <a-steps :current="currentIndex" @change="onChange">
        <a-step title="搜索">
          <span slot="icon"><a-icon type="search" /></span>
        </a-step>
        <a-step title="去程航班">
          <!-- <span slot="subTitle">Left 00:00:08</span> -->
          <span slot="icon"
            ><img
              src="../../assets/image/飞机_起飞.png"
              alt="飞机_起飞"
              width="40px"
              height="40px"
          /></span>
        </a-step>
        <!-- 要根据是否是往返航班来判断是否显示改步骤  roundShow-->
        <a-step title="返程航班" v-if="roundShow">
          <span slot="icon"
            ><img
              src="../../assets/image/飞机_降落.png"
              alt="飞机_降落"
              width="40px"
              height="40px"
          /></span>
          <!-- <span slot="icon"><img src="../../assets/image/飞机_降落.png" alt="飞机_降落" width="40px" height="40px"></span> -->
        </a-step>
        <a-step title="旅客" description="This is a description.">
          <span slot="icon"><a-icon type="team" /></span>
        </a-step>
        <a-step title="其他选项" description="This is a description.">
          <span slot="icon"><a-icon type="team" /></span>
        </a-step>
        <a-step title="付款" description="This is a description.">
          <span slot="icon"><a-icon type="team" /></span>
        </a-step>
      </a-steps>

      <!-- 去程航班 -->
      <div v-if="!detailShow && currentIndex === 1">
        <div class="mart10">
          <span style="font-size: 20px; font-weight: bold">筛选条件: </span>
          <span class="marl10" style="font-size: 16px">
            时间：
            <a-date-picker
              :allowClear="false"
              inputReadOnly
              show-time
              :disabled-date="disabledDate"
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择"
            />
          </span>
          <span class="marl10">
            <a-select
              @change="conditionChange"
              :defaultValue="{ key: 0, label: '起飞早-晚' }"
              :show-arrow="true"
              :dropdownMatchSelectWidth="false"
              style="width: 10%"
              :default-active-first-option="true"
              :not-found-content="null"
              labelInValue
            >
              <a-select-option
                v-for="(item, index) in conditionList"
                :key="index"
                :value="index"
              >
                {{ item }}
              </a-select-option>
            </a-select>
          </span>
        </div>
        <div class="mart10">
          <span style="font-size: 20px">航班({{ airlineLength }})</span>
          <ticket-list @prebook="prebook" />
        </div>
      </div>

      <!-- 返程航班 -->
      <div v-else-if="!detailShow && roundShow && currentIndex === 2">
        <span>
          时间：
          <a-date-picker
            :allowClear="false"
            inputReadOnly
            show-time
            :disabled-date="disabledDate"
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择"
          />
        </span>
        <div>
          <span>筛选条件</span>
        </div>
      </div>

      <!-- 确认机票详情 -->
      <div
        v-else-if="
          detailShow &&
          (currentIndex === 1 || (roundShow && currentIndex === 2))
        "
      >
        <ticket-list :changeShow="true" @change="changeBack" />
        <div class="next" @click="next">
          <span>下一步</span>
        </div>
      </div>

      <!-- 旅客 -->
      <div
        v-if="
          (!roundShow && currentIndex === 2) ||
          (roundShow && currentIndex === 3)
        "
      >
        旅客信息
        <div style="border: 1px solid #efefef">
          <div class="passenger-header">
            <a-icon type="user"></a-icon>
            乘机人
          </div>
          <div class="passenger-info">
            乘机人1：成人
            姓名：
            <a-input></a-input>
            身份证：
            <a-input></a-input>
          </div>
        </div>
      </div>

      <!-- 其他选项 -->
      <div
        v-if="
          (!roundShow && currentIndex === 3) ||
          (roundShow && currentIndex === 4)
        "
      >
        座舱位置选择信息等
      </div>

      <!-- 付款 -->
      <div
        v-if="
          (!roundShow && currentIndex === 4) ||
          (roundShow && currentIndex === 5)
        "
      >
        付款
      </div>
    </div>
    <a-form-model
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <!-- <a-row :gutter="16">
        <a-col :span="24"> -->
      <a-form-model-item>
        <a-radio-group v-model="form.type" @change="typeChange">
          <a-radio :value="1">建议</a-radio>
          <a-radio :value="2">投诉</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <!-- </a-col>
      </a-row> -->
      <a-form-model-item>
        <a-input
          v-if="form.type === 1"
          type="textarea"
          :maxLength="70"
          v-model="form.suggest"
          :auto-size="{ minRows: 3, maxRows: 8 }"
          placeholder="请填写建议"
        />
        <a-input
          v-else
          type="textarea"
          :maxLength="70"
          v-model="form.complaint"
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请填写投诉理由"
        />
      </a-form-model-item>
      <a-button @click="submit"> 提交 </a-button>
      <a-button style="margin-left: 10px" @click="resetClick"> 重置 </a-button>
    </a-form-model>
  </div>
</template>

<script>
import ticketList from './components/ticketList.vue'
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    roundShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ticketList,
  },
  data() {
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      rules: {
        name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
      },
      form: {
        type: 1, // 1建议 2投诉
        suggest: '', // 建议
        complaint: '', // 投诉
      },
      currentIndex: 2, // 导航栏的index
      haveCurrentIndex: 2, // 进行到哪一步了
      detailShow: false,
      airlineLength: 6,
      conditionList: [
        '起飞早-晚',
        '起飞晚-早',
        '到达早-晚',
        '到达晚-早',
        '耗时短-长',
        '耗时长-短',
        '价格高-低',
        '价格低-高',
      ],
    }
  },
  mounted() {
    console.log(
      '[ this.$route.query.roundShow ] >',
      this.$route.query.roundShow
    )
    console.log('[ this.roundShow ] >', this.roundShow)
  },
  methods: {
    /**
     * 目前存在三个问题：1、航班、城市等数据从哪里来，没有数据无法实现用户浏览订票功能；2、用户界面首页会有推荐航班，推荐规则是什么；3、查询机票时有单程、往返、多程等行程，涉及到多人时的逻辑。针对第一个问题，可以适量的制造假数据，而后用以做后续的操作功能。针对第二个问题，通过先前制造的数据，获取到达目的地最多的5个城市作为热门城市，进而将前往该城市目的地的机票信息推荐到首页。针对第三个问题，涉及单程、往返、多程的规则如下：单程时的查询订票规则，单个乘客或多位乘客时，选择一个航班作为乘客的航程，在确认乘客信息时，在选择每个乘客的座舱等级以及希望坐的座位。往返时的查询订票规则，可拆分成两个行程，去程航班和返程航班，相当于分为两个单程航班，在使用单程航班的规则。多程时的查询订票规则，也是分成多个单行程来处理，但有对应的条件，上一个行程的时间要比下一个行程时间早，否则不允许查询。
     * 老师好，这是我的中期检查表，个人信息和存在问题及解决方法这两栏我已填写，您看看有什么问题
     * 没问题的话，我就去教务系统上补充存在问题及解决方法
     * 目前存在三个问题：1、航班、城市等数据从哪里来，没有数据无法实现用户浏览订票功能；2、用户界面首页会有推荐航班，推荐规则是什么；3、查询机票时有单程、往返、多程等行程，涉及到多人时的逻辑
     * 针对第一个问题，可以适量的制造假数据，而后用以做后续的操作功能。
     * 针对第二个问题，通过先前制造的数据，获取到达目的地最多的5个城市作为热门城市，进而将前往该城市目的地的机票信息推荐到首页，
     *    还可以从网上获取最受欢迎的几个旅游城市，推荐到首页中。
     * 针对第三个问题，单程时的查询订票规则，单个乘客或多位乘客时，选择一个航班作为乘客的航程，在确认乘客信息时，在选择每个乘客的座舱等级以及希望坐的座位
     *                往返时的查询订票规则，决定分为两步来操作，
     *                    第一步将航班分为去程航班和返程航班，相当于分为两个单程航班，在使用单程航班时选择航班的规则，但不选择座舱等信息；
     *                    第二步在确认乘客信息时，在分别选择乘客们往返航班对应的座位等信息
     *                多程时的查询订票规则，也是分成多个单行程来处理，但有对应的条件，上一个行程的时间要比下一个行程时间早，否则不允许查询
     */
    prebook(val) {
      console.log('[ 333 ] >', val)
      this.detailShow = true
    },
    changeBack() {
      this.detailShow = false
    },
    next() {
      console.log('[ "cececece" ] >', 'cececece')
      this.currentIndex = this.currentIndex + 1
      if (this.haveCurrentIndex < this.currentIndex) {
        this.haveCurrentIndex = this.currentIndex
      }
    },
    onChange(current) {
      console.log('[ current ] >', current)
      if (current <= this.haveCurrentIndex) {
        this.currentIndex = current
      }
    },
    conditionChange(val) {
      console.log('[ val ] >', val)
    },
    typeChange() {
      this.resetClick()
    },
    submit() {
      if (this.form.type === 1 && !this.form.suggest) {
        this.$message.error('请填写完整')
      } else if (this.form.type === 2 && !this.form.complaint) {
        this.$message.error('请填写完整')
      } else {
        this.$emit('suggestEvent', this.form)
      }
    },
    resetClick() {
      this.form.suggest = ''
      this.form.complaint = ''
    },
    disabledDate(time) {
      return time < this.$moment().subtract(1, 'days')
    },
    backClick() {
      this.$emit('update:searchShow', false)
    },
  },
}
</script>

<style lang="less" scoped>
@import url('../current.less');
.search-ticket {
  padding: 10px 10px;
  .back-header {
    height: 45px;
    line-height: 45px;
    .handle-item {
      font-weight: 400;
      color: #000000;
    }
    .disable-item {
      font-weight: 400;
      color: rgba(74, 69, 62, 0.5);
    }
  }
  .show-ticket {
    padding-left: 5%;
    padding-right: 5%;
    .next {
      cursor: pointer;
      // float: right;
      margin: 10px 0 auto auto;
      color: #ffffff;
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 2px;
      background-color: #34c6fc;
    }
    .passenger-header {
      background-color: #f7f9f9;
      color: #003145;
      height: 80px;
      padding: 20px 0 0 30px;
      font-size: 20px;
      font-weight: bold;
    }
    .passenger-info {
      padding: 20px;
    }
  }
}
</style>
