<!--
 * @Descripttion: 越努力越幸运
 * @version: 
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-01-04 14:10:22
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-03-12 15:29:33
-->
<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>古诗文后台管理系统</span>
      </div>
      <el-form label-width="80px" :model="form" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { nameRule, passRule } from '../utils/vaildate.js'
import { setToken } from '@/utils/setToken.js'
import { login } from '@/api/api.js'
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
    login(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(this.form);
          login(this.form).then(res => {
              if (res.data.code === 200) {
                  setToken('username', res.data.data.username)
                  setToken('token', res.data.data.token.tokenValue) // 保存token到localstorage中
                  this.$message({message: res.data.data.message, type: 'success'})
                  this.$router.push('/home')
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