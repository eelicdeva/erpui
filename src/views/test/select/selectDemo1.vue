<template>
    <div>
      <el-row type="flex" justify="center">
      <el-select v-model="valueMeta"  multiple :collapse-tags='false'  @visible-change='clearDrop($event)' placeholder="请选择标签">
        <div class="search-input">
          <el-input placeholder="请输入内容" size="mini" prefix-icon="el-icon-search" v-model="dropDownValue" @input="dropDownSearch" clearable></el-input>
          <!-- <input type="text" placeholder="请输入" class="el-input__inner" v-model="dropDownValue" @keyup="dropDownSearch" clearable> -->
        </div>
        <div slot="empty"  class="search-input" >
          <el-input  placeholder="请输入内容" size="mini" prefix-icon="el-icon-search" v-model="dropDownValue" @input="dropDownSearch" clearable></el-input>
          <p>无搜索内容</p>
        </div>
        <el-option v-for="item in optionsMetaShow" :key="item" :value="item"></el-option>
      </el-select>
      </el-row>
    </div>
  </template>
  <script>
  export default {
    data () {
      return {
        dropDownValue: '',
        optionsMetaAll: ['黄金糕', '双皮奶', '蚵仔煎', '双皮奶2', '龙须面', '北京烤鸭'],
        optionsMetaShow: ['黄金糕', '双皮奶', '蚵仔煎', '双皮奶2', '龙须面', '北京烤鸭'],
        valueMeta: []
      }
    },
    methods: {
      dropDownSearch () {
        var _this = this;
        // _this.valueMeta = [];
        _this.optionsMetaShow = _this.optionsMetaAll.filter(_this.filterSearch);
      },
      filterSearch (item) {
        return item.includes(this.dropDownValue);
      },
      clearDrop($event ){ //此处的clearDrop用于解决搜索内容不存在时，所有内容无法显示的bug
        if($event){
          // alert('active')
          this.dropDownValue=''
          this.optionsMetaShow=this.optionsMetaAll
        }
      },
    }
  }
  </script>
  <style>
  .search-input{
    width:90%;
    margin-left:5%;
    margin-top:5%;
  }
  p{
    font-size: 14px;
    color: #606266;
  }
  </style>