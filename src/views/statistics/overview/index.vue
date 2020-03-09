<template>
  <div class="wrap">
    <div class="category" v-for="(item,index) in tableData.rows" :key="index">
      <div class="name">{{item.name}}</div>
      <h3>{{item.num}}</h3>
      <div class="bt">
        <span class="xiang">
          <span class="xiang_spn">昨日</span>
          <span class="sanjiao"></span>
          <span>{{item.yesterday}}</span>
        </span>
        <span class="xiang">
          <span class="xiang_spn">日环比</span>
          <span class="sanjiao"></span>
          <span>{{item.dailyRingRatio}}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: {
        rows: [
          {
            dailyRingRatio: "2.45%",
            name: "总粉丝量",
            yesterday: '1,028',
            num: '283,787',
            id: 1
          },
          {
            dailyRingRatio: "2.45%",
            name: "总粉丝量",
            yesterday: '1,028',
            num: '283,787'
          },
          {
            dailyRingRatio: "2.45%",
            name: "总粉丝量",
            yesterday: '1,028',
            num: '283,787'
          },
          {
            dailyRingRatio: "2.45%",
            name: "总粉丝量",
            yesterday: '1,028',
            num: '283,787'
          },
          {
            dailyRingRatio: "2.45%",
            name: "总粉丝量",
            yesterday: '1,028',
            num: '283,787'
          },
          {
            dailyRingRatio: "2.45%",
            name: "总粉丝量",
            yesterday: '1,028',
            num: '283,787'
          }
        ]
      }
    };
  }
}
</script>
<style lang="scss" scope>
.wrap {
  display: flex;
  flex-wrap: wrap;
}
.switch-ov {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #000;
}
.category {
  box-sizing: border-box !important;
  width: 364px;
  height: 210px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  margin: 20px 60px;
  padding: 12px;
  .name {
    height: 55px;
    line-height: 55px;
    color: #cccccc;
  }
  .num {
    font-size: 18px;
    height: 68px;
    line-height: 68px;
    width: 100%;
    margin-bottom: 10px;
  }
  .bt {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 14px;
    border-top: 1px solid #cccccc;
    display: flex;
    box-sizing: border-box;
    span {
      margin: 0px 7px;
    }
    .xiang {
      flex: 1;
      flex-shrink: 0;
      display: inline-block;
    }
    .xiang_spn {
      color: #cccccc;
    }
    .sanjiao {
      position: relative;
      border: 5px solid transparent;
      border-bottom-color: red;
      top: -10px;
    }
  }
}
</style>
