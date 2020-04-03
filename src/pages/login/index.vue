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
    <!-- 账号选择弹框 -->
    <el-dialog title="选择中泰账号" :visible.sync="dialogTableVisible" width="35%">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="账号"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <router-link to>没有账号？添加账号</router-link>
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      dialogTableVisible: false,
      form: {
        account: "",
        password: ""
      },
      back: {
        backgroundImage: "url(" + require("@/assets/back-img/banck.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      tableData: [
        { date: "01", name: "1111110" },
        { date: "02", name: "1111110" },
        { date: "03", name: "1111110" },
        { date: "04", name: "1111110" }
      ]
    };
  },
  methods: {
    handleSubmit() {
      this.dialogTableVisible = true;
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
/deep/.el-dialog {
  .el-dialog__header {
    .el-dialog__title {
      font-size: 22px;
    }
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__footer {
    a {
      display: inline-block;
      margin-right: 50px;
    }
  }
}
</style>
