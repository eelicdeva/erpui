<template>
  <div class="component-upload-image">
    <el-upload
      multiple
      :action="uploadImgUrl"
      list-type="picture-card"
      :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      name="file"
      :on-remove="handleRemove"
      :show-file-list="true"
      :headers="headers"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :class="{ hide: fileList.length >= limit }"
    >
      <el-icon class="avatar-uploader-icon"><plus /></el-icon>
    </el-upload>
    <!-- 上传提示 -->
    <div class="el-upload__tip" v-if="showTip">
      {{ $t('upload.tip1') }}
      <template v-if="fileSize">
      {{ $t('upload.tip2') }} <b style="color: #f56c6c">{{ fileSize }}MB</b>
      </template>
      <template v-if="fileType">
      {{ $t('upload.tip3') }} <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
      </template>
      {{ $t('upload.tip4') }}
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="预览"
      width="800px"
      append-to-body
    >
      <img
        :src="dialogImageUrl"
        style="display: block; max-width: 100%; margin: 0 auto"
      />
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="ImageUpload">
import { getToken } from "@/utils/auth";
import { ElUpload, ElIcon, ElDialog } from "element-plus";
import type { UploadUserFile } from "element-plus";
import { computed, getCurrentInstance, ref, watch } from "vue";
import type { ComponentInternalInstance } from "vue";
import i18n from '@/lang/index';

const {t} = i18n.global;
interface PropsImageUpload {
  modelValue: string | UploadUserFile[]; //String, Object, Array 
  limit?: number;
  fileSize?: number;  
  fileType?: string[];
  isShowTip?: boolean;  
}

const props = withDefaults(defineProps <PropsImageUpload> (),{
  limit: 5,
  fileSize: 5,
  fileType: () => ["png", "jpg", "jpeg"],
  isShowTip: true
});
/**
const props = defineProps({
  modelValue: [String, Object, Array],
  // 图片数量限制
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
    default: () => ["png", "jpg", "jpeg"],
  },
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true
  },
});
 */

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const emit = defineEmits<{ (e: 'update:modelValue', str: string): void }>();
const number = ref(0);
const uploadList = ref([] as UploadUserFile[] );
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const baseUrl: string = import.meta.env.VITE_APP_BASE_API;
const uploadImgUrl = ref(import.meta.env.VITE_APP_BASE_API + "/common/upload"); // 上传的图片服务器地址
const headers = ref({ Authorization: "Bearer " + getToken() });
// readonly fileList: import("./src/upload").UploadUserFile[];
// export declare type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> & Partial<Pick<UploadFile, 'status' | 'uid'>>;
const fileList = ref([] as UploadUserFile[]);
const showTip = computed(
  () => props.isShowTip && (props.fileType || props.fileSize)
);

watch(() => props.modelValue, val => {
  if (val) {
    // 首先将值转为数组
    const list = Array.isArray(val) ? val : (props.modelValue as String).split(",");
    // 然后将数组转为对象数组
    fileList.value = list.map(item => {
      if (typeof item === "string") {
        if (item.indexOf(baseUrl) === -1) {
          item = { name: baseUrl + item, url: baseUrl + item };
        } else {
          item = { name: item, url: item };
        }
      }
      return item;
    });
  } else {
    fileList.value = [];
    return [];
  }
},{ deep: true, immediate: true });

// 删除图片
function handleRemove(file, files) {
  emit("update:modelValue", listToString(fileList.value));
}

// 上传成功回调
function handleUploadSuccess(res) {
  console.log(uploadImgUrl);
  uploadList.value.push({ name: res.fileName, url: res.fileName });
  if (uploadList.value.length === number.value) {
    fileList.value = fileList.value.filter(f => f.url !== undefined).concat(uploadList.value);
    uploadList.value = [];
    number.value = 0;
    emit('update:modelValue', listToString(fileList.value));
    proxy?.$modal.closeLoading();
  }
}

// 上传前loading加载
function handleBeforeUpload(file) { // to-do check
  let isImg = false;
  if (props.fileType.length) {
    let fileExtension = "";
    if (file.name.lastIndexOf(".") > -1) {
      fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
    }
    isImg = props.fileType.some(type => {
      if (file.type.indexOf(type) > -1) return true;
      if (fileExtension && fileExtension.indexOf(type) > -1) return true;
      return false;
    });
  } else {
    isImg = file.type.indexOf("image") > -1;
  }
  if (!isImg) {
    proxy?.$modal.msgError(
      t('upload.imageType1') + props.fileType.join("/") + t('upload.imageType2')
    );
    return false;
  }
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize;
    if (!isLt) {
      proxy?.$modal.msgError(t('upload.avatarType') + props.fileSize + "MB!");
      return false;
    }
  }
  proxy?.$modal.loading(t('upload.imageloading'));
  number.value++;
}

// 文件个数超出
function handleExceed() {
  proxy?.$modal.msgError(t('upload.imageExceed1') + props.limit + t('upload.imageExceed2'));
}

// 上传失败
function handleUploadError() {
  proxy?.$modal.msgError(t('upload.imageFailed'));
  proxy?.$modal.closeLoading();
}

// 预览
function handlePictureCardPreview(file) {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
}

// 对象转成指定字符串分隔
function listToString(list, separator?: string ) {
  let strs = "";
  separator = separator || ",";
  for (let i in list) {
    if (undefined !== list[i].url && list[i].url.indexOf("blob:") !== 0) {
      strs += list[i].url.replace(baseUrl, "") + separator;
    }
  }
  return strs != "" ? strs.slice(0, strs.length - 1) : "";
}
</script>

<style scoped lang="scss">
// .el-upload--picture-card 控制加号部分
:deep(.hide .el-upload--picture-card) {
    display: none;
}
</style>