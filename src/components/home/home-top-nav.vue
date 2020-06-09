<template>
    <el-menu :default-active="active" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">关于我们</el-menu-item>
        <el-menu-item index="3">帮助文档</el-menu-item>
        <el-submenu index="2">
            <template slot="title">{{username}}</template>
            <el-menu-item index="2-1">关于</el-menu-item>
            <el-menu-item @click='clearsession'>退出登录</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        data() {
            return {
                active: '1',
                username:'请登录'
            }
        },
        methods: {
            clearsession() {
                window.sessionStorage.clear()
                this.$router.push('/login')
            }
        },
        mounted() {
            this.$nextTick(function() {
                this.username=window.sessionStorage.getItem('name')
            })
        },
        components: {

        }
    }
</script>

<style scoped>
    .el-menu {
        font-weight: bold;
        color: #5a8ae9;
    }

    .el-menu-demo,
    .el-menu-item {
        width: 100% !important;
        display: flex !important;
        height: 100%;
        align-items: center;
    }

    .el-menu-demo {
        width: 300px !important;
    }
</style>