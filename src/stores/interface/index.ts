/* user app state */
export interface useAppStore {
    sidebar: {
        opened: boolean;
        withoutAnimation: boolean;
        hide: boolean;
    },
    device: 'desktop';
    size: string;
    lang: string; //en|zh|id
};

export interface useDictStore {
        // 获取字典
        getDict(_key: string | null) : string | null;
        // 设置字典
        setDict(_key: string | null, value: any): [key: string, value: string];
        // 删除字典
        removeDict(_key: any) : boolean;
        // 清空字典
        cleanDict():[key: string, value: string];
        // 初始字典
        initDict() : void;
};