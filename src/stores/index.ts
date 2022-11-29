import useAppStore from './modules/app';
import useUserStore from './modules/user';
import usePermissionStore from './modules/permission';
import useSettingStore from './modules/settings';
import useTagsViewStore from './modules/tagsView';
import useDictStore from './modules/dict';

const stores = () => ({
    app: useAppStore(),
    user: useUserStore(),
    permission: usePermissionStore(),
    setting: useSettingStore(),
    tagsView: useTagsViewStore(),
    dict: useDictStore()
});
export default stores;