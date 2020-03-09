<template>
  <header class="head">
    <div class="nav">
      <ul>
        <li
          v-for="item in tabData"
          :key="item.path"
          :class="$route.path.indexOf(item.path) != -1 ? 'active' : ''"
          @click="clickActive(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="avatar mr-5">
      <el-avatar
        shape="circle"
        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
        class="mr-5 user-avatar"
      />
      <el-dropdown>
        <span class="el-dropdown-link">
          爱卡编辑1
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="updateDialog = true"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item @click.native="handleLogout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <updatePassword v-if="updateDialog" :update-dialog.sync="updateDialog" />
  </header>
</template>
<script>
import updatePassword from "./update-password";
import Cookies from "js-cookie";
export default {
  components: {
    updatePassword
  },
  data() {
    return {
      updateDialog: false
    };
  },
  computed: {
    tabData() {
      return this.$store.getters.menu;
    },
    activeIndex() {
      return this.$route.path;
    }
  },
  created() {
    // 查找路径
    console.log("进入HEADER");
    const path = this.$route.path;

    const menu = this.tabData.find(
      element => path.indexOf(element.path) !== -1
    );
    //登录后第一次进入 path = "/" menu为undefind
    //模拟点击第一个TAB后 path = "/account/manager" 之后每次点击TAB都有MENU值
    //就可以每次都设置上子菜单了
    if (!menu) {
      this.clickActive(this.tabData[0]);
    } else {
      //之后再点击TAB切回来
      this.$store.commit("nav/SET_SUBMENU", menu.children);
    }
  },
  methods: {
    clickActive(item) {
      this.$store.commit("nav/SET_SUBMENU", item.children);
      this.$router.push(item.children[0].path);
    },
    handleLogout() {
      Cookies.remove("token");
      location.href = "/login";
    }
  }
};
</script>
<style lang="scss" scoped>
.head {
  line-height: 60px;
  height: 60px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  background-color: #eee;
  border-bottom: 1px solid #ccc;
}
.nav {
  width: 1000px;
  float: left;
  li {
    float: left;
    padding: 0 30px;
    border-right: 1px solid #ccc;
    cursor: pointer;
    &.active {
      background-color: #fff;
    }
  }
}
.avatar {
  float: right;
  .user-avatar {
    width: 35px;
    height: 35px;
    vertical-align: middle;
  }
  .el-dropdown {
    cursor: pointer;
  }
}
.el-dropdown-link {
  display: block;
}
</style>
