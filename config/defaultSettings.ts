import { Settings as LayoutSettings } from '@ant-design/pro-layout';
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#6019e2',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Personal DashBoard',
  pwa: false,
  logo: 'https://jingyi-notes-bucket.s3.us-east-2.amazonaws.com/leetcode.svg',
  iconfontUrl: '',
};

export default Settings;
