<template>
  <component :is="type" v-bind="linkProps()">
    <slot />
  </component>
</template>

<script lang="ts" setup name="Link">
import { isExternal } from '@/utils/validate'
import { computed } from 'vue';

/* to-do props 
interface To {
  type?: [{
    string;
    [{
      (string | number );
      ( string | number | boolean) ;
    }]
  }]
}

interface LinkProp {
string,{
                href: string;
                target: string;
                rel: string;
               }];
};

const props = defineProps<LinkProps>()
*/

const props = defineProps({
  to: { 
    type: [String, Object],  // to-do  isit query? { (string | number ): ( string | number | boolean) }
    required: true
  }
})

const isExt = computed(() => {
  return isExternal(props.to)
})

const type = computed<string>(() => {
  if (isExt.value) {
    return 'a'
  }
  return 'router-link'
})

function linkProps() {
  if (isExt.value) {
    return {
      href: props.to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: props.to
  }
}
/**
 * declare interface RouterLinkOptions {to: RouteLocationRaw;replace?: boolean;} 
 * to: RouteLocationRaw;
 * export declare type RouteLocationRaw = string | RouteLocationPathRaw | RouteLocationNamedRaw;
 * export declare interface RouteLocationPathRaw extends RouteQueryAndHash, MatcherLocationAsPath, RouteLocationOptions {}
 * export declare interface RouteQueryAndHash { query?: LocationQueryRaw; hash?: string;}
 * export declare type LocationQueryRaw = Record<string | number, LocationQueryValueRaw | LocationQueryValueRaw[]>;
 * export declare type LocationQueryValueRaw = LocationQueryValue | number | undefined;
 * export declare type LocationQueryValue = string | null;
 * export declare interface MatcherLocationAsPath { path: string; }
 * export declare interface RouteLocationOptions { replace?: boolean; force?: boolean; state?: HistoryState;}
 * export declare interface HistoryState { [x: number]: HistoryStateValue; [x: string]: HistoryStateValue; }
 * declare type HistoryStateValue = string | number | boolean | null | undefined | HistoryState | HistoryStateArray;
 * to: string | 
 *              //RouteLocationPathRaw:
 *              ({query?: ( 
 *                          Record<string | number,  
 *                                 (string | null) | number | undefined;) | 
 *                                ((string | null) | number | undefined;)[]>
 *                          )
 *                };
 *                hash?:string;
 *                              //RouteQueryAndHash
 *                path: string; //MatcherLocationAsPath
 *                              //RouteLocationOptions
 *                replace?: boolean; 
 *                force?: boolean; 
 *                state?: {
 *                    [x: number]: HistoryStateValue; //string | number | boolean | null | undefined| HistoryState | HistoryStateValue[];
 *                    [x: string]: HistoryStateValue; 
 * 
 *                       };
 *               ); |  
 *             //RouteLocationNamedRaw:
 * export declare interface RouteLocationNamedRaw extends RouteQueryAndHash, LocationAsRelativeRaw, RouteLocationOptions {}
 * export declare interface LocationAsRelativeRaw { name?: RouteRecordName; params?: RouteParamsRaw;}
 * export declare type RouteRecordName = string | symbol;
 * export declare type RouteParamsRaw = Record<string, RouteParamValueRaw | Exclude<RouteParamValueRaw, null | undefined>[]>;
 * export declare type RouteParamValueRaw = RouteParamValue | number | null | undefined;
 * export declare type RouteParamValue = string;
 */
</script>
