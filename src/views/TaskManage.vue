<template>
  <div id="taskManage">


      <el-input style="margin-left: 10px;width: 500px"  v-model="input" placeholder="请输入查询备注"></el-input>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="search">查询</el-button>
      <el-button style="margin-left: 10px;" size="small" type="danger" @click="endSearch">取消搜索</el-button>

    <el-pagination
        style="height: 30px;float: right"
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
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
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
    <el-dialog
        title="请确认是否删除"
        :visible.sync="dialog3Visible"
        width="60%"
        :before-close="handleClose">
      <span></span>
      您将要删除编号为{{this.$data.handlePredictedFileId}}的任务
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog3Visible = false">取 消</el-button>
    <el-button type="primary" @click="handleDeleteDo()">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: "TaskManage",
  methods: {
    test(){
        this.$message(localStorage.getItem("Authority"))
    },
    endSearch(){
      const _this = this
      axios.get(this.GLOBAL.BASE_URL + ':8082/task/findTaskList/1/8/' + this.UserId+'/'+localStorage.getItem("Authority")).then(function (response) {
        console.log(response)
        _this.total = response.data.total
        _this.tableData = response.data.records
      })
      _this.input=''
    },
    search(){
      const _this = this
      axios.get(this.GLOBAL.BASE_URL + ':8082/task/findTaskList/1/8/' + this.UserId+'/'+this.input+'/'+localStorage.getItem("Authority")).then(function (response) {
        console.log(response)
        _this.total = response.data.total
        _this.tableData = response.data.records
      })
    },
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
    handleDelete(row){
      console.log(row.predictedFileId);
      this.$data.handlePredictedFileId=row.predictedFileId;
      this.$data.dialog3Visible=true;
    },
    handleDeleteDo(){
      const _this = this
      console.log(this.handlePredictedFileId)
      axios.post(this.GLOBAL.BASE_URL + ':8082/task/deleteTask/' + this.handlePredictedFileId).then(function (response) {
        console.log(response)
        if (response.data === 1){
          _this.$message.success("删除成功！")
          _this.page(_this.currentPage)
          _this.dialog3Visible=false
        }else {
          _this.$message.success("删除失败！")
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
      axios.get(this.GLOBAL.BASE_URL + ':8082/task/findTaskList/' + currentPage + '/8/' + this.UserId+'/'+this.input+'/'+localStorage.getItem("Authority")).then(function (response) {
        console.log(response)
        _this.total = response.data.total
        _this.tableData = response.data.records
        _this.currentPage=currentPage
      })
    }
  },
  created() {
    const _this = this
    axios.get(this.GLOBAL.BASE_URL + ':8082/task/findTaskList/1/8/' + this.UserId+'/'+localStorage.getItem("Authority")).then(function (response) {
      console.log(response)
      _this.total = response.data.total
      _this.tableData = response.data.records
    })
  },
  data() {
    return {
      input:'',
      total: null,
      tableData: null,
      UserId: localStorage.getItem("UserId"),
      responseList: [],
      fileList: [],
      dialog1Visible: false,
      dialog2Visible: false,
      dialog3Visible: false,
      handlePredictedFileId: null,
      response: null,
      base64: null,
      currentPage: 1,
    }
  }
}
</script>

<style scoped>

</style>
