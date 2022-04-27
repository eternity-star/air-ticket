<template>
  <div class="home">
    <div class="user-center">
      <div class="rotation">
        <div>
          <a-carousel autoplay>
            <div>
              <img src="../../../assets/image/backg1.jpg"
                   alt=""
                   width="100%"
                   height="100%" />
            </div>
            <div>
              <img src="../../../assets/image/backg2.jpg"
                   alt=""
                   width="100%"
                   height="100%" />
            </div>
            <div>
              <img src="../../../assets/image/backg3.jpg"
                   alt=""
                   width="100%"
                   height="100%" />
            </div>
            <div>
              <img src="../../../assets/image/backg4.jpg"
                   alt=""
                   width="100%"
                   height="100%" />
            </div>
          </a-carousel>
        </div>
      </div>
      <div class="search-ticket">
        <div class="search-top">
          <img src="../../../assets/image/飞机中.png"
               alt=""
               width="35px"
               height="35px" />
          <span>预订机票</span>
        </div>
        <div class="search-form">
          <a-form-model ref="searchForm"
                        :mode="form"
                        :rules="rules">
            <a-row :gutter="10">
              <a-col :span="8">
                <a-form-model-item prop="trip">
                  <span>行程：</span>
                  <a-radio-group v-model="form.trip"
                                 @change="tripChange">
                    <a-radio :value="1"
                             style="font-size: 14px">单程</a-radio>
                    <a-radio :value="2"
                             style="font-size: 14px">往返</a-radio>
                    <a-radio :value="3"
                             style="font-size: 14px">多行程</a-radio>
                  </a-radio-group>
                </a-form-model-item>
              </a-col>
              <a-col :span="10">
                <a-form-model-item>
                  <span>
                    <a-icon type="user"
                            style="font-size: 20px"></a-icon>
                    乘机人数：
                  </span>
                  <a-input-number v-model="form.passengerNum"
                                  placeholder="请输入"
                                  style="width: 60%"
                                  :min="0"
                                  :max="5" />
                  <!-- <div class="passengers"
                       @click="passengersClick">
                    <span>{{ passengerLength }}个乘机人</span>
                  </div> -->
                </a-form-model-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-model-item>
                  <span>舱位等级：</span>
                  <a-select v-model="form.cabin_type"
                            @change="cabinChange"
                            style="width: 70%;"
                            mode="multiple"
                            :show-arrow="true"
                            :allowClear="true"
                            :default-active-first-option="true"
                            :not-found-content="null"
                            :filter-option="false"
                            option-filter-prop="children"
                            placeholder="请选择舱位等级"
                            labelInValue>
                    <a-select-option v-for="(item, index) in cabinTypeList"
                                     :key="index"
                                     :value="index">
                      {{item}}
                    </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col> -->
            </a-row>
            <div v-if="form.trip !== 3">
              <a-row :gutter="10">
                <a-col :span="8">
                  <a-form-model-item>
                    <span v-if="form.trip === 2">出行、返程日期：</span>
                    <span v-else>出行日期：</span>
                    <a-range-picker v-if="form.trip === 2"
                                    v-model="form.round_time"
                                    :allowClear="false"
                                    :disabledDate="rangeDisabledDate"
                                    :placeholder="['出行时间', '返程时间']"
                                    format="YYYY-MM-DD"
                                    @change="timeChange"
                                    style="width: 65%" />
                    <a-date-picker v-else
                                   inputReadOnly
                                   v-model="form.plan_time"
                                   format="YYYY-MM-DD"
                                   :allowClear="false"
                                   :disabledDate="disabledDate"
                                   placeholder="请选择"
                                   style="width: 65%" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item prop="trip_start">
                    <span><img src="../../../assets/image/飞机_起飞.png"
                           alt=""
                           width="30px"
                           height="30px" />出发：</span>
                    <!-- <a-select
                      v-model="it.trip_start"
                      @change="timeChange"
                      @search="searchTrip"
                      style="width: 65%"
                      show-search
                      :show-arrow="true"
                      :allowClear="false"
                      :default-active-first-option="true"
                      :not-found-content="null"
                      :filter-option="false"
                      option-filter-prop="children"
                      placeholder="请选择出发地"
                      labelInValue
                    >
                      <a-select-option
                        v-for="item in cityList"
                        :key="item.no"
                        :value="item.no"
                      >
                        {{ item.city }}
                      </a-select-option>
                    </a-select> -->
                    <a-cascader :options="cityList"
                                :load-data="loadData"
                                v-model="form.trip_start"
                                style="width: 70%"
                                placeholder="请选择出发地" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item prop="trip_end">
                    <span><img src="../../../assets/image/飞机_降落.png"
                           alt=""
                           width="30px"
                           height="30px" />到达：</span>
                    <!-- <a-select
                      v-model="it.trip_end"
                      @change="timeChange"
                      @search="searchTrip"
                      style="width: 65%"
                      show-search
                      :show-arrow="true"
                      :allowClear="false"
                      :default-active-first-option="true"
                      :not-found-content="null"
                      :filter-option="false"
                      option-filter-prop="children"
                      placeholder="请选择目的地"
                      labelInValue
                    >
                      <a-select-option
                        v-for="item in cityList"
                        :key="item.no"
                        :value="item.no"
                      >
                        {{ item.city }}
                      </a-select-option>
                    </a-select> -->
                    <a-cascader :options="cityList"
                                v-model="form.trip_end"
                                :load-data="loadData"
                                style="width: 70%"
                                placeholder="请选择目的地" />
                  </a-form-model-item>
                </a-col>
                <!-- <a-col :span="1" v-if="index > 1">
                  <a-icon
                    type="close-circle"
                    style="margin-top: 15px; cursor: pointer; color: red"
                    @click="deleteTrip(index)"
                  />
                </a-col> -->
              </a-row>
            </div>
            <div v-else>
              <a-row :gutter="10"
                     v-for="(it, index) in form.tripList"
                     :key="index">
                <a-col :span="8">
                  <a-form-model-item>
                    <span>出行日期：</span>
                    <a-date-picker inputReadOnly
                                   v-model="it.plan_time"
                                   format="YYYY-MM-DD"
                                   :allowClear="false"
                                   :disabledDate="disabledDate"
                                   placeholder="请选择"
                                   style="width: 65%" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item prop="trip_start">
                    <span><img src="../../../assets/image/飞机_起飞.png"
                           alt=""
                           width="30px"
                           height="30px" />出发：</span>
                    <!-- <a-select
                      v-model="it.trip_start"
                      @change="timeChange"
                      @search="searchTrip"
                      style="width: 65%"
                      show-search
                      :show-arrow="true"
                      :allowClear="false"
                      :default-active-first-option="true"
                      :not-found-content="null"
                      :filter-option="false"
                      option-filter-prop="children"
                      placeholder="请选择出发地"
                      labelInValue
                    >
                      <a-select-option
                        v-for="item in cityList"
                        :key="item.no"
                        :value="item.no"
                      >
                        {{ item.city }}
                      </a-select-option>
                    </a-select> -->
                    <a-cascader :options="cityList"
                                :load-data="loadData"
                                v-model="it.trip_start"
                                style="width: 70%"
                                placeholder="请选择出发地" />
                  </a-form-model-item>
                </a-col>
                <a-col :span="8">
                  <a-form-model-item prop="trip_end">
                    <span><img src="../../../assets/image/飞机_降落.png"
                           alt=""
                           width="30px"
                           height="30px" />到达：</span>
                    <!-- <a-select
                      v-model="it.trip_end"
                      @change="timeChange"
                      @search="searchTrip"
                      style="width: 65%"
                      show-search
                      :show-arrow="true"
                      :allowClear="false"
                      :default-active-first-option="true"
                      :not-found-content="null"
                      :filter-option="false"
                      option-filter-prop="children"
                      placeholder="请选择目的地"
                      labelInValue
                    >
                      <a-select-option
                        v-for="item in cityList"
                        :key="item.no"
                        :value="item.no"
                      >
                        {{ item.city }}
                      </a-select-option>
                    </a-select> -->
                    <a-cascader :options="cityList"
                                v-model="it.trip_end"
                                :load-data="loadData"
                                style="width: 70%"
                                placeholder="请选择目的地" />
                    <span v-if="index > 1">
                      <a-icon type="close-circle"
                              style="margin-top: 15px; margin-left: 5px; cursor: pointer; color: red"
                              @click="deleteTrip(index)" />
                    </span>
                  </a-form-model-item>
                </a-col>
                <!-- <a-col :span="1" v-if="index > 1">
                  <a-icon
                    type="close-circle"
                    style="margin-top: 15px; cursor: pointer; color: red"
                    @click="deleteTrip(index)"
                  />
                </a-col> -->
              </a-row>
            </div>
            <a-row :gutter="10"
                   v-if="form.trip === 3">
              <a-col>
                <a-button @click="addTrip"
                          type="primary">
                  <a-icon type="plus" /> 添加航程
                </a-button>
              </a-col>
            </a-row>
            <a-row :gutter="10">
              <a-col :push="11">
                <a-button @click="search"
                          type="primary"
                          style="margin: 20px 0">
                  <a-icon type="search" />查询
                </a-button>
              </a-col>
            </a-row>
            <a-modal title="乘机人"
                     :visible="passengersVisible"
                     okText="继续"
                     @ok="handerOk"
                     @cancel="handerCancel">
              <div>
                <div v-for="(item, index) in this.form.passengers"
                     :key="index"
                     style="margin-bottom: 10px">
                  <span>
                    <a-icon type="user"
                            style="font-size: 25px"></a-icon>
                    乘机人{{ index + 1 }}：
                  </span>
                  <a-select @change="passengerChange"
                            style="width: 70%"
                            :show-arrow="true"
                            :allowClear="true"
                            :default-active-first-option="true"
                            :not-found-content="null"
                            :filter-option="false"
                            v-model="item.item_type"
                            option-filter-prop="children"
                            placeholder="请选择乘机人类型"
                            labelInValue>
                    <a-select-option v-for="(it, index) in passengersType"
                                     :key="index"
                                     :value="index">
                      {{ it }}
                    </a-select-option>
                  </a-select>
                  <a-icon type="close"
                          style="color: #04a2de; cursor: pointer; margin-left: 5px"
                          @click="deletePassenger(item, index)" />
                </div>
                <span @click="addPassenger"
                      style="color: #04a2de; cursor: pointer">
                  <a-icon type="plus-circle"
                          style="margin-right: 5px" />添加乘机人
                </span>
              </div>
            </a-modal>
          </a-form-model>
        </div>
      </div>
    </div>
    <div class="user-bottom">
      <!-- 搜索记录：后期基于数据库在实现 -->
      <!-- 搜索规则：只展示今天搜索的记录；支持清空 -->
      <div style="text-align: center">
        <a-row>
          <a-col :span="24"
                 style="margin-top: 32px">
            <a-statistic-countdown title="Day Level"
                                   :value="deadline"
                                   format="D 天 H 时 m 分 s 秒 SSS 毫秒" />
          </a-col>
        </a-row>
      </div>
      <div class="user-bottom-self">
        <div class="self">
          <div class="title">航班速报</div>
          <div class="recommend">
            <div class="recommend-self recommend-first">
              <div class="recommend-header">
                今日推荐航班
                <a-icon type="right-circle"
                        theme="filled"
                        style="margin-left: 2px" />
              </div>
              <div class="recommend-center">
                <recommend-box v-for="(item, index) in recommendData"
                               :key="index"
                               :infoData="item"
                               @click.native="recommendTicketClick(item)" />
              </div>
            </div>
            <div class="recommend-self recommend-second">
              <div class="recommend-header">
                今日推荐航班
                <a-icon type="right-circle"
                        theme="filled"
                        style="margin-left: 2px" />
              </div>
              <div class="recommend-center">
                <recommend-box v-for="(item, index) in recommendData"
                               :key="index"
                               :infoData="item" />
              </div>
            </div>
            <div class="recommend-self recommend-third">
              <div class="recommend-header">
                今日推荐航班
                <a-icon type="right-circle"
                        theme="filled"
                        style="margin-left: 2px" />
              </div>
              <div class="recommend-center">
                <recommend-box v-for="(item, index) in recommendData"
                               :key="index"
                               :infoData="item" />
              </div>
            </div>
          </div>
        </div>
        <div class="self">
          <div class="title">航空公司特惠专区</div>
          <div class="company-discount">
            <div class="discount-top">
              <div class="company-title">
                <div :class="
                    isCurrent === index
                      ? 'discount-top-box-choose'
                      : 'discount-top-box'
                  "
                     v-for="(item, index) in companyList"
                     :key="index"
                     @click="companyClick(item, index)">
                  <img :src="item.imgUrl"
                       alt=""
                       width="40px"
                       height="40px" />
                  <p>{{ item.title }}</p>
                </div>
              </div>
              <div class="company-info">
                <p>{{ companyDescription }}</p>
                <div @mouseover="isShow = true"
                     @mouseout="isShow = false"
                     class="view-all">
                  查看全部
                </div>
                <div v-show="isShow"
                     class="company-description">
                  {{ companyDescription }}
                </div>
              </div>
            </div>
            <div class="discount-bottom">
              <!-- <recommend-box style="width: 35%; height: 30%"/> -->
              <div class="plane-ticket"
                   v-for="(item, index) in list"
                   :key="index">
                <a-row>
                  <a-col :span="16">
                    <div class="toAddress">
                      <p>深圳
                        <a-icon type="swap-right" />广州
                      </p>
                      <p style="#999999">2022-02-03 周四</p>
                    </div>
                  </a-col>
                  <a-col :span="8">
                    <div class="toMoney">
                      <p>￥<span>74.5</span>起</p>
                      <p style="#999999">1.8折</p>
                    </div>
                  </a-col>
                </a-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-footer"></div>
  </div>
</template>

<script>
import recommendBox from './recommendBox.vue'
export default {
  name: 'home',
  data () {
    return {
      rules: {
        trip: [{ required: true, message: '请选择行程', trigger: 'change' }],
      },
      form: {
        trip: 1, //行程
        passengers: [], //乘机人数
        passengerNum: 1,//成绩人数
        cabin_type: [], //舱位等级
        plan_time: this.$moment(), //计划出行时间
        trip_start: [], //出发地
        trip_end: [], //目的地
        round_time: [this.$moment(), this.$moment().add(1, 'day')], // 往返时间
        tripList: [
          {
            plan_time: this.$moment(), //计划出行时间
            trip_start: [], //出发地
            trip_end: [], //目的地
          },
        ], // 多程时才有值
      },
      cityList: [
        { no: 1, city: '深圳' },
        { no: 2, city: '广州' },
        { no: 3, city: '东莞' },
        { no: 4, city: '中山' },
        { no: 5, city: '珠海' },
        { no: 6, city: '惠州' },
      ], //城市
      passengersVisible: false,
      passengersType: [
        '婴儿(0-23月)',
        '儿童(2-11岁)',
        '青少年(12-17岁)',
        '成人',
      ], //乘客类型
      cabinTypeList: ['经济舱', '商务/头等舱'],
      deadline: 1651224600000,
      recommendData: [
        {
          id: 0,
          index: 0,
          title: 'Ant Design Title 1',
        },
        {
          id: 1,
          index: 1,
          title: 'Ant Design Title 2',
        },
        {
          id: 2,
          index: 2,
          title: 'Ant Design Title 3',
        },
        {
          id: 3,
          index: 3,
          title: 'Ant Design Title 4',
        },
      ], //推荐航班
      companyList: [
        {
          title: '南方航空',
          imgUrl: require('@/assets/image/南方航空.png'),
          description:
            '中国南方航空股份有限公司是中国运输飞机最多、航线网络最发达、年客运量最大的航空公司。目前，南航经营包括波音787、777、747等，空客380、330、320等在内的客货运输机500架，机队规模跃居亚洲第一，在IATA全球240个成员航空公司中排名第三。形成了以广州、北京为中心枢纽，密集覆盖国内150多个通航点，全面辐射亚洲、链接欧洲、美洲和大洋洲，每天有1930个航班飞至全球35个国家和地区，193个目的地，航线网络通达全球1000个目的地，连接187个国家和地区，到达全球各主要城市。2011年，南航被国际航空服务认证权威机构Skytrax 授予“Skytrax四星级航空公司”称号，2012年9月28日，南航荣获中国民航局颁发的飞行安全最高奖“飞行安全钻石奖”，成为国内安全星级最高、安全业绩最好的航空公司。',
        },
        {
          title: '东方航空',
          imgUrl: require('@/assets/image/东方航空.png'),
          description:
            '中国东方航空股份有限公司（以下简称东航）总部位于上海，是中国三大航空公司之一，前身可追溯到1957年1月原民航上海管理处成立的第一支飞行中队，1997年在纽约、香港、上海三地挂牌上市，运营着超过700架客货运飞机组成的现代化机队，是全球最年轻的机队之一，并拥有中国规模最大的空中Wi-Fi机队，在国内率先推行手机等便携式设备的机上使用。作为天合联盟成员，东航的航线网络通达全球175个国家、1150个目的地，每年为全球超过1.2亿旅客提供服务，旅客运输量位列全球前十。“东方万里行”常旅客可享受联盟19家航空公司的会员权益及全球超过760间机场贵宾室。近年来，东航提出“打造世界一流，建设幸福东航”目标，相继荣获中国民航飞行安全最高奖——“飞行安全钻石奖”，连续8年被世界著名品牌评级机构（WPP）评为中国品牌前50强，蝉联BrandFinance全球品牌价值500强，还先后被多个权威机构评选为上市公司最高奖项“金鼎奖”、“中国证券金紫荆奖”、“世界进步最快航空公司奖”、“亚洲最受欢迎航空公司”等奖项，并在社会责任领域获得一系列重要荣誉。“世界品位，东方魅力”，东航以“精准、精致、精细”的服务为全球旅客不断创造精彩旅行体验。',
        },
        {
          title: '深圳航空',
          imgUrl: require('@/assets/image/深圳航空.png'),
          description:
            '深圳航空有限责任公司于1992年11月成立，1993年9月17日正式开航。股东为中国国际航空股份有限公司、深国际全程物流(深圳)有限公司，主要经营航空客、货、邮运输业务。截止2012年11月,深航共拥有波音747、737，空客320、319等各类型客货机逾百架，经营国内国际航线135条。2010年8月，深航成为第２６届世界大学生夏季运动会航空客运类唯一全球合作伙伴。作为深圳大运会全球唯一航空承运企业，深航为本届大运会量身打造的四架“大运号”飞机将承载着大运精神，为大运会提供“火炬传递”和人员运输等优质航空服务，将大运精神带至每一位关注它的宾客心中。',
        },
        {
          title: '西部航空',
          imgUrl: require('@/assets/image/西部航空.png'),
          description:
            '西部航空有限责任公司（简称西部航空）是2005年10月19日经中国民航总局批准筹建的航空公司，基地位于重庆。公司于2007年6月14日成功首航，目前公司机队共有4架空客A319机型飞机、5架空客A320机型飞机，运力规模为9架。开通三亚、海口、广州等近30条航线，通航城市为28个，辐射海南、广东、福建等省市。西部航空秉承海航集团企业文化，着力打造地方特色航空品牌传奇，致力于发展成为专注价值旅行的航空企业，为广大旅客全心营造“乐享简捷服务，尊享激情旅程，睿享卓越人生”的航空旅行体验。',
        },
      ], //推荐航空公司
      isCurrent: 0,
      companyDescription: '', //选中公司的描述
      isShow: false,
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      passengerLength: 0, //乘客人数
      // numPeople: [],
      oldPassengers: [],
    }
  },
  components: {
    recommendBox,
  },
  mounted () {
    console.log('[ this.$moment("2022-04-22") ===  ] >', this.$moment("2022-04-22").startOf("day").valueOf() === this.$moment().startOf("day").valueOf())
    this.companyDescription = this.companyList[0].description
    this.getProvince()
    // this.getCity('1')
  },
  watch: {
    // isShow: {
    //   handler(val) {
    //     console.log('[ val ] >', val)
    //   },
    // },
  },
  methods: {
    getProvince () {
      this.axios.get('/api/Air/getProvince').then(({ data }) => {
        if (data.msg === '请求成功') {
          this.cityList = data.data.map((it) => {
            return {
              value: it.province_id,
              label: it.province,
              isLeaf: false,
            }
          })
        } else {
          this.$message.error(data.msg)
        }
        // if (this.form.trip_start.length) {
        //   let targetOption = this.provinceList.find(
        //     (it) => it.value === this.form.trip_start[0]
        //   )
        //   this.getCity(targetOption.value, targetOption)
        // }
      })
    },
    getCity (id, targetOption) {
      const params = {
        province_id: id,
      }
      console.log('[ params ] >', params)
      this.axios.post('/api/Air/getCity', params).then(({ data }) => {
        console.log('[ data ] >', data)
        if (data.msg === '请求成功') {
          targetOption.children = data.data.map((it) => {
            return {
              value: it.city_id,
              label: it.city,
            }
          })
        } else {
          this.$message.error(data.msg)
        }
        this.cityList = [...this.cityList]
      })
      targetOption.loading = false
    },
    loadData (selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      this.getCity(targetOption.value, targetOption)
    },
    addPassenger () {
      console.log('[ 2121 ] >', 2121)
      this.form.passengers.push({
        item_type: {
          key: 3,
          label: '成人',
        },
      })
    },
    deletePassenger (item, index) {
      console.log(
        '%c [ index ]-530',
        'font-size:13px; background:pink; color:#bf2c9f;',
        index
      )
      console.log('[ item ] >', item)
      this.form.passengers.splice(index, 1)
    },
    timeChange (val) {
      console.log('[ val ] >', val)
    },
    tripChange (e) {
      let val = e.target.value
      if (val === 3) {
        this.form.tripList.push({
          plan_time: this.$moment(), //计划出行时间
          round_time: [this.$moment(), this.$moment().add(1, 'day')], // 往返时间
          trip_start: {}, //出发地
          trip_end: {}, //目的地
        })
      } else {
        this.form.tripList = [
          {
            plan_time: this.$moment(), //计划出行时间
            round_time: [this.$moment(), this.$moment().add(1, 'day')], // 往返时间
            trip_start: {}, //出发地
            trip_end: {}, //目的地
          },
        ]
      }
    },
    searchTrip (val) {
      console.log('[ val ] >', val)
    },
    addTrip () {
      console.log('[ 111 ] >', 111)
      this.form.tripList.push({
        plan_time: this.$moment(), //计划出行时间
        round_time: [this.$moment(), this.$moment().add(1, 'day')], // 往返时间
        trip_start: {}, //出发地
        trip_end: {}, //目的地
      })
    },
    deleteTrip (index) {
      this.form.tripList.splice(index, 1)
    },
    async search () {
      if (this.form.passengerNum === 0) {
        this.$message.error("请填写乘机人数")
        return
      }
      if (this.form.trip_start.length === 0) {
        this.$message.error("请选择出发地")
        return
      }
      if (this.form.trip_end.length === 0) {
        this.$message.error("请选择目的地")
        return
      }
      // params.destination_time, params.departure_time, params.passengerNum, params.departure, params.destination,
      const params = {
        passengerNum: this.form.passengerNum,
        departure: this.form.trip_start[1],
        destination: this.form.trip_end[1],
      }
      if (this.form.trip === 1) {
        params.departure_time = this.$moment(this.form.plan_time).format("YYYY-MM-DD") + ' ' + '00:00:00'
        params.destination_time = this.$moment(this.form.plan_time).format("YYYY-MM-DD") + ' ' + '23:59:59'
      }
      const { data } = await this.axios.post('/api/Air/getAirLine', params)
      console.log('%c [ data ]-633', 'font-size:13px; background:pink; color:#bf2c9f;', data)
      if (data.msg === '请求成功') {
        this.$emit("sendAirLine", data.data);
        this.$emit('ticketSearch', this.form.trip, this.form.passengerNum)
      } else {
        this.$message.error(data.msg)
        return
      }
    },
    getCurrentStyle (current, today) {
      const style = {}
      if (current.date() === 1) {
        style.border = '1px solid #1890ff'
        style.borderRadius = '50%'
      }
      return style
    },
    cabinChange (val) {
      console.log('[ val ] >', val)
      this.form.cabin_type.forEach(it => {
        it.label = it.label.trim()
      })
    },
    passengerChange (val) {
      console.log('[ val ] >', val)
    },
    handerOk () {
      let state = this.form.passengers.some((it) => !it.item_type)
      if (state) {
        this.$message.error('请填写完整')
        return
      }
      this.passengerLength = this.form.passengers.length
      this.passengersVisible = false
    },
    handerCancel () {
      this.form.passengers = this.oldPassengers
      this.passengersVisible = false
    },
    recommendTicketClick (item) {
      // this.$emit('ticketSearch', this.form.trip)
      this.$emit('sendAirLine', item.line_id)
      this.$emit('ticketSearch', this.form.trip)
      // this.$router.push({
      //   name: 'searchTicket',
      //   query: {
      //     id: airline.id,
      //     roundShow: parseInt(this.form.trip)
      //   }
      // })
    },
    passengersClick () {
      this.oldPassengers = this.form.passengers
      this.passengersVisible = true
    },
    companyClick (item, index) {
      console.log('[ item ] >', item)
      this.isCurrent = index
      this.companyDescription = item.description
    },

    /**
     * 配置函数
     */
    // 过滤时间
    range (start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    disabledDate (time) {
      return time < this.$moment().subtract(1, "days")
    },
    rangeDisabledDate (current) {
      return current && current <= this.$moment().startOf('day')
    },
    disabledRangeTime (type) {
      if (type === 'start') {
        return {
          disabledHours: () => this.range(0, 60).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56],
        }
      }
      return {
        disabledHours: () => this.range(0, 60).splice(20, 4),
        disabledMinutes: () => this.range(0, 31),
        disabledSeconds: () => [55, 56],
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import url("../../current.less");
.user-center {
  width: 100%;
  /* margin: 0 auto; */
  position: relative;
  /* clear: both; */
}
/* .rotation {
  position: absolute;
  top: 0%;
  left: 0%;
} */
.search-ticket {
  /* height: 350px; */
  width: 70%;
  /* margin-left: 500px; */
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
  position: absolute;
  top: 10%;
  left: 2%;
}
.search-top {
  margin-left: 10px;
}
.passengers {
  cursor: pointer;
  display: inline-block;
  width: 65%;
  text-align: center;
  border-bottom: 1px solid #aaaaaa;
}

.search-form {
  margin: auto 20px;
}
/deep/ .ant-form-item-children {
  font-size: 16px;
}
/deep/ .ant-radio-wrapper {
  font-size: 16px;
}

.user-bottom {
  /* height: calc(100% - 543px); */
  height: 100%;
  background-color: #eef1f6;
  /* background-color: darkblue; */
  /* position: relative; */
}
.user-bottom-self {
  width: 70%;
  /* background-color: darkcyan; */
  margin: 0 auto;
  padding: 1% 2% 1% 2%;
}
.self {
  margin-bottom: 10%;
}
.title {
  font-size: 30px;
  font-weight: bold;
}
.recommend {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.recommend-self {
  /* position: absolute;
  top: 50%;
  left: 50%; */
  width: 30%;
  border-radius: 10px;
  cursor: pointer;
  /* text-align: center; */
  /* transform: translateX(-50%);
  margin-left: 50%; */
}
.recommend-first {
  background-image: linear-gradient(to right, #4ecca4, #41cbd8);
}
.recommend-second {
  background-image: linear-gradient(to right, #ffa658, #ff7081);
}
.recommend-third {
  background-image: linear-gradient(to right, #61b5fd, #959cf4);
}
.recommend-header {
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  margin-left: 6%;
  padding: 10px 0;
}
.recommend-center {
  height: 500px;
  border-radius: 10px;
  background-color: #ffffff;
}

.company-discount {
  height: 500px;
  /* border-radius: 10px; */
}
.discount-top {
  height: 50%;
  padding: 30px 10px 0px 10px;
  background-color: #ffffff;
  border-radius: 5px 5px 0 0;
}
.company-title {
  display: flex;
  justify-content: space-around;
}
.discount-top-box {
  width: 100px;
  height: 70px;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #e4e4e4;
  text-align: center;
}
.discount-top-box:hover {
  color: #0086f6;
  background-color: #ebf6fe;
  border: 1px solid #0086f6;
  font-weight: bold;
}
.discount-top-box-choose {
  width: 100px;
  height: 70px;
  border-radius: 5px;
  color: #0086f6;
  background-color: #ebf6fe;
  border: 1px solid #0086f6;
  font-weight: bold;
  text-align: center;
}
.company-info {
  padding: 30px 20px 30px 20px;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.view-all {
  width: 60px;
  cursor: pointer;
  position: relative;
  text-align: right;
  margin: 0 auto;
}
.view-all:hover {
  color: #0086f6;
}
.company-description {
  width: 63%;
  padding: 10px;
  position: absolute;
  background-color: white;
  /* color: #c49059; */
  z-index: 99;
}
.discount-bottom {
  height: 50%;
  background-color: #f6f8fa;
  border-radius: 0 0 5px 5px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: space-between;
}
.plane-ticket {
  width: 300px;
  height: 80px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #e4e4e4;
  background-color: white;
  cursor: pointer;
}
.plane-ticket:hover {
  border: 1px solid #0086f6;
}
.toMoney {
  text-align: right;
}
.toMoney p:first-child {
  color: #ff7700;
}
.toMoney span:first-child {
  font-weight: bold;
  font-size: 18px;
}

/* For demo */
.ant-carousel {
  /deep/ .slick-slide {
    text-align: center;
    height: 600px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }
}
.ant-carousel {
  /deep/ .slick-slide h3 {
    color: #fff;
  }
}
</style>
