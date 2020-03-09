<template>
  <el-dialog
    :title="title"
    :visible="true"
    width="500px"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="form.account" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="公司名称">
        <el-select
          v-model="form.region"
          :disabled="disabled"
          placeholder="请选择活动区域"
        >
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit">保 存</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import * as API from "@/api/userManage";

const validatePassword = (rule, value, callback) => {
  var patrn = /^(\S){8,20}$/;
  console.log(patrn.exec(value));
  if (!patrn.exec(value)) {
    callback(
      new Error("8 - 20个字符，只能包含字母，数字以及除空格外的标点符号")
    );
  } else {
    callback();
  }
};
export default {
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      disabled: false,
      form: {
        account: "",
        password: "",
        region: "",
        desc: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 5,
            max: 25,
            message: "5 到 25 个字符,支持中文、英文和数字",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      }
    };
  },
  created() {
    //编辑
    if (this.row.id) {
      this.form = Object.assign({}, this.row);
      this.disabled = true;
    }
  },
  computed: {
    title() {
      return this.row.id ? "修改用户" : "添加用户";
    }
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          API.userList(this.form).then(res => {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
