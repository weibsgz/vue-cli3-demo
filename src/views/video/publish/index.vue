<template>
  <div class="publish">
    <div class="publish-aside">
      <div class="video-wrapper">
        <h3>
          上传视频
          <span v-show="showUploadTips" class="tip-text">请先上传视频！</span>
        </h3>
        <div>
          <div v-show="video.status == 1" class="video-box">
            <span style="margin-right: 10px;" v-if="video.status == 1"
              >视频上传成功!</span
            >
            <span style="margin-right: 10px;" v-else>视频上传失败!</span>
            <span @click="downloadClick" style="cursor: pointer;">{{
              video.name
            }}</span>
          </div>
          <upload-video v-if="oper !== 2" :MAX_SIZE="500 * 1024 * 1024">
            <template #selectPubVideo>
              <el-button type="text" @click="selectVideoDialog = true"
                >已发布视频中选择</el-button
              >
            </template>
          </upload-video>
          <div v-if="oper !== 2" class="advise">
            支持常规视频格式，建议上传mp4格式，视频最大不超过1G
          </div>
        </div>
      </div>
      <div class="horizontal-line" />
      <div class="account-wrapper">
        <h3 class="account-title-box">
          发布账号
          <span v-show="showSelectTips" class="tip-text"
            >请先选择发布账号！</span
          >
          <el-select
            v-if="oper === 2"
            v-model="accountSel"
            placeholder="全部账号"
            clearable
            style="float:right;width: 150px;"
          >
            <el-option
              v-for="item in accountBak"
              :key="item.id"
              :label="item.nickname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </h3>
        <div class="account-list">
          <el-checkbox-group
            ref="userList"
            v-model="checkList"
            class="account-ov"
            :class="{ auto: sliderToggle }"
          >
            <el-checkbox
              v-for="item in account"
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
        <el-button type="primary" @click="publishBtn">立即发布</el-button>
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
      <div v-if="!accountChkStat" :class="{ empty: !accountChkStat }">
        请先选择发布账号！
      </div>
      <div v-else v-for="(item, index) in accountList" :key="index">
        <div v-if="item.checked && item.platform_name.includes('抖音')">
          <DouyinTpl :account_id="item.id" />
        </div>
        <div v-else-if="item.checked">
          <AkTpl :account_id="item.id" />
        </div>
      </div>
      <SelectVideo
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
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("dict");

export default {
  components: {
    DouyinTpl,
    AkTpl,
    SelectVideo,
    UploadVideo
  },
  data() {
    return {
      accountSel: "",
      account: [],
      accountBak: [],
      showUploadTips: false, // 显示未上传验证提示信息
      showSelectTips: false, // 显示复选框验证提示信息
      checkList: [], // 选中发布账号id
      sliderToggle: true,
      selectVideoDialog: false
    };
  },
  computed: {
    ...mapState(["accountList", "video"]),
    ...mapGetters({
      getAccountById: "getAccountById", // 根据id获取账号信息
      accountChkStat: "getAllAccountChkStat" // 是否有账号选中
    }),
    oper() {
      return Number(this.$route.query.oper) === 2 ? 2 : 0;
    }
  },
  async created() {
    try {
      await this.addAccountInfo();
      let accountJson = JSON.stringify(this.accountList);
      this.account = JSON.parse(accountJson);
      this.accountBak = JSON.parse(accountJson);
      // 编辑反显
      if (Number(this.$route.query.oper) === 2) {
        let res = await publish.publishView({ id: this.$route.query.id });
        this.editRender(res.data);
      }
    } catch (error) {
      this.$message.error(error.message);
    }
  },
  watch: {
    accountSel(newVal, oldVal) {
      if (newVal != oldVal) {
        this.account =
          newVal === ""
            ? this.accountBak
            : this.accountBak.filter(item => +item.id === +newVal);
      }
    },
    checkList(newVal, oldVal) {
      // 发布账号复选框
      let diff = 0;
      if (newVal.length > oldVal.length) {
        diff = newVal.filter(item => {
          return !oldVal.includes(item);
        })[0];
      } else {
        diff = oldVal.filter(item => {
          return !newVal.includes(item);
        })[0];
      }
      if (diff) {
        let account = this.getAccountById(diff); // 根据id获取账号信息
        if (account) {
          let index = account.index,
            checked = !account.checked;
          this.updateAccountChkStat({ index, checked }); // 更新账号信息
          this.showSelectTips = false;
        }
      }
    }
  },
  methods: {
    ...mapActions({
      addAccountInfo: "ADD_ACCOUNT_INFO", // 添加账号
      updateAccountFormInfo: "UPDATE_ACCOUNT_FORM_INFO", // 更新账号信息
      updateAccountChkStat: "UPDATE_ACCOUNT_CHK_STAT", // 更新选中状态
      updateVideoInfo: "UPDATE_VIDEO_INFO" // 更新video信息
    }),
    editRender(data) {
      this.updateVideoInfo({ video: data.video });
      this.checkList = [
        ...new Set([...data.publish.map(item => item.account_id)])
      ]; // 获取选中的发布账号
      for (let i = 0, len = this.checkList.length; i < len; i++) {
        let accountForm = data.publish.find(
          item => +item.account_id === +this.checkList[i]
        );
        let info = Object.assign({}, { ...accountForm });
        let account = this.getAccountById(accountForm.account_id); // 根据id获取账号信息
        account && this.updateAccountFormInfo({ index: account.index, info }); // 更新账号form信息
      }
    },
    publishBtn() {
      // 立即发布
      this.showUploadTips = this.video.status !== 1 ? true : false;
      this.showSelectTips = this.checkList.length === 0 ? true : false;
      if (this.showUploadTips || this.showSelectTips) {
        return false;
      }
      this.saveCommon(1);
    },
    saveDraft() {
      // 保存草稿
      if (this.video.status !== 1 || this.checkList.length === 0) {
        this.$message.warning("您还未进行任何操作，无法保存草稿");
        return false;
      }
      this.saveCommon(0);
    },
    saveCommon(draf) {
      let video = Object.assign({}, this.video);
      delete video.status;
      let data = {
        video,
        draf,
        publish: []
      };
      data.publish = this.accountList
        .map(item => item.checked && item.form)
        .filter(Boolean);
      publish
        .publishCreate(data)
        .then(res => {
          this.$message.success(res.message);
          // this.$router.push();
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
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
  height: 100%;
  margin: -30px;
  margin-bottom: 0;
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
  .account-title-box {
    height: 36px;
    line-height: 36px;
    margin-bottom: 10px;
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
      // height: auto;
      height: 238px;
      overflow: hidden;
      &.auto {
        // height: 238px;
        height: 80px;
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
  height: 100%;
  overflow-y: auto;
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
