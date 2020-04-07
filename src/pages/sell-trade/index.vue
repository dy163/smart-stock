<template>
  <div class="buy-trade">
    <el-card>
      <el-button type="primary">一键托管</el-button>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="代码"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="address" label="市场"></el-table-column>
        <el-table-column prop="address" label="收盘价"></el-table-column>
        <el-table-column prop="address" label="开盘价"></el-table-column>
        <el-table-column prop="address" label="年线"></el-table-column>
        <el-table-column prop="address" label="操作">
          <el-tag @click="dialogTableVisible = true">托管</el-tag>
          <el-tag type="success">已托管</el-tag>
          <el-tag type="danger">不可托管</el-tag>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹框 -->
    <el-dialog title="托管数据" :visible.sync="dialogTableVisible" width="35%">
      <el-form :model="formDate">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="formDate.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="formDate.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="formDate.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SellTradeIndex",
  data() {
    return {
      dialogTableVisible: false,
      formLabelWidth: "80px",
      form: {
        account: "",
        password: ""
      },
      formDate: {
        name: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "1518 "
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "1517"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "1519"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "1516"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "1516"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang='less' scoped>
</style>

