<template>
  <div class="upload-file">
    <el-upload
      multiple
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :headers="headers"
      class="upload-file-uploader"
      ref="fileUpload"
    >
      <!-- 上传按钮 -->
      <el-button type="primary">{{ $t('upload.selectFile') }}</el-button>
    </el-upload>
    <!-- 上传提示 -->
    <div class="el-upload__tip" v-if="showTip">
      {{ $t('upload.tip1') }}
      <template v-if="fileSize"> {{ $t('upload.tip2') }} <b style="color: #f56c6c">{{ fileSize }}MB</b> </template>
      <template v-if="fileType"> {{ $t('upload.tip3') }} <b style="color: #f56c6c">{{ fileType.join("/") }}</b> </template>
      {{ $t('upload.tip4') }}
    </div>
    <!-- 文件列表 -->
    <transition-group class="upload-file-list el-upload-list el-upload-list--text" name="el-fade-in-linear" tag="ul">
      <li :key="file.uid" class="el-upload-list__item ele-upload-list__item-content" v-for="(file, index) in fileList">
        <el-link :href="`${baseUrl}${file.url}`" :underline="false" target="_blank">
          <span class="el-icon-document"> {{ getFileName(file.name) }} </span>
        </el-link>
        <div class="ele-upload-list__item-content-action">
          <el-link :underline="false" @click="handleDelete(index)" type="danger">{{ $t('button.delete') }}</el-link>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts" setup name="FileUpload">
import { getToken } from "@/utils/auth";
import { computed, getCurrentInstance, ref, watch } from "vue";
import type { ComponentInternalInstance } from "vue";
import i18n from '@/lang/index';
import type { ElForm, UploadUserFile } from "element-plus";

const {t} = i18n.global;
// to-do check {transition} router.isReady().then(()=>app.mount('#app'));

interface PropsFileUpload {
  modelValue: string | UploadUserFile[]; //String, Object, Array 
  limit?: number;
  fileSize?: number;  
  fileType?: string[];
  isShowTip?: boolean;  
}
const props = withDefaults(defineProps <PropsFileUpload> (),{
  limit: 5,
  fileSize: 5,
  fileType: () => ["doc", "xls", "ppt", "txt", "pdf"],
  isShowTip: true
});
/**
const props = defineProps({
  modelValue: [String, Object, Array],
  // 数量限制
  limit: {
    type: Number,
    default: 5,
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 5,
  },
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: {
    type: Array,
    default: () => ["doc", "xls", "ppt", "txt", "pdf"],
  },
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true
  }
});
*/
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const emit = defineEmits<{ (e: 'update:modelValue', str: string): void }>();
const number = ref(0);
const uploadList = ref([] as UploadUserFile[] );
const baseUrl: string = import.meta.env.VITE_APP_BASE_API;
const uploadFileUrl = ref(import.meta.env.VITE_APP_BASE_API + "/common/upload"); // 上传文件服务器地址
const headers = ref({ Authorization: "Bearer " + getToken() });
const fileList = ref([] as UploadUserFile[]);
const fileUpload = ref<InstanceType<typeof ElForm>>()
const showTip = computed(
  () => props.isShowTip && (props.fileType || props.fileSize)
);

watch(() => props.modelValue, val => {
  if (val) {
    let temp = 1;
    // 首先将值转为数组
    const list = Array.isArray(val) ? val : (props.modelValue as string).split(',');
    // 然后将数组转为对象数组
    fileList.value = list.map(item => {
      if (typeof item === "string") {
        item = { name: item, url: item };
      }
      item.uid = item.uid || new Date().getTime() + temp++;
      return item;
    });
  } else {
    fileList.value = [];
    return [];
  }
},{ deep: true, immediate: true });

// 上传前校检格式和大小
function handleBeforeUpload(file) {
  // 校检文件类型
  if (props.fileType.length) {
    const fileName = file.name.split('.');
    const fileExt = fileName[fileName.length - 1];
    const isTypeOk = props.fileType.indexOf(fileExt) >= 0;
    if (!isTypeOk) {
      proxy?.$modal.msgError( t('upload.fileType1') + props.fileType.join("/") + t('upload.fileType2'));
      return false;
    }
  }
  // 校检文件大小
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize;
    if (!isLt) {
      proxy?.$modal.msgError( t('upload.fileSize') + props.fileSize + ' MB!');
      return false;
    }
  }
  proxy?.$modal.loading(t('upload.loading'));
  number.value++;
  return true;
}

// 文件个数超出
function handleExceed() {
  proxy?.$modal.msgError(t('upload.handleExceed1') + props.limit + t('upload.handleExceed2'));
}

// 上传失败
function handleUploadError(err) {
  proxy?.$modal.msgError(t('upload.uploadError'));
}

// 上传成功回调
function handleUploadSuccess(res, file) {
  if (res.code === 200) {
    uploadList.value.push({ name: res.fileName, url: res.fileName });
    uploadedSuccessfully();
  } else {
    number.value--;
    proxy?.$modal.closeLoading();
    proxy?.$modal.msgError(res.msg);
    emit("update:modelValue", listToString(fileList.value));
    uploadedSuccessfully();
  }
}

// 删除文件
function handleDelete(index) {
  fileList.value.splice(index, 1);
  emit("update:modelValue", listToString(fileList.value));
}

// 上传结束处理
function uploadedSuccessfully() {
  if (number.value > 0 && uploadList.value.length === number.value) {
    fileList.value = fileList.value.filter(f => f.url !== undefined).concat(uploadList.value);
    uploadList.value = [];
    number.value = 0;
    emit("update:modelValue", listToString(fileList.value));
    proxy?.$modal.closeLoading();
  }
}

// 获取文件名称
function getFileName(name) {
  if (name.lastIndexOf("/") > -1) {
    return name.slice(name.lastIndexOf("/") + 1);
  } else {
    return "";
  }
}

// 对象转成指定字符串分隔
function listToString(list, separator?: string) {
  let strs = "";
  separator = separator || ",";
  for (let i in list) {
    if (list[i].url) {
      strs += list[i].url + separator;
    }
  }
  return strs != '' ? strs.slice(0, strs.length - 1) : '';
}
</script>

<style scoped lang="scss">
.upload-file-uploader {
  margin-bottom: 5px;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
</style>
