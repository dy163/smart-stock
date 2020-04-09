<template>
  <div class="account">
    <div>
      <!-- 有账号的展示 -->
      <el-card>
        <div class="account-card">
          <div>
            <el-button type="primary" @click="dialogAdd = true">新增</el-button>
          </div>
          <div>
            <el-form ref="form" :model="formOptions" label-width="80px">
              <el-form-item label="当前账号:">
                <!-- <span class="account-card-span">{{ variAccount }}</span> -->
                <el-select
                  v-model="formOptions.region"
                  placeholder="请选择"
                  @change="handleSelectGetList"
                >
                  <el-option
                    v-for="item in option"
                    :key="item.id"
                    :label="item.account"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
      <!-- 内容展示 -->
      <el-card class="box-card">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="create_time" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 无账号的展示 -->
    <el-dialog title="新增账号" :visible.sync="dialogAdd" width="35%" class="acconnt-show">
      <el-form ref="form" :model="form" label-width="80px">
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
    <!-- 修改账号展示 -->
    <el-dialog title="修改账号" :visible.sync="dialogAccount" width="35%" class="acconnt-show">
      <el-form ref="form" :model="formEdit" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="formEdit.acconnt"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formEdit.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="密钥">
          <el-input v-model="formEdit.trade_key"></el-input>
        </el-form-item>
        <el-form-item class="account-btn">
          <el-button type="primary" @click="handleEditDefine">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 账号选择弹框 -->
    <div class="nil-account">
      <el-dialog title="选择中泰账号" :visible.sync="dialogTableVisible" :show-close="false" :close-on-click-modal="false" width="28%">
        <!-- <el-table
          :data="accountData"
          style="width: 100%"
          @current-change="handleCurrentChange"
          :highlight-current-row="true"
        >
          <el-table-column type="index" :index="indexMethod"></el-table-column>
          <el-table-column label="序号" width="80"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
        </el-table>-->
        <el-radio
          v-model="radio"
          :label="item.id"
          v-for="item in accountData"
          :key="item.id"
          @change="handleCurrentChange"
        >{{ item.account }}</el-radio>
        <div slot="footer" class="dialog-footer">
          <p @click="handleNoAccount">没有账号？添加账号</p>
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
  userDelete,
  userUpdate,
  userIsSelect,
  userSelect
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
      valueAcconnt: "",
      form: {
        acconnt: "",
        password: "",
        trade_key: ""
      },
      formEdit: {
        acconnt: "",
        password: "",
        trade_key: ""
      },
      editId: "",
      formOptions: {
        region: ""
      },
      option: [],
      tableData: [],
      verifType: [
        {
          type: "info",
          label: "修改"
        },
        {
          type: "danger",
          label: "删除"
        }
      ]
    };
  },
  created() {
    this.$nextTick(async () => {
      try {
        const date = new FormData();
        const res = await userIsSelect(date);
        if (res.data.result === 10009) {
          this.dialogTableVisible = true;
          this.handllGetList();
        } else if(res.data.result == null) {
          this.handleDialogAccount();
        }
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      }
    });
  },
  methods: {
    // 添加新账号
    async handleAdd() {
      try {
        const date = new FormData();
        date.append("account", this.form.acconnt);
        date.append("password", this.form.password);
        date.append("trade_key", this.form.trade_key);
        const res = await userAdd(date);
        if (res.data.status) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.form.acconnt = "";
          this.form.password = "";
          this.form.trade_key = "";
          this.handllGetList();
          this.dialogAdd = false;
        } else {
          this.$message.error("错了哦，删除失败");
        }
      } catch (error) {
        console.log(error, "添加操作失败");
      }
    },
    // 更新账号
    handleEdit(index, row) {
      this.editId = row.id;
      this.dialogAccount = true;
    },
    async handleEditDefine() {
      try {
        const date = new FormData();
        date.append("id", this.editId);
        date.append("account", this.formEdit.acconnt);
        date.append("password", this.formEdit.password);
        date.append("trade_key", this.formEdit.trade_key);
        const res = await userUpdate(date);
        if (res.data.status) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.formEdit.acconnt = "";
          this.formEdit.password = "";
          this.formEdit.trade_key = "";
          this.handllGetList();
          this.dialogAccount = false;
        } else {
          this.$message.error("错了哦，删除失败");
        }
      } catch (error) {}
    },
    // 删除账号
    handleDelete(index, row) {
      this.$confirm("确认删除账号?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const date = new FormData();
          date.append("id", row.id);
          await userDelete(date);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.handllGetList(); // 更新列表
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 账号列表
    async handllGetList() {
      try {
        const res = await userGetList();
        this.accountData = res.data.result;
      } catch (error) {
        console.log(error, "操作失败");
      }
    },
    // 选择账号
    async handleSelectGetList(q) {
      try {
        const date = new FormData();
        date.append("id", q);
        const res = await userGetList(date);
        this.formOptions.region = res.data.result[0].account;
      } catch (error) {
        console.log(error, "操作失败");
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
      this.valueAcconnt = val
    },
    // 在次调用账号列表
    async handleDialogAccount() {
      try {
        const res = await userGetList();
        this.option = res.data.result;
        this.tableData = res.data.result;
      } catch (error) {
        console.log(error, "操作失败");
      }
    },
    // 确定单选框
    async handleSure() {
      try {
        const date = new FormData();
        date.append("id", this.valueAcconnt);
        const res = await userSelect(date);
        if (res.data.status) {
          this.dialogTableVisible = false;
          this.handleDialogAccount();
          this.handleSelectGetList(this.valueAcconnt)
        }
      } catch (error) {
        console.log(error, "操作失败");
      }
    }
  }
};
</script>

<style lang='less' scoped>
.account-card {
  height: 80px;
  line-height: 80px;
  display: flex;
  justify-content: space-between;
  // .account-card-span {
  //   display: inline-block;
  //   width: 120px;
  // }
  .el-select {
    // width: 120px;
    margin-left: 15px;
  }
}
.acconnt-show {
  .el-form {
    width: 500px;
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
