<template>
  <el-container>
  <el-upload
      class="upload-demo"
      drag
      action="http://localhost:8082/upload_image"
      :on-success="handleSuccess"
      multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传1张jpg文件</div>
      <!--      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>-->
  </el-upload>

  <el-dialog
      title="分析结果"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
    <span></span>
    <img :src="base64" alt="图片未上传" />
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>

  </el-container>

</template>

<script>
export default {
  name: "Testtest",
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      response:null,
      base64:null
    };
  },
  methods: {
    handleSuccess(response) {
      console.log(response)
      this.$message.success('图片分析成功')
      this.$data.dialogVisible = true
      this.$data.response=response
      this.$data.base64="data:image/jpeg;base64,"+response
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
