<template>
  <el-dialog
    title="请使用抖音APP扫描二维码登录"
    :visible="true"
    width="350px"
    append-to-body
    center
    :before-close="handleClose"
  >
    <img src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=fa9140accd95d143ce7bec711299e967/2934349b033b5bb571dc8c5133d3d539b600bc12.jpg" alt="二维码登录" width="300">
  </el-dialog>
</template>
<script>
export default {
  methods: {
    handleClose() {
      this.$emit('close', true)
    }
  }
}
</script>
