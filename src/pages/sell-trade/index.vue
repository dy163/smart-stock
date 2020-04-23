<template>
  <div class="shares">
    <!-- 持仓头部 -->
    <el-card class="shares-top">
      <el-button type="primary" @click.native="handleFiltrateSellSubscribe">一键托管</el-button>
    </el-card>
    <!-- 持仓内容 -->
    <el-card class="shares-content">
      <el-table :data="stockList" style="width: 100%">
        <el-table-column prop="stock_code" label="股票代码"></el-table-column>
        <el-table-column prop="stock_name" label="股票名称"></el-table-column>
        <el-table-column prop="market" label="市场"></el-table-column>
        <el-table-column prop="totalQty" label="总数量"></el-table-column>
        <el-table-column prop="sellableQty" label="可卖数量"></el-table-column>
        <el-table-column prop="avgPrice" label="成本价"></el-table-column>
        <el-table-column prop="unrealizedPnl" label="浮动盈亏"></el-table-column>
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
  </div>
</template>

<script>
import { myBuyStockGetList, filtrateSellSubscribe } from "@/api/trade";

export default {
  name: "SellTradeIndex",
  data() {
    return {
      pageNum: 1,
      pageSize: [10, 15, 20, 25, 30],
      totalCount: 0,
      stockList: []
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
    }
  }
};
</script>

<style lang='less' scoped>
.shares-top {
  margin-bottom: 10px;
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
</style>
