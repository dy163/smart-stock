<template>
  <div class="login" :style="back">
  <!-- <div class="login"> -->
    <div class="login-content">
      <el-form ref="form" :model="form" label-width="60px">
        <el-form-item label="账户">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="handleSubmit">登录</el-button>
        </el-form-item>
      </el-form>
      <!-- 背景视频 -->
      <!-- <div class="video-container">
        <div :style="fixStyle" class="filter"></div>
        <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay" muted>
          <source :src="PATH_TO_MP4" type="video/mp4" />浏览器不支持 video 标签，建议升级浏览器。
        </video>
        <div class="poster hidden" v-if="!vedioCanPlay">
          <img :style="fixStyle" :src="PATH_TO_JPEG" alt="背景" />
        </div>
      </div> -->
    </div>
    <!-- <img src="@/assets/back-img/bj.gif" alt="" class="back"> -->
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
      },
      back: {
        backgroundImage: "url(" + require("@/assets/back-img/bj.gif") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      }
    };
  },
  created() {},
  methods: {
    canplay() {
      this.vedioCanPlay = true;
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-content {
  width: 500px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 30px 20px 30px 0;
  .el-form-item {
    /deep/.el-form-item__label {
      color: #000;
    }
  }
  .login-btn {
    margin: 0;
    .el-button {
      width: 100%;
    }
  }
}
.back {
  width: 100%;
  height: 100%;
}
</style>
