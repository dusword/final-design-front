<template>
  <div id="userManage">
    <el-pagination
        style="height: 30px;float: left"
        background
        layout="prev, pager, next"
        page-size="6"
        :total="total"
        @current-change="page">
    </el-pagination>
    <el-table
        height="800px"
        :data="tableData"
        border
        max-height="800"
        style="width: 100%">
      <el-table-column
          fixed
          prop="userId"
          label="ID"
          style="height: auto"
          width="100">
      </el-table-column>
      <el-table-column
          prop="userName"
          label="用户名"
          width="300">
      </el-table-column>
      <el-table-column
          prop="userPassword"
          label="密码"
          width="200">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
export default {
  name: "Page1",
  methods: {
    handleClick(row) {
      console.log(row);
    },
    page(currentPage) {
      const _this = this
      axios.get(this.GLOBAL.BASE_URL+':8082/user/findUserList/' + currentPage + '/6').then(function (response) {
        console.log(response)
        _this.total = response.data.total
        _this.tableData = response.data.records
      })
    }
  },
  created() {
    const _this = this
    axios.get(this.GLOBAL.BASE_URL+':8082/user/findUserList/1/6').then(function (response) {
      console.log(response)
      _this.total = response.data.total
      _this.tableData = response.data.records
    })
  },
  data() {
    return {
      total: null,
      tableData: null
    }
  }
}
</script>

<style scoped>

</style>
