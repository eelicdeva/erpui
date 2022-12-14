import { defineStore } from 'pinia'
import type { LocationQuery } from 'vue-router';

export interface VisitedView {
  fullPath: string; //check log  fullPath: tag.fullPath  need to check, not suit for vue-router
  query?: LocationQuery;// check log check string
  name: string; 
  path: string;
  meta: {
    affix?: boolean;
    icon?: string;   //for future use
    title: string; 
    link?: string | null; // for iframe external link
    noCache?: boolean;
    activeMenu?: string; // for inside link => highlight parent menu icon | title
  }
}

export interface IframeView {
  path: string; //fullPath
  title: string;
}

interface UseTagsViewStore {
  visitedViews: VisitedView[];
  cachedViews: string[];
  iframeViews: IframeView[];
}
const useTagsViewStore = defineStore(
  'tags-view',
  {
    state: (): UseTagsViewStore => ({
      visitedViews: [], 
      cachedViews: [],
      iframeViews: []
    }),
    actions: {
      addView( view: VisitedView ) {
        this.addVisitedView(view)
        this.addCachedView(view)
      },
      addIframeView( view: IframeView ) { // view: fullPath 
        if (this.iframeViews.some(v => v.path === view.path)) return
        this.iframeViews.push(
          //assign<T extends {}, U, V>(target: T, source1: U, source2: V): T & U & V;
          Object.assign({}, view, {
            path: view.path,
            title: (view.title || 'no-name'),
          })
        )
      },
      addVisitedView(view: VisitedView) {
        if (this.visitedViews.some(v => v.path === view.path)) return
        this.visitedViews.push(
          Object.assign({}, view, {
            //@ts-ignore
            title: view.meta.title || 'no-name'
          })
        )
      },
      addCachedView(view: VisitedView) {
        if (this.cachedViews.includes(view.fullPath)) return
        if (!view.meta.noCache) {
          this.cachedViews.push(view.fullPath)
        }
      },
      delView(view: string ) { //view: fullPath
        return new Promise(resolve => {          
          this.delVisitedView(view)          
          this.delCachedView(view)
          resolve({
            visitedViews: [...this.visitedViews],
            cachedViews: [...this.cachedViews]
          })
        })
      },
      delVisitedView(view: string) { //view: fullPath
        return new Promise(resolve => {
          for (const [i, v] of this.visitedViews.entries()) {
            if (v.fullPath === view) {
              this.visitedViews.splice(i, 1)
              break
            }
          }
          this.iframeViews = this.iframeViews.filter(item => item.path !== view)
          resolve([...this.visitedViews])
        })
      },
      delIframeView(view: string) { // fullPath
        return new Promise(resolve => {
          this.iframeViews = this.iframeViews.filter(item => item.path !== view)
          resolve([...this.iframeViews])
        })
      },
      delCachedView(tagFullPath: string) {  
        return new Promise(resolve => {
          const index = this.cachedViews.indexOf(tagFullPath)
          index > -1 && this.cachedViews.splice(index, 1)
          resolve([...this.cachedViews])
        })
      },
      delOthersViews(view: string) { //fullPath
        return new Promise(resolve => {
          this.delOthersVisitedViews(view)
          this.delOthersCachedViews(view)
          resolve({
            visitedViews: [...this.visitedViews],
            cachedViews: [...this.cachedViews]
          })
        })
      },
      delOthersVisitedViews(view: string) {//fullPath
        return new Promise(resolve => {
          this.visitedViews = this.visitedViews.filter(v => {
            return v.meta.affix || v.fullPath === view
          })
          this.iframeViews = this.iframeViews.filter(item => item.path === view)
          resolve([...this.visitedViews])
        })
      },
      delOthersCachedViews(view: string) {//fullPath
        return new Promise(resolve => {
          const index = this.cachedViews.indexOf(view)
          if (index > -1) {
            this.cachedViews = this.cachedViews.slice(index, index + 1)
          } else {
            this.cachedViews = []
          }
          resolve([...this.cachedViews])
        })
      },
      delAllViews() { // to-do check the defined 
        return new Promise(resolve => {         
          this.delAllVisitedViews()
          this.delAllCachedViews()         
          resolve({
            visitedViews: [...this.visitedViews],
            cachedViews: [...this.cachedViews]
          })
        })
      },
      delAllVisitedViews() {
        return new Promise(resolve => {
          const affixTags = this.visitedViews.filter(tag => tag.meta.affix)
          this.visitedViews = affixTags
          this.iframeViews = []
          resolve([...this.visitedViews])
        })
      },
      delAllCachedViews() {
        return new Promise(resolve => {
          this.cachedViews = []
          resolve([...this.cachedViews])
        })
      },
      updateVisitedView(view) {
        for (let v of this.visitedViews) {
          if (v.path === view.path) {
            v = Object.assign(v, view)
            break
          }
        }
      },
      delRightTags(view: string) {//view: fullPath
        return new Promise(resolve => {
          const index = this.visitedViews.findIndex(v => v.fullPath === view)
          if (index === -1) {
            return
          }
          this.visitedViews = this.visitedViews.filter((item, idx) => {
            if (idx <= index || (item.meta && item.meta.affix)) {
              return true
            }

            const i = this.cachedViews.indexOf(item.fullPath)
            if (i > -1) {
              this.cachedViews.splice(i, 1)
            }
            if(item.meta.link) {
              const fi = this.iframeViews.findIndex(v => v.path === item.path)
              this.iframeViews.splice(fi, 1)
            }
            return false
          })
          resolve([...this.visitedViews])
        })
      },
      delLeftTags(view: string) { //string fullPath
        return new Promise(resolve => {
          const index = this.visitedViews.findIndex(v => v.fullPath === view)
          if (index === -1) {
            return
          }
          this.visitedViews = this.visitedViews.filter((item, idx) => {
            if (idx >= index || (item.meta && item.meta.affix)) {
              return true
            }
            const i = this.cachedViews.indexOf(item.fullPath)
            if (i > -1) {
              this.cachedViews.splice(i, 1)
            }
            if(item.meta.link) {
              const fi = this.iframeViews.findIndex(v => v.path === item.path)
              this.iframeViews.splice(fi, 1)
            }
            return false
          })
          resolve([...this.visitedViews])
        })
      }
    }
  })

export default useTagsViewStore
