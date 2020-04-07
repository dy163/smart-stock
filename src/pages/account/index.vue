<template>
  <div class="account">
    <div v-if="showes">
      <!-- 有账号的展示 -->
      <el-card>
        <div class="account-card">
          <div>
            <el-button type="primary" @click="dialogTableVisible = true">新增</el-button>
          </div>
          <div>
            <p>当前账号：</p>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="账号" width="180"></el-table-column>
          <el-table-column prop="date" label="创建时间" width="180"></el-table-column>
          <el-table-column label="操作">
            <el-tag>修改</el-tag>
            <el-tag type="danger">删除</el-tag>
            <!-- <template slot-scope="scope">
            <el-tag
              class="normal"
              :type="verifType[scope.row].type"
            >{{ verifType[scope.row].label }}</el-tag>
            </template>-->
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 无账号的展示 -->
    <div v-if="show" class="acconnt-show">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item class="account-btn">
            <el-button type="primary">确认</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountIndex",
  data() {
    return {
      showes: false,
      show: true,
      form: {
        name: ""
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      value: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
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
  created() {},
  methods: {}
};
</script>

<style lang='less' scoped>
.account-card {
  display: flex;
  justify-content: space-between;
  div:nth-child(2) {
    display: flex;
    align-items: center;
  }
}
.acconnt-show {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
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
}
</style>
