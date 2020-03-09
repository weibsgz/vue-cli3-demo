<template>
  <el-dialog
    title="重新发布"
    :visible="true"
    width="750px"
    append-to-body
    :before-close="handleClose"
  >
    <el-table
      ref="multipleTable"
      :data="tableData.rows"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-for="(item, index) in tableRules"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
      />
    </el-table>
    <!-- <Pagination
      :total="tableData.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.page_size"
      @pagination="handlePagination"
    /> -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit()">重新发布</el-button>
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
import Pagination from "@/components/Pagination/index";
import {
  publishmanageepublishList,
  publishmanageepublish
} from "@/api/publish-manage";
export default {
  components: {
    Pagination
  },
  props: {
    highlightItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      listQuery: {
        status: [],
        page_size: 5,
        page: 1,
        name: ""
      },
      tableData: {
        rows: [],
        total: 10,
        multipleSelection: []
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
        }
      ]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      publishmanageepublish({ file_id: this.highlightItem.id }).then(
        ({ data }) => {
          this.tableData.rows = [
            {
              id: "57",
              account: "xwsh",
              platform: "抖音",
              status: "4",
              status_name: "发布失败",
              real_publish: "0000-00-00 00:00:00",
              check_status: "0",
              check_status_name: "未审核",
              desc: ""
            },
            {
              id: "58",
              account: "xwsh",
              platform: "抖音2",
              status: "4",
              status_name: "发布失败",
              real_publish: "0000-00-00 00:00:00",
              check_status: "0",
              check_status_name: "未审核",
              desc: ""
            },
            {
              id: "59",
              account: "xwsh",
              platform: "抖音3",
              status: "4",
              status_name: "发布失败",
              real_publish: "0000-00-00 00:00:00",
              check_status: "0",
              check_status_name: "未审核",
              desc: ""
            }
          ];
          this.tableData.total = data.length || 10;
        }
      );
    },
    handlePagination(obj) {
      this.listQuery.page_size = obj.limit;
      this.listQuery.page = obj.page;
      this.getList();
    },
    handleClose() {
      this.$emit("close", true);
      this.$emit("update:highlight-item", {});
    },
    onSubmit() {
      const checkedListArr = this.tableData.multipleSelection;
      publishmanageepublishList({
        file_id: checkedListArr.join(",")
      }).then(({ message }) => {
        if (checkedListArr.length) {
          this.$message({
            message: message,
            type: "success"
          });
          this.handleClose();
        } else {
          this.$message({
            message: "未选择"
          });
        }
      });
    },
    handleSelectionChange(val) {
      this.tableData.multipleSelection = val.map(v => {
        return v.id;
      });
    }
  }
};
</script>
