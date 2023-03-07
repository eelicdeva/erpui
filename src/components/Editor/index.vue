<template>
    <div class="editor">
        <quill-editor
          v-model:content="content"
          contentType="html"
          @textChange="(e) => $emit('update:modelValue', content)"
          :options="options"
          :style="styles"
        />
    </div>
</template>
  
<script lang="ts" setup>
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import { ref, watch, computed } from "vue";
  import i18n from '@/lang/index';
  
  const {t} = i18n.global;

  const props = defineProps({
    /* 编辑器的内容 */
    modelValue: {
      type: String,
    },
    /* 高度 */
    height: {
      type: Number,
      default: null,
    },
    /* 最小高度 */
    minHeight: {
      type: Number,
      default: null,
    },
    /* 只读 */
    readOnly: {
      type: Boolean,
      default: false,
    },
  });
  
  const options = ref({
    theme: "snow",
    bounds: document.body,
    debug: "warn",
    modules: {
      // 工具栏配置
      toolbar: [
        ["bold", "italic", "underline", "strike"],       // 加粗 斜体 下划线 删除线
        ["blockquote", "code-block"],                    // 引用  代码块
        [{ list: "ordered" }, { list: "bullet" }],       // 有序、无序列表
        [{ indent: "-1" }, { indent: "+1" }],            // 缩进
        [{ size: ["small", false, "large", "huge"] }],   // 字体大小
        [{ header: [1, 2, 3, 4, 5, 6, false] }],         // 标题
        [{ color: [] }, { background: [] }],             // 字体颜色、字体背景颜色
        [{ align: [] }],                                 // 对齐方式
        ["clean"],                                       // 清除文本格式
        ["link", "image", "video"]                       // 链接、图片、视频
      ],
    },
    placeholder: t('user.remarkPlaceholder'),
    readOnly: props.readOnly,
    // theme: 'snow'
  });
  
  const styles = computed(() => {
    let style:any = {};
    if (props.minHeight) {
      style.minHeight = `${props.minHeight}px`;
    }
    if (props.height) {
      style.height = `${props.height}px`;
    }
    return style;
  })
  
  const content = ref("");
  watch(() => props.modelValue, (v) => {
    if (v !== content.value) {
      content.value = v === undefined ? "<p></p>" : v;
    }
  }, { immediate: true });
  
  
</script>
