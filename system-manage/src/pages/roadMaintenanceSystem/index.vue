<template>
<div class="table-container" ref="tableContainer">
  <!-- 导航位置 -->
  <div class="nav-bar" ref="navBar">
    <el-breadcrumb separator-class="el-icon-minus">
      <el-breadcrumb-item><span class="el-icon-star-on"></span>首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <!-- 工具栏 -->
  <div class="tool-bar" ref="toolBar">
    <el-button size="mini" @click="handleAdd">新增</el-button>
    <el-button size="mini" @click="handleDel">删除</el-button>
  </div>
  <div class="table-wrapper">
    <div class="table-title">公路桥涵技术状况评定列表</div>
    <el-table
      :data="tableData"
      size="mini"
      border
      :height="tableMaxHeight"
    >
      <el-table-column
        prop="name"
        label="名字"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        header-align="center"
      ></el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        header-align="center"
      ></el-table-column>
    </el-table>
    <div class="pagenation-wrapper">
      <input type="text" class="search-input" v-model="search" placeholder="请输入查询内容">
      <span class="el-icon-search"></span>
      <el-pagination
        class="pagenation1"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
  <div class="pagenation"></div>
</div>
</template>

<script type="text/ecmascript-6">
import { tableData } from './mock';
export default {
  data () {
    return {
      tableData: tableData,
      tableMaxHeight: 0,
      setTableHeadBackground: 'table-title-class',
      /* 分页栏参数 */
      currentPage: 4,
      search: ''
    };
  },
  watch: {
    opened () {
      // 40是分页的高度，39是footer和表格的蓝色背景标题栏的高度
      if (this.opened) {
        this.tableMaxHeight = this.$refs.tableContainer.offsetHeight - this.$refs.navBar.offsetHeight - this.$refs.toolBar.offsetHeight - 38 - 40 -10;
      } else {
        this.tableMaxHeight = this.$refs.tableContainer.offsetHeight - this.$refs.navBar.offsetHeight - this.$refs.toolBar.offsetHeight - 38 - 40 - 10;
      }
    }
  },
  methods: {
    handleAdd () {
    },
    handleDel () {
    },
    /* 分页方法 */
    handleSizeChange () {
    },
    handleCurrentChange () {
    }
  },
  created () {
    this.$nextTick(() => {
      // 40是分页的高度，39是footer和表格的蓝色背景标题栏的高度
      this.tableMaxHeight = this.$parent.$refs.mainContainerWrapper.offsetHeight - this.$refs.navBar.offsetHeight - this.$refs.toolBar.offsetHeight - 38 - 40 - 10;
    });
  }
};
</script>

<style lang="less">
@import "../../common/less/theme";
/* 表头顶部背景 */
@table-title-bg-color: #56A2E8;
/* 表头背景 */
@table-head-bg-color: #F9E7CD;
/* 分页组件背景色 */
@pagenation-bg-color: #e1edf9;

.table-container {
  /* 顶部面包屑导航栏 */
  .nav-bar {
    display: inline-block;
    margin: 5px 0;
    .content;

    .el-icon-star-on {
      display: inline-block;
      margin-right: 5px;
      color: #F59C00;
    }

    .el-breadcrumb__inner {
      font-family: "宋体";
      color: #333;
      font-size: 12px;
      font-weight: 100 !important;
    }
  }
  /* 表格工具栏 */
  .tool-bar {
    padding-top: 7px;
    padding-bottom: 7px;
    border-bottom: 1px solid #ddd;

    .el-button--mini, .el-button--mini.is-round {
      padding: 6px;
      .content;
    }

    .el-icon-back {
      color: #5CC48F;
      font-weight: 700;
    }

    .el-icon-plus {
      color: #D85C0D;
      font-weight: 700;
    }

    .el-icon-delete {
      color: #DC3F2C;
      font-weight: 700;
    }

    .el-icon-upload2 {
      color: #217FBC;
      font-weight: 700;
    }

    .el-icon-download {
      color: #2FA2E0;
      font-weight: 700;
    }
  }
  /* 表格 */
  .table-wrapper {
    .table-title {
      width: 100%;
      height: 21px;
      line-height: 21px;
      padding: 5px 0;
      background: @table-title-bg-color;
      color: #fff;
      text-align: center;
      .title;
    }

    .has-gutter tr th {
      color: #333;
      font-size: 12px;
      font-weight: bold;
      background: #F9E7CD!important;
    }

    .cell {
      .content;
      line-height: 18px;
    }

    .pagenation-wrapper {
      width: 100%;
      height: 38px;
      overflow: hidden;
      border: 1px solid #ddd;
      border-top: 0;
      border-bottom: 0;
      box-sizing: border-box;
      background: @pagenation-bg-color;

      .search-input {
        min-height: 23px;
        padding-left: 5px;
        display: inline-block;
        margin: 5px 0 0 10px;
        border: 1px solid #ddd;
      }

      .el-icon-search {
        color: #217FBC;
        cursor: pointer;
      }

      .pagenation1 {
        float: right;
        margin: 3px 5px 0 0;
      }
    }
  }
}
</style>
