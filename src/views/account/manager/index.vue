<template>
  <div class="manager">
    <div class="aside">
      <h3 class="platform">平台</h3>
      <ul>
        <li>
          <el-avatar shape="circle" />
        </li>
        <li>
          <el-avatar shape="circle" />
        </li>
        <li>
          <el-avatar shape="circle" />
        </li>
        <li>
          <el-avatar shape="circle" />
        </li>
      </ul>
    </div>
    <div class="vertical-line" />
    <div class="account-list">
      <div class="toolbar">
        <div class="toolbar-item">
          账号管理
          <el-select v-model="listQuery.value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
        <el-table-column prop="address" label="操作" align="center">
          <template v-slot="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleAuditLook(row)"
              >审核详情</el-button
            >
            <el-button type="text" @click="handleRePublish(row)"
              >重新发布</el-button
            >
            <el-button type="text" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :total="tableData.total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="handlePagination"
      />
    </div>
    <social-signup v-if="socialDialog" @close="socialDialog = false" />
  </div>
</template>
<script>
import Pagination from "@/components/Pagination/index";
import SocialSignup from "./components/social-signup";
export default {
  components: {
    Pagination,
    "social-signup": SocialSignup
  },
  data() {
    return {
      listQuery: {},
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        }
      ],
      tableData: {
        rows: [],
        total: 10
      },
      tableRules: [
        {
          align: "center",
          prop: "nickname",
          label: "账号"
        },
        {
          align: "center",
          prop: "platform_id",
          label: "平台"
        },
        {
          align: "center",
          prop: "status",
          label: "登录状态"
        },
        {
          align: "center",
          prop: "last_login",
          label: "最近一次登录"
        },
        {
          align: "center",
          prop: "create_time",
          label: "添加时间"
        }
      ],
      socialDialog: false
    };
  },
  methods: {
    getList(query) {
      let params = query ? query : { page: 1, limit: 5 };
      const mockData = {
        items: [
          {
            nickname: "xwsh",
            platform_id: 1,
            status: 1,
            last_login: "0000-00-00 00:00:00",
            create_time: "2020-02-10 11:16:51"
          },
          {
            nickname: "妍宝儿",
            platform_id: 2,
            status: 1,
            last_login: "2020-02-19 14:52:31",
            create_time: "2020-02-19 14:52:16"
          },
          {
            nickname: "妍宝儿2",
            platform_id: 2,
            status: 1,
            last_login: "2020-02-19 15:09:07",
            create_time: "2020-02-19 15:09:07"
          }
        ],
        _links: {
          self: {
            href:
              "http://microvideo.my.com.cn/api/platform-accounts?page=1&per-page=10"
          }
        },
        _meta: {
          totalCount: 3,
          pageCount: 1,
          currentPage: 1,
          perPage: 10
        }
      };

      this.tableData.rows = mockData.items;
      this.tableData.total = mockData._meta.totalCount;
      this.listQuery.limit = mockData._meta.perPage;
      this.listQuery.page = mockData._meta.currentPage;
      // this.$xhr.get('platform-account/index',{params:{
      //   page:params.page,
      //   "per-page":params.limit
      // }}).then(res=>{
      //   this.tableData.rows = res.data.items;
      //   this.tableData.total = res.data._meta.totalCount;
      //   this.listQuery.limit = res.data._meta.perPage;
      //   this.listQuery.page = res.data._meta.currentPage;
      // })
    },
    handlePagination(query) {
      this.getList(query);
    },
    handleRePublish(row) {},
    handleEdit(row) {},
    handleAuditLook(row) {},
    async handleDelete(row) {
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);
      });
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style lang="scss" scoped>
.manager {
  display: flex;
  min-height: 400px;
  margin: -30px;
  padding: 0 20px;
  border: 1px solid #ccc;
  border-top: none;
}
.vertical-line {
  width: 1px;
  background-color: #ccc;
  margin: 0 20px;
}
.aside {
  flex: 1;
  display: inline-block;
  padding-top: 10px;
  .platform {
    margin: 10px 0;
    font-weight: 400;
  }
  li {
    width: 33.333%;
    text-align: center;
    display: inline-block;
    margin-bottom: 20px;
  }
  .el-avatar {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }
}
.account-list {
  flex: 3;
  display: inline-block;
  padding-top: 10px;
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
}
</style>
