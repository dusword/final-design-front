<template>
  <el-container>
    <el-upload
        class="upload-demo"
        drag
        action="http://localhost:8082/predict/onePic"
        :data="{userId:UserId}"
        :before-upload="beforeUpload"
        :on-success="handleSuccess">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传1张jpg文件</div>
    </el-upload>

    <el-dialog
        title="分析结果"
        :visible.sync="dialog1Visible"
        width="60%"
        :before-close="handleClose">
      <span></span>
      <img :src="base64" alt="图片未上传" style="position: center"/>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog1Visible = false">取 消</el-button>
    <el-button type="primary" @click="dialog1Visible = false">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
        title="分析结果"
        :visible.sync="dialog2Visible"
        width="60%"
        :before-close="handleClose">
      <span></span>
      二分检测结果为：阴性
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog2Visible = false">取 消</el-button>
    <el-button type="primary" @click="dialog2Visible = false">确 定</el-button>
  </span>
    </el-dialog>

  </el-container>

</template>

<script>
export default {
  name: "PredictOne",
  data() {
    return {
      UserId: 0,
      responseList: [],
      fileList: [],
      dialog1Visible: false,
      dialog2Visible: false,
      response: null,
      base64: null,
    };
  },
  methods: {
    beforeUpload(){
      console.log("localStorage:"+localStorage.getItem("UserId"))
      console.log("UserId:"+this.UserId)
      this.UserId=localStorage.getItem("UserId")
      console.log("localStorage:"+localStorage.getItem("UserId"))
      console.log("UserId:"+this.UserId)
    },
    handleSuccess(response) {
      const _this = this;
      this.responseList = response.data;
      console.log(response)
      this.$message.success('图片分析成功')
      this.$data.response = response
      // console.log(response.base64_result)
      console.log(response.final_result)
      if (this.response.final_result === 1) {
        this.$data.dialog2Visible = true
      } else if (this.response.final_result === 0) {
        this.$data.base64 = "data:image/jpeg;base64," + response.base64_result
        this.$data.dialog1Visible = true
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    }
  }
}
</script>

<style scoped>

</style>
