import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // dataList: {
    //   pageNum: '',
    //   pageSize:'',
    //   totalCount: ''
    // },
    // tableList: [],
    buyEntrust: JSON.parse(window.localStorage.getItem('buyEntrust')),
  },
  mutations: {
    // 筛选数据列表
    handleFiltrateAddOne(state, buyEntrust) {
      state.buyEntrust = Object.assign(buyEntrust)
      window.localStorage.setItem('buyEntrust', JSON.stringify(state.buyEntrust))
    }
  },
  actions: {

  },
  modules: {}
})
