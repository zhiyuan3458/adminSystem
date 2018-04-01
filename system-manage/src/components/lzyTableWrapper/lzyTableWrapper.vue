<template>
  <div class="lzy-table-wrapper" :style="{marginLeft: lzyTableWrapper.marginLeft + 'px'}">
    <!-- 按钮组 -->
    <div class="btn-group" ref="btnGroup">
      <el-button size="mini" icon="el-icon-back">返回上级菜单</el-button>
      <el-button size="mini" icon="el-icon-plus">新增</el-button>
      <el-button size="mini" icon="el-icon-delete">删除</el-button>
      <el-button size="mini" icon="el-icon-upload2">导入</el-button>
      <el-button size="mini" icon="el-icon-download">导出</el-button>
    </div>
    <!-- 导航位置 -->
    <div class="nav-bar" ref="navBar">
      <el-breadcrumb separator-class="el-icon-minus">
        <el-breadcrumb-item><span class="el-icon-star-on"></span>首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 表格 -->
    <div class="table-wrapper">
      <div class="table-title">公路桥涵技术状况评定列表</div>
      <el-table
        :data="tableData"
        size="mini"
        border
        :height="lzyTableWrapperHeight"
        :header-cell-class-name="setTableHeadBackground"
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
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    lzyTableWrapper: Object
  },
  data () {
    return {
      lzyTableWrapperHeight: 0,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      setTableHeadBackground: 'table-title-class',
      currentPage: 1
    };
  },

  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    }
  },

  mounted () {
    this.lzyTableWrapperHeight = document.body.offsetHeight - 245;
  }
};
</script>

<style lang="less">
@import "./lzyTableWrapper";
@import "../../common/less/border1px";
.lzy-table-wrapper {
  padding: 5px 0 5px 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  .btn-group {
    padding-bottom: 5px;
    .border-1px(#ddd);
  }

  .nav-bar {
    display: inline-block;
    margin: 8px 0 10px 0;

    .el-icon-star-on {
      display: inline-block;
      margin-right: 5px;
      color: #F59C00;
    }
  }

  .table-wrapper {
    .table-title {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 5px 0;
      background: @table-title-bg-color;
      color: #fff;
      text-align: center;
    }

    .pagenation-wrapper {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: @pagenation-bg-color;

      .pagenation1 {
        float: right;
        margin: 4px 5px 0 0;
      }
    }
  }
}
.table-title-class {
  background: @table-head-bg-color!important;
  color: black;
  font-weight: 600;
}
</style>
