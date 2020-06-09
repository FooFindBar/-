<template>
  <div class="bg">
    <el-card>
      <el-form ref='loginRef' :model='form' :rules="rules" label-width="0px">
        <el-form-item label="" prop='username'>
          <el-input v-model='form.username' prefix-icon='el-icon-user'></el-input>
        </el-form-item>
        <el-form-item label="" prop='password'>
          <el-input type='password' v-model='form.password' prefix-icon='el-icon-more-outline'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click='onlogin'>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    components: {

    },
    methods: {
      onlogin() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$refs.loginRef.validate(async valid => {
          if (!valid) return false
          let data1 = new FormData();
          data1.append("username", this.form.username);
          data1.append("password", this.form.password);
          var { data: res } = await this.$http.post('master/login', data1);
          loading.close();
          if (res.code != 200) return this.$message.error('登录失败');
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token', res.data.token)
          window.sessionStorage.setItem('name', res.data.name)
          this.$router.push('/home')
          

        })
      },

    },
  }
</script>

<style scoped>
  .bg {
    background: url("~@/assets/bg_1.jpg") !important;
    background-repeat: no-repeat;
    background-size: cover  !important;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .el-button{
    width: 100%;
  }
</style>