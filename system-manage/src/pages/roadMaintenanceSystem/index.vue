<template>
  <div class="setting">
    <el-aside>
      <el-row :gutter="5">
        <el-col :span="12">
          <div id="chartColumn" style="width:100%; height:400px;"></div>
        </el-col>
        <el-col :span="12">
          <div id="chartBar" style="width:95%; height:400px;"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div id="chartLine" style="width:100%; height:400px;"></div>
        </el-col>
        <el-col :span="12">
          <div id="chartPie" style="width:100%; height:400px;"></div>
        </el-col>
      </el-row>
    </el-aside>

    <!-- 公告 -->
    <div class="main">
      <el-row>
        <v-NoticeBoard class="modal" :header="backlogContent.header" :content="backlogContent.content" :iconClass="backlogContent.iconClass"></v-NoticeBoard>
      </el-row>
      <el-row>
        <v-NoticeBoard class="modal" :header="backReadContent.header" :content="backReadContent.content" :iconClass="backReadContent.iconClass"></v-NoticeBoard>
      </el-row>
      <el-row>
        <v-NoticeBoard class="modal" :header="noticeContent.header" :content="noticeContent.content" :iconClass="noticeContent.iconClass"></v-NoticeBoard>
      </el-row>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import NoticeBoard from '@/components/noticeBoard/NoticeBoard.vue';

export default {
  data () {
    return {
      chartColumn: null,
      chartBar: null,
      chartLine: null,
      chartPie: null,

      // 待办事项
      backlogContent:{
        header: '待办事项',
        content: [
          {
            id: '1',
            name: '公路沙凤三路啥地方即可蓝色的',
            time: '2018-10-31 14:20'
          },
          {
            id: '2',
            name: '公路沙凤三路啥地方即可蓝色的1',
            time: '2018-10-31 14:20'
          },
          {
            id: '3',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          },
          {
            id: '4',
            name: '公路沙凤三路啥地方即可蓝色的3',
            time: '2018-10-31 14:20'
          },
          {
            id: '5',
            name: '公路沙凤三路啥地方即可蓝色的4',
            time: '2018-10-31 14:20'
          }
        ],
        iconClass: 'el-icon-tickets'
      },
      backReadContent:{
        header: '待办事项',
        content: [
          {
            id: '1',
            name: '公路沙凤三路啥地方即可蓝色的',
            time: '2018-10-31 14:20'
          },
          {
            id: '2',
            name: '公路沙凤三路啥地方即可蓝色的1',
            time: '2018-10-31 14:20'
          },
          {
            id: '3',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          },
          {
            id: '4',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          },
          {
            id: '5',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          }
        ],
        iconClass: 'icon-book-open'
      },
      noticeContent:{
        header: '待办事项',
        content: [
          {
            id: '1',
            name: '公路沙凤三路啥地方即可蓝色的',
            time: '2018-10-31 14:20'
          },
          {
            id: '2',
            name: '公路沙凤三路啥地方即可蓝色的1',
            time: '2018-10-31 14:20'
          },
          {
            id: '3',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          },
          {
            id: '4',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          },
          {
            id: '5',
            name: '公路沙凤三路啥地方即可蓝色的2',
            time: '2018-10-31 14:20'
          }
        ],
        iconClass: 'icon-info'
      }
    };
  },

  components: {
    'v-NoticeBoard': NoticeBoard
  },

  methods: {
    drawColumnChart () {
      this.chartColumn = echarts.init(document.getElementById('chartColumn'), {
        width: arguments[0],
        height: arguments[1]
      });
      this.chartColumn.setOption({
        title: { text: 'Column Chart' },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    },
    drawBarChart () {
      this.chartBar = echarts.init(document.getElementById('chartBar'));
      this.chartBar.setOption({
        title: {
          text: 'Bar Chart',
          subtext: '数据来自网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2011年', '2012年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLabel: {
            show: true,
            rotate:45,
            interval: 0
          }
        },
        yAxis: {
          type: 'category',
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]
      });
    },
    drawLineChart () {
      this.chartLine = echarts.init(document.getElementById('chartLine'));
      this.chartLine.setOption({
        title: {
          text: 'Line Chart'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    },
    drawPieChart () {
      this.chartPie = echarts.init(document.getElementById('chartPie'));
      this.chartPie.setOption({
        title: {
          text: 'Pie Chart',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },
    drawCharts () {
      this.drawColumnChart();
      this.drawBarChart();
      this.drawLineChart();
      this.drawPieChart();
    }
  },

  mounted: function () {
    this.drawCharts();
    let that = this;
    window.onresize = function windowResize() {
      let chartColumn = document.getElementById('chartColumn');
      let chartLine = document.getElementById('chartLine');
      let chartBar = document.getElementById('chartBar');
      let chartPie = document.getElementById('chartPie');
      let chartColumnWidth = chartColumn.offsetWidth;
      let chartLineWidth = chartLine.offsetWidth;
      let chartBarWidth = chartBar.offsetWidth;
      let chartPieWidth = chartPie.offsetWidth;
      that.chartColumn.resize({width: chartColumnWidth, height: 400});
      that.chartBar.resize({width: chartLineWidth, height: 400});
      that.chartLine.resize({width: chartBarWidth, height: 400});
      that.chartPie.resize({width: chartPieWidth, height: 400});
    };
  },
  updated: function () {
    this.drawCharts();
  }
};
</script>

<style scoped lang="less">
@import "common/css/fonts.css";
.setting {
  overflow: hidden;
  @media only screen and (min-device-width: 1439px) {
    .el-aside {
      width: 68%!important;
    }
  }
  @media only screen and (min-device-width: 1279px) {
    .el-aside {
      width: 66%!important;
    }
  }
  .el-aside {
    margin-top: 10px;
    float: left;
    overflow-x: hidden;
  }

  .main {
    width: 28%;
    float: left;
    margin: 20px 5px 0 5px;

    .el-row {
      margin-bottom: 30px;
    }
  }
}
</style>
