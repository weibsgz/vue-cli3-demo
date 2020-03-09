<template>
  <el-form-item label="时间范围：">
    <el-date-picker
      v-model="startTime"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期"
      @change="changeStartTime"
    ></el-date-picker
    ><span style="padding:0 10px">至</span>
    <el-date-picker
      v-model="endTime"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期"
      @change="changeEndTime"
    ></el-date-picker>
  </el-form-item>
</template>

<script>
export default {
  data() {
    return {
      startTime: "",
      endTime: ""
    };
  },

  methods: {
    changeStartTime() {
      this.$emit("update:getStartTime", this.startTime);
    },
    changeEndTime() {
      this.$emit("update:getEndTime", this.endTime);
    }
  }
};
</script>
