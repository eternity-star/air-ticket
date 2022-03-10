<template>
  <div class="login">
    <div class="login-top">登录</div>
    <a-form-model ref="ruleForm" :model="form" :rules="rules">
      <a-form-model-item>
        <a-input v-model="form.loginName" placeholder="用户名">
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.password" type="password" placeholder="密码">
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-radio-group
          v-model="user"
          style="margin-left: 30%"
          @change="itemChange"
        >
          <a-radio :value="1">用户</a-radio>
          <a-radio :value="2">航空公司</a-radio>
          <a-radio :value="3">管理员</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" style="margin-left: 30%" @click="loginClick"
          >登录</a-button
        >
        <a-button style="margin-left: 20%" @click="registerClick"
          >注册</a-button
        >
      </a-form-model-item>
    </a-form-model>
    <a-modal
      v-model="visible"
      title="注册"
      destroyOnClose
      @ok="registerOk"
      @cancel="registerCancel"
    >
      <a-form-model
        :model="registerForm"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item prop="name" label="用户名">
          <a-input style="width: 100%" v-model="registerForm.name" />
        </a-form-model-item>
        <a-form-model-item prop="mobile" label="手机号">
          <a-input style="width: 100%" v-model="registerForm.mobile" />
        </a-form-model-item>
        <a-form-model-item prop="idCard" label="身份证号">
          <a-input style="width: 100%" v-model="registerForm.idCard" />
        </a-form-model-item>
        <a-form-model-item prop="password" label="密码">
          <a-input-password
            style="width: 100%"
            v-model="registerForm.password"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        name: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        mobile: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
        idCard: [{ required: true, message: '请填写身份证号', trigger: 'blur' }],
        password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
      },
      form: {
        loginName: '',
        password: '',
      },
      registerForm: {
        name: '',
        mobile: '',
        idCard: '',
        password: '',
      },
      user: 1,
      visible: false,
    }
  },
  mounted() {},
  methods: {
    itemChange(event) {
      console.log('[ event ] >', event)
    },
    registerOk() {
      this.$message.success('注册成功')
      
      this.visible = false
      this.registerForm = {
        name: '',
        mobile: '',
        password: '',
      }
    },
    registerCancel() {
      this.$message.error('取消注册')
      this.visible = false
      this.registerForm = {
        name: '',
        mobile: '',
        password: '',
      }
    },
    loginClick() {
      if (this.form.loginName === '' || this.form.password === '') {
        this.$message.error('请填写用户名和密码')
        return
      }
      if (
        this.user === 1 &&
        this.form.loginName === '111' &&
        this.form.password === '111'
      ) {
        this.$router.push({
          name: 'user',
          query: {
            mark: 'owner',
          },
        })
        this.$message.success('登录成功')
      } else if (
        this.user === 2 &&
        this.form.loginName === '222' &&
        this.form.password === '222'
      ) {
        this.$router.push({
          name: 'company',
          query: {
            mark: 'owner',
          },
        })
        this.$message.success('登录成功')
      } else if (
        this.user === 3 &&
        this.form.loginName === '333' &&
        this.form.password === '333'
      ) {
        // this.$router.push({
        //   name: 'user',
        //   query: {
        //     mark: 'owner',
        //   },
        // })
        this.$message.success('登录成功')
      } else {
        this.$message.error('用户名或密码不正确')
      }
    },
    registerClick() {
      this.visible = true
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  margin: 0 auto;
  position: relative;
  top: 20%;
  width: 30%;
}
.login-top {
  margin-bottom: 10px;
  font-size: 32px;
  text-align: center;
  color: #498cff;
}
</style>
