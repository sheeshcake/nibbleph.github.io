
import React from 'react'
// components
import SvgColor from '../../../components/svg-color';
// utils
import { getLocalStorageItem } from '../../../utils/getLocalStorage';
// Constants
import { USER } from '../../../utils/userConstants'
// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};


const userRole = getLocalStorageItem(USER.USER_ROLE);
const VirtualAssistantNav = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'dashboard', path: `/virtual_assistant/dashboard`, icon: ICONS.dashboard },
    ],
  },
  {
    subheader: 'Article',
    items: [
      // My Orders
      {
        title: 'Article',
        path: `/virtual_assistant}/article`,
        icon: ICONS.user,
        children: [
          { title: 'List', path: `/virtual_assistant/article/list` },
          { title: 'Create', path: `/virtual_assistant/article/create` },
        ],
      },
    ]
  },


];

export default VirtualAssistantNav;
