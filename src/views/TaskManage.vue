<template>
  <div id="taskManage">
    <el-pagination
        style="height: 30px;float: left"
        background
        layout="prev, pager, next"
        page-size="8"
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
          prop="id"
          label="任务编号"
          style="height: auto"
          width="100">
      </el-table-column>
      <el-table-column
          prop="createdTime"
          label="创建时间"
          width="220">
      </el-table-column>
      <el-table-column
          prop="fileName"
          label="文件名"
          width="220">
      </el-table-column>
      <el-table-column
          prop="isPredicted"
          label="完成情况"
          width="100">
      </el-table-column>
      <el-table-column
          prop="predictedFileId"
          label="结果id"
          width="100">
      </el-table-column>
      <el-table-column
          prop="message"
          label="备注"
          width=max>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
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
  </div>

</template>

<script>
export default {
  name: "TaskManage",
  methods: {
    handleClick(row) {
      console.log(row.predictedFileId);
      const predictedFileId =row.predictedFileId
      const _this = this
      axios.get(this.GLOBAL.BASE_URL + ':8082/predict/selectOne/' + predictedFileId).then(function (response) {
        console.log(response)
        if (response.data !== 0) {
          _this.$data.base64 = "data:image/jpeg;base64," + response.data
          _this.$data.dialog1Visible = true
        }else{
          _this.$data.dialog2Visible = true
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    page(currentPage) {
      const _this = this
      axios.get(this.GLOBAL.BASE_URL + ':8082/task/findTaskList/' + currentPage + '/8/' + this.UserId).then(function (response) {
        console.log(response)
        _this.total = response.data.total
        _this.tableData = response.data.records
      })
    }
  },
  created() {
    const _this = this
    axios.get(this.GLOBAL.BASE_URL + ':8082/task/findTaskList/1/8/' + this.UserId).then(function (response) {
      console.log(response)
      _this.total = response.data.total
      _this.tableData = response.data.records
    })
  },
  data() {
    return {
      total: null,
      tableData: null,
      UserId: localStorage.getItem("UserId"),
      responseList: [],
      fileList: [],
      dialog1Visible: false,
      dialog2Visible: false,
      response: null,
      base64: null,
    }
  }
}
</script>

<style scoped>

</style>
