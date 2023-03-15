<template>
  <div class="infoList">
    <el-form
      :inline="true"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item>
        <el-button type="primary" @click="addStudent">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center">
      </el-table-column>
      <el-table-column prop="author" label="作者" align="center">
      </el-table-column>
      <el-table-column prop="country" label="朝代" align="center">
      </el-table-column>
      <el-table-column prop="content" label="内容" align="center">
      </el-table-column>
      <el-table-column prop="tslt" label="译文" align="center">
      </el-table-column>
      <el-table-column prop="comment" label="注释" align="center">
      </el-table-column>
      <el-table-column prop="appreciation" label="赏析" align="center">
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            icon="el-icon-edit"
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="state ? '添加学生信息' : '修改学生信息'" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" prop="author">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="朝代" :label-width="formLabelWidth" prop="country">
          <el-input v-model="form.country" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="译文" :label-width="formLabelWidth" prop="tslt">
          <el-input type="textarea" v-model="form.tslt" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注释" :label-width="formLabelWidth" prop="comment">
          <el-input type="textarea" v-model="form.comment" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="赏析" :label-width="formLabelWidth" prop="appreciation">
          <el-input type="textarea" v-model="form.appreciation" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeInfo('form')">取 消</el-button>
        <el-button type="primary" @click="sure('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getInfo, infoAdd, infoEdit, infoDel } from '@/api/api'
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        title: "",
        author: "",
        country: "",
        content: "",
        tslt: "",
        comment: "",
        appreciation:""
      },
      formLabelWidth: "80px",
      rules: {
        title: [{required: true, message: '请输入标题'}],
        author: [{required: true, message: '请输入作者'}],
        country: [{required: true, message: '请输入朝代'}],
        content: [{required: true, message: '请输入内容'}],
        tslt: [{required: true, message: '请输入译文'}],
        comment: [{required: true, message: '请输入注释'}],
        appreciation: [{required: true, message: '请输入赏析'}],
      },
      state: true,
      total: 0
    };
  },
  created() {
    this.getData()
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
    del(row) {
      console.log(row)
      this.$alert('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          infoDel(row.id).then(res => {
            if(res.data.code === 200) {
              this.getData()
              this.$message({message: res.data.message, type: 'success'})
            }
          })
        }
      })
    },
    addStudent() {
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
    getData() {
      getInfo().then(res => {
        if(res.data.code === 200) {
          this.tableData = res.data.data;
          this.total = res.data.data.total
        }
      })
    },
    sure(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if(this.state) {
          infoAdd(this.form).then(res => {
              if(res.data.code === 200) {
                this.getData()
                this.dialogFormVisible = false
                this.$message({type: 'success', message: res.data.data.message})
              }
            })
          } else {
            infoEdit(this.form).then(res => {
              if(res.data.code === 200) {
                this.getData()
                this.dialogFormVisible = false
                this.$message({type: 'success', message: res.data.data.message})
              }
            })
          }
        }
      })
    }
  },
};
</script>
<style lang="scss">
.infoList {
  .demo-form-inline,
  .el-form-item {
    text-align: left;
  }
}
</style>