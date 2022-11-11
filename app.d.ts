 // option solusion
 /*
 // solusion 1:
 declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
  }
*/
  // solusion 2:
  declare module '*.vue' {
    import { defineComponent } from 'vue'
    const Component: ReturnType<typeof defineComponent>
    export default Component
  }
 