<template>
  <div class="shares">
    <!-- 持仓头部 -->
    <el-card class="shares-top">
      <el-button type="primary" @click.native="handleFiltrateSellSubscribe">一键托管</el-button>
    </el-card>
    <!-- 持仓内容 -->
    <el-card class="shares-content">
      <el-table :data="stockList" style="width: 100%">
        <!-- <el-table-column prop="stock_code" label="账号"></el-table-column> -->
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
          :current-page="pageNum"
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="totalCount"
          @current-change="handleCurrentChange"
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
      pageSize: 15,
      totalCount: 0,
      stockList: []
    };
  },
  created() {
    this.handleStockList();
  },
  methods: {
    async handleStockList() {
      try {
        const date = new FormData();
        date.append("pageNum", this.pageNum);
        date.append("pageSize", this.pageSize);
        const res = await myBuyStockGetList(date);
        this.stockList = res.data.result.list;
        this.totalCount = res.data.result.total;
      } catch (error) {
        console.log(error, "操作失败");
      }
    },
    // 分页
    handleCurrentChange(page) {
      this.pageNum = page;
      this.handleStockList();
    },
    //
    async handleFiltrateSellSubscribe() {
      try {
        const date = new FormData();
        await filtrateSellSubscribe(date)
      } catch (error) {
        console.log(error,'卖出一键托管操作失败')
      }
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
  text-align: center;
}
</style>
