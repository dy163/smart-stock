<template>
  <div>
    <!-- 筛选头部 -->
    <el-card class="box-card">
      <div class="box-card-header">
        <div class="download">
          <el-upload
            class="upload-demo"
            action="http://47.92.85.1:8089/excel/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :headers="token"
            accept=".xlsx"
          >
            <el-button size="small" type="primary">上传excel</el-button>
          </el-upload>
          <p>
            <span @click="handleDever">导出excel</span>
            <!-- <a href="http://smartstock.yidonghuayuan.com/excel/download?up_range=1.03">导出excel</a> -->
          </p>
        </div>
        <div>
          <el-input placeholder="请输入股票代码" v-model="stockAccount">
            <template slot="prepend">代码</template>
          </el-input>
          <el-button type="primary" @click.native="handleFiltrateAddOne">手动添加</el-button>
        </div>
        <div>
          <el-button type="primary" @click.native="handleFiltrateIntellect">智能筛选</el-button>
        </div>
      </div>
      <el-dialog
        title="智能选择"
        :visible.sync="dialogIntellect"
        width="25%"
        class="screening-show"
        :close-on-click-modal="false"
      >
        <el-form ref="form" :model="choice" label-width="80px" :inline="true" v-show="showBargin">
          <!-- <el-form ref="form" :model="choice" label-width="80px"> -->
          <el-form-item label="上调区间:">
            <el-select v-model="choice.region" placeholder="请选择合适区间" @change="handleSelectGetList">
              <el-option label="3%" value="0"></el-option>
              <el-option label="5%" value="1"></el-option>
              <el-option label="8%" value="2"></el-option>
              <el-option label="10%" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="account-btn">
            <el-button type="primary" @click.native="handleSubmit">确认</el-button>
          </el-form-item>
        </el-form>
        <!-- 导出 -->
        <el-form ref="form" :model="choice" label-width="80px" :inline="true" v-show="showDever">
          <el-form-item label="选择区间:">
            <el-select
              v-model="choice.region"
              placeholder="请选择合适区间"
              @change="handleSelectGetListDever"
            >
              <el-option label="3%" value="0">
                <a
                  href="http://smartstock.yidonghuayuan.com/excel/download?up_range=1.03"
                >导出3%excel</a>
              </el-option>
              <el-option label="5%" value="1">
                <a
                  href="http://smartstock.yidonghuayuan.com/excel/download?up_range=1.05"
                >导出5%excel</a>
              </el-option>
              <el-option label="8%" value="2">
                <a
                  href="http://smartstock.yidonghuayuan.com/excel/download?up_range=1.08"
                >导出8%excel</a>
              </el-option>
              <el-option label="10%" value="3">
                <a href="http://smartstock.yidonghuayuan.com/excel/download?up_range=1.1">导出10%excel</a>
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item class="account-btn">
            <el-button type="primary" @click.native="handleSubmit">确认</el-button>
          </el-form-item>-->
        </el-form>
      </el-dialog>
    </el-card>
    <!-- 筛选内容 -->
    <el-card>
      <el-table :data="filtrateList" style="width: 100%" :row-class-name="tableRowClassName">
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
        <el-table-column prop="status" label="委托状态">
          <template slot-scope="scope">
            <el-tag
              class="normal"
              effect="dark"
              size="mini"
              :type="screenType[scope.row.status].type"
            >{{ screenType[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
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
import {
  filtrateGetList,
  filtrateAddList,
  filtrateClear,
  filtrateDelete,
  filtrateAddOne
} from "@/api/record";
import { excelUpload, excelDownload } from "@/api/trade";
import { getUser } from "@/untils/auth";
import { mapState } from "vuex";

export default {
  name: "ScreeningIndex",
  data() {
    return {
      showBargin: false,
      showDever: false,
      dialogIntellect: false,
      token: {
        token: getUser()
      },
      form: {
        file: ""
      },
      fileList: [], // excel文件列表
      screenType: [
        //  状态
        {
          type: "",
          label: "未托管"
        },
        {
          type: "success",
          label: "已托管"
        },
        {
          type: "info",
          label: "不可托管"
        },
        {
          type: "danger",
          label: "已委托"
        },
        {
          type: "warning",
          label: "已成交"
        }
      ],
      stockAccount: "", // 手动筛选
      filtrateList: [],
      choice: {
        region: "5%"
      },
      range: 1.05,
      pageNum: 1,
      pageSize: [10, 15, 20, 25, 30],
      totalCount: 0,
      id: ""
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
    this.handleFiltrateGetList();
  },
  methods: {
    // handleSubmit
    handleSubmit() {
      if (this.id === "") {
        this.range = 1.05;
        this.handleBrainPower();
        this.dialogIntellect = false;
      } else if (this.id == 0) {
        this.range = 1.03;
        this.handleBrainPower();
        this.dialogIntellect = false;
      } else if (this.id == 1) {
        this.range = 1.05;
        this.handleBrainPower();
        this.dialogIntellect = false;
      } else if (this.id == 2) {
        this.range = 1.08;
        this.handleBrainPower();
        this.dialogIntellect = false;
      } else if (this.id == 3) {
        this.range = 1.1;
        this.handleBrainPower();
        this.dialogIntellect = false;
      }
    },
    //
    handleFiltrateIntellect() {
      this.dialogIntellect = true;
      this.showBargin = true;
      this.showDever = false;
    },
    //
    handleSelectGetList(q) {
      this.id = q;
    },
    // 隔行变色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    // 获取股票列表
    async handleFiltrateGetList() {
      try {
        const date = new FormData();
        date.append("pageNum", this.pageNum);
        date.append("pageSize", this.size.sizenum);
        const res = await filtrateGetList(date);
        if (res.data.result == 10020) {
          return this.$message("请上传文件进行智能筛选");
        } else {
          this.filtrateList = res.data.result.list;
          this.totalCount = res.data.result.total;
        }
      } catch (error) {
        this.$message.error("列表操作获取失败");
      }
    },
    // 分页
    handleSizeChange(val) {
      this.size.sizenum = `${val}`;
      this.handleFiltrateGetList();
    },
    handleCurrentChange(page) {
      this.pageNum = page;
      this.handleFiltrateGetList();
    },
    // 智能选股
    async handleBrainPower() {
      try {
        const date = new FormData();
        date.append("up_range", this.range);
        const res = await filtrateAddList(date);
        if (res.data.result == 10017) {
          return;
        } else if (res.data.status) {
          this.filtrateList = res.data.result;
          this.$message({ message: "智能筛选成功", type: "success" });
        }
        this.handleFiltrateGetList();
      } catch (error) {
        this.$message.error("智能操作失败");
      }
    },
    // 清空列表
    async handleFiltrateClear() {
      try {
        const res = await filtrateClear();
        if (res.data.result == 10015) {
          return;
        } else {
          this.filtrateList = [];
        }
      } catch (error) {
        this.$message.error("清空列表操作失败");
      }
    },
    // 手动筛选
    async handleFiltrateAddOne() {
      try {
        if (!this.stockAccount) {
          this.$message({ message: "警告哦，请输入股票代码", type: "warning" });
        } else {
          // this.handleFiltrateClear();
          const date = new FormData();
          date.append("stock_code", this.stockAccount);
          const res = await filtrateAddOne(date);
          this.handleFiltrateGetList();
          this.stockAccount = "";
          if (res.data.status) {
            this.$message({ message: "添加成功", type: "success" });
          }
          if (res.data.result == 10012) {
            this.$message.error("手动筛选失败");
          }
        }
      } catch (error) {
        this.$message.error("操作失败");
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
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择1个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 导出
    handleDever() {
      this.dialogIntellect = true;
      this.showBargin = false;
      this.showDever = true;
    },
    handleSelectGetListDever(q) {
      if (q == 0 || q == 1 || q == 2 || q == 3) {
        this.dialogIntellect = false;
      }
    }
  }
};
</script>

<style lang='less' scoped>
a {
  color: #000;
}
.box-card {
  margin-bottom: 10px;
  height: 110px;
  .box-card-header {
    display: flex;
    justify-content: space-between;
    .download {
      display: flex;
      p {
        margin-left: 30px;
        background-color: #409eff;
        height: 32px;
        line-height: 32px;
        border-radius: 5px;
        padding: 0 5px;
        font-size: 12px;
        color: #fff;
        span {
          display: inline-block;
          padding: 0 15px;
        }
      }
    }
    div:nth-child(2) {
      display: flex;
      .el-button {
        margin-left: 10px;
        height: 41px;
      }
    }
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
.screening-show {
  text-align: center;
  /deep/.el-dialog__body {
    padding: 0;
    height: 220px;
    margin: 0;
  }
}
</style>
