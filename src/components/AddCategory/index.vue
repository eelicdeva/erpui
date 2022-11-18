<template>
    <el-divider style="margin: 4px 0;" />
    <div style="padding: 4px 8px; cursor: pointer;"
    @click="handleAdd">
   <el-icon><Plus /></el-icon> Add
    </div>
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
        <el-form ref="categoryRef" :model="form" :rules="rules">
            <el-form-item :label="$t('book.category')" prop="categoryName">
                <el-input v-model="form.categoryName" :placeholder="$t('book.category')" />
            </el-form-item>
            <el-form-item :label="$t('user.status')">
                <el-radio-group v-model="form.status">
                    <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{dict.label}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="submitForm">{{ $t('button.submit') }}</el-button>
                <el-button @click="cancel">{{ $t('button.cancel') }}</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import i18n from '@/lang/index';
import { addCategory, updateCategory } from "@/api/hr/category";
import { reactive, ref, toRefs } from 'vue';
import useCurrentInstance from '@/utils/useCurrentInstance';

const { proxy } = useCurrentInstance();
const { sys_normal_disable } = proxy.useDict('sys_normal_disable');

const {t} = i18n.global;
const open = ref(false);
const title = ref("");


const data = reactive({
  form: {},
  rules: {
    categoryName: [{ required: true, message: t('book.categoryRules'), trigger: "blur" }],
  }
});

const { form, rules } = toRefs(data);

function reset() {
  form.value = {
    categoryId: null,
    categoryName: null,
    status: "0",
    delFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null
  };
  proxy.resetForm("categoryRef");
}

function handleAdd() {
  reset();
  open.value = true;
  title.value = t('book.addBookCategory');
}

function submitForm() {
    proxy.$refs["categoryRef"].validate(valid => {
        if (valid) {
            if (form.value.categoryId != null) {
                updateCategory(form.value).then(response => {
                    proxy.$modal.msgSuccess("修改成功");
                    open.value = false;
                    window.location.reload();
                });
            } else {
                addCategory(form.value).then(response => {
                    proxy.$modal.msgSuccess("新增成功");
                    open.value = false;
                    window.location.reload();
                });
            }
        }
    });
}
</script>