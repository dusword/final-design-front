<template>
  <el-upload
      ref="upload"
      :limit="1"
      :auto-upload="false"
      :file-list="fileList"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      action="http://localhost:8082/upload_image"
      class="upload-demo">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button size="small" style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
    <div slot="tip" class="el-upload__tip">只能上传1个jpg/png文件</div>
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
      this.$message.success('图片上传成功')
    },
    submitUpload() {
      this.$refs.upload.submit();
      // let formData = new FormData();
      // formData.append('file', this.file);
      // this.$axios.post('http://localhost:8082/upload_image', formData).then(function (response) {
      //   console.log(response);
      // })
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
