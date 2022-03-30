<template>
  <div class="suggestion">
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
export default {
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
    }
  },
  mounted() {},
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
  },
}
</script>

<style lang="less" scoped>
@import url('../current.less');
.suggestion {
  margin-left: 25%;
}
</style>
