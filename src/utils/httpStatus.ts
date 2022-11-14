import i18n from '@/lang/index';

const {t} = i18n.global;
const httpStatus: {[key:string]: string} =
 {
  '401': t('utils.errorCode.err401'),
  '403': t('utils.errorCode.err403'),
  '404': t('utils.errorCode.err404'),
  'default': t('utils.errorCode.errDefault')
};
export default httpStatus;