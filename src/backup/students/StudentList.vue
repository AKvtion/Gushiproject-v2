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
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
            <el-form-item>
        <el-button type="success" @click="addPoetry">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 1: 1-10 2: 11-20 slice((当前页数 - 1)*每页条数, 当前页数*当前条数)-->
    <!-- <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%"> -->
    <el-table :data="compData" border style="width: 100%">
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
    <!-- 底部分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import { queryAllPoetry,gushiOne,infoAdd,infoEdit,infoDel } from "@/api/api.js";
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
        country: "",
        content: "",
        tslt: "",
        comment: "",
        appreciation:""
      },
      formInline: {
        name: "",
      },
    };
  },
  created() {
    this.getData();
  },
  computed: {
    compData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
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
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    getDataOne(params){
      gushiOne(params).then((res) => {
        if (res.data.code === 200) {
          console.log('res.data.data :>> ', res.data.data);
          this.tableData = res.data.data.data;
          this.total = res.data.data.data.total;
        }
      });
    },
    getData(params) {
      queryAllPoetry(params).then((res) => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
          // this.tableData.forEach((item) => {
          //   // 尽量不要修改原数据
          //   item.sex === 1 ? (item.sex_text = "男") : (item.sex_text = "女");
          //   item.state === "1"
          //     ? (item.state_text = "已入学")
          //     : item.state === "2"
          //     ? (item.state_text = "未入学")
          //     : (item.state_text = "休学中");
          // });
        }
      });
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
    },
    del(row) {
      console.log(row);
      this.$alert('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        callback: () => {
          infoDel(row.id).then(res => {
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