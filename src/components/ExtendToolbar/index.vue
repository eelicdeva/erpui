<template>
      <el-tooltip class="item" effect="dark" :content="showExtend ? $t('button.hideExtend') : $t('button.showExtend')" placement="top">
        <el-button circle :icon="showExtend?'ArrowUpBold':'ArrowDownBold'" @click="toggleExtend()" />
      </el-tooltip>
</template>

<script setup>
/**  show/hide extend info
 * components golbal installed
 * dom use: v-show="showExtend"
 * dom add: <extend-toolbar v-model:showExtend="showExtend"> </extend-toolbar> 
 * option:  <extend-toolbar v-model:showExtend="showExtend" v-hasPermi="['xxx:xxx:xxx']"> </extend-toolbar> 
 * script add: const showExtend = ref(false);
**/
import i18n from '@/lang';

const {t} = i18n.global;
const props = defineProps({
  showExtend: {
    type: Boolean,
    default: true,
  }
})

const emits = defineEmits(['update:showExtend', 'queryTable']);

// Extend view
function toggleExtend() {
  emits("update:showExtend", !props.showExtend);
}


</script>
