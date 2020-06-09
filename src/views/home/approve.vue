<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: 'approve' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>预约管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 正文开始 -->
    <el-row size='small'>
      <el-col :span='8'>
        <el-card shadow="hover">
          <div class="card-top">邀请总人数</div>
          <div class="card-bottom">0</div>
        </el-card>
      </el-col>
      <el-col :span='8'>
        <el-card shadow="hover">
          <div class="card-top">同意邀请人数</div>
          <div class="card-bottom">0</div>
        </el-card>
      </el-col>
      <el-col :span='8'>
        <el-card shadow="hover">
          <div class="card-top">拒绝邀请人数</div>
          <div class="card-bottom">0</div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 主要内容 -->
    <el-card class="invite" shadow="hover">
      <el-row :gutter="20">
        <el-col>
          <!-- 数据展示 -->
          <showApprove></showApprove>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import showApprove from '@/components/approve/show-approve.vue';
  export default {
    data() {
      return {
      }
    },
    components: {
      showApprove
    }
  }
</script>

<style scoped>
  .el-card {
    text-align: center;
  }

  .maxcard {
    display: flex !important;
    flex-direction: row !important;
  }

  .card-top {
    color: #999;
    font-size: 18px;
  }

  .card-bottom {
    font-size: 20px;
    margin-top: 10px;
  }

  .invite {
    margin-top: 10px;
    text-align: start !important;
    height: 100% !important;
  }
</style>