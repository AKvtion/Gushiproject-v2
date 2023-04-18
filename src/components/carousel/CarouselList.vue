
<template>
  <div class="gushiList">
    <!-- 查询、重置 -->
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item> 
        <el-button type="primary" @click="find" round>查询</el-button>
      </el-form-item>
            <el-form-item>
        <el-button type="success" @click="addPoetry" round>新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 1: 1-10 2: 11-20 slice((当前页数 - 1)*每页条数, 当前页数*当前条数)-->
    <!-- <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" border style="width: 100%"> -->
    <el-table :data="compData" border style="width: 100%">
      <el-table-column label="序号" width="60px" align="center">
        <template slot-scope="scope">
          {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="carouselUrl" label="轮播图" align="center">
        <template #default="scope">
          <img style="width: 150px;height: 150px" :src="scope.row.carouselUrl" alt="轮播图">
        </template>
      </el-table-column>
      <el-table-column prop="redirectUrl" label="跳转链接" align="center">
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="carouselRank" width="200px" label="排序值" align="center">
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
    <el-dialog :title="state ? '添加轮播图' : '修改轮播图'" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="图片链接" :label-width="formLabelWidth" prop="carouselUrl">
          <el-input v-model="form.carouselUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" :label-width="formLabelWidth" prop="redirectUrl">
          <el-input v-model="form.redirectUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序值" :label-width="formLabelWidth" prop="carouselRank">
          <el-input v-model="form.carouselRank" autocomplete="off"></el-input>
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
import { queryAllCarousel,userOne,CarouselAdd,CarouselEdit,CarouselDel } from "@/api/api.js";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页数
      pageSize: 10, // 每页显示条数
      total: 0, // 总条数
      form: {
        carouselId:"",
        carouselUrl:"",
        redirectUrl:"",
        carouselRank:"",
        status:""
      },
      formInline: {
        name: "",
      },
      formLabelWidth: "80px",
      rules: {
        carouselUrl: [{required: true, message: '请输入图片'}],
        redirectUrl: [{required: false, message: '请输入要跳转的链接'}],
        carouselRank: [{required: true, message: '请输入排序值'}],
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
      userOne(params).then((res) => {
        if (res.data.code === 200) {
          console.log('res.data.data :>> ', res.data.data);
          this.tableData = res.data.data.data;
          this.total = res.data.data.data.total;
        }
      });
    },
    getData(params) {
      queryAllCarousel(params).then((res) => {
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
            CarouselAdd(this.form).then(res => {
              if(res.data.code === 200) {
                this.getData()
                this.dialogFormVisible = false
                this.$message({type: 'success', message: res.data.message})
              }
            })
          } else {
            CarouselEdit(this.form).then(res => {
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
          CarouselDel(row.carouselId).then(res => {
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>