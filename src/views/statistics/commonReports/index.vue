<template>
  <div class="wrapper">
    <div v-if="!reportDisplay">
      <el-table :data="tableData.rows" class="table" border>
        <el-table-column prop="name" label="报表名称" align="center">
          <template v-slot="{ row }">
            <el-button type="text" @click="handleClick(row)">{{
              row.name
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="range" label="可查看人员" align="center">
        </el-table-column>
        <el-table-column prop label="操作" align="center">
          <template v-slot="{ row }">
            <el-button type="text" @click="handleUpdateItem(row)"
              >编辑</el-button
            >
            <el-button type="text" @click="handleDeleteItem(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        :total="tableData.total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="handlePagination"
      />
      <saveReport
        v-if="dialog"
        :row="highlightItem"
        @close="handleDialogClose"
      ></saveReport>
    </div>
    <div class="report-wrapper" v-else>
      <!-- 查询条件 -->
      <div class="query_box">
        <el-form
          ref="form"
          :model="queryCondition"
          :inline="true"
          size="medium "
        >
          <el-row>
            <selectDate
              :getStartTime.sync="queryCondition.startTime"
              :getEndTime.sync="queryCondition.endTime"
            ></selectDate>
          </el-row>
          <el-row>
            <el-form-item label="查询维度：">
              <el-select
                v-model="queryCondition.plat"
                clearable
                filterable
                placeholder="平台"
                style="margin-right:20px"
              >
                <el-option
                  v-for="(item, index) in timeDimension"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="queryCondition.account"
                clearable
                filterable
                placeholder="账号"
                style="margin-right:20px"
              >
                <el-option
                  v-for="(item, index) in timeDimension"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                v-model="queryCondition.video"
                clearable
                filterable
                placeholder="视频"
                style="margin-right:20px"
              >
                <el-option
                  v-for="(item, index) in timeDimension"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-button type="primary" @click="query">查询</el-button>
            <el-button type="primary" @click="downLoad">下载</el-button>
          </el-row>
        </el-form>
      </div>
      <div>
        <el-table
          :data="tableData2.rows"
          class="table"
          border
          :default-sort="{ prop: 'date', order: 'descending' }"
        >
          <el-table-column
            v-for="(item, index) in tableData2.tableTitle"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            sortable
          />
        </el-table>
        <Pagination
          :total="tableData2.total"
          :page.sync="listQuery2.page"
          :limit.sync="listQuery2.limit"
          @pagination="handlePagination2"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination/index";
import saveReport from "../components/saveReport";
import selectDate from "../components/selectDate";
export default {
  components: {
    Pagination,
    saveReport,
    selectDate
  },
  data() {
    return {
      queryCondition: {
        startTime: "",
        endTime: "",
        plat: "",
        account: "",
        video: ""
      },
      reportDisplay: false,
      dialogData: {
        dialogVisible: false,
        title: "",
        List: {}
      },
      timeDimension: [
        {
          label: "天",
          value: 0
        },
        {
          label: "周",
          value: 1
        },
        {
          label: "月",
          value: 2
        },
        {
          label: "时间汇总",
          value: 3
        }
      ],

      tableData: {
        total: 100,
        rows: []
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData2: {
        total: 100,
        tableTitle: [],
        rows: [
          {
            name: "数据周报",
            range: "杨丹",
            id: 1
          }
        ]
      },
      listQuery2: {
        page: 1,
        limit: 10
      },
      dialog: false,
      highlightItem: {}
    };
  },
  created() {
    this.getList();
    this.mockData = {
      title: [
        {
          prop: "date",
          label: "日期"
        },
        {
          prop: "plat",
          label: "平台"
        },
        {
          prop: "account",
          label: "账号"
        }
      ],
      data: [
        {
          id: 1,
          date: "2020-03-04",
          plat: "抖音",
          account: "test1"
        },
        {
          id: 2,
          date: "2020-03-05",
          plat: "快手",
          account: "test2"
        }
      ],
      _meta: { totalCount: 17, pageCount: 2, currentPage: 1, perPage: 10 }
    };
  },
  methods: {
    query() {
      console.log(this.queryCondition);
    },
    downLoad() {},
    getList() {
      this.tableData.rows = [
        {
          id: 1,
          name: "xwsh",
          selectid: 1,
          range: "黄金糕"
        },
        {
          id: 2,
          name: "root1",
          selectid: 2,
          range: "双皮奶"
        }
      ];
    },
    handlePagination(obj) {
      this.listQuery.limit = obj.limit;
      this.listQuery.page = obj.page;
      this.getList();
    },
    handlePagination2(query) {
      this.listQuery2.limit = obj.limit;
      this.listQuery2.page = obj.page;
      this.getTable2List();
    },
    async handleDeleteItem(row) {
      const title = "请确认是否删除该常用报表模板";
      await this.$confirm(title, "提示", {
        confirmButtonText: "确认删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$message({
            message: "删除成功",
            type: "success"
          }).then(async () => {
            // await 删除接口
            this.getList();
          });
        })
        .catch(() => {});
    },
    handleUpdateItem(row) {
      this.dialog = true;
      this.highlightItem = row;
    },
    handleClick(row) {
      this.reportDisplay = true;
      this.queryCondition = row;

      this.getTable2List();
    },
    getTable2List() {
      this.tableData2.total = this.mockData._meta.totalCount;
      this.tableData2.tableTitle = this.mockData.title;
      this.tableData2.rows = this.mockData.data;
    },
    handleDialogClose() {
      this.dialog = false;
      this.highlightItem = {};
    },
    handleStartTime(obj) {
      this.queryCondition.startTime = obj;
    },
    handleEndTime() {
      this.queryCondition.endTime = obj;
    }
  }
};
</script>
<style lang="scss" scope>
.wrapper {
  width: 100%;
  height: 100%;
  display: block;
  .query_box {
    background: #eee;
    padding: 20px !important;
    margin-bottom: 20px;
    .el-input {
      width: auto !important;
    }
  }
  .func_btn_box {
    padding: 0 15px 0 0;
    display: -webkit-flex;
    -webkit-flex-flow: row nowrap;
    -webkit-justify-content: space-between;
    -webkit-align-items: center;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .menu_box {
    margin: 15px 0;
  }
  .query_box,
  .menu_box {
    padding: 0 15px 0 15px;
  }
}
</style>
