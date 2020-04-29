<template>
  <div>
    <!-- 筛选头部 -->
    <el-card class="box-card">
      <div class="box-card-header">
        <div>
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
            <el-button size="small" type="primary">点击上传excel</el-button>
          </el-upload>
        </div>
        <div>
          <el-input placeholder="请输入股票代码" v-model="stockAccount">
            <template slot="prepend">代码</template>
          </el-input>
          <el-button type="primary" @click.native="handleFiltrateAddOne">手动添加</el-button>
        </div>
        <div>
          <!-- <el-button type="primary" @click.native="handleChoice">智能筛选</el-button> -->
          <el-form ref="form" :model="choice" label-width="80px">
            <el-form-item label="智能筛选:">
              <el-select v-model="choice.region" placeholder="请选择合适区间">
                <el-option label="3%" value="sh"></el-option>
                <el-option label="5%" value="bj"></el-option>
                <el-option label="8%" value="hz"></el-option>
                <el-option label="100%" value="xm"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
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
import { excelUpload } from "@/api/trade";
import { getUser } from "@/untils/auth";
import { mapState } from "vuex";

export default {
  name: "ScreeningIndex",
  data() {
    return {
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
  created() {
    this.handleFiltrateGetList();
  },
  methods: {
    handleCommand(command) {
      console.log(command);
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
    handleChoice() {
      this.handleFiltrateClear();
      this.handleBrainPower();
    },
    async handleBrainPower() {
      try {
        const res = await filtrateAddList();
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
    }
  }
};
</script>

<style lang='less' scoped>
.box-card {
  margin-bottom: 10px;
  height: 110px;
  .box-card-header {
    display: flex;
    justify-content: space-between;
    div:nth-child(2) {
      display: flex;
      .el-button {
        margin-left: 10px;
        height: 41px;
      }
    }
  }
  .el-form {
    .el-form-item {
      background-color: #409eff;
      color: #fff;
    }
    .el-select {
      width: 85px;
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
</style>
