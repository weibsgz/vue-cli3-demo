// 保存报表弹窗
<template>
  <div class="addDialog">
    <el-dialog
      class="addContent"
      :title="title"
      :visible="true"
      width="550px"
      :before-close="cancel"
    >
      <el-form
        ref="form"
        :model="formValue"
        :inline="true"
        size="medium "
        :rules="rules"
      >
        <el-form-item
          class="block"
          label="报表名称："
          prop="name"
          label-width="138px"
        >
          <el-input
            v-model.trim="formValue.name"
            clearable
            placeholder="请输入"
            width="300px"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="block"
          label="可查看人员："
          prop="selectid"
          label-width="138px"
        >
          <el-select
            v-model="formValue.selectid"
            clearable
            filterable
            multiple
            placeholder="请选择"
            width="300px"
          >
            <el-option
              v-for="(item, index) in type"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="dialog-footer">
          <el-button @click="sure">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogData: {
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },
    row: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      return this.row.id ? "编辑常用报表" : "保存常用报表";
    }
  },

  data() {
    return {
      type: [
        {
          value: "1",
          label: "黄金糕"
        },
        {
          value: "2",
          label: "双皮奶"
        },
        {
          value: "3",
          label: "蚵仔煎"
        },
        {
          value: "4",
          label: "龙须面"
        },
        {
          value: "5",
          label: "北京烤鸭"
        }
      ],
      formValue: {
        name: "",
        selectid: ""
      },
      rules: {
        name: [{ required: true, message: "必填项不能为空", trigger: "blur" }],
        selectid: [
          { required: true, message: "请选择可查看人员", trigger: "change" }
        ]
      }
    };
  },
  created() {
    if (this.row.id) {
      // this.formValue = Object.assign({}, this.row);
      // console.log(JSON.stringify(this.formValue));
      this.formValue.name = this.row.name;
      this.formValue.selectid = ["黄金糕", "脆皮奶"];
    }
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    sure() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          console.log(this.formValue);
          this.cancel();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.el-table__body tr.current-row > td {
  background-color: #ffd900 !important;
}
.display .el-form-item__content {
  display: flex !important;
}
.addContent .dialog-footer {
  display: flex !important;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
}
</style>
