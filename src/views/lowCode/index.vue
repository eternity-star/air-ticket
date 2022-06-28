<template>
  <div @click.capture="onClick('')"
       class="page">
    <a-row>
      <a-col :span="24">
        <div class="headers">
          <a-row>
            <a-col :span="8">
              <div class="mart10 marl10">
                <span class="text-red">*</span>名称:
                <a-input style="width: 80%" />
              </div>
            </a-col>
            <a-col :span="8">
              <div class="mart10 marl10">
                <span class="text-red">*</span>类型:
                <a-input style="width: 80%" />
              </div>
            </a-col>
            <a-col :span="8">
              <div class="mart10 marl10">
                <span class="text-red">*</span>备注:
                <a-input style="width: 80%" />
              </div>
            </a-col>
          </a-row>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="17">
        <div class="container">
          <draggable v-model="arr1"
                     :group="{name: 'site'}"
                     handle=".mover"
                     :scroll="true"
                     animation="300"
                     @start="onStart2"
                     @end="onEnd2"
                     class="containerClass">
            <div v-for="(item, index) in arr1"
                 :key="index"
                 style="padding: 10px">
              <div style="background: #ffffff;"
                   @click="onClick(item, index)">
                <!-- @click="onClick(item, index)" -->
                <div class="mover">拖拽</div>
                <!-- @click.native="onClick(item, index)" -->
                <!-- item.isFocus -->
                <component :is="item.id"
                           :infoData="item.data"
                           :focusIndex="currentIndex === index">
                </component>
              </div>
            </div>
          </draggable>
          <!-- </ul> -->
        </div>
      </a-col>
      <a-col :span="7">
        <div>
          <!--  -->
          <draggable v-model="arr2"
                     :group="{name: 'site', put:false, pull: 'clone'}"
                     :scroll="true"
                     filter=".forbid"
                     :clone="cloneData"
                     animation="300"
                     @start="onStart"
                     @end="onEnd"
                     class="flexShow">
            <div v-for="(item, index) in arr2"
                 :key="index"
                 class="itemClass">{{item.name}}</div>
          </draggable>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <div class="footers">
          <a-button @click="aaa"
                    style="margin: 10px 0 0 10px">保存</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Sortable from "sortablejs"
import Draggable from 'vuedraggable'
import ceshi1 from "./components/ceshi1.vue"
import ceshi2 from "./components/ceshi2.vue"
import { parse } from 'qs'
import { type } from "os"
export default {
  components: {
    Draggable,
    ceshi1,
    ceshi2,
  },
  data () {
    return {
      arr1: [],
      arr2: [
        {
          sort: 0,
          name: '文本',
          id: 'ceshi1',
          data: {},
          isFocus: false,
        },
        {
          sort: 1,
          name: '建议',
          id: 'ceshi2',
          data: {},
          isFocus: false,
        },
      ],
      currentIndex: 0
    }
  },
  created () {
  },
  mounted () {
    // let el = document.getElementById('items');
    // let sortable = new Sortable(el, {

    // })
  },
  methods: {
    aaa () {
      console.log('[ this.arr1 ] >', this.arr1)
    },
    onClick (item, index) {
      console.log('[ item ] >', item)
      console.log('[ index ] >', index, isNaN(index))
      if (!isNaN(index)) {
        this.currentIndex = index
        item.isFocus = this.currentIndex === index
      } else {
        this.currentIndex = ''
        this.arr1.forEach(it => {
          it.isFocus = false
        })
      }
    },
    cloneData (obj) {
      console.log('%c [ obj ]-145', 'font-size:13px; background:pink; color:#bf2c9f;', obj)
      let newObj = this.$utils.clone(obj);
      console.log('%c [ newObj ]-115', 'font-size:13px; background:pink; color:#bf2c9f;', newObj)
      return newObj;
    },
    onStart2 () {
      console.log('[ 111 ] >', 111)
    },
    onEnd2 () {
      console.log('[ 111 ] >', 111)
    },
    onStart () {
      this.drag = true;
    },
    onEnd () {
      this.drag = false;
      console.log('[ 111 ] >', 111)
      console.log('[ this.arr1 ] >', this.arr1)
      // console.log('[ this.arr2 ] >', this.arr2)
    },
  },
}
</script>
<style lang="less" scoped>
@import url("../current.less");
.headers,
.footers {
  height: 100px;
  background: #f8f8f8;
}
.footers {
  margin-top: 10px;
}
.container {
  margin-top: 10px;
  background: #f8f8f8;
  height: 620px;
  overflow-y: auto;
  .containerClass {
    height: 100px;
    width: 100%;
  }
}
.mover {
  text-align: center;
  cursor: move;
}
#items {
  overflow-y: auto;
  padding: 10px;
  min-height: 200px;
  height: 620px;
  display: block;
  li {
    height: 200px;
    background: #753939;
    border: 1px solid #afafaf;
    margin-bottom: 10px;
    color: #ffffff;
  }
}
.flexShow {
  overflow-y: auto;
  padding: 10px;
  min-height: 200px;
  height: 620px;
  display: flex;
  align-content: space-between;
  .itemClass {
    width: 50px;
    height: 50px;
    border: 1px solid #853636;
    // flex: 1;
    margin-left: 10px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
