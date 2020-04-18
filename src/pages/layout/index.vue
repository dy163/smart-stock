<template>
  <div class="layout-wrap">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="180px">
          <Aside />
        </el-aside>
        <el-main>
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