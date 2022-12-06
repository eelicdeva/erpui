<template>
  <component :is="type" v-bind="linkProps()">
    <slot />
  </component>
</template>

<script lang="ts" setup name="Link">
import { isExternal } from '@/utils/validate'
import { computed } from 'vue';

/*
interface LinkProps {
  to: [ string,{
                href: string;
                target: string;
                rel: string;
               }];
};
const props = defineProps<LinkProps>()
*/

const props = defineProps({
  to: {
    type: [String, Object],
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
</script>
