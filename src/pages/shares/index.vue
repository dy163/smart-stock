<template>
  <div class="shares">
    <el-card>
      <!-- 持仓头部 -->
      <el-card class="shares-top">
        <p>持仓数据</p>
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
        <!-- 分页 -->
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
    </el-card>
  </div>
</template>

<script>
import { myBuyStockGetList } from "@/api/trade";

export default {
  name: "SharesIndex",
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
