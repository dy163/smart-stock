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
          <el-input placeholder="请输入内容" v-model="input">
            <template slot="prepend">代码</template>
          </el-input>
        </div>
        <div>
          <el-button type="primary">手动筛选</el-button>
        </div>
        <div>
          <el-button type="primary">智能筛选</el-button>
        </div>
      </div>
    </el-card>
    <!-- 筛选内容 -->
    <el-card>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="代码"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="address" label="市场"></el-table-column>
        <el-table-column prop="address" label="收盘价"></el-table-column>
        <el-table-column prop="address" label="开盘价"></el-table-column>
        <el-table-column prop="address" label="年线"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ScreeningIndex",
  data() {
    return {
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表
      input: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "1518 "
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "1517"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "1519"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "1516"
        }
      ]
    };
  },
  created() {},
  methods: {
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
.box-card-header {
  display: flex;
  justify-content: space-between;
}
</style>
