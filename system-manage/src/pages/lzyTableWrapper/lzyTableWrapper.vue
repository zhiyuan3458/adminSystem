<template>
<div class="table-wrapper"  ref="tableWrapper">
  <!-- 可拉伸导航栏 -->
  <collapse-bar class="collapse-bar" :collapsedWrapper="collapsedWrapper" @getLzyTableWrapperMarginLeft="getLzyTableWrapperMarginLeft">
      <!-- 按钮工具栏 -->
      <div slot="header" class="top">
        <div class="group" v-for="(item, index) in iconContent" :key="index">
          <a
            :class="item.iconClass"
            @click="clickTopBtn"
          ></a>
          <img src="./img/resultset_down.png" v-if="!item.iconClass.indexOf('icon-expand-tree')" style="cursor: pointer;" alt="">
        </div>
      </div>
      <!-- 树形结构工具栏 -->
      <div slot="content" class="main">
        <el-tree
          :data="data4"
          ref="elTree"
          node-key="id"
          :expand-on-click-node="false"
        >
      <span class="custom-tree-node" slot-scope="{ node, data }">
      <span @click="handleClickText(node, data)">{{ node.label }}</span>
      <span class="icon-group" :style="{'visibility': data.iconGroupShow ? 'visible' : 'hidden',opacity: data.iconGroupShow ? '1' : '0'}">
        <span
          class="el-icon-circle-plus-outline"
          @click="() => append(data)"
        ></span>
        <span
          class="el-icon-edit"
        ></span>
        <span
          class="el-icon-close"
          @click="() => remove(node, data)"
        ></span>
      </span>
    </span>
        </el-tree>
      </div>
  </collapse-bar>
  <lzy-table-wrapper :marginLeft="marginLeft1" :toolShow="toolShow">
    <div class="tool-wrapper" slot="tool-wrapper" ref="toolWrapper">
      <!-- 按钮组 -->
      <div class="btn-group" ref="btnGroup">
        <el-button size="mini" icon="el-icon-plus" @click="handleAddBtn">新增</el-button>
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
    </div>
        <!-- 表格 -->
      <div class="table-container" slot="table">
        <div class="table-title">公路桥涵技术状况评定列表</div>
        <el-table
          :data="tableData"
          size="mini"
          border
          :height="tableMaxHeight"
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
      <div class="addForm-wrapper" v-show="visibility">
        <div class="fix-wrapper">
          <!-- 按钮组 -->
          <div class="btn-group" ref="btnGroup">
            <el-button size="mini" icon="el-icon-success">保存</el-button>
            <el-button size="mini" icon="el-icon-arrow-left" @click="handleBackBtn">返回</el-button>
            <el-button size="mini" icon="el-icon-printer">打印</el-button>
          </div>
          <!-- 导航位置 -->
          <div class="nav-bar" ref="navBar">
            <el-breadcrumb separator-class="el-icon-minus">
              <el-breadcrumb-item><span class="el-icon-star-on"></span>首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
              <el-breadcrumb-item>编辑</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <!-- 表单 -->
        <div class="form-wrapper">
          <div class="basic-info-wrapper">
            <div class="title">
              <div class="line"></div>
              <div class="basic-info-text">基本信息</div>
              <div class="line"></div>
            </div>
            <div class="lzy-main-content">
              <el-form :inline="true" :model="addForm" class="demo-form-inline">
                <el-form-item label="审批人">
                  <el-input v-model="addForm.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                  <el-select v-model="addForm.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="活动区域">
                  <el-select v-model="addForm.region1" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="审批人">
                  <el-input v-model="addForm.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                  <el-input v-model="addForm.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="审批人">
                  <el-input v-model="addForm.user" placeholder="审批人"></el-input>
                </el-form-item>
                <br>
                <el-button type="primary" style="float: right;margin-right: 30px;">提交</el-button>
              </el-form>
            </div>
          </div>
          <div class="repeat-road-wrapper">

          </div>
          <div class="protect-wrapper">

          </div>
        </div>
      </div>
  </lzy-table-wrapper>
</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import collapseBar from '@/components/collapseBar/collapseBar.vue';

export default {
  components: {
    collapseBar
  },
  data () {
    const data = [
      {
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }];
    const collapsedWrapperWidth = 260;
    const lzyTableMarginLeft = collapsedWrapperWidth + 10;
    return {
      // 可伸缩的导航栏
      collapsedWrapper: {
        width: collapsedWrapperWidth, // 设置初始宽度
        draggable: true, // 是否可拖拽
        collapsable: true // 是否可伸缩
      },
      iconContent: [
        {
          iconClass: 'icon-return icon',
          text: ''
        },
        {
          iconClass: 'icon-expand-tree icon',
          text: ''
        },
        {
          iconClass: 'icon-collapse-tree icon',
          text: ''
        }
      ],
      expandShow: true, // 默认树是展开的
      data4: JSON.parse(JSON.stringify(data)),
      collapsedWrapperMarginLeft: 0,
      // table和tool和分页的参数
      toolShow: true,
      marginLeft1: lzyTableMarginLeft,
      mainContent: true,
      lzyTableWrapperHeight: 0,
      // table的参数
      tableMaxHeight: 0,
      tableHeaderClass: 'table-title',
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
      setTableHeadBackground: 'table-title-class',
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
    // 通过CollapseBar子组件的getLzyTableWrapperMarginLeft事件传递子组件一个参数给父组件，从而求出tableWrapper的marginLeft
    // 这是vue的子组件传递给父组件一种方法
    getLzyTableWrapperMarginLeft (...data) {
      console.log(data[0].left);
      this.marginLeft = data[0].left + 10;
    },
    // 点击侧导航栏的上部图标触发
    clickTopBtn (e) {
      let iconClass = e.target.className;
      if (iconClass.indexOf('el-icon-back') >= 0) {
        return false;
      } else if (iconClass.indexOf('icon-folder-open') >= 0) {
        this.expandShow = true;
        // console.log(this.expandShow);
      } else {
        this.expandShow = false;
        // console.log(this.expandShow);
      }
    },
    // 递归，使得data数组的所有iconGroupShow变为false
    setIconGroupShow (children) {
      if (Array.isArray(children)) {
        children.forEach(item => {
          item.iconGroupShow = false;
          if (item.children) {
            this.setIconGroupShow(item.children);
          } else {}
        });
      } else {
        return false;
      }
    },

    // 点击树组件的某个结点把添加、编辑和删除按钮显示出来
    handleClickText (node, data) {
      this.setIconGroupShow(this.data4);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(item => item.id === data.id);
      let obj = Object.assign({}, children[index], {iconGroupShow: true});
      children.splice(index, 1, obj);
    },

    // 新增树节点
    append (data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    // 删除树节点
    remove (node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    // 右内容table的方法
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
  computed: {
    ...mapGetters([
      'sideBar'
    ]),
    opened () {
      return this.sideBar.opened;
    }
  },
  watch: {
    opened () {
      // 40是分页的高度，39是footer和表格的蓝色背景标题栏的高度
      if (this.opened) {
        this.tableMaxHeight = this.$refs.tableWrapper.offsetHeight - this.$refs.toolWrapper.offsetHeight - 38 - 40;
      } else {
        this.tableMaxHeight = this.$refs.tableWrapper.offsetHeight - this.$refs.toolWrapper.offsetHeight - 38 - 40;
      }
    }
  },
  created () {
    this.$nextTick(() => {
      // 40是分页的高度，39是footer和表格的蓝色背景标题栏的高度
      this.tableMaxHeight = this.$refs.tableWrapper.offsetHeight - this.$refs.toolWrapper.offsetHeight - 38 - 40;
      this.lzyTableWrapperHeight = document.body.offsetHeight - 210;
    });
  }
};
</script>

<style lang="less">
@import "../../common/less/theme";
@import "./lzyTableWrapper";
.table-wrapper {
  height: 100%;
  /* 伸缩导航的样式 */
  .collapse-bar{
    .top {
      border-bottom: 1px solid #ccc;
      height: 30px;
      margin-bottom: 12px;
      padding-top: 8px;
      overflow: hidden;

      .group {
        float: left;
        margin-left: 0;
        padding-right: 12px;
        padding-left: 12px;
        position: relative;
        border-right: 1px solid #ddd;
        .icon {
          height: 23px;
          line-height: 23px;
          color: #000;
          cursor: pointer;
          padding-left: 20px;
          text-decoration: none;
          height: 23px;
          line-height: 23px;
          float: left;
        }

        .icon-return {
          background: url('./img/go-back.png') no-repeat;
        }

        .icon-expand-tree {
          background: url('./img/expandTree.png') no-repeat;

          &:after {
            content: '';
          }
        }

        .icon-collapse-tree {
          background: url('./img/collapseTree.png') no-repeat;
        }
      }
    }

    .main {
      overflow: hidden;
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        line-height: 16px;
        padding-right: 8px;
        .content;

        .icon-group {
          visibility: hidden;
          opacity: 0;
          font-size: 16px;
          margin-left: 7px;
          transition-property: opacity, visibility;
          transition-duration: .5s, .5s;

          .el-icon-circle-plus-outline {
            color: #67C23A;
          }
          .el-icon-edit {
            color: #E6A23C;
          }
          .el-icon-close {
            color: #F56C6C;
          }
        }

        &:hover .icon-group {
          opacity: 1 !important;
          visibility: visible !important;
        }
      }
    }
  }
  /* table的样式 */
  .lzy-table-wrapper {
    padding: 5px 0 5px 2px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    .tool-wrapper {
      .btn-group {
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
    }

    .table-container {
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

    .addForm-wrapper {

      .fix-wrapper {
        .btn-group {
          padding-bottom: 5px;
          border-bottom: 1px solid #ddd;

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
}
</style>
