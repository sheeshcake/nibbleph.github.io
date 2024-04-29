// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../../routes/paths';
// config
import { PATH_AFTER_LOGIN } from '../../../config-global';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'About',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/#about',
  },
  {
    title: 'Project',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/#portfolio',
  },
  {
    title: 'Services',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/#services',
  },
  {
    title: 'Contact Us',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/#contact',
  },
];

export default navConfig;
