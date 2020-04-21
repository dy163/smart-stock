<template>
  <el-card class="entrust">
    <el-card class="entrust-top">
      <p>委托列表</p>
    </el-card>
    <!-- 内容 -->
    <el-card>
      <el-table :data="entrustList" style="width: 100%">
        <el-table-column prop="stock_code" label="股票代码"></el-table-column>
        <el-table-column prop="market" label="市场"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="quantity" label="总数量"></el-table-column>
        <el-table-column prop="qty_traded" label="今成交数量"></el-table-column>
        <el-table-column prop="qty_left" label="剩余数量"></el-table-column>
        <el-table-column prop="insert_time" label="委托时间"></el-table-column>
        <el-table-column prop="trade_amount" label="成交金额"></el-table-column>
        <el-table-column prop="order_status" label="状态"></el-table-column>
      </el-table>
      <div class="screening-pagination">
        <div>
          <p>总数：{{ totalCount }}</p>
        </div>
        <div>
          <el-pagination
            :current-page="pageNum"
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="totalCount"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </el-card>
</template>

<script>
import { entrustStockList } from "@/api/trade";

export default {
  name: "EntrustIndex",
  data() {
    return {
      uploadList: [],
      entrustList: [], // 委托列表
      pageNum: 1,
      pageSize: 15,
      totalCount: 0
    };
  },
  created() {
    this.handleEntrustList();
  },
  methods: {
    // 委托列表
    async handleEntrustList() {
      try {
        const date = new FormData();
        date.append("pageNum", this.pageNum);
        date.append("pageSize", this.pageSize);
        const res = await entrustStockList(date);
        this.entrustList = res.data.result.list;
        this.totalCount = res.data.result.total;
      } catch (error) {
        this.$message('获取失败')
      }
    },
    // 分页
    handleCurrentChange(page) {
      this.pageNum = page;
      this.handleStockList();
    }
  }
};
</script>

<style lang='less' scoped>
.entrust-top {
  margin-bottom: 10px;
  .entrust-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    p {
      margin-right: 15px;
    }
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
</style>
