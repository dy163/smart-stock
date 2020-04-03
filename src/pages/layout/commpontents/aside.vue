<template>
  <div class="aside">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <!-- <el-menu-item index="/">
        <span slot="title">图表展示</span>
      </el-menu-item> -->
      <el-menu-item index="/">
      <!-- <el-menu-item index="/administer"> -->
        <span slot="title">账户管理</span>
      </el-menu-item>
      <el-menu-item index="/verif">
        <span slot="title">筛股管理</span>
      </el-menu-item>
      <el-menu-item index="/increase">
        <span slot="title">交易管理</span>
      </el-menu-item>
      <el-menu-item index="/closing-time">
        <span slot="title">持仓管理</span>
      </el-menu-item>
      <el-menu-item index="/information">
        <span slot="title">委托管理</span>
      </el-menu-item>
      <el-menu-item index="/settings">
        <span slot="title">成交管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {};
  },
  created() {
      
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  },
}

</script>

<style lang='less' scoped>
.aside {
  width: 100%;
}
</style>