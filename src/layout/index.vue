<template>
  <div class="app-wrapper">
    <!-- 一级菜单 -->
    <Head />
    <!-- 二级菜单 -->
    <TagsView />
    <!-- 二级路由 -->
    <AppMain />
  </div>
</template>
<script>
import Head from "./component/Header/index";
import TagsView from "./component/TagsView/index";
import AppMain from "./component/AppMain";
export default {
  components: {
    AppMain,
    TagsView,
    Head
  }
};
</script>
<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  min-width: 1366px;
  overflow-x: auto;
  box-sizing: border-box;
}
</style>
