// routes
import React from "react";
// components
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  blog: icon("ic_blog"),
  cart: icon("ic_cart"),
  chat: icon("ic_chat"),
  mail: icon("ic_mail"),
  user: icon("ic_user"),
  file: icon("ic_file"),
  lock: icon("ic_lock"),
  label: icon("ic_label"),
  blank: icon("ic_blank"),
  kanban: icon("ic_kanban"),
  folder: icon("ic_folder"),
  banking: icon("ic_banking"),
  booking: icon("ic_booking"),
  invoice: icon("ic_invoice"),
  calendar: icon("ic_calendar"),
  disabled: icon("ic_disabled"),
  external: icon("ic_external"),
  menuItem: icon("ic_menu_item"),
  ecommerce: icon("ic_ecommerce"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
  website: icon("ic_web"),
  plans: icon("ic_plans"),
};

const userRole = "Admin";

const AdminNav = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      {
        title: "dashboard",
        path: `/${userRole?.toLowerCase()}/dashboard`,
        icon: ICONS.dashboard,
      },
    ],
  },
  {
    subheader: "Orders",
    items: [
      // My Orders
      {
        title: "Orders",
        path: `/${userRole?.toLowerCase()}/orders`,
        icon: ICONS.user,
        children: [
          { title: "List", path: `/${userRole?.toLowerCase()}/orders/list` },
          {
            title: "Work Space",
            path: `/${userRole?.toLowerCase()}/orders/work-space`,
          },
        ],
      },
    ],
  },

  {
    items: [
      {
        title: "Our Network",
        path: `/${userRole?.toLowerCase()}/websites`,
        icon: ICONS.dashboard,
      },
    ],
  },

  {
    items: [
      {
        title: "Account",
        path: `/${userRole?.toLowerCase()}/accounts`,
        icon: ICONS.user,
      },
    ],
  },

  {
    subheader: "Manage Notifications",
    items: [
      // My Orders
      {
        title: "Notification",
        path: `/${userRole?.toLowerCase()}/notification`,
        icon: ICONS.mail,
        children: [
          { title: "Maintenance", path: `/${userRole?.toLowerCase()}/notification/list` },
          { title: "Notify", path: `/${userRole?.toLowerCase()}/notification/notify-user` },
        ],
      },
    ],
  },

  {
    subheader: "Coupon",
    items: [
      {
        title: "Coupon",
        path: `/${userRole?.toLowerCase()}/coupon`,
        icon: ICONS.ecommerce,
      },
    ],
  },

  {
    subheader: "Manage Points",
    items: [
      {
        title: "Add Points",
        path: `/${userRole?.toLowerCase()}/points`,
        icon: ICONS.label,
      },
    ],
  },

  {
    subheader: "Link Juice",
    items: [
      {
        title: "Websites",
        path: `/${userRole?.toLowerCase()}/linkjuice-websites`,
        icon: ICONS.website,
      },
      {
        title: "Plans",
        path: `/${userRole?.toLowerCase()}/linkjuice-plans`,
        icon: ICONS.plans,
      },
    ],
  },
];

export default AdminNav;
