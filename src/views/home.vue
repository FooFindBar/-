<template>
    <el-container>
        <!-- 侧边栏 -->
        <el-aside>
            <homeNav></homeNav>
        </el-aside>
        <el-container>
            <!-- 导航栏 -->
            <el-header>
                <div>时代凌峰访客预约管理平台</div>
                <homeTopNav></homeTopNav>
            </el-header>
            <!-- 主要部分 -->
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import homeNav from '@/components/home/home-nav.vue';
    import homeTopNav from '@/components/home/home-top-nav.vue';
    export default {
        data() {
            return {
                
            }
        },
        components: {
            homeNav,
            homeTopNav
        }
    }
</script>

<style lang="less" scoped>
    .el-container {
        height: 100%;
    }

    .el-header {
        border-bottom: 1px solid #e6e6e6 !important;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        height: 70px !important;
    }

    .el-header>div {
        font-size: 25px;
        line-height: 60px;
        text-align: center;
        width: 100%;
    }

    .el-aside {
        background-color: #545c64;
        width: 230px !important;
        overflow-x: hidden;
    }

    .el-main {
        background-color: #eff2f7;
    }


    .top-nav-right {
        width: 200px;
    }
    .el-card{
        height: 100%;
    }
</style>