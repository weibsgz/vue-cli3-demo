<template>
  <el-dialog title="选择发布视频" :visible="true" width="750px" append-to-body :before-close="handleClose" :close-on-click-modal="false">
    <div class="toolbar">
      <el-input v-model="listQuery.name" placeholder="请输入视频名称关键字查询" clearable suffix-icon="el-icon-search" @input="search" style="max-width: 280px;"></el-input>
    </div>
    <el-table ref="table" :data="tableData.rows" class="table" border height="300" @select="selectRow">
      <el-table-column v-for="(item,index) in tableRules" :key="index" :type="item.type" :prop="item.prop" :label="item.label" :align="item.align" :width="item.width" />
    </el-table>
    <Pagination :total="tableData.total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="handlePagination" />
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确认</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import Pagination from "@/components/Pagination/index";
import * as publish from "@/api/publish";

export default {
  inheritAttrs: false,
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        name: ""
      },
      tableData: {
        rows: [],
        total: 10
      },
      tableRules: [
        {
          type: "selection",
          align: "center",
          width: "55"
        },
        {
          align: "center",
          prop: "id",
          label: "视频id"
        },
        {
          align: "center",
          prop: "name",
          label: "视频名称"
        },
        {
          align: "center",
          prop: "create_time",
          label: "发布时间"
        },
        {
          align: "center",
          prop: "video_publish_status_name",
          label: "发布状态"
        }
      ],
      selection: [] // 选中行
    };
  },
  created() {
    this.getList();
  },
  methods: {
    search() {
      setTimeout(() => {
        this.getList();
      }, 500);
    },
    confirm() {
      if (this.selection.length != 0) {
        let video = {
          status: 1,
          key: this.selection[0].name,
          ...this.selection[0]
        };
        this.$emit("input", video);
      }
      this.$emit("close", true);
    },
    cancel() {
      this.$emit("close", true);
    },
    handleClose() {
      this.$emit("close", true);
    },
    selectRow(selection, row) {
      // 选中行复选框
      if (selection.length !== 1) {
        this.$refs.table.clearSelection();
        this.$refs.table.toggleRowSelection(row, true);
      }
      this.selection[0] = row;
    },
    handlePagination(obj) {
      this.listQuery.page = obj.page;
      this.listQuery.limit = obj.limit;
      this.getList();
    },
    async getList() {
      try {
        let res = await publish.publishVideoList({
          page_size: this.listQuery.limit,
          page: this.listQuery.page,
          name: this.listQuery.name
        });
        this.tableData.rows = res.data.items;
        this.tableData.total = res.data._meta.totalCount;
        this.listQuery.page = res.data._meta.currentPage;
        this.listQuery.limit = res.data._meta.perPage;
      } catch (error) {
        this.$message.error(error.message);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.toolbar-item {
  display: inline-block;
  margin-right: 15px;
  .el-select {
    width: 170px;
  }
}
.el-table {
  margin-top: 20px;
}
</style>
