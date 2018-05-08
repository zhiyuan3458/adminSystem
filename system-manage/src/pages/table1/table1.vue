<template>
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
</template>

<script type="text/ecmascript-6">
export default {
};
</script>

<style lang="less">

</style>
