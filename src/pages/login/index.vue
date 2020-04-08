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
      <el-table
        :data="accountData"
        style="width: 100%"
        @current-change="handleCurrentChange"
        :highlight-current-row="true"
      >
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column label="序号" width="80"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <p @click="handleNoAccount">没有账号？添加账号</p>
        <div>
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userLogin, userGetList, userIsSelect } from "@/api/login";
import { saveUser } from "@/untils/auth";

export default {
  name: "Login",
  data() {
    return {
      dialogTableVisible: false,
      form: {
        account: "admin",
        password: "000000"
      },
      back: {
        backgroundImage: "url(" + require("@/assets/back-img/banck.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      },
      accountData: []
    };
  },
  created() {
    
  },
  methods: {
    // 自定义索引
    indexMethod(index) {
      return index * 1;
    },
    // 表格点击
    handleChoose(row, column, event) {},

    async handleSubmit() {
      try {
        const date = new FormData();
        date.append("username", this.form.account);
        date.append("password", this.form.password);
        const res = await userLogin(date);
        const userInfo = res.data.result.sessionid;
        const username = this.form.username;
        saveUser(userInfo);
        if (res.data.login === null) {
          this.$message.error("登录失败");
        } else {
          this.dialogTableVisible = true;
          const formData = new FormData();
          const resDate = await userGetList(formData);
          this.accountData = resDate.data.result;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 选择账号
    handleCurrentChange(val) {
      this.$router.push({path: '/',query: {val: JSON.stringify(val)}});
      // this.$router.push({path: '/',query: {val: val}});
    },
    // async handleCurrentChange(val) {
    //   try {
    //     const res = await userIsSelect()
    //     console.log(res)
    //     if(res.data.status) {
    //       this.$router.push("/");
    //     } else {
    //       this.$message.error("没有选择账号");
    //     }
    //   } catch (error) {
        
    //   }
    // },
    // 无账号
    handleNoAccount() {
      this.$router.push("/");
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
  padding: 0 15px;
  .el-dialog__header {
    padding: 15px 0;
    .el-dialog__title {
      font-size: 22px;
    }
  }
  .el-dialog__body {
    padding: 0;
  }
  .el-dialog__footer {
    padding: 10px 0;
  }
  .dialog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
