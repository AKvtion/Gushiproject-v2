<template>
  <div class="gushiList">
    <!-- 查询、重置 -->
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item label="作者">
        <el-input
          v-model="formInline.name"
          placeholder="请输入作者查询"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find" round>查询</el-button>
      </el-form-item>
            <el-form-item>
        <el-button type="success" @click="addPoetry" round>新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="reset" round>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 1: 1-10 2: 11-20 slice((当前页数 - 1)*每页条数, 当前页数*当前条数)-->
    <!-- <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%"> -->
    <el-table :data="compData" border style="width: 100%">
      <el-table-column label="序号" width="50px" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="id" label="序号" align="center">
      </el-table-column> -->
      <el-table-column prop="title" width="400px" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="author" width="90px" label="作者" align="center">
      </el-table-column>
      <el-table-column prop="content" label="内容" align="center">
      </el-table-column>
      <el-table-column prop="tslt" label="解释" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="edit(scope.row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗 -->
    <el-dialog :title="state ? '添加古诗信息' : '修改古诗信息'" :visible.sync="dialogFormVisible" width="900px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <el-input :autosize="{ minRows: 2, maxRows: 8}" type="textarea" v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="解释" :label-width="formLabelWidth" prop="tslt">
          <el-input :autosize="{ minRows: 2, maxRows: 8}" type="textarea" v-model="form.tslt" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeInfo('form')">取 消</el-button>
        <el-button type="primary" @click="sure('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 底部分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5, 10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import { queryAllSentence,sentenceOne,sentenceAdd,sentenceEdit,sentenceDel } from "@/api/sentenceApi.js";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页数
      pageSize: 10, // 每页显示条数
      total: 0, // 总条数
      form: {
        title: "",
        author: "",
        content: "",
        tslt: "",
      },
      formInline: {
        name: "",
      },
      formLabelWidth: "80px",
      rules: {
        title: [{required: true, message: '请输入标题'}],
        author: [{required: true, message: '请输入作者'}],
        content: [{required: true, message: '请输入内容'}],
        tslt: [{required: true, message: '请输入译文'}],
      },
      state: true,
      dialogFormVisible: false,
    };
  },
  created() {
    this.getData();
  },
  computed: {
    compData() {
      return this.tableData.slice(
        (this.currentPage - 1 ) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    edit(row) {
      console.log(row)
      this.form = {...row}
      this.state = false
      this.dialogFormVisible = true
    },
    closeInfo(form) {
      console.log(form)
      this.$refs[form].resetFields()
      this.dialogFormVisible = false
    },
    find() {
      console.log(this.formInline);
      this.getDataOne(this.formInline)
    },
    reset() {
      console.log(this.formInline);
      this.formInline = {}
      this.getData(this.formInline)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    getDataOne(params){
      sentenceOne(params).then((res) => {
        if (res.data.code === 200) {
          console.log('res.data.data :>> ', res.data.data);
          this.tableData = res.data.data.data;
          this.total = res.data.data.data.total;
        }
      });
    },
    getData(params) {
      queryAllSentence(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;

        }
      });
    },
    sure(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if(this.state) {
          sentenceAdd(this.form).then(res => {
              if(res.data.code === 200) {
                this.getData()
                this.dialogFormVisible = false
                this.$message({type: 'success', message: res.data.message})
              }
            })
          } else {
            sentenceEdit(this.form).then(res => {
              if(res.data.code === 200) {
                this.getData()
                this.dialogFormVisible = false
                this.$message({type: 'success', message: res.data.data.message})
              }
            })
          }
        }
      })
    },
    del(row) {
      console.log(row);
      this.$alert('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          sentenceDel(row.id).then(res => {
            if(res.data.code === 200) {
              this.getData()
              this.$message({message: res.data.message, type: 'success'})
              this.getData();
            }
          })
        }
      })
    },
    addPoetry() {
      this.form = {
        title: "",
        author: "",
        country: "",
        content: "",
        tslt: "",
        comment:  "",
        appreciation:""
      }
      this.state = true
      this.dialogFormVisible = true
    },
  },
};
</script>
<style lang="scss">
.gushiList {
  .demo-form-inline,.el-form-item {
    text-align: left;
  }
  .el-pagination {
    text-align: left;
    margin-top: 20px;
  }
}
</style>