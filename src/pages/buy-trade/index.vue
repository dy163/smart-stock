<template>
  <div class="buy-trade">
    <el-card class="buy-trade-header">
      <div>
        <p>
          <el-button type="primary" @click.native="handleFiltrateBuySubscribe">订阅行情</el-button>
        </p>
        <p>
          <el-button type="primary" @click.native="handleFiltrateBuyAllEntrust">一键托管</el-button>
        </p>
      </div>
    </el-card>
    <el-card class="buy-trade-card">
      <el-table
        :data="value"
        style="width: 100%"
        :header-cell-style="thStyleFun"
        :cell-style="cellStyleFun"
        :row-class-name="tableRowClassName"
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
          </template>
        </el-table-column>
      </el-table>
      <div class="screening-pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-sizes="pageSize"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 弹框 -->
    <el-dialog title="托管数据" :visible.sync="dialogTableVisible" width="25%">
      <el-form ref="form" :model="trusteeship" label-width="auto">
        <el-form-item label="代码：">
          <!-- <el-input v-model="trusteeship.depositCode" disabled></el-input> -->
          <p>{{ trusteeship.depositCode }}</p>
        </el-form-item>
        <el-form-item label="年线：">
          <!-- <el-input v-model="trusteeship.depositAverage" disabled></el-input> -->
          <p>{{ trusteeship.depositAverage }}</p>
        </el-form-item>
        <el-form-item label="数量：">
          <el-input-number
            v-model="trusteeship.depositNum"
            :step="100"
            step-strictly
            placeholder="请输入数量"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item class="account-btn">
          <el-button type="primary" @click="handleSingleData">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 一键托管弹框 -->
    <el-dialog title="一键托管" :visible.sync="dialogAllEntrust" width="25%" class="diaEntrust">
      <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
        <el-tab-pane label="数量" name="first">
          <el-form label-width="auto" :model="allNum">
            <el-form-item label="数量：">
              <el-input-number v-model="allNum.um" @change="handleChange" :min="0" :step="100"></el-input-number>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="金额" name="second">
          <el-form label-width="auto" :model="allMoney">
            <el-form-item label="金额:">
              <el-input v-model="allMoney.money"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" @click.native="handleConfirm">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import {
  buyTrade,
  filtrateBuySubscribe,
  filtratebuyAllEntrust
} from "@/api/trade";
import { filtrateGetList } from "@/api/record";
import { mapState } from "vuex";

export default {
  name: "BuyTradeIndex",
  data() {
    return {
      activeName: "first",
      dialogAllEntrust: false,
      dialogTableVisible: false,
      formLabelWidth: "80px",
      pageNum: 1,
      pageSize: [10, 15, 20, 25, 30],
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
      ],
      trusteeship: {
        depositCode: "",
        depositAverage: "",
        depositNum: ""
      },
      allNum: {
        num: ""
      },
      allMoney: {
        money: ""
      }
    };
  },
  computed: {
    // ...mapState({
    //   print: [state => state.buyEntrust]
    // })
    ...mapState(["buyEntrust"]),
    size() {
      return {
        sizenum: 10
      };
    }
  },
  created() {
    this.handlebuyTrade();
    // this.totalCount = this.value.length;
    this.handleRetrieveData();
  },
  methods: {
    // 托管
    handleDeposit(index, row) {
      this.dialogTableVisible = true;
      this.trusteeship.depositAverage = row.year_average;
      this.trusteeship.depositCode = row.stock_code;
      this.id = row.id;
      this.index = index;
    },
    thStyleFun() {
      return "text-align:center";
    },
    cellStyleFun() {
      return "text-align:center";
    },
    // vux存储拿数据
    handlebuyTrade() {
      // this.value = this.buyEntrust;
    },
    // 分页
    handleSizeChange(val) {
      this.size.sizenum = `${val}`;
      this.handleRetrieveData();
    },
    handleCurrentChange(page) {
      this.pageNum = page;
      this.handleRetrieveData();
    },
    // 获取筛选数据
    async handleRetrieveData() {
      try {
        const date = new FormData();
        date.append("pageNum", this.pageNum);
        date.append("pageSize", this.size.sizenum);
        const res = await filtrateGetList(date);
        if (res.data.result == 10020) {
          return this.$message("请上传文件进行智能筛选");
        } else {
          this.value = res.data.result.list;
          this.totalCount = res.data.result.total;
        }
      } catch (error) {
        this.$message.error("列表操作获取失败");
      }
    },
    // 买入单条托管数据
    async handleSingleData() {
      try {
        const date = new FormData();
        date.append("id", this.id);
        date.append("quantity", this.trusteeship.depositNum);
        const res = await buyTrade(date);
        if (res.data.status) {
          this.value.forEach((element, index) => {
            if (this.index === index) {
              element.status = 1;
              element.quantity = this.trusteeship.depositNum;
            }
            this.$store.commit("handleFiltrateAddOne", this.value);
          });
          this.dialogTableVisible = false;
          this.trusteeship.depositNum = "";
        }
        this.handlebuyTrade();
      } catch (error) {}
    },
    // 买入订阅行情
    handleFiltrateBuySubscribe() {
      this.$confirm("确认订阅?", "订阅提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const date = new FormData();
          const res = await filtrateBuySubscribe(date);
          if (res.data.status) {
            this.$message({
              message: "成功订阅",
              type: "success"
            });
          }
        })
        .catch(() => {
          this.$message("买入订阅行情操作取消");
        });
    },
    // 一键托管（金额和数量）
    handleFiltrateBuyAllEntrust() {
      this.dialogAllEntrust = true;
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleChange(val) {
      this.allMoney.num = val;
    },
    async handleConfirm() {
      try {
        if (this.activeName === "first") {
          const date = new FormData();
          date.append("way", "quantity");
          date.append("quantity", this.allMoney.num);
          const res = await filtratebuyAllEntrust(date);
          if (res.data.status) {
            this.handleRetrieveData();
            this.dialogAllEntrust = false;
            this.allMoney.num = "";
          }
        } else {
          const date = new FormData();
          date.append("way", "amount");
          date.append("amount", this.allMoney.money);
          const res = await filtratebuyAllEntrust(date);
          if (res.data.status) {
            this.handleRetrieveData();
            this.dialogAllEntrust = false;
            this.allMoney.money = "";
          }
        }
      } catch (error) {
        this.$message.error("操作失败");
      }
    },
    // 隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex%2 ==1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
  }
};
</script>

<style lang='less' scoped>
.buy-trade-card {
  margin-top: 10px;
}
.el-form {
  .el-input-number {
    width: 100%;
  }
  .account-btn {
    margin: 0;
    /deep/.el-form-item__content {
      margin: 0 !important;
    }
    .el-button--primary {
      width: 100%;
    }
  }
}
.screening-pagination {
  margin-top: 20px;
  text-align: center;
}
.buy-trade-header {
  div {
    display: flex;
    justify-content: space-between;
  }
}
.diaEntrust {
  /deep/.el-tabs__active-bar {
    height: 0;
    width: 30px!important;
  }
  .el-button--primary {
    width: 100%;
  }
}
/deep/.el-table .warning-row {
  background: oldlace;
}

/deep/.el-table .success-row {
  background: #f0f9eb;
}
</style>
