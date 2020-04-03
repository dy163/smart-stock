<template>
  <div class="layout-wrap">
    <el-container>
      <el-aside width="200px">
        <Aside />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <!-- 发布文章和文章列表在这里显示内容 -->
          <!-- <router-view/> -->
          <router-view :key="$route.path" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "./commpontents/header";
import Aside from "./commpontents/aside";

export default {
  name: "LayoutIndex",
  components: {
    Aside,
    Header
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang='less' scoped>
.layout-wrap {
  height: 100%;
  // padding: 0 220px;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #5092b8;
}
.el-header {
  background-color: #a9a3be;
}
.el-main {
  background-color: #c0b6c2;
}
</style>