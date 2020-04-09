<template>
  <div>
    <!-- 筛选头部 -->
    <el-card class="box-card">
      <div class="box-card-header">
        <div>
          <el-upload
            :limit="limitNum"
            :auto-upload="false"
            accept=".xlsx"
            :action="UploadUrl()"
            :before-upload="beforeUploadFile"
            :on-change="fileChange"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileList"
          >
            <el-button size="small" type="primary" @click="uploadFile">上传Excel</el-button>
          </el-upload>
        </div>
        <div>
          <el-input placeholder="请输入股票代码" v-model="stockAccount">
            <template slot="prepend">代码</template>
          </el-input>
          <el-button type="primary" @click.native="handleFiltrateAddOne">手动筛选</el-button>
        </div>
        <div>
          <el-button type="primary" @click.native="handleBrainPower">智能筛选</el-button>
        </div>
      </div>
    </el-card>
    <!-- 筛选内容 -->
    <el-card>
      <el-table :data="filtrateList" style="width: 100%">
        <el-table-column prop="account" label="账号名" width="120"></el-table-column>
        <el-table-column prop="stock_code" label="股票代码"></el-table-column>
        <el-table-column prop="stock_name" label="股票名称"></el-table-column>
        <el-table-column prop="market" label="市场"></el-table-column>
        <el-table-column prop="open" label="开盘价"></el-table-column>
        <el-table-column prop="close" label="收盘价"></el-table-column>
        <el-table-column prop="year_average" label="年线"></el-table-column>
        <el-table-column prop="entrust_price" label="委托价"></el-table-column>
        <el-table-column prop="quantity" label="数量"></el-table-column>
        <el-table-column prop="amount" label="金额"></el-table-column>
        <el-table-column prop="status" label="委托状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
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
import {
  filtrateGetList,
  filtrateAddList,
  filtrateClear,
  filtrateDelete,
  filtrateAddOne
} from "@/api/record";

export default {
  name: "ScreeningIndex",
  data() {
    return {
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表
      stockAccount: "", // 手动筛选
      filtrateList: [],
      pageNum: 1,
      pageSize: 15,
      totalCount: 0
    };
  },
  created() {
    this.handleFiltrateGetList();
  },
  methods: {
    // 获取股票列表
    async handleFiltrateGetList() {
      try {
        const date = new FormData();
        date.append("pageNum", this.pageNum);
        date.append("pageSize", this.pageSize);
        const res = await filtrateGetList(date);
        this.filtrateList = res.data.result.list;
        this.totalCount = res.data.result.total;
      } catch (error) {
        console.log(error, "操作失败");
      }
    },
    // 分页
    handleCurrentChange(page) {
      this.pageNum = page;
      this.handleFiltrateGetList();
    },
    // 智能选股
    async handleBrainPower() {
      this.handleFiltrateClear();
      try {
        const res = await filtrateAddList();
        this.filtrateList = res.data.result;
        this.handleFiltrateGetList();
      } catch (error) {
        console.log(error, "操作失败");
      }
    },
    // 清空列表
    async handleFiltrateClear() {
      try {
        const res = await filtrateClear();
        this.filtrateList = [];
      } catch (error) {
        console.log(error, "操作失败");
      }
    },
    // 手动筛选
    async handleFiltrateAddOne() {
      try {
        if (!this.stockAccount) {
          this.$message({
            message: "警告哦，请输入股票代码",
            type: "warning"
          });
        } else {
          this.handleFiltrateClear();
          const date = new FormData();
          date.append("stock_code", this.stockAccount);
          const res = await filtrateAddOne(date);
          this.handleFiltrateGetList();
        }
      } catch (error) {
        console.log(error, "操作失败");
      }
    },
    // 删除单条股票
    handleDelete(index, row) {
      this.$confirm("确认删除账号?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const date = new FormData();
          date.append("id", row.id);
          await filtrateDelete(date);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.handleFiltrateGetList(); // 更新列表
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log(file.raw);
      this.fileList.push(file.raw);
      console.log(this.fileList);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log("before upload");
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== "xlsx") {
        this.$message.warning("只能上传后缀是.xlsx的文件");
      }
      if (size > 10) {
        this.$message.warning("文件大小不得超过10M");
      }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$message.success("文件上传成功");
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");
    },
    UploadUrl: function() {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return "";
    },
    uploadFile() {
      this.$message.warning("请上传文件");
    }
  }
};
</script>

<style lang='less' scoped>
.box-card {
  margin-bottom: 10px;
  .box-card-header {
    display: flex;
    justify-content: space-between;
    div:nth-child(2) {
      display: flex;
      .el-button {
        margin-left: 10px;
      }
    }
  }
}
.screening-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
