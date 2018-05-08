<template>
  <div class="lzy-table-wrapper" :style="{marginLeft: lzyTableWrapper.marginLeft + 'px'}">
    <slot name="tableContent"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    lzyTableWrapper: Object
  },
  data () {
    return {
      mainContent: true,
      lzyTableWrapperHeight: 0,
      tableData: [
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      },
      {
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
      }
      ],
      setTableHeadBackground: 'table-title-class title',
      currentPage: 1,
      search: '',
      // 新增框的属性设置
      visibility: false,
      addForm: {
        user: '',
        region: '',
        region1: ''
      }
    };
  },

  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    handleAddBtn () {
      this.mainContent = false;
      this.visibility = true;
    },
    handleBackBtn () {
      this.mainContent = true;
      this.visibility = false;
    },
    onSubmit () {
      console.log('submit!');
    }
  },

  mounted () {
    this.lzyTableWrapperHeight = document.body.offsetHeight - 210;
  }
};
</script>

<style lang="less">
@import "./lzyTableWrapper";
@import "../../common/less/border1px";
@import "../../common/less/theme";
.lzy-table-wrapper {
  padding: 5px 0 5px 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  .main-content-wrapper {
    .btn-group {
      padding-bottom: 7px;
      .border-1px(#ddd);

      .el-button--mini, .el-button--mini.is-round {
        padding: 6px;
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

    .nav-bar {
         display: inline-block;
         margin: 5px 0;

         .el-icon-star-on {
           display: inline-block;
           margin-right: 5px;
           color: #F59C00;
         }

         .el-breadcrumb__inner {
            font-family: @content-font-family;
            font-weight: 100 !important;
          }
    }

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

      .cell {
        .content;
        line-height: 18px;
      }

      .pagenation-wrapper {
        width: 100%;
        height: 35px;
        overflow: hidden;
        background: @pagenation-bg-color;

        .search-input {
          min-height: 23px;
          display: inline-block;
          margin: 4px 0 0 10px;
          border: 1px solid #ddd;
        }

        .el-icon-search {
          color: #217FBC;
          cursor: pointer;
        }

        .pagenation1 {
          float: right;
          margin: 1px 5px 0 0;
        }
      }
    }
  }

  .addForm-wrapper {

    .fix-wrapper {
      .btn-group {
        padding-bottom: 5px;
        .border-1px(#ddd);

        .el-button--mini, .el-button--mini.is-round {
          padding: 6px;
        }

        .el-icon-success {
          color: #67C23A;
          font-weight: 700;
        }

        .el-icon-arrow-left {
          color: #409EFF;
          font-weight: 700;
        }

        .el-icon-printer {
          color: #F56C6C;
          font-weight: 700;
        }
      }
      .nav-bar {
        width: 100%;
        padding-bottom: 8px;
        display: inline-block;
        margin: 5px 0;
        position: relative;

        .el-icon-star-on {
          display: inline-block;
          margin-right: 5px;
          color: #F59C00;
        }

        &:after {
          content: ' ';
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          border-bottom: 1px solid #ddd;
        }
      }
    }

    .form-wrapper {
      .basic-info-wrapper {
        .title {
          display: flex;
          align-items: center;

          .basic-info-text {
            display: inline-block;
            color: #fff;
            background-color: #56A2E8;
            border: 1px solid #56A2E8;
            padding: 6px 5px;
          }

          .line {
            flex: 1;
            border-bottom: 1px solid rgba(0,0,0,0.2);
          }
        }

        .lzy-main-content {
          text-align: left;
          margin-top: 5px;
          .pn-ftable {
            width: 100%;
          }
        }
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
