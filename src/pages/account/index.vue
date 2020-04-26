<template>
  <div class="account">
    <!-- 有账号的展示 -->
    <el-card class="box-card-header">
      <el-form ref="form1" :model="formOptions" label-width="80px">
        <el-form-item label="当前账号:">
          <el-select v-model="formOptions.region" placeholder="请选择" @change="handleSelectGetList">
            <el-option v-for="item in option" :key="item.id" :label="item.account" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容展示 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="total_asset" label="总资产"></el-table-column>
        <el-table-column prop="buying_power" label="可用资产"></el-table-column>
        <el-table-column prop="preferred_amount" label="可取资产"></el-table-column>
        <el-table-column prop="security_asset" label="证券资产"></el-table-column>
        <el-table-column prop="fund_buy_fee" label="买入费用"></el-table-column>
        <el-table-column prop="fund_sell_fee" label="卖出费用"></el-table-column>
        <el-table-column prop="withholding_amount" label="预扣资金"></el-table-column>
        <el-table-column prop="orig_banlance" label="昨日余额"></el-table-column>
        <el-table-column prop="banlance" label="当前余额"></el-table-column>
        <el-table-column prop="deposit_withdraw" label="当天出入金"></el-table-column>
      </el-table>
    </el-card>
    <!-- 无账号的展示 -->
    <el-dialog
      title="新增账号"
      :show-close="false"
      :visible.sync="dialogAdd"
      width="25%"
      class="acconnt-show"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="auto">
        <el-form-item label="账号">
          <el-input v-model="form.acconnt"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="密钥">
          <el-input v-model="form.trade_key"></el-input>
        </el-form-item>
        <el-form-item class="account-btn">
          <el-button type="primary" @click="handleAdd">确认添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 账号选择弹框 -->
    <div class="nil-account">
      <el-dialog
        title="选择中泰账号"
        :visible.sync="dialogTableVisible"
        :show-close="false"
        :close-on-click-modal="false"
        width="28%"
      >
        <el-radio
          v-model="radio"
          :label="item.id"
          v-for="item in accountData"
          :key="item.id"
          @change="handleCurrentChange"
        >{{ item.account }}</el-radio>
        <div slot="footer" class="dialog-footer">
          <a href="javascript:void(0)" @click="handleNoAccount">没有账号？添加账号</a>
          <div>
            <el-button type="primary" @click="handleSure">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  userGetList,
  userAdd,
  userIsSelect,
  userSelect,
  userAssetGetDetail
} from "@/api/user";

export default {
  name: "AccountIndex",
  data() {
    return {
      dialogAdd: false,
      dialogAccount: false,
      dialogTableVisible: false,
      accountData: [],
      radio: "",
      form: {
        acconnt: "",
        password: "",
        trade_key: ""
      },
      formOptions: {
        region: ""
      },
      option: [],
      tableData: [],
      valueAcconnt: window.localStorage.getItem('val')
    };
  },
  mounted() {
    this.handleStraining();
    this.handllGetList();
    this.formOptions.region = ''? '': this.valueAcconnt
  },
  methods: {
    // 账户资金详情
    async handleUserAssetGetDetail() {
      try {
        const date = new FormData();
        const res = await userAssetGetDetail(date);
        this.tableData.push(res.data.result);
      } catch (error) {
        this.$message.error("错了哦，操作失败");
      }
    },
    // 判断是否登录选择账号
    async handleStraining() {
      try {
        const date = new FormData();
        const res = await userIsSelect(date);
        if (res.data.result === 10009) {
          this.dialogTableVisible = true;
        } else if (res.data.result == null) {
          this.handleUserAssetGetDetail();
        }
      } catch (error) {
        this.$message.error("选择账号操作失败");
      }
    },
    // 账号列表
    async handllGetList() {
      try {
        const res = await userGetList();
        this.accountData = res.data.result;
        this.option = res.data.result;
      } catch (error) {
        this.$message.error("操作失败");
      }
    },
    // 添加新账号
    handleAdd() {
      this.$confirm("确认添加?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const date = new FormData();
          date.append("account", this.form.acconnt);
          date.append("password", this.form.password);
          date.append("trade_key", this.form.trade_key);
          const res = await userAdd(date);
          if (res.data.status) {
            this.dialogAdd = false;
            this.dialogTableVisible = true;
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.form.acconnt = "";
            this.form.password = "";
            this.form.trade_key = "";
          }
          if (res.data.result == 10003 || res.data.result == 10006) {
            this.$message.error("添加失败,请重新添加");
            this.form.acconnt = "";
            this.form.password = "";
            this.form.trade_key = "";
          }
        })
        .catch(() => {
          this.$message({ type: "info", message: "取消添加新账号" });
          this.dialogAdd = false;
          this.dialogTableVisible = true;
        });
    },
    // 选择账号(账号列表)
    async handleSelectGetList(q) {
      try {
        const date = new FormData();
        date.append("id", q);
        const res = await userGetList(date);
        this.formOptions.region = res.data.result[0].account;
      } catch (error) {
        this.$message.error("操作失败");
      }
    },
    // 自定义索引
    indexMethod(index) {
      return index * 1;
    },
    // 无账号
    handleNoAccount() {
      this.dialogTableVisible = false;
      this.dialogAdd = true;
    },
    // 选择账号
    handleCurrentChange(val) {
      window.localStorage.setItem("val", val);
    },
    // 确定单选框选择账户
    async handleSure() {
      try {
        const date = new FormData();
        date.append("id", this.valueAcconnt);
        const res = await userSelect(date);
        if (res.data.result == 10003) {
          return this.$message({
            showClose: true,
            message: "请选择账号",
            type: "warning"
          });
        } else if (res.data.status) {
          this.dialogTableVisible = false;
          this.handleSelectGetList(this.valueAcconnt);
          this.handleUserAssetGetDetail();
          return this.$message({
            showClose: true,
            message: "已成功选择账号",
            type: "success"
          });
        } else if(res.data.result == 10004) {
          this.$message.error("账号不存在");
        }
      } catch (error) {
        this.$message.error("操作失败");
      }
    }
  }
};
</script>

<style lang='less' scoped>
.account {
  .box-card-header {
    /deep/.el-card__body {
      height: 40px;
      padding: 10px 20px;
      position: relative;
    }
    .el-form {
      position: absolute;
      right: 0;
      .el-form-item {
        margin-bottom: 0;
      }
      .el-select {
        width: 140px;
      }
    }
  }
}
.acconnt-show {
  .el-form {
    .account-btn {
      margin: 0;
      .el-button {
        width: 100%;
      }
    }
  }
}
.box-card {
  margin-top: 10px;
  .el-tag--danger {
    margin-left: 10px;
  }
}
.nil-account {
  /deep/.el-dialog {
    padding: 0 15px;
    .el-radio {
      display: block;
      margin-left: 50px;
      height: 42px;
      line-height: 42px;
    }
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
}
</style>
