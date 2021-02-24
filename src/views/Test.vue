<template>
  <div id="test">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="ItemNum" prop="ItemNum">
        <el-input v-model="ruleForm.ItemNum"></el-input>
      </el-form-item>
      <el-form-item label="QueryType" prop="QueryType">
        <el-input v-model="ruleForm.Condition.QueryType"></el-input>
      </el-form-item>
      <el-form-item label="LogicFlag" prop="LogicFlag">
        <el-input v-model="ruleForm.Condition.LogicFlag"></el-input>
      </el-form-item>
      <el-form-item label="QueryData" prop="QueryData">
        <el-input v-model="ruleForm.Condition.QueryData"></el-input>
      </el-form-item>
      <el-form-item label="QueryCount" prop="PageFirstRowNumber">
        <el-input v-model="ruleForm.QueryCount"></el-input>
      </el-form-item>
      <el-form-item label="PageFirstRowNumber" prop="PageFirstRowNumber">
        <el-input v-model="ruleForm.PageFirstRowNumber"></el-input>
      </el-form-item>
      <el-form-item label="PageRowNumber" prop="PageRowNumber">
        <el-input v-model="ruleForm.PageRowNumber"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="test()">测试</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      ruleForm: {
        ItemNum: 4,
        Condition:{
          QueryType:256,
          LogicFlag:0,
          QueryData:'31'
        },
        QueryCount:1,
        PageFirstRowNumber:0,
        PageRowNumber:3,
      },
    };
  },
  methods: {
    submitForm(formName) {
      const _this=this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const object = {};
          const objectCon ={};

          objectCon['QueryType']=this.ruleForm.Condition.QueryType;
          objectCon['LogicFlag']=this.ruleForm.Condition.LogicFlag;
          objectCon['QueryData']=this.ruleForm.Condition.QueryData;

          object['ItemNum']=this.ruleForm.ItemNum;
          object['Condition']=objectCon;
          object['QueryCount']=this.ruleForm.QueryCount;
          object['PageFirstRowNumber']=this.ruleForm.PageFirstRowNumber;
          object['PageRowNumber']=this.ruleForm.PageRowNumber;

          const  json = JSON.stringify(object);
          console.log(json);
          axios.post(
              "http://localhost:8081/result/saveResult",
              json,
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
      console.log(this.ruleForm)
    }
  }
}
</script>

<style scoped>

</style>
