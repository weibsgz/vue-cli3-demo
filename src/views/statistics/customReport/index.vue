<template>
  <div class="wrapper">
    <!-- 查询条件 -->
    <div class="query_box">
      <el-form ref="form" :model="queryCondition" :inline="true" size="medium ">
        <el-row>
          <selectDate
            :getStartTime.sync="queryCondition.startTime"
            :getEndTime.sync="queryCondition.endTime"
          ></selectDate>
        </el-row>
        <el-row>
          <el-form-item label="查询维度：">
            <el-select
              style="vertical-align: top"
              v-model="queryCondition.timeDimension"
              clearable
              filterable
              placeholder="时间维度"
            >
              <el-option
                v-for="(item, index) in timeDimension"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span style="padding:0 10px;vertical-align: top">至</span>
            <el-cascader
              v-model="queryCondition.addDimension"
              placeholder="添加维度"
              :options="options"
              filterable
              :props="{ multiple: true, checkStrictly: true }"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="自定义列：">
            <el-checkbox-group v-model="queryCondition.checkList">
              <el-checkbox
                v-for="(item, index) in checkGroupData"
                :key="index"
                :label="item"
                >{{ item }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-button type="primary" @click="generateReport">生成报告</el-button>
        </el-row>
      </el-form>
    </div>
    <div v-if="reportDisplay">
      <!-- 新增 -->
      <div style="margin:0 0 20px 0">
        <el-button type="primary" @click="downLoad">下载</el-button>
        <el-button type="primary" @click="generateMuban">生成模板</el-button>
      </div>
      <el-table :data="tableData.rows" class="table" border>
        <el-table-column
          v-for="(item, index) in tableData.tableTitle"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          align="center"
          sortable
        />
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
      options: [
        {
          value: "pingtai",
          label: "平台",
          children: [
            {
              value: "douyin",
              label: "抖音"
            },
            {
              value: "kuaishou",
              label: "快手"
            }
          ]
        },
        {
          value: "account",
          label: "账号",
          children: [
            {
              value: "account1",
              label: "账号1"
            },
            {
              value: "account2",
              label: "账号2"
            }
          ]
        },
        {
          value: "video",
          label: "视频",
          children: [
            {
              value: "video1",
              label: "视频1"
            },
            {
              value: "video2",
              label: "视频2"
            }
          ]
        }
      ],
      reportDisplay: false,
      dialogData: {
        dialogVisible: false,
        title: "保存常用报表",
        List: {}
      },
      queryCondition: {
        startTime: "",
        endTime: "",
        timeDimension: "",
        addDimension: "",
        checkList: []
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
        tableTitle: [],
        rows: []
      },
      listQuery: {
        page: 1,
        limit: 10
      },
      dialog: false,
      checkGroupData: ["粉丝数", "粉丝增加量", "粉丝取关量", "粉丝净增量"],
      highlightItem: {}
    };
  },
  methods: {
    generateReport() {
      if (this.reportDisplay) return;
      this.reportDisplay = true;
      const mockData = {
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
      this.tableData.tableTitle = mockData.title;
      this.tableData.rows = mockData.data;
      this.listQuery.limit = mockData._meta.perPage;
      this.listQuery.page = mockData._meta.currentPage;
    },
    generateMuban() {
      this.dialog = true;
    },
    downLoad() {},
    query() {},
    getList() {
      // todo
    },
    handlePagination(obj) {
      this.listQuery.limit = obj.limit;
      this.listQuery.page = obj.page;
      this.getList();
    },
    handleDialogClose() {
      this.dialog = false;
      this.highlightItem = {};
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
