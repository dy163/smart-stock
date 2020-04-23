<template>
  <div class="stock-header">
    <div>
      <img src="@/assets/yidun.png" alt />
      <p>智能股票系统</p>
    </div>
    <div>
      <div>
        <span>{{ username }}</span>
        <el-button @click.native="handleRemove" type="text">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { userExit } from "@/api/user";
import {
  removeUser,
  getUserName,
  removeUserName,
  removeBuyEntrust
} from "@/untils/auth";

export default {
  name: "Header",
  data() {
    return {
      username: ""
    };
  },
  created() {
    this.username = getUserName();
  },
  methods: {
    // 退出
    handleRemove() {
      this.$confirm("确认退出?", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            // 清空本地存储中的userInfo
            const formData = new FormData();
            await userExit(formData);
            removeUser();
            removeUserName();
            removeBuyEntrust();
            // removeUserName()
            // 跳转到登录页
            this.$router.push({ name: "login" });
            this.$message({
              type: "success",
              message: "退出成功!"
            });
          } catch (error) {
            this.$message({
              type: "info",
              message: "操作失败"
            });
          }
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
  div:nth-child(1) {
    display: flex;
    align-items: center;
    color: #fff;
    img {
      height: 35px;
      width: 35px;
      margin-right: 8px;
      border-radius: 10px;
      color: #fff;
    }
  }
  div:nth-child(2) {
    span:nth-child(1) {
      margin-right: 15px;
    }
  }
}
.el-button {
  color: #fff;
}
</style>