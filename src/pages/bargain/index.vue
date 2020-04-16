<template>
  <div class="bargin">
    <el-card class="bargin-top">
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
    </el-card>
    <!-- 内容 -->
    <el-card>
      <div class="panel-head" id="add">
        <strong>
          <span class="el-icon-edit"></span>
          <span class="title">上传数据</span>
        </strong>
      </div>
      <div class="body-content">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="form uploadform">
          <el-form-item label="部门" prop="name">
            <el-select v-model="form.type" placeholder="请选择" style="width: 135px">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-upload
              class="upload-demo"
              ref="upload"
              action=""
              :on-preview="handlePreview"
              :before-upload="beforeAvatarUpload"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
              :on-success="handleSuccess"
              :data="form"
              name="salaryBill"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
              >上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "BarginIndex",
  data() {
    return {
      options: [
        {
          val: "选项1",
          label: "黄金糕"
        },
        {
          val: "选项2",
          label: "双皮奶"
        },
        {
          val: "选项3",
          label: "蚵仔煎"
        },
        {
          val: "选项4",
          label: "龙须面"
        },
        {
          val: "选项5",
          label: "北京烤鸭"
        }
      ],
      val: '',
      options1: [
        {
          value: "1",
          label: "帅哥部"
        },
        {
          value: "2",
          label: "美女部"
        }
      ],
      fileName: "",
      fileList: [],
      ruleForm: {
        //          name: '',
        isShow: "0"
      },
      form: {
        type: "1"
      }
    };
  },
  created() {},
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },

    beforeAvatarUpload(file) {
      let Xls = file.name.split(".");

      if (Xls[1] === "xls" || Xls[1] === "xlsx") {
        return file;
      } else {
        this.$message.error("上传文件只能是 xls/xlsx 格式!");
        return false;
      }
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleSuccess(res, file, fileList) {
      if (res.code === 20000) {
        this.$message({
          message: "上传成功！",
          type: "success"
        });
      } else {
        this.$message({
          message: res.msg,
          type: "error"
        });
      }
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
