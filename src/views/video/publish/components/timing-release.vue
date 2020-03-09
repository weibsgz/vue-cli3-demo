<template>
  <div>
    <el-checkbox class="timing-chk-box" v-model="timing_flag" :true-label="1" :false-label="0" @change="chkChange"></el-checkbox>
    <el-form-item label="定时发布">
      <el-date-picker v-model="timing_publish" :picker-options="pickerOptions" @change="dateChange" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" />
    </el-form-item>
  </div>
</template>
<script>
import { dateFormat } from "@/common/utils";

export default {
  inheritAttrs: false,
  name: "timingRelease",
  data() {
    return {
      timing_flag: 0,
      timing_publish: null,
      pickerOptions: {
        disabledDate(date) {
          let zero = new Date().setHours(0, 0, 0, 0);
          if (date.getTime() < zero) {
            return true;
          }
          return false;
        }
      }
    };
  },
  methods: {
    chkChange(val) {
      if (this.timing_flag === 1 && this.timing_publish === null) {
        this.timing_publish = dateFormat(
          new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        );
      }
      this.$emit("input", {
        timing_flag: this.timing_flag,
        timing_publish: new Date(this.timing_publish).getTime()
      });
    },
    dateChange(val) {
      // 日期时间改变时
      if (val == null) {
        this.timing_flag = 0;
      } else {
        this.timing_flag = 1;
      }
      this.$emit("input", {
        timing_flag: this.timing_flag,
        timing_publish: new Date(this.timing_publish).getTime()
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.timing-chk-box {
  float: left;
  margin-top: 9px;
}
</style>