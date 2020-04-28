<template>
  <div class="login">
    <div class="login-content">
      <div class="login-content-header">
        <p>
          <img src="@/assets/logo.png" alt />
        </p>
        <p>智能股票系统</p>
      </div>
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="账户:">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="handleSubmit" id="aa">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 背景视频 -->
    <video
      class="video-container"
      loop
      src="@/assets/back-img/move.mp4"
      autoplay="autoplay"
      muted="muted"
      width="100%"
      height="100%"
    ></video>
  </div>
</template>

<script>
import { userLogin, userIsSelect } from "@/api/user";
import { saveUser, saveUserName } from "@/untils/auth";

export default {
  name: "Login",
  data() {
    return {
      form: {
        account: "",
        password: ""
      }
    };
  },
  mounted() {
    window.addEventListener("keydown", this.keyDown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keyDown, false);
  },
  methods: {
    keyDown(e) {
      //如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.handleSubmit();
      }
    },
    async handleSubmit() {
      try {
        if (!this.form.account || !this.form.password) {
          this.$message({
            type: "warning",
            message: "请正确填写账号或密码"
          });
        } else {
          const date = new FormData();
          date.append("username", this.form.account);
          date.append("password", this.form.password);
          const res = await userLogin(date);
          if (!res.data.status) {
            this.$message({
              type: "warning",
              message: "请正确填写账号或密码"
            });
          }
          if (res.data.login) {
            this.$message({
              type: "success",
              message: "登录成功"
            });
            const userInfo = res.data.result.sessionid;
            const username = res.data.result.username;
            saveUser(userInfo);
            saveUserName(username);
            setTimeout(() => {
              this.$router.push("/");
            }, 2000);
          }
        }
      } catch (error) {
        this.$message.error("登录操作失败");
      }
    }
  }
};
</script>

<style lang='less' scoped>
.login {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.login-content {
  width: 500px;
  // border: 1px solid #000;
  border-radius: 10px;
  padding: 30px 20px 30px 0;
  z-index: 9999;
  .login-content-header { 
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-bottom: 20px;
    p:nth-child(1) {
      // background-color: #fff;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-right: 15px;
      img {
        width: 100%;
        vertical-align: middle;
      }
    }
    p:nth-child(2) {
      letter-spacing:10px;
      font-size: 18px;
    }
  }

  .el-form-item {
    /deep/.el-form-item__label {
      color: #fff;
    }
  }
  .login-btn {
    margin: 0;
    .el-button {
      width: 100%;
    }
  }
}
.video-container {
  object-fit: cover; // 视频占满全屏
  position: absolute;
}
</style>
