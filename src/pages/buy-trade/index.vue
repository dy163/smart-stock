<template>
  <div class="buy-trade">
    <el-card>
      <el-button type="primary">一键托管</el-button>
    </el-card>
    <el-card class="buy-trade-card">
      <el-table
        :data="value"
        style="width: 100%"
        :header-cell-style="thStyleFun"
        :cell-style="cellStyleFun"
      >
        <el-table-column prop="account" label="账号名" width="120"></el-table-column>
        <el-table-column prop="stock_code" label="股票代码" width="120"></el-table-column>
        <el-table-column prop="stock_name" label="股票名称" width="120"></el-table-column>
        <el-table-column prop="market" label="市场" width="120"></el-table-column>
        <el-table-column prop="open" label="开盘价" width="120"></el-table-column>
        <el-table-column prop="close" label="收盘价" width="120"></el-table-column>
        <el-table-column prop="year_average" label="年线" width="120"></el-table-column>
        <el-table-column prop="entrust_price" label="委托价" width="120"></el-table-column>
        <el-table-column prop="quantity" label="数量" width="120"></el-table-column>
        <el-table-column prop="amount" label="金额" width="120"></el-table-column>
        <el-table-column prop="status" label="委托状态" width="120">
          <template slot-scope="scope">
            <el-tag
              class="normal"
              effect="dark"
              size="mini"
              :type="buyType[scope.row.status].type"
            >{{ buyType[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="280">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleDeposit(scope.$index, scope.row)"
              :disabled="scope.row.status == 0? false : true "
            >托管</el-button>
            <!-- <el-button
              size="mini"
              type="success"
              :disabled="scope.row.status == 0? true : false"
              @click="handleManaged(scope.$index, scope.row)"
            >已托管</el-button> -->
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.status === 2? false : true"
              @click="handleUntrusteeship(scope.$index, scope.row)"
            >不可托管</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="screening-pagination">
        <el-pagination
          :current-page="pageNum"
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="totalCount"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 弹框 -->
    <el-dialog title="托管数据" :visible.sync="dialogTableVisible" width="25%">
      <div class="dialog-deposit">
        <div>
          <p>代码：</p>
          <p>{{ depositCode }}</p>
        </div>
        <div>
          <p>年线：</p>
          <p>{{ depositAverage }}</p>
        </div>
        <div>
          <p>数量：</p>
          <el-input v-model="depositDate" autocomplete="off" placeholder="请输入数量" />
        </div>
        <el-button type="primary" @click.native="handleSingleData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { buyTrade } from "@/api/trade";
import { mapState } from "vuex";

export default {
  name: "BuyTradeIndex",
  data() {
    return {
      dialogTableVisible: false,
      formLabelWidth: "80px",
      pageNum: 1,
      pageSize: 15,
      totalCount: 0,
      depositCode: [], // 弹框代码展示
      value: [], // 表格绑定值
      depositDate: "", // 数量值得变化
      depositAverage: "", // 年线
      id: "",
      index: "",
      form: {
        account: "",
        password: ""
      },
      formDate: {
        name: ""
      },
      buyType: [
        //  状态
        {
          type: "",
          label: "未托管"
        },
        {
          type: "success",
          label: "已托管"
        },
        {
          type: "info",
          label: "不可托管"
        },
        {
          type: "danger",
          label: "已委托"
        },
        {
          type: "warning",
          label: "已成交"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      print: state => state.buyEntrust
    })
  },
  created() {
    this.handlebuyTrade();
  },
  methods: {
    // 托管
    handleDeposit(index, row) {
      this.dialogTableVisible = true;
      this.depositAverage = row.year_average;
      this.depositCode = row.stock_code;
      this.id = row.id;
      this.index = index;
    },
    // 已委托
    handleManaged(index, row) {
      console.log(index, row);
    },
    // 不可托管
    handleUntrusteeship(index, row) {},
    thStyleFun() {
      return "text-align:center";
    },
    cellStyleFun() {
      return "text-align:center";
    },
    // vux存储拿数据
    handlebuyTrade() {
      this.value = Array.from(this.print);
    },
    // 分页
    handleCurrentChange(page) {
      this.pageNum = page;
    },
    // 买入单条托管数据
    async handleSingleData() {
      try {
        const date = new FormData();
        date.append("id", this.id);
        date.append("quantity", this.depositDate);
        const res = await buyTrade(date);
        if (res.data.status) {
          this.value.forEach((element, index) => {
            if (this.index === index) {
              element.status = 1;
            }
            this.$store.commit("handleFiltrateAddOne", this.value);
          });
          this.dialogTableVisible = false;
          this.depositDate = "";
        }
        this.handlebuyTrade()
      } catch (error) {}
    }
  }
};
</script>

<style lang='less' scoped>
.buy-trade-card {
  margin-top: 10px;
}
.screening-pagination {
  margin-top: 20px;
  text-align: center;
}
.dialog-deposit {
  padding: 0 100px;
  div {
    height: 50px;
    display: flex;
    align-items: center;
  }
  div:nth-child(3) {
    display: flex;
    justify-content: space-between;
    p {
      width: 60px;
    }
  }
  .el-button {
    margin-top: 20px;
    width: 100%;
  }
}
</style>
