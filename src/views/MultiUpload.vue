<template>
  <el-upload
      class="upload-demo"
      ref="upload"
      action="http://localhost:8082/predict/multiPic"
      :data="{userId:UserId,message:input}"
      multiple
      :limit="10"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :file-list="fileList"
      :auto-upload="false">
    <template #trigger>
      <el-button size="small" type="primary">选取文件</el-button>
    </template>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <el-button style="margin-left: 10px;" size="small" type="danger" @click="deleteFileList">清空列表</el-button>
    <el-input style="margin-top: 10px;"  v-model="input" placeholder="请输入备注"></el-input>
    <template #tip>
      <div class="el-upload__tip">
        最多同时选择10张图片
      </div>
    </template>
  </el-upload>
</template>

<script>
export default {
  name: "MultiUpload",
  data() {
    return {
      input:'',
      UserId: localStorage.getItem("UserId"),
      responseList: [],
      fileList: [],
      dialog1Visible: false,
      dialog2Visible: false,
      response: null,
      base64: null,
    };
  },
  methods: {
    deleteFileList(){
      this.$refs.upload.clearFiles()
    },
    beforeUpload(){
      this.UserId=localStorage.getItem("UserId")
    },
    handleSuccess(response) {
      const _this = this;
      this.responseList = response.data;
      console.log(response);
      this.$message.success('后端返回'+response)
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
  }
}
</script>

<style scoped>

</style>
