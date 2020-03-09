<template>
  <div class="app-main">
    <!-- 从/page/1 => /page/2, 由于这两个路由的$route.path并不一样, 所以组件被强制不复用, 相关钩子加载顺序为:
beforeRouteUpdate => created => mounted -->
    <router-view :key="key" />
  </div>
</template>
<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>
<style lang="scss" scoped>
.app-main {
  padding: 30px;
  min-height: 500px;
  overflow: hidden;
}
</style>
