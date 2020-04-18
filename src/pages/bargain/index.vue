<template>
  <div class="bargin">
    <!-- <el-card class="bargin-top">
      <div class="bargin-header">
        <p>成交状态:</p>
        <el-select v-model="val" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.val"
            :label="item.label"
            :value="item.val"
          ></el-option>
        </el-select>
      </div>
    </el-card> -->
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
import { tradeGetkList } from "@/api/trade";

export default {
  name: "BarginIndex",
  data() {
    return {
      pageNum: 1,
      pageSize: 15,
      totalCount: 0,
      barginList: []
    };
  },
  created() {},
  mounted() {
    this.getTradeGetkList()
  },
  methods: {
    async getTradeGetkList () {
      try {
        let date = new FormData();
        date.append("pageNum", this.pageNum);
        date.append("pageSize", this.pageSize);
        let res = await tradeGetkList(date)
        this.barginList = res.data.result.list;
        this.totalCount = res.data.result.total;
      } catch (error) {
        this.$message.error('错了哦，获取成交列表失败');
      }
    },
    // 分页
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
  .bargin-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    p {
      margin-right: 15px;
    }
  }
}
</style>
