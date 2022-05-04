<template>
  <div class="suggestion">
    <a-form-model :model="form"
                  :rules="rules"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">
      <!-- <a-row :gutter="16">
        <a-col :span="24"> -->
      <a-form-model-item>
        <a-radio-group v-model="form.type"
                       @change="typeChange">
          <a-radio :value="1">建议</a-radio>
          <a-radio :value="2">投诉</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <!-- </a-col>
      </a-row> -->
      <a-form-model-item>
        <a-input v-if="form.type === 1"
                 type="textarea"
                 :maxLength="70"
                 v-model="form.suggest"
                 :auto-size="{ minRows: 3, maxRows: 8 }"
                 placeholder="请填写建议" />
        <a-input v-else
                 type="textarea"
                 :maxLength="70"
                 v-model="form.complaint"
                 :auto-size="{ minRows: 3, maxRows: 5 }"
                 placeholder="请填写投诉理由" />
      </a-form-model-item>
      <a-button @click="submit"> 提交 </a-button>
      <a-button style="margin-left: 10px"
                @click="resetClick"> 重置 </a-button>
    </a-form-model>
  </div>
</template>

<script>
export default {
  data () {
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
  mounted () { },
  methods: {
    typeChange () {
      this.resetClick()
    },
    submit () {
      if (this.form.type === 1 && !this.form.suggest) {
        this.$message.error('请填写完整')
      } else if (this.form.type === 2 && !this.form.complaint) {
        this.$message.error('请填写完整')
      } else {
        this.$emit('suggestEvent', this.form)
        setTimeout(() => {
          this.form = {
            type: 1, // 1建议 2投诉
            suggest: '', // 建议
            complaint: '', // 投诉
          }
        }, 1000)
      }
    },
    resetClick () {
      this.form.suggest = ''
      this.form.complaint = ''
    },
  },
}
</script>

<style lang="less" scoped>
@import url("../current.less");
.suggestion {
  margin-left: 25%;
}
</style>
