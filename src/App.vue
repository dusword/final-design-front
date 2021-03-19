<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>

</style>

<script>
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: 'lxj',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
    }

  },
};
</script>
