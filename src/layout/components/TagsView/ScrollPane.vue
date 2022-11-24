<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
  <div>
    <slot />
  </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import useTagsViewStore from '@/stores/modules/tagsView'
import { ComponentInternalInstance, computed, getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue';

const tagAndTagSpacing = ref(4);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const scrollWrapper = computed(() => proxy.$refs.scrollContainer.$refs.wrap$);

onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true)
})
onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll)
})
/**
 * 
 * @param e 鼠标中键盘滚轮移动 chrome:120(px)
 * 电脑鼠标滚轮垂直行数默认值是3，wheelDelta默认值120，即单行行高40px，
 * 
 * @return number
 */
function handleScroll(e) {
  // wheelDelta：获取滚轮滚动方向，向上120，向下-120，但为常量，与滚轮速率无关
  // deltaY：垂直滚动幅度，正值向下滚动。电脑鼠标滚轮垂直行数默认值是3
  // wheelDelta只有部分浏览器支持，deltaY几乎所有浏览器都支持
  /**
   *  const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap;
      // 0到scrollLeft为滚动区域隐藏部分
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
   */
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const $scrollWrapper = scrollWrapper.value;
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
}
const emits = defineEmits(['scroll'])
const emitScroll = () => {
  emits('scroll')
}


const tagsViewStore = useTagsViewStore()
const visitedViews = computed(() => tagsViewStore.visitedViews);

function moveToTarget(currentTag) {
  const $container = proxy.$refs.scrollContainer.$el
  const $containerWidth = $container.offsetWidth
  const $scrollWrapper = scrollWrapper.value;

  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (visitedViews.value.length > 0) {
    firstTag = visitedViews.value[0]
    lastTag = visitedViews.value[visitedViews.value.length - 1]
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
  } else {
    const tagListDom = document.getElementsByClassName('tags-view-item');
    const currentIndex = visitedViews.value.findIndex(item => item === currentTag)
    let prevTag = null
    let nextTag = null
    for (const k in tagListDom) {
      if (k !== 'length' && Object.hasOwnProperty.call(tagListDom, k)) {
        if (tagListDom[k].dataset.path === visitedViews.value[currentIndex - 1].path) {
          prevTag = tagListDom[k];
        }
        if (tagListDom[k].dataset.path === visitedViews.value[currentIndex + 1].path) {
          nextTag = tagListDom[k];
        }
      }
    }

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing.value

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing.value
    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}

defineExpose({
  moveToTarget,
})
</script>

<style lang='scss' scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }
  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}
</style>