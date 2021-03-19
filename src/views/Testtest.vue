<template>
  <el-upload
      class="upload-demo"
      drag
      action="http://localhost:8082/upload_image"
      :on-success="handleSuccess"
      multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传1张jpg文件</div>
  </el-upload>

</template>

<script>
export default {
  name: "Testtest",
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    handleSuccess(response){
      console.log(response)
      this.$message.success('图片分析成功'+response)
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
}
</script>

<style scoped>

</style>
