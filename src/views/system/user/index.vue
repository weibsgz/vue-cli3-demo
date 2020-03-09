<template>
  <div class="user">
    <el-button type="primary" @click="dialog = true">添加用户</el-button>
    <el-table :data="tableData.rows" class="table" border>
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column
        v-for="(item, index) in tableRules"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
      />
      <el-table-column prop="status" label="状态" align="center" width="150">
        <template v-slot="{ row }">
          <x-switch
            ref="child"
            :value.sync="row.status == 1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @click="handleSwitchToggle(row)"
          />
          <!-- <el-switch
            v-model="row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch> -->
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center">
        <template v-slot="{ row }">
          <el-button type="text" @click="deleteItem(row)">
            删除
          </el-button>
          <el-button type="text" @click="handleUpdateItem(row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="tableData.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="handlePagination"
    />
    <UpdateUser v-if="dialog" :row="highlightItem" @close="handleDialogClose" />
  </div>
</template>
<script>
import * as API from "@/api/userManage";
import Pagination from "@/components/Pagination/index";
import Switch from "@/components/Switch/index";
import UpdateUser from "./components/update-user";
export default {
  components: {
    Pagination,
    "x-switch": Switch,
    UpdateUser
  },
  data() {
    return {
      tableRules: [
        {
          align: "center",
          prop: "account",
          label: "用户名"
        },
        {
          align: "center",
          prop: "company_id",
          label: "公司名称"
        },
        {
          align: "center",
          prop: "group_id",
          label: "角色"
        },
        {
          align: "center",
          prop: "desc",
          label: "备注"
        }
      ],
      tableData: {
        total: 10,
        rows: []
      },
      listQuery: {
        page: 1,
        limit: 20
      },
      highlightItem: {},
      dialog: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(query) {
      let params = query ? query : { page: 1, limit: 5 };

      const mockData = {
        items: [
          {
            id: 1,
            account: "xwsh",
            password: "",
            company_id: 0,
            group_id: 1,
            desc: "",
            status: 1
          },
          {
            id: 2,
            account: "root1",
            password: "25d55ad283aa400af464c76d713c07ad",
            company_id: 0,
            group_id: 33,
            desc: "用户新增1",
            status: 1
          }
        ],
        _links: {
          self: {
            href:
              "http://microvideo.my.com.cn/api/admin-users?page=1&per-page=10"
          },
          next: {
            href:
              "http://microvideo.my.com.cn/api/admin-users?page=2&per-page=10"
          },
          last: {
            href:
              "http://microvideo.my.com.cn/api/admin-users?page=2&per-page=10"
          }
        },
        _meta: {
          totalCount: 17,
          pageCount: 2,
          currentPage: 1,
          perPage: 10
        }
      };
      this.tableData.rows = mockData.items;
      this.tableData.total = mockData._meta.totalCount;
      this.listQuery.limit = mockData._meta.perPage;
      this.listQuery.page = mockData._meta.currentPage;

      // API.userList({
      //   page: params.page,
      //   "per-page": params.limit
      // }).then(res => {
      //   this.tableData.rows = res.data.items;
      //   this.tableData.total = res.data._meta.totalCount;
      //   this.listQuery.limit = res.data._meta.perPage;
      //   this.listQuery.page = res.data._meta.currentPage;
      // });
    },
    handlePagination(query) {
      this.getList(query);
    },
    handleSwitchChange(value) {
      console.log(value);
    },
    handleSwitchToggle(row) {
      const title =
        row.status == 1 ? "请确认是否禁用该账号？" : "请确认是否启用该账号？";
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async e => {
          //1 是启用状态  2 是禁用状态 ？ 回头问下接口
          const flag = row.status == 1 ? 1 : 2;
          await API.statusChange({
            id: row.id,
            status: flag
          }).then(() => {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
          });
          this.getList({
            page: this.listQuery.page,
            limit: this.listQuery.limit
          });
        })
        .catch(e => {});
    },
    handleUpdateItem(row) {
      this.dialog = true;
      this.highlightItem = row;
    },
    handleDialogClose() {
      this.dialog = false;
      this.highlightItem = {};
    },
    deleteItem(row) {
      this.$confirm("请确认是否删除该账号，删除账号不可恢复", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async e => {
          await API.deleteUser({
            id: row.id
          }).then(() => {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
          });
          this.getList({
            page: this.listQuery.page,
            limit: this.listQuery.limit
          });
        })
        .catch(e => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.user {
  .table {
    margin-top: 15px;
  }
}
.switch-ov {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #000;
}
</style>
