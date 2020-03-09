<template>
  <el-dialog
    title="修改密码"
    :visible="true"
    width="500px"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="旧密码">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.name" type="password" />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.name" type="password" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit">保 存</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      form: {}
    }
  },
  methods: {
    onSubmit() {

    },
    handleClose() {
      this.$emit('update:updateDialog', false)
    }
  }
}
</script>
