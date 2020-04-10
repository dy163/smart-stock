<template>
  <div class="buy-trade">
    <el-card>
      <el-button type="primary">一键托管</el-button>
    </el-card>
    <el-card class="buy-trade-card">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="thStyleFun"
        :cell-style="cellStyleFun"
      >
        <el-table-column prop="account" label="账号名" width="120"></el-table-column>
        <el-table-column prop="stock_code" label="股票代码"></el-table-column>
        <el-table-column prop="stock_name" label="股票名称"></el-table-column>
        <el-table-column prop="market" label="市场"></el-table-column>
        <el-table-column prop="open" label="开盘价"></el-table-column>
        <el-table-column prop="close" label="收盘价"></el-table-column>
        <el-table-column prop="year_average" label="年线"></el-table-column>
        <el-table-column prop="entrust_price" label="委托价"></el-table-column>
        <el-table-column prop="quantity" label="数量"></el-table-column>
        <el-table-column prop="amount" label="金额"></el-table-column>
        <el-table-column prop="status" label="委托状态"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">托管</el-button>
            <el-button size="mini" type="success" @click="handleDelete(scope.$index, scope.row)">已托管</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">不可托管</el-button>
          </template>
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
  name: "BuyTradeIndex",
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
      tableData: []
    };
  },
  created() {
    this.handlebuyTrade()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    thStyleFun() {
      return "text-align:center";
    },
    cellStyleFun() {
      return "text-align:center";
    },
    handlebuyTrade() {
      // this.tableData = JSON.parse(window.localStorage.getItem('addBuy')) 
      // this.tableData = JSON.parse(this.$store.commit('handleAddBuy')) 
    }
  }
};
</script>

<style lang='less' scoped>
.buy-trade-card {
  margin-top: 10px;
}
</style>
