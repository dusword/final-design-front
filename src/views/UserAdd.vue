<template>
  <div id="userAdd">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="user_NAME">
        <el-input v-model="ruleForm.user_NAME"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="user_PASSWORD">
        <el-input v-model="ruleForm.user_PASSWORD"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="test()">测试</el-button>
        <el-checkbox v-model="ruleForm.rememberMe" label="记住我" class="rememberMe"></el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import Cookies from 'js-cookie'
export default {
  name: "UserAdd",
  created() {
    this.getCookie();
  },
  data() {
    return {
      ruleForm: {
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
      this.ruleForm = {
        user_NAME: username === undefined ? this.ruleForm.user_NAME : username,
        user_PASSWORD: password === undefined ? this.ruleForm.user_PASSWORD : password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    submitForm(formName) {
      const _this=this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.rememberMe) {
            Cookies.set('username', this.ruleForm.user_NAME, { expires: 30 })
            Cookies.set('password', this.ruleForm.user_PASSWORD, { expires: 30 })
            Cookies.set('rememberMe', this.ruleForm.rememberMe, { expires: 30 })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }
          const objectUser = {};
          objectUser['user_NAME'] = this.ruleForm.user_NAME;
          objectUser['user_PASSWORD'] = this.ruleForm.user_PASSWORD;
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
            _this.$message.success('添加成功')
          })
        } else {
          console.log('error submit!!');
          this.$message.success('添加失败')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    test(){
      console.log("This is a test!")
      console.log(this.ruleForm)
    }
  }
}
</script>


<style scoped>

</style>
