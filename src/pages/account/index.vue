<template>
  <div class="account">
    <div>
      <!-- 有账号的展示 -->
      <el-card>
        <div class="account-card">
          <div>
            <el-button type="primary" @click="dialogTableVisible = true">新增</el-button>
          </div>
          <div>
            <el-form ref="form" :model="formOptions" label-width="80px">
              <el-form-item label="当前账号:">
                <el-select v-model="formOptions.region" placeholder="请选择">
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
      <el-card class="box-card">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="account" label="账号" width="180"></el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
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
    <el-dialog title="新增账号" :visible.sync="dialogTableVisible" width="35%" class="acconnt-show">
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
  </div>
</template>

<script>
import { userGetList, userAdd, userDelete, userUpdate } from "@/api/login";

export default {
  name: "AccountIndex",
  data() {
    return {
      dialogTableVisible: false,
      dialogAccount: false,
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
      account: "0",
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
    // this.handleQuery();
    this.handllGetList();
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
          this.dialogTableVisible = false;
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
    // handleQuery(val) {
    //   this.account = JSON.parse(this.$route.query.val).account;
    //   console.log(this.account);
    // },
    // 账号列表
    async handllGetList() {
      try {
        const res = await userGetList();
        this.option = res.data.result;
        this.tableData = res.data.result;
      } catch (error) {}
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
  // align-items: center;
  div:nth-child(2) {
    display: flex;
    align-items: center;
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
</style>
