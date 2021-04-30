<template>
  <div id="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="user_NAME">
        <el-input v-model="loginForm.user_NAME"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="user_PASSWORD">
        <el-input v-model="loginForm.user_PASSWORD"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">注册</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
        <el-button @click="test()">测试</el-button>
        <el-checkbox v-model="loginForm.rememberMe" label="记住我" class="rememberMe"></el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import Cookies from 'js-cookie'
export default {
  name: "Login",
  created() {
    this.getCookie();
  },
  data() {
    return {
      loginForm: {
        user_NAME: '',
        user_PASSWORD: '',
        rememberMe: false,
      },
      rules: {
        user_NAME: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ],
        user_PASSWORD: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    getCookie () {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        user_NAME: username === undefined ? this.loginForm.user_NAME : username,
        user_PASSWORD: password === undefined ? this.loginForm.user_PASSWORD : password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    submitForm(formName) {
      const _this=this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.loginForm.rememberMe) {
            Cookies.set('username', this.loginForm.user_NAME, { expires: 30 })
            Cookies.set('password', this.loginForm.user_PASSWORD, { expires: 30 })
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          const objectUser = {};
          objectUser['user_NAME'] = this.loginForm.user_NAME;
          objectUser['user_PASSWORD'] = this.loginForm.user_PASSWORD;
          const  user = JSON.stringify(objectUser);
          console.log(user);
          axios.post(
              this.GLOBAL.BASE_URL+':8082/user/saveUser',
              user,
              {
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                }
              }).then(function (response){
            console.log(response)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    test(){
      console.log("This is a test!")
      console.log(this.loginForm)
    }
  }
}
</script>


<style scoped>

</style>
