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
    </div>
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
        account: "admin",
        password: "000000"
      },
      back: {
        backgroundImage: "url(" + require("@/assets/back-img/banck.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
    };
  },
  created() {
    
  },
  methods: {
    async handleSubmit() {
      try {
        const date = new FormData();
        date.append("username", this.form.account);
        date.append("password", this.form.password);
        const res = await userLogin(date);
        const userInfo = res.data.result.sessionid;
        const username = res.data.result.username;
        saveUser(userInfo);
        saveUserName(username)
        if(res.data.login) {
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
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
</style>
