<template>
  <div class="switch">
    <el-switch v-model="value" v-bind="$attrs" />
    <div class="switch-ov" v-on="$listeners" />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.switch {
  position: relative;
  display: inline-block;
  .switch-ov {
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
