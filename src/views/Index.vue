<template>
  <div id="index">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238,241,246)">

        <el-menu router="router" :default-active="$route.path">
          <el-submenu v-for="(route) in $router.options.routes" :key="route.path" :index="route.path">
            <template slot="title"><i class="el-icon-message"></i>{{ route.name }}</template>
            <el-menu-item v-for="(child) in route.children" :key="child.path" :index="child.path">{{
                child.name
              }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container style="color: #eeeeee;">
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px" v-if="UserId == null">此处登录</i>
            <i class="el-icon-setting" style="margin-right: 15px" v-else>用户管理 {{UserId}}</i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="UserId == null">
                <el-button type="primary" style="margin: 5px" @click="dialog1Visible = true">登录</el-button>
              </el-dropdown-item>
              <el-dropdown-item v-else>
                <el-button type="primary" style="margin: 5px" @click="virtualLogout()">登出</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <router-view></router-view>
          <el-dialog
              title="登录界面"
              :visible.sync="dialog1Visible"
              width="60%"
              :before-close="handleClose">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="user_NAME">
                <el-input v-model="loginForm.user_NAME"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="user_PASSWORD">
                <el-input v-model="loginForm.user_PASSWORD" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm1('loginForm')">注册</el-button>
                <el-button type="primary" @click="submitForm2('loginForm')">登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
<!--                <el-button @click="test()">测试</el-button>-->
                <el-checkbox v-model="loginForm.rememberMe" label="记住我" class="rememberMe"></el-checkbox>
              </el-form-item>
            </el-form>
<!--            <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="dialog1Visible=false">取 消</el-button>-->
<!--    <el-button type="primary" @click="dialog1Visible=false">确 定</el-button>-->
<!--  </span>-->
          </el-dialog>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import PredictOne from "./PredictOne";

export default {
  name: "Index",
  created() {
    this.getCookie();
  },
  data() {
    return {
      dialog1Visible: false,
      UserId: localStorage.getItem("UserId"),
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
    getCookie() {
      const username = Cookies.get('username1')
      const password = Cookies.get('password1')
      const rememberMe = Cookies.get('rememberMe1')
      this.loginForm = {
        user_NAME: username === undefined ? this.loginForm.user_NAME : username,
        user_PASSWORD: password === undefined ? this.loginForm.user_PASSWORD : password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    virtualLogin() {
    },
    virtualLogout() {
      localStorage.removeItem("Flag")
      localStorage.setItem("UserId",0)
      this.UserId = null
    },
    submitForm1(formName) {
      console.log("submitForm1")
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.loginForm.rememberMe) {
            Cookies.set('username1', this.loginForm.user_NAME, {expires: 30})
            Cookies.set('password1', this.loginForm.user_PASSWORD, {expires: 30})
            Cookies.set('rememberMe1', this.loginForm.rememberMe, {expires: 30})
            console.log("cookie set")
          } else {
            Cookies.remove('username1')
            Cookies.remove('password1')
            Cookies.remove('rememberMe1')
            console.log("cookie removed")
          }
          const objectUser = {};
          objectUser['userName'] = this.loginForm.user_NAME;
          objectUser['userPassword'] = this.loginForm.user_PASSWORD;
          const user = JSON.stringify(objectUser);
          console.log(user);
          axios.post(
              this.GLOBAL.BASE_URL + ':8082/user/insertUser',
              user,
              {
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                }
              }).then(function (response) {
            console.log(response)
            if (response.data === 0) {
              _this.$message("用户名已存在，请重新输入用户名！")
              _this.resetForm(formName)
            } else {
              _this.$message("注册成功！正在登陆")
              _this.submitForm2(formName)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForm2(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.loginForm.rememberMe) {
            Cookies.set('username1', this.loginForm.user_NAME, {expires: 30})
            Cookies.set('password1', this.loginForm.user_PASSWORD, {expires: 30})
            Cookies.set('rememberMe1', this.loginForm.rememberMe, {expires: 30})
            console.log("cookie set")
          } else {
            Cookies.remove('username1')
            Cookies.remove('password1')
            Cookies.remove('rememberMe1')
            console.log("cookie removed")
          }
          const objectUser = {};
          objectUser['userName'] = this.loginForm.user_NAME;
          objectUser['userPassword'] = this.loginForm.user_PASSWORD;
          const user = JSON.stringify(objectUser);
          console.log(user);
          axios.post(
              this.GLOBAL.BASE_URL + ':8082/user/checkUser',
              user,
              {
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                }
              }).then((response) => {
            console.log(response)
            if (response.data !== 0) {
              this.$store.dispatch("userLogin", true);
              //Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存
              //我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。
              localStorage.setItem("Flag", "isLogin");
              localStorage.setItem("UserId", response.data.userId);
              localStorage.setItem("Authority", response.data.authority);
              console.log("UserId:" + localStorage.getItem("UserId"))
              _this.$message("UserId:" + localStorage.getItem("UserId") + " 登陆成功！")
              _this.$data.dialog1Visible = false;
              _this.UserId=localStorage.getItem("UserId");
            } else {
              _this.$message("登陆失败！")
              console.log('error submit!!');
              return false;
            }
          })
        } else {
          _this.$message("登陆失败！")
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    test() {
      this.virtualLogin()
      console.log("This is a test!")
      console.log(this.loginForm)
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

/*.el-header, .el-footer {*/
/*  background-color: #B3C0D1;*/
/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 60px;*/
/*}*/

/*.el-aside {*/
/*  background-color: #D3DCE6;*/
/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 200px;*/
/*}*/

/*.el-main {*/
/*  background-color: #E9EEF3;*/
/*  color: #333;*/
/*  text-align: center;*/
/*  line-height: 160px;*/
/*}*/

/*body > .el-container {*/
/*  margin-bottom: 40px;*/
/*}*/

/*.el-container:nth-child(5) .el-aside,*/
/*.el-container:nth-child(6) .el-aside {*/
/*  line-height: 260px;*/
/*}*/

/*.el-container:nth-child(7) .el-aside {*/
/*  line-height: 320px;*/
/*}*/
</style>
