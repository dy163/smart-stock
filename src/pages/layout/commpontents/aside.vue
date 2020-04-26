<template>
  <div class="aside">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#333443"
      text-color="#fff"
      active-text-color="#167ddd"
      :router="true"
    >
      <el-menu-item index="/" class="aside-account">
        <i class="el-icon-location"></i>
        <span slot="title">账户管理</span>
      </el-menu-item>
      <el-menu-item index="/screening">
        <i class="el-icon-s-finance"></i>
        <span slot="title">筛股管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-unfold"></i>
          <span>交易管理</span>
        </template>
        <el-menu-item-group class="aside-buy">
          <el-menu-item index="/buy-trade">
            <i class="el-icon-sold-out"></i>
            买入
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/sell-trade">
            <i class="el-icon-sell"></i>
            卖出
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/shares">
        <i class="el-icon-box"></i>
        <span slot="title">持仓管理</span>
      </el-menu-item>
      <el-menu-item index="/entrust">
        <i class="el-icon-guide"></i>
        <span slot="title">委托管理</span>
      </el-menu-item>
      <el-menu-item index="/bargain">
        <i class="el-icon-brush"></i>
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
  created() {},
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    }
  }
};
</script>

<style lang='less' scoped>
/deep/.el-menu {
  border-right: 0;
}
/deep/.el-menu-item-group__title {
  padding: 0;
}
/deep/.aside-account {
  border-top: 0.5px solid #14151c;
}
/deep/.el-menu-item {
  border-bottom: 0.5px solid #14151c;
}
/deep/.el-submenu__title {
 border-bottom: 0.5px solid #14151c;
}
/deep/.el-submenu.is-active .el-submenu__title {
  border-bottom: 0.5px solid #14151c;
}
// .aside-buy {
//   border-top: 0.5px solid #14151c;
// }
</style>