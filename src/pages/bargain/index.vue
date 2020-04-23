<template>
  <div class="bargin">
    <el-card>
      <el-card class="bargin-top">
        <p>成交列表</p>
      </el-card>
      <!-- 内容 -->
      <el-card>
        <el-table :data="barginList" style="width: 100%">
          <el-table-column prop="stock_code" label="股票代码"></el-table-column>
          <el-table-column prop="market" label="市场"></el-table-column>
          <el-table-column prop="exec_id" label="成交编号"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="quantity" label="总数量"></el-table-column>
          <el-table-column prop="trade_amount" label="成交金额"></el-table-column>
          <el-table-column prop="trade_time" label="成交时间"></el-table-column>
          <el-table-column prop="trade_type" label="成交类型"></el-table-column>
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
import { tradeGetkList } from "@/api/trade";

export default {
  name: "BarginIndex",
  data() {
    return {
      pageNum: 1,
      pageSize: [10, 15, 20, 25, 30],
      totalCount: 0,
      barginList: []
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
    this.getTradeGetkList();
  },
  methods: {
    async getTradeGetkList() {
      try {
        let date = new FormData();
        date.append("pageNum", this.pageNum);
        date.append("pageSize", this.size.sizenum);
        let res = await tradeGetkList(date);
        this.barginList = res.data.result.list;
        this.totalCount = res.data.result.total;
      } catch (error) {
        this.$message.error("错了哦，获取成交列表失败");
      }
    },
    // 分页
    handleSizeChange(val) {
      this.size.sizenum = `${val}`;
      this.getTradeGetkList();
    },
    handleCurrentChange(page) {
      this.pageNum = page;
      this.getTradeGetkList();
    }
  }
};
</script>

<style lang='less' scoped>
.bargin-top {
  margin-bottom: 10px;
}
.screening-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
