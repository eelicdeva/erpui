<template>
      <el-tooltip class="item" effect="dark" :content="showExtend ? $t('button.hideExtend') : $t('button.showExtend')" placement="top">
        <el-button circle :icon="showExtend?'ArrowUpBold':'ArrowDownBold'" @click="toggleExtend()" />
      </el-tooltip>
</template>

<script lang="ts" setup>
/**  show/hide extend info
 * components golbal installed
 * @example
 * ```
 * dom use: v-show="showExtend"
 * dom add: <extend-toolbar v-model:showExtend="showExtend"> </extend-toolbar> 
 * option:  <extend-toolbar v-model:showExtend="showExtend" v-hasPermi="['xxx:xxx:xxx']"> </extend-toolbar> 
 * script add: const showExtend = ref(false);
 * ```
**/
export interface ExtendToolbarProps {
  showExtend: boolean;
};

const props =withDefaults(defineProps<ExtendToolbarProps>(),{
  showExtend: false
})


const emits = defineEmits(['update:showExtend', 'queryTable']);

// Extend view
function toggleExtend() {
  emits("update:showExtend", !props.showExtend);
}
</script>
