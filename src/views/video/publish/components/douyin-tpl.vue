<template>
  <div class="douyin-tpl">
    <div class="douyin-head">
      <el-avatar shape="square" :src="account.avatar" />
      <span class="user-name">{{account.platform_name}} {{account.nickname}}</span>
      <el-button type="primary">同步信息值全部账号</el-button>
    </div>
    <div class="douyin-content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="视频封面">
          <el-input type="number" v-model.number="form.cover" min="0" clearable />
          <span class="second">秒</span>
          <div class="tip-text">
            指定视频中的时间点对应帧设置为封面，不设置自动截取第一帧
          </div>
        </el-form-item>
        <el-form-item label="视频标题">
          <el-input v-model.trim="form.title" type="textarea" clearable />
          <div class="tip-text">#添加话题</div>
        </el-form-item>
        <timing-release v-model="timing" />
      </el-form>
    </div>
  </div>
</template>
<script>
import TimingRelease from "./timing-release";

export default {
  inheritAttrs: false,
  data() {
    return {
      form: {
        cover: "",
        title: "",
        timing_flag: "",
        timing_publish: ""
      },
      timing: {}
    };
  },
  computed: {
    account() {
      return this.$attrs.account;
    }
  },
  mounted() {
    console.log(this.account);
  },
  watch: {
    timing(newVal, oldVal) {
      this.form.timing_flag = newVal.timing_flag;
      this.form.timing_publish = newVal.timing_publish;
    }
  },
  components: {
    TimingRelease
  }
};
</script>
<style lang="scss" scoped>
.douyin-tpl {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 15px;
  /deep/.el-input {
    width: 200px;
  }
  /deep/.el-textarea {
    width: 300px;
  }
}
.douyin-head {
  background-color: #eee;
  padding: 8px 30px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
  .user-name {
    vertical-align: middle;
    margin-left: 10px;
    margin-right: 15px;
  }
  .el-avatar {
    vertical-align: middle;
  }
}
.douyin-content {
  padding: 0 30px;
  .second {
    margin-left: 5px;
  }
  .tip-text {
    color: #ccc;
  }
  .el-dropdown {
    color: #ccc;
  }
}
</style>
