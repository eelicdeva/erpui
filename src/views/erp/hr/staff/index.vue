<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" >
      <el-form-item :label="$t('staff.HrStaff.staffNo')" prop="staffNo" >
        <el-input
          v-model="queryParams.staffNo"
          :placeholder="$t('staff.HrStaff.staffNoPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.staffName')" prop="staffName" >
        <el-input
          v-model="queryParams.staffName"
          :placeholder="$t('staff.HrStaff.staffNamePlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.birth')" prop="birth" >
        <el-date-picker clearable
          v-model="queryParams.birth"
          type="date"
          value-format="YYYY-MM-DD"
          :placeholder="$t('staff.HrStaff.birthPlaceholder')">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.dateIn')" prop="dateIn" >
        <el-date-picker clearable
          v-model="queryParams.dateIn"
          type="date"
          value-format="YYYY-MM-DD"
          :placeholder="$t('staff.HrStaff.dateInPlaceholder')">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.dateOut')" prop="dateOut" >
        <el-date-picker clearable
          v-model="queryParams.dateOut"
          type="date"
          value-format="YYYY-MM-DD"
          :placeholder="$t('staff.HrStaff.dateOutPlaceholder')">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.nik')" prop="nik" >
        <el-input
          v-model="queryParams.nik"
          :placeholder="$t('staff.HrStaff.nikPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.nationality')" prop="nationality" >
        <el-input
          v-model="queryParams.nationality"
          :placeholder="$t('staff.HrStaff.nationalityPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.blood')" prop="blood" >
        <el-input
          v-model="queryParams.blood"
          :placeholder="$t('staff.HrStaff.bloodPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.religion')" prop="religion" >
        <el-input
          v-model="queryParams.religion"
          :placeholder="$t('staff.HrStaff.religionPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.tel')" prop="tel" >
        <el-input
          v-model="queryParams.tel"
          :placeholder="$t('staff.HrStaff.telPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.tel1')" prop="tel1" >
        <el-input
          v-model="queryParams.tel1"
          :placeholder="$t('staff.HrStaff.tel1Placeholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.zip')" prop="zip" >
        <el-input
          v-model="queryParams.zip"
          :placeholder="$t('staff.HrStaff.zipPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.email')" prop="email" >
        <el-input
          v-model="queryParams.email"
          :placeholder="$t('staff.HrStaff.emailPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.address')" prop="address" >
        <el-input
          v-model="queryParams.address"
          :placeholder="$t('staff.HrStaff.addressPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.addressIdCard')" prop="addressIdCard" >
        <el-input
          v-model="queryParams.addressIdCard"
          :placeholder="$t('staff.HrStaff.addressIdCardPlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('staff.HrStaff.eduGrade')" prop="eduGrade" >
        <el-input
          v-model="queryParams.eduGrade"
          :placeholder="$t('staff.HrStaff.eduGradePlaceholder')"
          clearable
          @keyup.enter="handleQuery"
        />
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
          v-hasPermi="['project:staff:add']"
        >{{ $t('button.add') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['project:staff:edit']"
        >{{ $t('button.edit') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['project:staff:remove']"
        >{{ $t('button.delete') }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['project:staff:export']"
        >{{ $t('button.export') }}</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList" ></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="staffList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column :label="$t('staff.HrStaff.staffId')" align="center" prop="staffId"  />
      <el-table-column :label="$t('staff.HrStaff.staffNo')" align="center" prop="staffNo"  />
      <el-table-column :label="$t('staff.HrStaff.staffName')" align="center" prop="staffName"  />
      <el-table-column :label="$t('staff.HrStaff.birth')" align="center" prop="birth"  width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.birth, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('staff.HrStaff.sex')" align="center" prop="sex"  />
      <el-table-column :label="$t('staff.HrStaff.dateIn')" align="center" prop="dateIn"  width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.dateIn, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('staff.HrStaff.dateOut')" align="center" prop="dateOut"  width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.dateOut, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('staff.HrStaff.nik')" align="center" prop="nik"  />
      <el-table-column :label="$t('staff.HrStaff.maritalStatus')" align="center" prop="maritalStatus"  />
      <el-table-column :label="$t('staff.HrStaff.nationality')" align="center" prop="nationality"  />
      <el-table-column :label="$t('staff.HrStaff.blood')" align="center" prop="blood"  />
      <el-table-column :label="$t('staff.HrStaff.religion')" align="center" prop="religion"  />
      <el-table-column :label="$t('staff.HrStaff.tel')" align="center" prop="tel"  />
      <el-table-column :label="$t('staff.HrStaff.tel1')" align="center" prop="tel1"  />
      <el-table-column :label="$t('staff.HrStaff.zip')" align="center" prop="zip"  />
      <el-table-column :label="$t('staff.HrStaff.email')" align="center" prop="email"  />
      <el-table-column :label="$t('staff.HrStaff.address')" align="center" prop="address"  />
      <el-table-column :label="$t('staff.HrStaff.addressIdCard')" align="center" prop="addressIdCard"  />
      <el-table-column :label="$t('staff.HrStaff.education')" align="center" prop="education"  />
      <el-table-column :label="$t('staff.HrStaff.eduGrade')" align="center" prop="eduGrade"  />
      <el-table-column :label="$t('staff.HrStaff.staffImage')" align="center" prop="staffImage"  width="100">
        <template #default="scope">
          <image-preview :src="scope.row.staffImage" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('staff.HrStaff.eduImage')" align="center" prop="eduImage"  width="100">
        <template #default="scope">
          <image-preview :src="scope.row.eduImage" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('staff.HrStaff.idCardImage')" align="center" prop="idCardImage"  width="100">
        <template #default="scope">
          <image-preview :src="scope.row.idCardImage" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('staff.HrStaff.form1Image')" align="center" prop="form1Image"  width="100">
        <template #default="scope">
          <image-preview :src="scope.row.form1Image" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('staff.HrStaff.form2Image')" align="center" prop="form2Image"  width="100">
        <template #default="scope">
          <image-preview :src="scope.row.form2Image" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('staff.HrStaff.otherImage')" align="center" prop="otherImage"  width="100">
        <template #default="scope">
          <image-preview :src="scope.row.otherImage" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column :label="$t('staff.HrStaff.memo')" align="center" prop="memo"  />
      <el-table-column :label="$t('user.operate')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="primary"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['project:staff:edit']"
            link
          >{{ $t('button.edit') }}</el-button>
          <el-button
            type="primary"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['project:staff:remove']"
            link
          >{{ $t('button.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【请填写功能名称】对话框 -->
    <el-dialog :title="title" v-model="open" width="650px" append-to-body>
      <el-form ref="staffRef" :model="form" :rules="rules" >
        <el-form-item :label="$t('staff.HrStaff.staffNo')" prop="staffNo">
          <el-input v-model="form.staffNo" :placeholder="$t('staff.HrStaff.staffNoPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.staffName')" prop="staffName">
          <el-input v-model="form.staffName" :placeholder="$t('staff.HrStaff.staffNamePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.birth')" prop="birth">
          <el-date-picker clearable
            v-model="form.birth"
            type="date"
            value-format="YYYY-MM-DD"
            :placeholder="$t('staff.HrStaff.birthPlaceholder')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.dateIn')" prop="dateIn">
          <el-date-picker clearable
            v-model="form.dateIn"
            type="date"
            value-format="YYYY-MM-DD"
            :placeholder="$t('staff.HrStaff.dateInPlaceholder')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.dateOut')" prop="dateOut">
          <el-date-picker clearable
            v-model="form.dateOut"
            type="date"
            value-format="YYYY-MM-DD"
            :placeholder="$t('staff.HrStaff.dateOutPlaceholder')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.nik')" prop="nik">
          <el-input v-model="form.nik" :placeholder="$t('staff.HrStaff.nikPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.nationality')" prop="nationality">
          <el-input v-model="form.nationality" :placeholder="$t('staff.HrStaff.nationalityPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.blood')" prop="blood">
          <el-input v-model="form.blood" :placeholder="$t('staff.HrStaff.bloodPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.religion')" prop="religion">
          <el-input v-model="form.religion" :placeholder="$t('staff.HrStaff.religionPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.tel')" prop="tel">
          <el-input v-model="form.tel" :placeholder="$t('staff.HrStaff.telPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.tel1')" prop="tel1">
          <el-input v-model="form.tel1" :placeholder="$t('staff.HrStaff.tel1Placeholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.zip')" prop="zip">
          <el-input v-model="form.zip" :placeholder="$t('staff.HrStaff.zipPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.email')" prop="email">
          <el-input v-model="form.email" :placeholder="$t('staff.HrStaff.emailPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.address')" prop="address">
          <el-input v-model="form.address" :placeholder="$t('staff.HrStaff.addressPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.addressIdCard')" prop="addressIdCard">
          <el-input v-model="form.addressIdCard" :placeholder="$t('staff.HrStaff.addressIdCardPlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.education')" prop="education">
          <el-input v-model="form.education" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.eduGrade')" prop="eduGrade">
          <el-input v-model="form.eduGrade" :placeholder="$t('staff.HrStaff.eduGradePlaceholder')" />
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.staffImage')">
          <image-upload v-model="form.staffImage"/>
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.eduImage')">
          <image-upload v-model="form.eduImage"/>
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.idCardImage')">
          <image-upload v-model="form.idCardImage"/>
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.form1Image')">
          <image-upload v-model="form.form1Image"/>
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.form2Image')">
          <image-upload v-model="form.form2Image"/>
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.otherImage')">
          <image-upload v-model="form.otherImage"/>
        </el-form-item>
        <el-form-item :label="$t('staff.HrStaff.memo')" prop="memo">
          <el-input v-model="form.memo" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">{{ $t('button.submit') }}</el-button>
          <el-button @click="cancel">{{ $t('button.cancel') }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="Staff">
import { listStaff, getStaff, delStaff, addStaff, updateStaff } from "@/api/staff";
import type { QueryParams, AddParams } from "@/api/staff";
import i18n from '@/lang/index';
import { ComponentInternalInstance, getCurrentInstance, reactive, ref, toRefs } from "vue";
import type { ElForm } from "element-plus";
import { parseTime } from "@/utils/ruoyi";

const {t} = i18n.global;
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const staffList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const queryRef = ref<InstanceType<typeof ElForm>>();
const staffRef = ref<InstanceType<typeof ElForm>>();

interface Data {
    form: AddParams
    queryParams: QueryParams
    rules:{
    }
}

const data: Data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    staffNo: null,
    staffName: null,
    birth: null,
    sex: null,
    dateIn: null,
    dateOut: null,
    nik: null,
    maritalStatus: null,
    nationality: null,
    blood: null,
    religion: null,
    tel: null,
    tel1: null,
    zip: null,
    email: null,
    address: null,
    addressIdCard: null,
    education: null,
    eduGrade: null,
    staffImage: null,
    eduImage: null,
    idCardImage: null,
    form1Image: null,
    form2Image: null,
    otherImage: null,
    memo: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询【请填写功能名称】列表 */
function getList() {
  loading.value = true;
  listStaff(queryParams.value).then(response => {
    staffList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    staffId: null,
    staffNo: null,
    staffName: null,
    birth: null,
    sex: null,
    dateIn: null,
    dateOut: null,
    nik: null,
    maritalStatus: "0",
    nationality: null,
    blood: null,
    religion: null,
    tel: null,
    tel1: null,
    zip: null,
    email: null,
    address: null,
    addressIdCard: null,
    education: null,
    eduGrade: null,
    staffImage: null,
    eduImage: null,
    idCardImage: null,
    form1Image: null,
    form2Image: null,
    otherImage: null,
    memo: null,
    roleId: null,
    deptId: null
  };
  staffRef.value?.resetFields();
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  queryRef.value?.resetFields();
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.staffId);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = t('staff.HrStaff.addStaff');
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _staffId = row.staffId || ids.value
  getStaff(_staffId).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = t('staff.HrStaff.EditStaff');
  });
}

/** 提交按钮 */
function submitForm() {
  staffRef.value?.validate(valid => {
    if (valid) {
      if (form.value.staffId != null) {
        updateStaff(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.successModify'));
          open.value = false;
          getList();
        });
      } else {
        addStaff(form.value).then(response => {
          proxy?.$modal.msgSuccess(t('button.AddSuccess'));
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _staffIds = row.staffId || ids.value;
  proxy?.$modal.confirm(t('staff.HrStaff.confirmDelete') + _staffIds + t('user.confirmDelete2')).then(function() {
    return delStaff(_staffIds);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess(t('user.succesDeleted'));
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy?.$download('project/staff/export', {
    ...queryParams.value
  }, `staff_${new Date().getTime()}.xlsx`)
}

getList();
</script>
