/* user app state */
export interface useAppStore {
    sidebar: {
        opened: boolean;
        withoutAnimation: boolean;
        hide: boolean;
    },
    device: 'desktop';
    size: string;
    lang: string;
    userNameMbti : string;
}

