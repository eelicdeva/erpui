<template>
    <el-select 
        ref="refSelect"
        placeholder="请选择..."
        @visible-change="VisibleChange"
        :popper-append-to-body="true"
    >
      <el-option
        v-for="item in state.options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
</template>

<script setup>
    import { reactive, ref } from "vue-demi";

    const refSelect=ref(null);

    const state=reactive({
        options:[
          {
            value: 'Option1',
            label: 'Option1',
          },
        ]
    })

    //在下拉框展开时添加底部固定项(注意该方法可能随版本更新而不适用)
    const VisibleChange=(visible)=>{
        if(visible){
                //#region 添加底部操作按钮
                let bkpRef=refSelect.value;
                let popper = bkpRef.popperPaneRef;
                if (!Array.from(popper.children).some(v => v.className === 'bkp_add_fixed_bottom_select')) {
                    const el = document.createElement('div');
                    el.className = 'bkp_add_fixed_bottom_select';
                    el.style=`
                          font-size: 14px;
                          font-weight: 500;
                          height: 42px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          cursor: pointer;
                          padding-top:4px;
                          border-top:1px solid rgb(240 242 245)
                    `
                    el.innerHTML = `
                          <span style="margin-right:8px">
                                  <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-plus"></use>
                                  </svg>
                           </span>
                          <span>新增</span>
                      `;
                    popper.appendChild(el);
                    el.onclick = () => {
                        // 底部按钮的点击事件 点击后想触发的逻辑也可以直接写在这
                        // onClickAdd();
                
                        // 以下代码实现点击后弹层隐藏 不需要可以删掉
                        if (bkpRef.toggleDropDownVisible) {
                            bkpRef.toggleDropDownVisible(false);
                        } 
                        else {
                            bkpRef.visible = false;
                        }
                    };
                }
                //#endregion
            
        }
    }

</script>

<style lang="scss" scoped>
</style>