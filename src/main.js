import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import VueAxios from "vue-axios";
import qs from 'qs';
import { nanoid } from 'nanoid';
import moment from 'moment'
import utils from "@/common/utils";
import less from 'less'
import XEUtils from "xe-utils";
import VXEUtils from "vxe-utils";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import "moment/locale/zh-cn";
moment.locale("zh-cn");

Vue.config.productionTip = false

Vue.use(less);
Vue.use(Antd);
Vue.use(VueAxios, axios);
Vue.use(VXEUtils, XEUtils);
XEUtils.mixin(utils);

Vue.prototype.$moment = moment;
Vue.prototype.$qs = qs;
Vue.prototype.nanoid = nanoid;

axios.defaults.baseURL = "http://localhost:3000"



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
