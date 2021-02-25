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
          prop="user_ID"
          label="ID"
          style="height: auto"
          width="150">
      </el-table-column>
      <el-table-column
          prop="user_NAME"
          label="用户名"
          width="500">
      </el-table-column>
      <el-table-column
          prop="user_PASSWORD"
          label="密码"
          width="300">
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
      axios.get('http://localhost:8081/user/findAll/' + currentPage + '/6').then(function (response) {
        console.log(response)
        _this.total = response.data.totalElements
        _this.tableData = response.data.content
      })
    }
  },
  created() {
    const _this = this
    axios.get("http://localhost:8081/user/findAll/1/6").then(function (response) {
      console.log(response)
      _this.total = response.data.totalElements
      _this.tableData = response.data.content
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
