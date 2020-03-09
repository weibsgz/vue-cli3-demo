<template>
  <div class="manager">
    <div class="toolbar">
      <div class="toolbar-item">
        发布状态
        <el-select
          v-model="listQuery.status"
          multiple
          collapse-tags
          placeholder="请选择"
        >
          <el-option
            v-for="item in publishManageStatus"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <div class="toolbar-item">
        视频标题
        <el-input v-model="listQuery.name" placeholder="请输入" />
      </div>
      <div class="toolbar-item">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
    </div>
    <el-table
      :data="tableData.rows"
      class="table"
      border
      empty-text="您还没有添加账号，请先添加账号！"
    >
      <el-table-column
        v-for="(item, index) in tableRules"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
      />
      <el-table-column label="操作" align="center">
        <template v-slot="{ row }">
          <el-button
            v-if="row.video_publish_status != 1"
            type="text"
            @click="handleEdit(row)"
            >编辑</el-button
          >
          <!-- <el-button v-if="row.video_publish_status != 1 && row.video_publish_status != 0 " type="text" @click="handlePublishDetail(row)">发布详情</el-button> -->
          <el-button type="text" @click="handlePublishDetail(row)"
            >发布详情</el-button
          >
          <!-- v-if="row.vide_publish_status == 4 || row.video_publish_status == 2" -->
          <el-button type="text" @click="handleRePublish(row)"
            >重新发布</el-button
          >
          <el-button
            v-if="row.video_publish_status != 1"
            type="text"
            @click="handleDelete(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="tableData.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.page_size"
      @pagination="handlePagination"
    />
    <RePublish
      v-if="rePublishDialog"
      :highlight-item.sync="highlightItem"
      @close="rePublishDialog = false"
    />
    <PublishLook
      v-if="PublishLookDialog"
      :highlight-item.sync="highlightItem"
      @close="PublishLookDialog = false"
    />
  </div>
</template>
<script>
import * as API from "@/api/publish-manage";
import Pagination from "@/components/Pagination/index";
import RePublish from "./components/re-publish";
import PublishLook from "./components/publish-look";
export default {
  components: {
    Pagination,
    RePublish,
    PublishLook
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
        total: 10
      },
      tableRules: [
        {
          align: "center",
          prop: "id",
          label: "视频ID"
        },
        {
          align: "center",
          prop: "name",
          label: "视频标题"
        },
        {
          align: "center",
          prop: "create_time",
          label: "上传时间"
        },
        {
          align: "center",
          prop: "video_publish_status_name",
          label: "发布状态"
        }
      ],
      rePublishDialog: false,
      PublishLookDialog: false,
      highlightItem: {}
    };
  },
  computed: {
    publishManageStatus() {
      return this.$store.state.dict.publishManageStatus;
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      const status = this.listQuery.status.join(",");
      const query = Object.assign({}, this.listQuery, { status });
      // console.log("status", status);
      // console.log("query", query);
      API.publishManageList(query).then(res => {
        this.tableData.rows = res.data.items;
        this.tableData.total = res.data._meta.totalCount;
      });
    },
    handleSearch() {
      this.listQuery.page_size = 5;
      this.listQuery.page = 1;
      this.getList();
    },
    handlePagination(obj) {
      this.listQuery.page_size = obj.limit;
      this.listQuery.page = obj.page;
      this.getList();
    },
    handleRePublish(row) {
      this.highlightItem = row;
      this.rePublishDialog = true;
    },
    async handleDelete(row) {
      await this.$confirm("请确认是否删除该视频？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await API.publishManageDelVideo({ id: row.id });
          this.getList();
        })
        .catch(() => {});
    },
    handlePublishDetail(row) {
      this.highlightItem = row;
      this.PublishLookDialog = true;
    },
    handleEdit(row) {
      this.$router.push({
        path: "/video/publish",
        query: {
          id: row.id
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.toolbar-item {
  display: inline-block;
  margin-right: 15px;
  .el-select {
    width: 200px;
  }
  .el-input {
    width: 200px;
  }
}
.manager {
  .el-table {
    margin-top: 20px;
  }
}
</style>
