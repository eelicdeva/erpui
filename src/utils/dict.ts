import { getDicts } from '@/api/system/dict/data'
// to-do: check dict stores error
import useDictStore from '@/stores/modules/dict';
import Cookies from 'js-cookie'
import { ref, toRefs } from 'vue';

/**
 * 获取字典数据
 * @param  {} ...args
 * @param  {}  
 */

/**
 * 获取字典数据
 * todo delete cookies lang
 */
 export function useDict(...args: string[]) {
  const res = ref({});
  var lang: string = Cookies.get('lang') || "en";
      return (() => { args.forEach((dictType: string, index) => {res.value[dictType] = []; 
          getDicts(dictType).then(resp => { res.value[dictType] = resp.data.map((
                p: { 
                     dictLabel: string; 
                     dictLabelEn: string; 
                     dictLabelId: string; 
                     dictValue: string; 
                     listClass: string; 
                     cssClass: string; 
                    }) => ({ label: (lang == "id") ? p.dictLabelId : ((lang == "zh") ? p.dictLabel : p.dictLabelEn),
               value: p.dictValue, 
               elTagType: p.listClass, 
               elTagClass: p.cssClass})
              )
             useDictStore().setDict(dictType, res.value[dictType]);
            }
          )
      })
      return toRefs(res.value);
    })()
}
