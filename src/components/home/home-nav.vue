<template>
    <el-menu background-color='#545c64' text-color='white' default-active="approve" router
        class="el-menu-vertical-demo">
        <el-menu-item index="approve">
            <img width="100%" src="~@/assets/logo1.png">
        </el-menu-item>
        <el-menu-item index="approve">
            <i class="el-icon-menu"></i>
            <span slot="title">预约管理</span>
        </el-menu-item>
        <el-menu-item index="invite">
            <i class="el-icon-document"></i>
            <span slot="title">发送邀约</span>
        </el-menu-item>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
            </template>
            <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        components: {

        }
    }
</script>

<style>
    .el-menu,
    .el-submenu {
        width: 230px !important;

    }
</style>