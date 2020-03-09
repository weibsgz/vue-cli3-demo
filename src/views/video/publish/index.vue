<template>
  <div class="publish">
    <div class="publish-aside">
      <div class="video-wrapper">
        <h3>
          上传视频
          <span v-show="showUploadTips" class="tip-text">请先上传视频！</span>
        </h3>
        <upload-video
          name="hello world"
          :MAX_SIZE="500 * 1024 * 1024"
          v-model="video"
        >
          <template #header>
            <div v-show="video.status == 1" class="video-box">
              <span style="margin-right: 10px;" v-if="video.status == 1"
                >视频上传成功!</span
              >
              <span style="margin-right: 10px;" v-else>视频上传失败!</span>
              <span @click="downloadClick" style="cursor: pointer;">{{
                video.key
              }}</span>
            </div>
          </template>
          <template #selectPubVideo>
            <el-button type="text" @click="selectVideoDialog = true"
              >已发布视频中选择</el-button
            >
          </template>
          <template #footer>
            <div class="advise">
              支持常规视频格式，建议上传mp4格式，视频最大不超过1G
            </div>
          </template>
        </upload-video>
      </div>
      <div class="horizontal-line" />
      <div class="account-wrapper">
        <h3>
          发布账号
          <span v-show="showSelectTips" class="tip-text"
            >请先选择发布账号！</span
          >
        </h3>
        <div class="account-list">
          <el-checkbox-group
            ref="userList"
            v-model="checkList"
            class="account-ov"
            :class="{ auto: sliderToggle }"
          >
            <el-checkbox
              v-for="item in accountList"
              :key="item.id"
              :label="item.id"
            >
              <el-avatar shape="square" :src="item.avatar" />
              <span class="username"
                >{{ item.platform_name }} {{ item.nickname }}</span
              >
            </el-checkbox>
          </el-checkbox-group>
          <div class="slider-toggle">
            <span @click="sliderToggle = !sliderToggle">
              {{ sliderToggle ? "展开" : "收起" }}
              <i
                :class="
                  sliderToggle ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
                "
              />
            </span>
          </div>
        </div>
      </div>
      <div class="horizontal-line" />
      <div class="publish-btn">
        <el-button type="primary" @click="publish">立即发布</el-button>
        <br />
        <el-button @click="saveDraft">保存草稿</el-button>
      </div>
    </div>
    <div class="vertical-line" />
    <div class="publish-section">
      <h3>
        发布内容
        <span class="tip-text">针对账号单独设置独立的发布信息</span>
      </h3>
      <div
        v-if="accountIndList.length == 0"
        :class="{ empty: accountIndList.length == 0 }"
      >
        请先选择发布账号！
      </div>
      <div v-for="(item, index) in accountIndList" :key="index">
        <div v-if="item.checked && item.platform_name.includes('抖音')">
          <DouyinTpl :account="item" />
        </div>
        <div v-else-if="item.checked">
          <AkTpl :account="item" />
        </div>
      </div>
      <SelectVideo
        v-model="video"
        v-if="selectVideoDialog"
        @close="selectVideoDialog = !selectVideoDialog"
      />
    </div>
  </div>
</template>
<script>
import DouyinTpl from "./components/douyin-tpl";
import AkTpl from "./components/aika-tpl";
import SelectVideo from "./components/select-video";
import UploadVideo from "./components/upload-video";

import * as publish from "@/api/publish";

export default {
  components: {
    DouyinTpl,
    AkTpl,
    SelectVideo,
    UploadVideo
  },
  data() {
    return {
      video: {},
      showUploadTips: false, // 显示未上传验证提示信息
      showSelectTips: false, // 显示复选框验证提示信息
      checkList: [], // 选中发布账号id
      sliderToggle: true,
      selectVideoDialog: false,
      accountList: [], // 发布账号列表
      accountIndList: [] // 发布账号信息下标
    };
  },
  created() {
    // 获取发布账号
    publish
      .publishMyAccount()
      .then(res => {
        this.accountList = res.data.filter(
          item => item.status == "1" || item.status == "2"
        );
      })
      .catch(err => {
        this.$message.error(err.message);
      });
  },
  watch: {
    checkList(newVal, oldVal) {
      // 发布账号复选框
      let diff = [];
      if (newVal.length > oldVal.length) {
        diff = newVal.filter(item => {
          return !oldVal.includes(item);
        });
      } else {
        diff = oldVal.filter(item => {
          return !newVal.includes(item);
        });
      }
      let account = Object.assign(
        {},
        this.accountList.find(item => item.id == diff[0])
      );
      let ind = this.accountIndList.findIndex(item => item.id == account.id);
      if (ind !== -1) {
        this.accountIndList.splice(ind, 1);
      } else {
        account.checked = true;
        this.accountIndList.push(account);
      }
      this.showSelectTips = false;
    }
  },
  methods: {
    publish() {
      this.showUploadTips = this.video.status !== 1 ? true : false;
      this.showSelectTips = this.checkList.length === 0 ? true : false;
      if (!this.showUploadTips || !this.showSelectTips) {
        return false;
      }
      console.log(this.video, this.checkList);
    },
    saveDraft() {},
    async downloadClick() {
      // 下载视频
      try {
        delete this.video.status;
        await publish.publishDownFile(this.video);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.publish {
  margin: -30px;
  border: 1px solid #ccc;
  border-top: none;
  display: flex;
  .vertical-line {
    width: 1px;
    background-color: #ccc;
  }
  .horizontal-line {
    height: 1px;
    background-color: #ccc;
  }
}
// 左侧列表
.publish-aside {
  width: 410px;
  .tip-text {
    color: #eb1010;
    font-size: 14px;
    font-weight: 400;
  }
  .video-wrapper {
    padding: 20px;
  }
  h3 {
    margin: 0;
  }
  .video-box {
    margin: 15px 0;
  }
  .advise {
    font-size: 14px;
  }
  .account-wrapper {
    padding: 20px;
  }
  .account-list {
    .username {
      display: block;
    }
    .slider-toggle {
      margin: 5px 0;
      text-align: center;
      cursor: pointer;
    }
    .account-ov {
      height: auto;
      overflow: hidden;
      &.auto {
        height: 238px;
      }
    }
  }
  /deep/.el-checkbox__label {
    vertical-align: middle;
    text-align: center;
  }
  /deep/.el-checkbox__input {
    margin-top: -20px;
  }
  .el-checkbox {
    margin-top: 15px;
  }
  .publish-btn {
    text-align: center;
    margin-bottom: 15px;
    .el-button {
      margin-top: 15px;
    }
  }
}
// 发布内容
.publish-section {
  flex: 1;
  padding: 20px;
  h3 {
    margin: 0;
  }
  .tip-text {
    color: #ccc;
    font-size: 14px;
    font-weight: 400;
  }
  .empty {
    text-align: center;
    margin: 15px 0;
  }
}
</style>
