<template>
  <div class="aika-tpl">
    <div class="aika-head">
      <el-avatar shape="square" :src="account.avatar" />
      <span class="user-name">{{account.platform_name}} {{account.nickname}}</span>
      <el-button type="primary">同步信息值全部账号</el-button>
    </div>
    <div class="aika-content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="视频封面">
          <el-input v-model="form.name" />
          <span class="second">秒</span>
          <div class="tip-text">
            指定视频中的时间点对应帧设置为封面，不设置自动截取第一帧
          </div>
        </el-form-item>
        <el-form-item label="视频标题">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="车标签">
          <el-radio-group v-model="form.radio1">
            <el-radio-button label="新车" />
            <el-radio-button label="二手车" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="关联车型">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="关联话题">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="关联论坛">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
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
      form: {},
      timing: {}
    };
  },
  computed: {
    account() {
      return this.$attrs.account;
    }
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
.aika-tpl {
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
.aika-head {
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
.aika-content {
  padding: 0 30px;
  .second {
    margin-left: 5px;
  }
  .tip-text {
    color: #ccc;
  }
}
</style>
