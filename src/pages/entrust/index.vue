<template>
  <div class="entrust">
    <el-card class="entrust-top">
      <div>
        <p>委托列表</p>
        <p>
          <el-button type="primary" @click.native="handleRefresh">刷新</el-button>
        </p>
      </div>
    </el-card>
    <!-- 内容 -->
    <el-card>
      <el-table :data="entrustList" style="width: 100%" :row-class-name="tableRowClassName">
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
  </div>
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
      pageSize: [10, 15, 20, 25, 30],
      totalCount: 0
    };
  },
  computed: {
    size() {
      return {
        sizenum: 10
      };
    }
  },
  mounted() {
    // this.$nexTick(() => {
    this.handleEntrustList();
    // })
  },
  methods: {
    // 刷新
    handleRefresh() {
      this.handleEntrustList();
      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success"
      });
    },
    // 委托列表
    async handleEntrustList() {
      try {
        const date = new FormData();
        date.append("pageNum", this.pageNum);
        date.append("pageSize", this.size.sizenum);
        const res = await entrustStockList(date);
        this.entrustList = res.data.result.list;
        this.totalCount = res.data.result.total;
      } catch (error) {
        this.$message("获取失败");
      }
    },
    // 分页
    handleSizeChange(val) {
      this.size.sizenum = `${val}`;
      this.handleEntrustList();
    },
    handleCurrentChange(page) {
      this.pageNum = page;
      this.handleEntrustList();
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
.entrust-top {
  margin-bottom: 10px;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.screening-pagination {
  margin-top: 20px;
  text-align: center;
}
/deep/.el-table .warning-row {
  background: oldlace;
}

/deep/.el-table .success-row {
  background: #f0f9eb;
}
</style>
