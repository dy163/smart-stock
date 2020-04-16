<template>
  <el-card class="entrust">
    <el-card class="entrust-top">
      <p>委托列表</p>
      <!-- <div class="entrust-header">
        <p>委托状态:</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div> -->
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
        <el-pagination
          :current-page="pageNum"
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="totalCount"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <!-- <el-upload
        style="display: inline; margin-left: 10px;margin-right: 10px;"
        action
        :http-request="uploadFile"
        :limit="1"
        :on-exceed="fileExceed"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :file-list="uploadList"
        ref="fileupload"
      >
      <el-button>点击</el-button>
      </el-upload>-->
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
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      entrustList: [], // 委托列表
      pageNum: 1,
      pageSize: 15,
      totalCount: 0
    };
  },
  created() {
    this.handleEntrustList()
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
        console.log(error, "操作失败");
      }
    },
    // 分页
    handleCurrentChange(page) {
      this.pageNum = page;
      this.handleStockList();
    },
    // 上传文件
    fileExceed() {
      this.$message.error("别贪心！一次只能上传一个哦~");
    },
    // 请求成功
    importSuccess(res) {
      // 后端的返回码--上传成功
      if (res.code == xxxxx) {
        // 显示√图标
        let e = document.getElementsByClassName(
          "el-upload-list__item-status-label"
        );
        e[0].setAttribute("style", "display:block !important");
        // 成功提示
        this.$message.success("上传成功");
        // 重新调用列表请求（代码略）
        this.getList();
        // 后端的返回码--上传失败
      } else {
        // 隐藏√图标
        let e = document.getElementsByClassName(
          "el-upload-list__item-status-label"
        );
        e[0].setAttribute("style", "display:none !important");
        // 失败提示--及后端返回的失败详情
        this.$message.error({
          dangerouslyUseHTMLString: true,
          duration: 4500,
          message: res.remark + ",<br/>请删除上传失败的文件，修改后重新上传"
        });
      }
    },

    // 请求失败
    importError(err) {
      this.$message.error({
        dangerouslyUseHTMLString: true,
        duration: 4500,
        message: "上传出现异常，请稍后重试" + ",<br/><br/>异常原因：" + err
      });
    },

    // 自定义上传
    uploadFile(item) {
      const form = new FormData();
      form.append("file", item.file);
      console.log(item);
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
  text-align: center;
}
</style>
