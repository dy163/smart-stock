import Vue from 'vue'
import Vuex from 'vuex'

import {
  filtrateGetList,
} from "@/api/record";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataList: {
      pageNum: '',
      pageSize:'',
      totalCount: ''
    },
    tableList: '',
    buyEntrust: JSON.parse(window.localStorage.getItem('buyEntrust')),
  },
  mutations: {
    handleFiltrateAddOne(state, buyEntrust) {
      state.buyEntrust = Object.assign(buyEntrust)
      window.localStorage.setItem('buyEntrust', JSON.stringify(state.buyEntrust))
    },
    async handlGetList(state, dataList) {
      try {
        state.dataList = Object.assign(dataList)
        const date = new FormData();
        date.append("pageNum", state.dataList.pageNum);
        date.append("pageSize", state.dataList.pageSize);
        const res = await filtrateGetList(date);
        state.tableList =  Object.assign(res.data.result.list);
        // this.filtrateList = res.data.result.list;
        state.dataList.totalCount = res.data.result.total;
        state.dataList.pageNum = res.data.result.pageNum
      } catch (error) {

      }
    }
  },
  actions: {

  },
  modules: {}
})
