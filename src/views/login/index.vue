<template>
  <div class="login">
    <div class="login-top">登录</div>
    <a-form-model ref="ruleForm"
                  :model="form"
                  :rules="rules">
      <a-form-model-item>
        <a-input v-model="form.loginName"
                 placeholder="手机号码或身份证">
          <a-icon slot="prefix"
                  type="user"
                  style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input v-model="form.password"
                 type="password"
                 placeholder="密码">
          <a-icon slot="prefix"
                  type="lock"
                  style="color: rgba(0, 0, 0, 0.25)" />
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-radio-group v-model="user"
                       style="margin-left: 30%"
                       @change="itemChange">
          <a-radio :value="1">用户</a-radio>
          <a-radio :value="2">航空公司</a-radio>
          <a-radio :value="3">管理员</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary"
                  :class="user === 1 ? 'marLeft30' : 'marLeft50'"
                  @click="loginClick">登录</a-button>
        <a-button v-if="user === 1"
                  style="margin-left: 20%"
                  @click="registerClick">注册</a-button>
      </a-form-model-item>
    </a-form-model>
    <a-modal v-model="visible"
             title="注册"
             destroyOnClose
             @ok="registerOk"
             @cancel="registerCancel">
      <a-form-model :model="registerForm"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol">
        <a-form-model-item prop="name"
                           label="姓名">
          <a-input style="width: 100%"
                   v-model="registerForm.name" />
        </a-form-model-item>
        <a-form-model-item prop="mobile"
                           label="手机号">
          <a-input style="width: 100%"
                   v-model="registerForm.mobile" />
        </a-form-model-item>
        <a-form-model-item prop="idCard"
                           label="身份证号">
          <a-input style="width: 100%"
                   v-model="registerForm.idCard" />
        </a-form-model-item>
        <a-form-model-item prop="password"
                           label="密码">
          <a-input-password style="width: 100%"
                            v-model="registerForm.password" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        name: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        mobile: [{ required: true, message: '请填写手机号', trigger: 'blur' }],
        idCard: [
          { required: true, message: '请填写身份证号', trigger: 'blur' },
        ],
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
      userList: [],
      companyList: [],
    }
  },
  mounted () {
    this.selectLogin(1)
    this.selectLogin(2)
  },
  methods: {
    async selectLogin (type = 1) {
      const params = {
        type
      }
      const { data } = await this.axios.post('/api/Air/selectLogin', params)
      if (data.msg === '请求成功') {
        if (type === 1) {
          this.userList = data.data
        } else {
          this.companyList = data.data
        }
      } else {
        this.$message.error(data.msg)
      }
    },
    itemChange (event) {
      console.log('[ event ] >', event)
    },
    registerOk () {
      const params = {
        id:
          'US' +
          new Date().getTime() +
          String(Math.round(Math.random() * 10000)),
        name: this.registerForm.name,
        password: this.registerForm.password,
        mobile: this.registerForm.mobile,
        idCard: this.registerForm.idCard,
        level: 1,
        money: 0,
        state: 1,
      }
      this.axios.post('/api/Air/registerUser', params).then(({ data }) => {
        console.log('[ data ] >', data)
        if (data.msg === '请求成功') {
          this.$message.success('注册成功')
          this.visible = false
          this.registerForm = {
            name: '',
            mobile: '',
            idCard: '',
            password: '',
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    registerCancel () {
      this.$message.error('取消注册')
      this.visible = false
      this.registerForm = {
        name: '',
        mobile: '',
        idCard: '',
        password: '',
      }
    },
    loginClick () {
      if (this.form.loginName === '' || this.form.password === '') {
        this.$message.error('请填写用户名和密码')
        return
      }
      const params = {
        loginName: this.form.loginName,
        password: this.form.password,
        level: parseInt(this.user),
      }
      console.log('[ params ] >', params)
      if (this.user === 2) {
        // /api/Air/comLogin
        this.axios.post('/api/Air/comLogin', params).then(({ data }) => {
          if (data.msg === '请求成功') {
            this.$message.success('登录成功')
            let find = this.companyList.find(it => it.idCard === this.form.loginName || it.mobile === this.form.loginName)
            if (!find) {
              this.$message.error("该账户无登录权限")
              return
            }
            window.sessionStorage.setItem('user', JSON.stringify(data.data[0]))
            this.$router.push({
              name: 'company',
              query: {
                mark: 'owner',
              },
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.axios.post('/api/Air/login', params).then(({ data }) => {
          console.log('[ data ] >', data)
          if (data.msg === '请求成功') {
            let find = this.userList.find(it => it.idCard === this.form.loginName || it.mobile === this.form.loginName)
            if (!find) {
              this.$message.error("该账户无登录权限")
              return
            }
            this.$message.success('登录成功')
            window.sessionStorage.setItem('user', JSON.stringify(data.data[0]))
            if (this.user === 1) {
              this.$router.push({
                name: 'user',
                query: {
                  mark: 'owner',
                },
              })
            } else if (this.user === 3) {
              this.$router.push({
                name: 'admin',
                query: {
                  mark: 'owner',
                },
              })
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    registerClick () {
      this.visible = true
    },
  },
}
</script>

<style lang="less" scoped>
@import url("../current.less");
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
.marLeft30 {
  margin-left: 30%;
}
.marLeft50 {
  margin-left: 45%;
}
</style>
