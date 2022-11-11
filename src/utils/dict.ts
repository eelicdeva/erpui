import { getDicts } from '@/api/system/dict/data'
import Cookies from 'js-cookie'
import { ref, toRefs } from 'vue';

/**
 * 获取字典数据
 */
export function useDict(...args) {
  const res = ref({});
  //##eason220816 add lang select dictLabel / en / id 
  var lang : String = Cookies.get('lang') || "en";
      return (() => { args.forEach((d, index) => {res.value[d] = []; 
          getDicts(d).then(
            resp => {res.value[d] = resp.data.map(
               p => ({ label: (lang == "id") ? p.dictLabelId : ((lang == "zh") ? p.dictLabel : p.dictLabelEn),
               value: p.dictValue, 
               elTagType: p.listClass, 
               elTagClass: p.cssClass})
              )
              //useDictStore().setDict(dictType, res.value[dictType]);
            }
          )
      })
      return toRefs(res.value);
    })()
}