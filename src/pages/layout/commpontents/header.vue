<template>
  <div class="stock-header">
    <div>
      <p>stock股票后台管理系统</p>
    </div>
    <div>
    <div>
        <span>用户名</span>
        <span>退出</span>
    </div>
      <!-- <el-dropdown>
        <span class="el-dropdown-link">
          {{ $store.state.user }}
          <img src="@/assets/logo.png" width="28px">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleSetting">个人设置</el-dropdown-item>
          <el-dropdown-item @click.native="handleRemove">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  created() {},
  methods: {
    // 退出
    handleRemove() {
      this.$confirm("确认退出?", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 清空本地存储中的userInfo
          // const formData = new FormData()
          // await userExit(formData)
          // removeUser()
          // removeUserName()
          // // 跳转到登录页
          // this.$router.push({ name: 'login' })
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },
    // 跳转设置
    handleSetting() {
      //   this.$router.push('settings')
    }
  }
};
</script>

<style lang='less' scoped>
.el-col,
.el-dropdown-link {
  height: 60px;
  display: flex;
  align-items: center;
}
.stock-header {
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  div:nth-child(2) {
    span:nth-child(1) {
      margin-right: 15px;
    }
  }
}
</style>