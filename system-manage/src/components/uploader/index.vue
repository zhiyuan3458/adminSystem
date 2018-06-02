<template>
  <div class="upload">
    <!-- 上传按钮 -->
    <div class="btns">
      <i class="el-icon-upload"></i>
      <label class="upload-btn" :for="fileId">上传文件</label>
      <input type="file" ref="input" :id="fileId" name="files" multiple="multiple" style="position:absolute;clip:rect(0 0 0 0);" @change="handleUpload($event)">
    </div>
    <!-- 上传列表 -->
    <div class="vinSwfUpload_context_editContent">
      <div id="thelist" class="uploader-list" :style="{width: thelistWidth + 'px'}">
      <div v-for="item in fileList" class="file-item" :key="item.id">
        <div class="file_name" :title="item.originalFileName">
          <a v-if="/\bpng\b|\bjpg\b|\bjpeg\b|\bgif\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName" @click="enlargeThumb(item.id)">
            <img class="thumb" :src="'http://192.1.80.184/' + item.groupNode + '/' + item.filePath" alt="">
          </a>
          <a v-else-if="/\bdoc\b|\bdocx\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName">
            <img class="thumb" src="./word_alt_1.png" alt="">
          </a>
          <a v-else-if="/\bxlsx\b|\bxls\b|\bxlsm\b|\bxlsb\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName">
            <img class="thumb" src="./excel_alt_1.png" alt="">
          </a>
          <a v-else-if="/\bppt\b|\bpptx\b|\bpptm\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName">
            <img class="thumb" src="./powerpoint_alt_1.png" alt="">
          </a>
          <a v-else-if="/\btxt\b/.test(item.fileType)" class="imgPreview" :id="item.id" :title="item.originalFileName">
            <img class="thumb" src="./txt_icon.png" alt="">
          </a>
          <a v-else class="imgPreview" :id="item.id" :title="item.originalFileName">
            <img class="thumb" src="./attachment-green.png" alt="">
          </a>
          <p class="fname" :title="item.originalFileName">{{item.originalFileName}}</p>
          <div class="file_operation">
            <i title="下载" class="el-icon-download" @click="downloadFile(item.id)"></i>
            <i title="删除" class="el-icon-close" @click="deleteFile(item.id)"></i>
          </div>
        </div>
      </div>
  </div>
    </div>
    <el-carousel class="carousel-wrapper" ref="carousel" height="700px" indicator-position="outside" v-show="carouselShow" :autoplay="false">
      <span class="el-icon-close" @click="carouselShow = false"></span>
      <el-carousel-item class="carousel-item" v-for="item in imgList" :key="item.id">
        <img :src="'http://192.1.80.184/' + item.groupNode + '/' + item.filePath" alt="">
      </el-carousel-item>
    </el-carousel>
</div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      fileId: '',
      carouselShow: false
    };
  },
  props: {
    id: '',
    fileList: {
      type: Array
    },
    upload: {
      type: Function
    }
  },
  computed: {
    thelistWidth () {
      return 130 * this.fileList.length;
    },
    imgList () {
      return this.fileList.filter(item => /\bpng\b|\bjpg\b|\bjpeg\b|\bgif\b/.test(item.fileType));
    }
  },
  mounted () {
    // 给每个input生成一个id
    this.fileId = this.id || this.gengerateID();
  },
  methods: {
    // 指定input type为file的id
    gengerateID () {
      let nonstr = Math.random().toString(36).substring(3, 8);
      if (!document.getElementById(nonstr)) {
        return nonstr;
      } else {
        return this.gengerateID();
      }
    },
    // 上传事件
    handleUpload (e) {
      if (this.upload) {
        this.upload(e.target.files);
      }
      this.$refs.input.value = null;
    },
    // 下载事件
    downloadFile (id) {
      this.$emit('download', id);
    },
    // 删除事件
    deleteFile (id) {
      this.$emit('delete', id);
    },
    setActiveItem (index) {
      this.$refs.carousel.setActiveItem(index);
    },
    enlargeThumb (id) {
      this.carouselShow = true;
      let imgActiveIndex = this.imgList.indexOf(this.imgList.find(item => item.id === id));
      this.setActiveItem(imgActiveIndex);
    }
  }
};
</script>

<style lang="less">
@import "../../common/less/theme";
.upload {
  margin-top: 12px;
  .btns {
    position: relative;
    .el-icon-upload {
      position: absolute;
      top: 15px;
      left: 11px;
      font-size: 16px;
      color: white;
    }
    .upload-btn {
      width: 85px;
      height: 20px;
      text-align: right;
      display: inline-block;
      line-height: 20px;
      color: white;
      padding: 10px;
      cursor: pointer;
      border: 1px solid dodgerblue;
      border-radius: 5px;
      background: dodgerblue;
    }
  }

  .vinSwfUpload_context_editContent {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    #thelist {
      margin-top: 40px;
      overflow: hidden;
      .file-item {
        width: 123px;
        height: 100px;
        display: inline-table;
        overflow: hidden;
        border: #cccccc 1px solid;
        margin: 3px;
        position: relative;
        float: left;

        .file_name {
          float: left;
          text-align: left;
          margin-left: 2px;
          margin-top: 2px;

          .imgPreview {
            width: 100px;
            height: 80px;
            overflow: hidden;
            display: inline-block;
            text-decoration: none;
            outline: none;
            color: #333;
            cursor: pointer;

            .thumb {
              width: 100px;
              height: 80px;
              vertical-align: middle;
              border: 0;
            }
          }
          .fname {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 123px;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
            z-index: 10;
            .content;
          }
          .file_operation {
            width: 16px;
            position: absolute;
            right: 2px;
            float: left;
            top: 2px;

            i.el-icon-download {
              text-decoration: none;
              color: #56C387;
              cursor: pointer;
            }

            i.el-icon-close {
              text-decoration: none;
              color: #C23A26;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .carousel-wrapper {
    width: 1000px;
    position: absolute;
    transform: translate(0, -50%);
    background: rgba(153, 153, 153, 0.4);
    z-index: 100;
    .el-icon-close {
      position: fixed;
      top: 5px;
      right: 5px;
      color: red;
      cursor: pointer;
      z-index: 101;
      font-size: 20px;
      font-weight: 700;
    }
    .el-carousel__arrow {
      background: rgba(7, 17, 27, 0.7);
    }
    .carousel-item {
      text-align: center;
      img {
        max-width: 500px;
        height: auto;
        margin-top: 100px;
      }
    }
  }
}
</style>
