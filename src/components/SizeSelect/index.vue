<template>
  <div>
    <el-dropdown trigger="click" @command="handleSetSize">
      <div class="size-icon--style">
        <svg-icon class-name="size-icon" icon-class="size" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size === item.value" :command="item.value">
            {{ item.label }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup name="SizeSelect">
import useAppStore from "@/stores/modules/app";
import i18n from '@/lang';
import { computed, getCurrentInstance, ref } from "vue";
import type { ComponentInternalInstance } from "vue";
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus";

const {t} = i18n.global;
const appStore = useAppStore();
const size = computed(() => appStore.size);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const sizeOptions = ref([
  { label: t('components.sizeSelect.sizeLarge'), value: "large" },
  { label: t('components.sizeSelect.sizeDefault'), value: "default" },
  { label: t('components.sizeSelect.sizeSmall'), value: "small" },
]);

function handleSetSize(size) {
  proxy?.$modal.loading(t('components.sizeSelect.setSize'));
  appStore.setSize(size);
  setTimeout("window.location.reload()", 1000);
}
</script>

<style lang='scss' scoped>
.size-icon--style {
  font-size: 18px;
  line-height: 50px;
  padding-right: 7px;
}
</style>