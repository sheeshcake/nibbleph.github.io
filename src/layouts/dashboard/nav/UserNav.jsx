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
  linkJuice: icon("ic_link"),
  copyCat: icon("ic_copy_cat"),
  backlink: icon("ic_backlink"),
  citation: icon("ic_citation"),
  press_release: icon("ic_press_release"),
  local_search: icon("ic_local_search"),
  orders: icon("ic_orders"),
};

const UserNav = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [{ title: "dashboard", path: "/dashboard", icon: ICONS.dashboard }],
  },

  {
    subheader: "My Orders",
    items: [
      // My Orders
      {
        title: "My Orders",
        path: "/orders/guest-post",
        icon: ICONS.orders,
        // children: [
        //   { title: 'Guest Post', path: '/orders/guest-post' },
        // ],
      },
    ],
  },

  {
    subheader: "Link Building",
    items: [
      // Guest Post
      {
        title: "guest post",
        path: "/guest-post",
        icon: ICONS.blog,
        children: [
          { title: "Browse Full Inventory", path: "/guest-post/all" },
          // { title: 'Recently Added', path: '/guest-post/recently-added' },
          { title: "Deals of the Week", path: "/guest-post/deals-of-the-week" },
        ],
      },
      // {
      //   title: "Google News",
      //   path: "/google-news",
      //   icon: ICONS.linkJuice,
      // },
      {
        title: "Link Juice",
        path: "/google-news",
        icon: ICONS.linkJuice,
      },
      {
        title: "Backlink Packages",
        path: "/backlinks",
        icon: ICONS.backlink,
      },
      {
        title: "Copy Cat Backlink",
        path: "/copy-cat",
        icon: ICONS.copyCat,
      },
    ],
  },
  {
    subheader: "SEO",
    items: [
      {
        title: "Citations",
        path: "/citations",
        icon: ICONS.citation,
      },
      {
        title: "Press Release",
        path: "/press-release",
        icon: ICONS.press_release,
      },
      {
        title: "Local Search - GBP",
        path: "/local-search",
        icon: ICONS.local_search,
      },
    ],
  },

  // {
  //   items: [
  //     {
  //       title: 'link audit',
  //       path: '/link-audit',
  //       icon: ICONS.file,
  //     },
  //   ]
  // },

  // {
  //   items: [
  //     {
  //       title: 'blacklist',
  //       path: '/blacklist',
  //       icon: ICONS.disabled,
  //     },
  //   ]
  // },

  // {
  //   items: [
  //     {
  //       title: 'list your site',
  //       path: '/list-your-site',
  //       icon: ICONS.folder,
  //     },
  //   ]
  // }
];

export default UserNav;
