<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>古诗文后台-管理员注册</span>
      </div>
      <el-form label-width="80px" :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register('form')">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { nameRule, passRule } from '../utils/vaildate.js'
// import { setToken } from '@/utils/setToken.js'
import { register } from '@/api/api.js'
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: nameRule, trigger: "blur" }],
        password: [{ validator: passRule, trigger: "blur" }],
      },
    };
  },
  methods: {
    register(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(this.form);
          register(this.form).then(res => {
              if (res.data.code === 200) {
                  // setToken('username', res.data.data.username)
                  this.$message({message: res.data.data.message, type: 'success'})
                  this.$router.push('/login')
              }
          })
        } else {
          console.error(this.form);
        }
      });
    },
  },
};
</script>
<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: url('../assets/bg.png') center no-repeat;
  .el-card {
      background: #65768557;
  }
  .box-card {
    width: 450px;
    margin: 200px auto;
    color: #fff;
    .el-form .el-form-item__label {
        color: #fff;
    }
    .el-card__header {
      font-size: 34px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>