// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'login',
    path: '/',
    icon: icon('ic_lock'),
  },
  {
    title: 'game',
    path: '/pregame',
    icon: icon('ic_game'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
