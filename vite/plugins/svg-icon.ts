import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// another solution https://segmentfault.com/a/1190000015367490
export default function createSvgIcon(isBuild: boolean) {
    return createSvgIconsPlugin({
        // ||指定需要缓存的图标文件夹
		iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
         // ||指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
        
        svgoOptions: isBuild
    })
}
