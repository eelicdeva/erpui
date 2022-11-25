<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
         <el-form-item :label="$t('menu.name')" prop="menuName">
            <el-input
               v-model="queryParams.menuName"
               :placeholder="$t('menu.MenuPlaceholder')"
               clearable
               style="width: 200px"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item :label="$t('user.status')" prop="status">
            <el-select v-model="queryParams.status" :placeholder="$t('menu.statusPlaceholder')" clearable style="width: 200px">
               <el-option
                  v-for="dict in sys_normal_disable"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
               />
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">{{ $t('button.search') }}</el-button>
            <el-button icon="Refresh" @click="resetQuery">{{ $t('button.reset') }}</el-button>
         </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button
               type="primary"
               plain
               icon="Plus"
               @click="handleAdd"
               v-hasPermi="['system:menu:add']"
            >{{ $t('button.add')}}</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button 
               type="info"
               plain
               icon="Sort"
               @click="toggleExpandAll"
            >{{ $t('button.expand')}}</el-button>
         </el-col>
         <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table
         v-if="refreshTable"
         v-loading="loading"
         :data="menuList"
         row-key="menuId"
         :default-expand-all="isExpandAll"
         :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
         <el-table-column prop="menuName" :label="$t('menu.name')" :show-overflow-tooltip="true" width="250"></el-table-column>
         <el-table-column prop="icon" :label="$t('menu.icon')" align="center" width="100">
            <template #default="scope">
               <svg-icon :icon-class="scope.row.icon" />
            </template>
         </el-table-column>
         <el-table-column prop="orderNum" :label="$t('menu.sort')" width="100"></el-table-column>
         <el-table-column prop="perms" :label="$t('menu.authID')" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column prop="component" :label="$t('menu.path')" :show-overflow-tooltip="true"></el-table-column>
         <el-table-column prop="status" :label="$t('user.status')" width="80">
            <template #default="scope">
               <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.creationtime')" align="center" prop="createTime">
            <template #default="scope">
               <span>{{ parseTime(scope.row.createTime) }}</span>   
            </template>
         </el-table-column>
         <el-table-column :label="$t('user.operate')" align="center" width="200" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button
                  type="text"
                  icon="Edit"
                  @click="handleUpdate(scope.row)"
                  v-hasPermi="['system:menu:edit']"
               >{{ $t('button.edit') }}</el-button>
               <el-button
                  type="text"
                  icon="Plus"
                  @click="handleAdd(scope.row)"
                  v-hasPermi="['system:menu:add']"
               >{{ $t('button.add') }}</el-button>
               <el-button
                  type="text"
                  icon="Delete"
                  @click="handleDelete(scope.row)"
                  v-hasPermi="['system:menu:remove']"
               >{{ $t('button.delete') }}</el-button>
            </template>
         </el-table-column>
      </el-table>

      <!-- 添加或修改菜单对话框 -->
      <el-dialog :title="title" v-model="open" width="680px" append-to-body>
         <el-form ref="menuRef" :model="form" :rules="rules" label-width="100px">
            <el-row>
               <el-col :span="24">
                  <el-form-item :label="$t('menu.parentMenu')">
                     <el-tree-select
                        v-model="form.parentId"
                        :data="menuOptions"
                        :props="{ value: 'menuId', label: 'menuName', children: 'children' }"
                        value-key="menuId"
                        :placeholder="$t('menu.parentPlaceholder')"
                        check-strictly
                     />
                  </el-form-item>
               </el-col>
               <el-col :span="24">
                  <el-form-item :label="$t('menu.type')" prop="menuType">
                     <el-radio-group v-model="form.menuType">
                        <el-radio label="M">{{ $t('menu.list') }}</el-radio>
                        <el-radio label="C">{{ $t('menu.menu') }}</el-radio>
                        <el-radio label="F">{{ $t('menu.button') }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="24" v-if="form.menuType != 'F'">
                  <el-form-item :label="$t('menu.icon2')" prop="icon">
                     <el-popover
                        placement="bottom-start"
                        :width="540"
                        v-model:visible="showChooseIcon"
                        trigger="click"
                        @show="showSelectIcon"
                     >
                        <template #reference>
                           <el-input v-model="form.icon" :placeholder="$t('menu.icon2Placeholder')" @blur="showSelectIcon" v-click-outside="hideSelectIcon" readonly>
                              <template #prefix>
                                 <svg-icon
                                    v-if="form.icon"
                                    :icon-class="form.icon"
                                    class="el-input__icon"
                                    style="height: 32px;width: 16px;"
                                 />
                                 <el-icon v-else style="height: 32px;width: 16px;"><search /></el-icon>
                              </template>
                           </el-input>
                        </template>
                        <icon-select ref="iconSelectRef" @selected="selected" />
                     </el-popover>
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('menu.name')" prop="menuName">
                     <el-input v-model="form.menuName" :placeholder="$t('menu.MenuPlaceholder')" />
                  </el-form-item>
               </el-col>
               <el-col :span="12">
                  <el-form-item :label="$t('menu.displaySort')" prop="orderNum">
                     <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType != 'F'">
                  <el-form-item>
                     <template #label>
                        <span>
                           <el-tooltip :content="$t('menu.content1')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>{{ $t('menu.external') }}
                        </span>
                     </template>
                     <el-radio-group v-model="form.isFrame">
                        <el-radio label="0">{{ $t('menu.yes') }}</el-radio>
                        <el-radio label="1">{{ $t('menu.no') }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType != 'F'">
                  <el-form-item prop="path">
                     <template #label>
                        <span>
                           <el-tooltip :content="$t('menu.content2')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           {{ $t('menu.route') }}
                        </span>
                     </template>
                     <el-input v-model="form.path" :placeholder="$t('menu.routePlaceholder')" />
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType == 'C'">
                  <el-form-item prop="component">
                     <template #label>
                        <span>
                           <el-tooltip :content="$t('menu.content3')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           {{ $t('menu.component') }}
                        </span>
                     </template>
                     <el-input v-model="form.component" :placeholder="$t('menu.componentPlaceholder')" />
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType != 'M'">
                  <el-form-item>
                     <el-input v-model="form.perms" :placeholder="$t('menu.permsPlaceholder')" maxlength="100" />
                     <template #label>
                        <span>
                           <el-tooltip :content="$t('menu.content4')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           {{ $t('role.key') }}
                        </span>
                     </template>
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType == 'C'">
                  <el-form-item>
                     <el-input v-model="form.query" :placeholder="$t('menu.paramPlaceholder')" maxlength="255" />
                     <template #label>
                        <span>
                           <el-tooltip :content="$t('menu.content5')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           {{ $t('menu.param') }}
                        </span>
                     </template>
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType == 'C'">
                  <el-form-item>
                     <template #label>
                        <span>
                           <el-tooltip :content="$t('menu.content6')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           {{ $t('menu.cached') }}
                        </span>
                     </template>
                     <el-radio-group v-model="form.isCache">
                        <el-radio label="0">{{ $t('menu.cache') }}</el-radio>
                        <el-radio label="1">{{ $t('menu.dontcache') }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType != 'F'">
                  <el-form-item>
                     <template #label>
                        <span>
                           <el-tooltip :content="$t('menu.content7')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           {{ $t('menu.displayState') }}
                        </span>
                     </template>
                     <el-radio-group v-model="form.visible">
                        <el-radio
                           v-for="dict in sys_show_hide"
                           :key="dict.value"
                           :label="dict.value"
                        >{{ dict.label }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
               <el-col :span="12" v-if="form.menuType != 'F'">
                  <el-form-item>
                     <template #label>
                        <span>
                           <el-tooltip :content="$t('menu.content8')" placement="top">
                              <el-icon><question-filled /></el-icon>
                           </el-tooltip>
                           {{ $t('menu.statusPlaceholder') }}
                        </span>
                     </template>
                     <el-radio-group v-model="form.status">
                        <el-radio
                           v-for="dict in sys_normal_disable"
                           :key="dict.value"
                           :label="dict.value"
                        >{{ dict.label }}</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </el-col>
            </el-row>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button type="primary" @click="submitForm"> {{ $t('button.submit') }}</el-button>
               <el-button @click="cancel">{{ $t('button.cancel') }}</el-button>
            </div>
         </template>
      </el-dialog>
   </div>
</template>

<script lang="ts" setup name="Menu">
import { addMenu, delMenu, getMenu, listMenu, updateMenu } from "@/api/system/menu";
import SvgIcon from "@/components/SvgIcon/index.vue";
import IconSelect from "@/components/IconSelect/index.vue";
import { ClickOutside as vClickOutside } from 'element-plus';
import i18n from "@/lang/index";
import { ComponentInternalInstance, getCurrentInstance, reactive, ref, toRefs } from "vue";
import type { Ref } from "vue";

const {t} = i18n.global;

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const { sys_show_hide, sys_normal_disable } = proxy.useDict("sys_show_hide", "sys_normal_disable");

const menuList: Ref<any[]> = ref([]);
const open: Ref<boolean> = ref(false);
const loading: Ref<boolean>  = ref(true);
const showSearch: Ref<boolean>  = ref(true);
const title: Ref<string>  = ref("");
const menuOptions = ref([]);
const isExpandAll: Ref<boolean>  = ref(false);
const refreshTable: Ref<boolean>  = ref(true);
const showChooseIcon: Ref<boolean>  = ref(false);
const iconSelectRef: Ref<any> = ref(null);

interface dataMenu {
   form: {};
  queryParams: {
    menuName: string | undefined
    visible: boolean | undefined
  };
  rules: {
   menuName: any;
   orderNum: any;
   path: any;
  }
};   
const data: dataMenu = reactive({
  form: {},
  queryParams: {
    menuName: undefined,
    visible: undefined
  },
  rules: {
    menuName: [{ required: true, message: t('menu.nameRules'), trigger: "blur" }],
    orderNum: [{ required: true, message: t('menu.orderRules'), trigger: "blur" }],
    path: [{ required: true, message: t('menu.routeRules'), trigger: "blur" }]
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 查询菜单列表 */
function getList() {
  loading.value = true;
  listMenu(queryParams.value).then(response => {
    menuList.value = proxy.handleTree(response.data, "menuId");
    loading.value = false;
  });
}
/** 查询菜单下拉树结构 */
function getTreeselect() {
  menuOptions.value = [];
  listMenu().then(response => {
    const menu = { menuId: 0, menuName: t('menu.main'), children: [] };
    menu.children = proxy.handleTree(response.data, "menuId");
    menuOptions.value.push(menu);
  });
}
/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}
/** 表单重置 */
function reset() {
  form.value = {
    menuId: undefined,
    parentId: 0,
    menuName: undefined,
    icon: undefined,
    menuType: "M",
    orderNum: undefined,
    isFrame: "1",
    isCache: "0",
    visible: "0",
    status: "0"
  };
  proxy.resetForm("menuRef");
}
/** 展示下拉图标 */
function showSelectIcon() {
  iconSelectRef.value.reset();
  showChooseIcon.value = true;
}
/** 选择图标 */
function selected(name) {
  form.value.icon = name;
  showChooseIcon.value = false;
}
/** 图标外层点击隐藏下拉列表 */
function hideSelectIcon() {
  showChooseIcon.value = false;
}
/** 搜索按钮操作 */
function handleQuery() {
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}
/** 新增按钮操作 */
function handleAdd(row) {
  reset();
  getTreeselect();
  if (row != null && row.menuId) {
    form.value.parentId = row.menuId;
  } else {
    form.value.parentId = 0;
  }
  open.value = true;
  title.value = t('menu.addMenu');
}
/** 展开/折叠操作 */
function toggleExpandAll() {
  refreshTable.value = false;
  isExpandAll.value = !isExpandAll.value;
  nextTick(() => {
    refreshTable.value = true;
  });
}
/** 修改按钮操作 */
async function handleUpdate(row) {
  reset();
  await getTreeselect();
  getMenu(row.menuId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = t('menu.modifyMenu');
  });
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs["menuRef"].validate(valid => {
    if (valid) {
      if (form.value.menuId != undefined) {
        updateMenu(form.value).then(response => {
          proxy.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addMenu(form.value).then(response => {
          proxy.$modal.msgSuccess(t('button.AddSuccess'));
          open.value = false;
          getList();
        });
      }
    }
  });
}
/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal.confirm(t('menu.confirmDelete1') + row.menuName + t('menu.confirmDelete2')).then(function() {
    return delMenu(row.menuId);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}

getList();
</script>
