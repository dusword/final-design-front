<template>

</template>

<script>
const BASE_URL = 'http://localhost';
// const BASE_URL = 'http://152.136.120.171'; // 设置全局 URL
const predictUrl = "http://152.136.120.171:5000/upload_image";

let baseUrl = {
  predictUrl
}
export default {
  BASE_URL,
  name: "Base",
  baseUrl,
}
</script>

<style scoped>

</style>
