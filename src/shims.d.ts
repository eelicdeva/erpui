/* eslint-disable */
/// <reference types="vite/client" />

declare module "*.vue" {
	import type { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
};
const Component: ReturnType<typeof defineComponent>;


declare module '*.scss' {
	const css: string;
	export default css;
}

// declare module 'xxx' path | name || 声明引入js文件路径或者模块名
declare module "jsencrypt/bin/jsencrypt.min"; 