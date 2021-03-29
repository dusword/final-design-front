<template>
  <div id="resultSend">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">发送</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="test()">测试</el-button>
      </el-form-item>

      <el-form-item label="errmsg" prop="errmsg">
        <el-input v-model="ruleForm.errmsg"></el-input>
      </el-form-item>
      <el-form-item label="errcode" prop="errcode">
        <el-input v-model="ruleForm.errcode"></el-input>
      </el-form-item>
      <el-form-item label="totalrownum" prop="totalrownum">
        <el-input v-model="ruleForm.result.rsppageinfo.totalrownum"></el-input>
      </el-form-item>
      <el-form-item label="rownum" prop="rownum">
        <el-input v-model="ruleForm.result.rsppageinfo.totalrownum"></el-input>
      </el-form-item>
      <el-form-item label="reserve" prop="reserve">
        <el-input v-model="ruleForm.result.infolist.reserve"></el-input>
      </el-form-item>
      <el-form-item label="resbindcode" prop="resbindcode">
        <el-input v-model="ruleForm.result.infolist.resbindcode"></el-input>
      </el-form-item>
      <el-form-item label="isbind" prop="isbind">
        <el-input v-model="ruleForm.result.infolist.isbind"></el-input>
      </el-form-item>
      <el-form-item label="iscamincomplexipc" prop="iscamincomplexipc">
        <el-input v-model="ruleForm.result.infolist.iscamincomplexipc"></el-input>
      </el-form-item>
      <el-form-item label="resattribute" prop="resattribute">
        <el-input v-model="ruleForm.result.infolist.resattribute"></el-input>
      </el-form-item>
      <el-form-item label="issuperipc" prop="issuperipc">
        <el-input v-model="ruleForm.result.infolist.issuperipc"></el-input>
      </el-form-item>
      <el-form-item label="orgname" prop="orgname">
        <el-input v-model="ruleForm.result.infolist.orgname"></el-input>
      </el-form-item>
      <el-form-item label="rescode" prop="rescode">
        <el-input v-model="ruleForm.result.infolist.resitemv1.rescode"></el-input>
      </el-form-item>
      <el-form-item label="resextstatus" prop="resextstatus">
        <el-input v-model="ruleForm.result.infolist.resitemv1.resextstatus"></el-input>
      </el-form-item>
      <el-form-item label="orgcode" prop="orgcode">
        <el-input v-model="ruleForm.result.infolist.resitemv1.orgcode"></el-input>
      </el-form-item>
      <el-form-item label="resstatus" prop="resstatus">
        <el-input v-model="ruleForm.result.infolist.resitemv1.resstatus"></el-input>
      </el-form-item>
      <el-form-item label="resisbeshare" prop="resisbeshare">
        <el-input v-model="ruleForm.result.infolist.resitemv1.resisbeshare"></el-input>
      </el-form-item>
      <el-form-item label="resisforeign" prop="resisforeign">
        <el-input v-model="ruleForm.result.infolist.resitemv1.resisforeign"></el-input>
      </el-form-item>
      <el-form-item label="streamnum" prop="streamnum">
        <el-input v-model="ruleForm.result.infolist.resitemv1.streamnum"></el-input>
      </el-form-item>
      <el-form-item label="resname" prop="resname">
        <el-input v-model="ruleForm.result.infolist.resitemv1.resname"></el-input>
      </el-form-item>
      <el-form-item label="ressubtype" prop="ressubtype">
        <el-input v-model="ruleForm.result.infolist.resitemv1.ressubtype"></el-input>
      </el-form-item>
      <el-form-item label="restype" prop="restype">
        <el-input v-model="ruleForm.result.infolist.resitemv1.restype"></el-input>
      </el-form-item>
      <el-form-item label="hasbrdsubres" prop="hasbrdsubres">
        <el-input v-model="ruleForm.result.infolist.hasbrdsubres"></el-input>
      </el-form-item>
      <el-form-item label="devencodeset" prop="devencodeset">
        <el-input v-model="ruleForm.result.infolist.devencodeset"></el-input>
      </el-form-item>
      <el-form-item label="voicestatus" prop="voicestatus">
        <el-input v-model="ruleForm.result.infolist.voicestatus"></el-input>
      </el-form-item>
      <el-form-item label="subtypeofsubtype" prop="subtypeofsubtype">
        <el-input v-model="ruleForm.result.infolist.subtypeofsubtype"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  name: "ResultSend",
  data() {
    return {
      ruleForm: {
        errmsg: "OK",
        errcode: 0,
        result: {
          rsppageinfo: {
            totalrownum: 43,
            rownum: 1
          },
          infolist: {
            reserve: "ECPA",
            resbindcode: "",
            isbind: 0,
            iscamincomplexipc: 0,
            resattribute: 0,
            issuperipc: 0,
            orgname: "本域",
            resitemv1: {
              rescode: "ECPAGIMOSCODE",
              resextstatus: 0,
              orgcode: "iccsid",
              resstatus: 1,
              resisbeshare: 0,
              resisforeign: 0,
              streamnum: 0,
              resname: "EC_PAG",
              ressubtype: 1015,
              restype: 15
            },
            hasbrdsubres: 0,
            devencodeset: 0,
            voicestatus: 0,
            subtypeofsubtype: 0
          }
        },
      },
      rules: {
        errmsg: [
          { required: false, message: '请输入活动名称', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const object = {};
          const objectresult ={};
          const objectrsppageinfo={};
          const objectinfolist={};
          const objectresitemv1={};

          object['errmsg']=this.ruleForm.errmsg;
          object['errcode']=this.ruleForm.errcode;
          object['result']=this.ruleForm.result;
          objectresult['rsppageinfo']=this.ruleForm.result.rsppageinfo;
          objectrsppageinfo['totalrownum']=this.ruleForm.result.rsppageinfo.totalrownum;
          objectrsppageinfo['rownum']=this.ruleForm.result.rsppageinfo.rownum;
          objectresult['infolist']=this.ruleForm.result.infolist;
          objectinfolist['reserve']=this.ruleForm.result.infolist.reserve;
          objectinfolist['resbindcode']=this.ruleForm.result.infolist.resbindcode;
          objectinfolist['isbind']=this.ruleForm.result.infolist.isbind;
          objectinfolist['iscamincomplexipc']=this.ruleForm.result.infolist.iscamincomplexipc;
          objectinfolist['resattribute']=this.ruleForm.result.infolist.resattribute;
          objectinfolist['issuperipc']=this.ruleForm.result.infolist.issuperipc;
          objectinfolist['orgname']=this.ruleForm.result.infolist.orgname;
          objectinfolist['resitemv1']=this.ruleForm.result.infolist.resitemv1;
          objectresitemv1['rescode']=this.ruleForm.result.infolist.resitemv1.rescode;
          objectresitemv1['resextstatus']=this.ruleForm.result.infolist.resitemv1.resextstatus;
          objectresitemv1['orgcode']=this.ruleForm.result.infolist.resitemv1.orgcode;
          objectresitemv1['resstatus']=this.ruleForm.result.infolist.resitemv1.resstatus;
          objectresitemv1['resisbeshare']=this.ruleForm.result.infolist.resitemv1.resisbeshare;
          objectresitemv1['resisforeign']=this.ruleForm.result.infolist.resitemv1.resisforeign;
          objectresitemv1['streamnum']=this.ruleForm.result.infolist.resitemv1.streamnum;
          objectresitemv1['resname']=this.ruleForm.result.infolist.resitemv1.resname;
          objectresitemv1['ressubtype']=this.ruleForm.result.infolist.resitemv1.ressubtype;
          objectresitemv1['restype']=this.ruleForm.result.infolist.resitemv1.restype;
          objectinfolist['hasbrdsubres']=this.ruleForm.result.infolist.hasbrdsubres;
          objectinfolist['devencodeset']=this.ruleForm.result.infolist.devencodeset;
          objectinfolist['voicestatus']=this.ruleForm.result.infolist.voicestatus;
          objectinfolist['subtypeofsubtype']=this.ruleForm.result.infolist.subtypeofsubtype;

          const  json = JSON.stringify(object);
          console.log(json);


          axios.post(
              this.GLOBAL.BASE_URL+':8082/result/saveResult',
              json,
              {
                headers: {
                  'Content-Type': 'application/json;charset=UTF-8'
                }
              }).then(function (response) {
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
    test() {
      const object = {};
      const objectresult ={};
      const objectrsppageinfo={};
      const objectinfolist={};
      const objectresitemv1={};

      object['errmsg']=this.ruleForm.errmsg;
      object['errcode']=this.ruleForm.errcode;
      object['result']=this.ruleForm.result;
      objectresult['rsppageinfo']=this.ruleForm.result.rsppageinfo;
      objectrsppageinfo['totalrownum']=this.ruleForm.result.rsppageinfo.totalrownum;
      objectrsppageinfo['rownum']=this.ruleForm.result.rsppageinfo.rownum;
      objectresult['infolist']=this.ruleForm.result.infolist;
      objectinfolist['reserve']=this.ruleForm.result.infolist.reserve;
      objectinfolist['resbindcode']=this.ruleForm.result.infolist.resbindcode;
      objectinfolist['isbind']=this.ruleForm.result.infolist.isbind;
      objectinfolist['iscamincomplexipc']=this.ruleForm.result.infolist.iscamincomplexipc;
      objectinfolist['resattribute']=this.ruleForm.result.infolist.resattribute;
      objectinfolist['issuperipc']=this.ruleForm.result.infolist.issuperipc;
      objectinfolist['orgname']=this.ruleForm.result.infolist.orgname;
      objectinfolist['resitemv1']=this.ruleForm.result.infolist.resitemv1;
      objectresitemv1['rescode']=this.ruleForm.result.infolist.resitemv1.rescode;
      objectresitemv1['resextstatus']=this.ruleForm.result.infolist.resitemv1.resextstatus;
      objectresitemv1['orgcode']=this.ruleForm.result.infolist.resitemv1.orgcode;
      objectresitemv1['resstatus']=this.ruleForm.result.infolist.resitemv1.resstatus;
      objectresitemv1['resisbeshare']=this.ruleForm.result.infolist.resitemv1.resisbeshare;
      objectresitemv1['resisforeign']=this.ruleForm.result.infolist.resitemv1.resisforeign;
      objectresitemv1['streamnum']=this.ruleForm.result.infolist.resitemv1.streamnum;
      objectresitemv1['resname']=this.ruleForm.result.infolist.resitemv1.resname;
      objectresitemv1['ressubtype']=this.ruleForm.result.infolist.resitemv1.ressubtype;
      objectresitemv1['restype']=this.ruleForm.result.infolist.resitemv1.restype;
      objectinfolist['hasbrdsubres']=this.ruleForm.result.infolist.hasbrdsubres;
      objectinfolist['devencodeset']=this.ruleForm.result.infolist.devencodeset;
      objectinfolist['voicestatus']=this.ruleForm.result.infolist.voicestatus;
      objectinfolist['subtypeofsubtype']=this.ruleForm.result.infolist.subtypeofsubtype;

      const  json = JSON.stringify(object);
      console.log(json);
    }
  }
}
</script>

<style scoped>

</style>
