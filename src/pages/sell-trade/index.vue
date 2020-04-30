<template>
  <div class="shares">
    <!-- 持仓头部 -->
    <el-card class="shares-top">
      <div>
        <el-button type="primary" @click.native="handleFiltrateSellSubscribe">一键托管</el-button>
        <el-button type="primary" @click.native="handleFiltrateSellRenovate">刷新</el-button>
      </div>
    </el-card>
    <!-- 持仓内容 -->
    <el-card class="shares-content">
      <el-table :data="stockList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="stock_code" label="股票代码"></el-table-column>
        <el-table-column prop="stock_name" label="股票名称"></el-table-column>
        <el-table-column prop="market" label="市场"></el-table-column>
        <el-table-column prop="totalQty" label="总数量"></el-table-column>
        <el-table-column prop="sellableQty" label="可卖数量"></el-table-column>
        <el-table-column prop="avgPrice" label="成本价"></el-table-column>
        <el-table-column prop="unrealizedPnl" label="浮动盈亏"></el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleSell(scope.$index, scope.row)">卖出</el-button>
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
      <!-- 单独卖出展示 -->
      <el-dialog
        title="卖出"
        :visible.sync="dialogSell"
        width="20%"
        class="sell-show"
        :close-on-click-modal="false"
      >
        <el-form ref="form" :model="formSell" label-width="auto">
          <el-form-item label="代码:">
            <p>{{ formSell.code }}</p>
          </el-form-item>
          <el-form-item label="市场:">
            <p>{{ formSell.market }}</p>
          </el-form-item>
          <el-form-item label="价格:">
            <el-input-number v-model="formSell.price" :min="0" :precision="2" :step="0.01"></el-input-number>
          </el-form-item>
          <el-form-item label="数量:">
            <el-input-number v-model="formSell.num" :min="100" :step="100" step-strictly></el-input-number>
          </el-form-item>
          <el-form-item class="sell-btn">
            <el-button type="primary" @click="handleSubmitSell">确认添加</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  myBuyStockGetList,
  filtrateSellSubscribe,
  sellEntrust
} from "@/api/trade";

export default {
  name: "SellTradeIndex",
  data() {
    return {
      dialogSell: false,
      pageNum: 1,
      pageSize: [10, 15, 20, 25, 30],
      totalCount: 0,
      stockList: [],
      formSell: {
        code: "",
        market: "",
        price: "",
        num: ""
      }
    };
  },
  computed: {
    size() {
      return {
        sizenum: 10
      };
    }
  },
  created() {
    this.handleStockList();
  },
  methods: {
    // 刷新
    handleFiltrateSellRenovate() {
      this.handleStockList()
    },
    // 单条卖出
    handleSell(index, row) {
      this.formSell.code = row.stock_code;
      this.formSell.market = row.market;
      this.dialogSell = true;
    },
    async handleSubmitSell() {
      try {
        const date = new FormData();
        date.append("stock_code", this.formSell.code);
        date.append("market", this.formSell.market);
        date.append("price", this.formSell.price);
        date.append("quantity", this.formSell.num);
        const res = await sellEntrust(date);
        if (res.data.status) {
          this.dialogSell = false;
          this.formSell.price = "";
          this.formSell.num = "";
          this.$message({
            message: "单条卖出成功",
            type: "success"
          });
        }
      } catch (error) {
        this.$message("卖出失败");
      }
    },
    // 卖出列表数据
    async handleStockList() {
      try {
        const date = new FormData();
        date.append("pageNum", this.pageNum);
        date.append("pageSize", this.size.sizenum);
        const res = await myBuyStockGetList(date);
        this.stockList = res.data.result.list;
        this.totalCount = res.data.result.total;
      } catch (error) {
        this.$message("获取失败");
      }
    },
    // 分页
    handleSizeChange(val) {
      this.size.sizenum = `${val}`;
      this.handleStockList();
    },
    handleCurrentChange(page) {
      this.pageNum = page;
      this.handleStockList();
    },
    // 一键托管
    handleFiltrateSellSubscribe() {
      this.$confirm("一键托管?", "托管提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const date = new FormData();
          const res = await filtrateSellSubscribe(date);
          if (res.data.status) {
            this.$message({
              message: "一键托管成功",
              type: "success"
            });
          }
        })
        .catch(() => {
          this.$message("一键托管操作取消");
        });
    },
    // 隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    }
  }
};
</script>

<style lang='less' scoped>
.shares-top {
  margin-bottom: 10px;
  .el-button--primary {
    display: block;
  }
  div {
    display: flex;
    justify-content: space-between;
  }
}
.screening-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  div:nth-child(1) {
    p {
      width: 80px;
    }
  }
}
/deep/.el-table .warning-row {
  background: oldlace;
}

/deep/.el-table .success-row {
  background: #f0f9eb;
}
.sell-show {
  .el-input-number {
    width: 100%;
  }
  .sell-btn {
    margin-bottom: 0;
    width: 100%;
    /deep/.el-form-item__content {
      margin: 0 !important;
      .el-button--primary {
        width: 100%;
      }
    }
  }
}
</style>
