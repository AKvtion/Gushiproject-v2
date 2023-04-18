
<template>
    <div class="header">
        <el-header>
            <div class="title">古诗文管理系统</div>
            <div >
                <el-dropdown>
                <span class="el-dropdown-link" style="color: #fff;">
                    {{username}} <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item ><span @click="loginOut">退出登录</span></el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
    </div>
</template>
<script>
import { getToken,removeToken } from '@/utils/setToken.js'
export default {
    data() {
        return {
            username: ''
        }
    },
    created() {
        this.username = getToken('username')
    },
    methods: {
        loginOut(){
            window.localStorage.clear();
            removeToken('username')
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="scss" scoped>
.header {
    .el-header {
        background: #9D895E;
        color: #fff;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        .title {
            width: 200px;
            font-size: 24px;
        }
    }
}
</style>