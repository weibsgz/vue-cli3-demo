<template>
  <div>
    <div>
      <slot name="header"></slot>
    </div>
    <div class="video-upload">
      <el-button type="primary" @click="uploadBtn">{{uploadBtnMsg}}</el-button>
      <input ref="file" type="file" accept="*" name="upload_file" style="display:none;" @change="uploadChange" />
      <slot name="selectPubVideo"></slot>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
import * as publish from "@/api/publish";

export default {
  name: "uploadVideo",
  inheritAttrs: false,
  props: {
    types: {
      type: Array,
      default: () => [
        "mp4",
        "mkv",
        "mov",
        "wmv",
        "rmvb",
        "mpg",
        "mpeg",
        "avi",
        "flv",
        "webm"
      ]
    },
    MAX_SIZE: {
      type: [Number, String],
      default: () => 300 * 1024 * 1024
    }
  },
  data() {
    return {
      uploadBtnMsg: "本地上传"
    };
  },
  created() {
    // 获取token
    publish
      .publishToken()
      .then(res => {
        this.token = res.token;
      })
      .catch(err => {
        this.$message.error(err.message);
      });
  },
  methods: {
    uploadBtn() {
      this.$refs.file.click();
    },
    uploadChange() {
      let file = this.$refs.file.files[0];
      let ext = file.name.substr(file.name.lastIndexOf(".") + 1);
      if (file.size > this.MAX_SIZE) {
        this.$message.error("视频大小超出" + this.MAX_SIZE + "M");
        return false;
      }
      if (!this.types.includes(ext)) {
        this.$message.error("视频格式错误!");
        return false;
      }
      var formData = new FormData();
      formData.append("token", this.token);
      formData.append("file", file);
      formData.append("key", file.name);
      this.$xhr
        .post("http://upload.qiniup.com/", formData, {
          timeout: 120000
        })
        .then(res => {
          this.$refs.file.value = "";
          let video = Object.assign({}, { status: 1 }, res);
          this.uploadBtnMsg = "重新上传";
          this.$emit("input", video);
        })
        .catch(err => {
          this.uploadBtnMsg = "重新上传";
          let video = { status: 0 };
          this.$emit("input", video);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.video-upload {
  margin: 15px 0;
}
</style>