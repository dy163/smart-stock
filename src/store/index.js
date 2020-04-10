import Vue from 'vue'
import Vuex from 'vuex'

import {
  // filtrateGetList,
  // filtrateAddList,
  // filtrateClear,
  // filtrateDelete,
  filtrateAddOne
} from "@/api/record";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    buyEntrust: '',
    addBuy: window.localStorage.getItem('addBuy')
  },
  mutations: {
    async handleFiltrateAddOne(state,buyEntrust) {
      state.buyEntrust = buyEntrust
      try {
        const date = new FormData();
        date.append("stock_code", state.buyEntrust);
        await filtrateAddOne(date);
      } catch (error) {
        console.log(error,'vuex单条数据')
      }
    },
    handleAddBuy(state, addBuy) {
      state.addBuy = addBuy
      // window.localStorage.setItem('addBuy',JSON.stringify(state.addBuy))
    }
    
  },
  actions: {

  },
  modules: {
  }
})
