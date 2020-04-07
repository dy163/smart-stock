<template>
  <div class="entrust">
    <el-card class="entrust-top">
      <div class="entrust-header">
        <p>委托状态:</p>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </el-card>
    <!-- 内容 -->
    <el-card></el-card>
  </div>
</template>

<script>
export default {
  name: "EntrustIndex",
  data() {
    return {
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
      value: ""
    };
  },
  created() {},
  methods: {}
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
</style>
