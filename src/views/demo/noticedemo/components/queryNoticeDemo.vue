<template>
  <div class="card table-search" v-show="showSearch" ref="searchRef">   
            <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="150px">
               <el-form-item :label="$t('notice.title')" prop="noticeTitle">
                  <el-input
                     v-model="queryParams.noticeTitle"
                     :placeholder="$t('notice.titlePlaceholder')"
                     clearable
                     @keyup.enter="handleQuery"
                  />
               </el-form-item>
               <el-form-item :label="$t('notice.author')" prop="createBy"  v-show="showExtend">
                  <el-input
                     v-model="queryParams.createBy"
                     :placeholder="$t('notice.authorPlaceholder')"
                     clearable
                     @keyup.enter="handleQuery"
                  />
               </el-form-item>
               <el-form-item :label="$t('notice.type')" prop="noticeType">
                  <el-select v-model="queryParams.noticeType" :placeholder="$t('notice.typePlaceholder')" clearable>
                     <el-option
                        v-for="dict in sys_notice_type"
                        :key="dict.value"
                        :label="dict.label"
                        :value="dict.value"
                     />
                  </el-select>
               </el-form-item>

            </el-form>
            <div class="search-operation">
               <extend-toolbar v-model:showExtend="showExtend" ></extend-toolbar>
               <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('button.search') }}</el-button>
               <el-button icon="Refresh" @click="resetQuery">{{ $t('button.reset') }}</el-button>                    
            </div>
         </div>   
</template>
<script lang="ts" setup>



</script>