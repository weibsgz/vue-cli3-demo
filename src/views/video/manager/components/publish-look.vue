<template>
  <el-dialog
    title="发布详情"
    :visible="true"
    width="750px"
    append-to-body
    :before-close="handleClose"
  >
    <el-table :data="tableData.rows" border>
      <el-table-column
        v-for="(item, index) in tableRules"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width"
      />
      <el-table-column label="审核结果" align="center">
        <template v-slot="{ row }">
          <span>{{ row.check_status_name }}</span>
          <span v-if="row.desc"> / {{ row.desc }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import { publishManagePublishInfo } from "@/api/publish-manage";
export default {
  props: {
    highlightItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tableData: {
        rows: []
      },
      tableRules: [
        {
          align: "center",
          prop: "account",
          label: "账号"
        },
        {
          align: "center",
          prop: "platform",
          label: "平台"
        },
        {
          align: "center",
          prop: "status_name",
          label: "发布结果"
        },
        {
          align: "center",
          prop: "real_publish",
          label: "发布成功时间",
          width: "180px"
        }
      ]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      publishManagePublishInfo({ file_id: this.highlightItem.id }).then(
        ({ data }) => {
          this.tableData.rows = data;
        }
      );
    },
    handleClose() {
      this.$emit("close", false);
      this.$emit("update:highlight-item", {});
    }
  }
};
</script>
