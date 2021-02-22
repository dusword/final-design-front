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
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  name: "UserAdd",
  data() {
    return {
      ruleForm: {
        user_NAME: '',
        user_PASSWORD: '',
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
    submitForm(formName) {
      const _this=this
      this.$refs[formName].validate((valid) => {
        if (valid) {

          const object = {};

          object['user_NAME'] = this.ruleForm.user_NAME;
          object['user_PASSWORD'] = this.ruleForm.user_PASSWORD;


          const json = JSON.stringify(object);
          console.log(json)
          console.log(this.ruleForm)
          alert('submit!');
          axios.post("http://localhost:8081/user/saveUser",json).then(function (response){
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
      console.log(this.ruleForm)
    }
  }
}
</script>


<style scoped>

</style>
