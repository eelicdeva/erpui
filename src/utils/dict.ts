import { getDicts } from '@/api/system/dict/data'
// to-do: check dict stores error
//import useDictStore from '@/stores/modules/dict';
import Cookies from 'js-cookie'
import { ref, toRefs } from 'vue';

/**
 * 获取字典数据
 * @param  {} ...args
 * @param  {} {constres=ref({}
 */
export function useDict(...args: string[]) {
  const res = ref({});
  var lang : String = Cookies.get('lang') || "en";
      return (() => { args.forEach((d, index) => {res.value[d] = []; 
          getDicts(d).then(
            resp => {res.value[d] = resp.data.map(
               p => ({ label: (lang == "id") ? p.dictLabelId : ((lang == "zh") ? p.dictLabel : p.dictLabelEn),
               value: p.dictValue, 
               elTagType: p.listClass, 
               elTagClass: p.cssClass})
              )
             // useDictStore().setDict(dictType, res.value[dictType]);
            }
          )
      })
      return toRefs(res.value);
    })()
}
