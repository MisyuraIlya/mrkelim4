import moment from 'moment'

const dateFrom = moment().subtract(1, 'day').format('YYYY-MM-DD')
const dateTo = moment().format('YYYY-MM-DD')
export const URLS = {
  HOME: {
    LINK: '/',
    LABEL: 'עגלה',
    ROUTER: '/',
  },
  CATALOG: {
    LINK: '/',
    LABEL: 'קטלוג',
    ROUTER: '/client/:documentType/:lvl1/:lvl2/:lvl3',
  },
  CATALOG_VIEW: {
    LINK: '/CatalogView',
    LABEL: 'קטגוריות',
    ROUTER: '/CatalogView',
  },
  CART: {
    LINK: '/cart',
    LABEL: 'עגלה',
    ROUTER: '/cart',
  },
  PROFILE: {
    LINK: '/profile',
    LABEL: 'פרופיל',
    ROUTER: '/profile',
  },
  DOCUMENTS: {
    LINK: `/documentPage/order/${dateFrom}/${dateTo}?page=1`,
    LABEL: 'מסמכים',
    ROUTER: '/documentPage/:documentType/:dateFrom/:dateTo',
  },
  DOCUMENT_ITEM: {
    LINK: ``,
    LABEL: 'מסמכים',
    ROUTER: '/documentItemPage/:documentItemType/:id',
  },
  CARTESSET: {
    LINK: `/cartesset/${dateFrom}/${dateTo}?page=1`,
    LABEL: 'כרטסת',
    ROUTER: '/cartesset/:dateFrom/:dateTo',
  },

  GIUL_HOVOT: {
    LINK: `/hovot/${dateFrom}/${dateTo}?page=1`,
    LABEL: 'גיול חובות',
    ROUTER: '/hovot/:dateFrom/:dateTo',
  },

  ADMIN_EDIT_CATALOG: {
    LINK: '/admin/category-edit/0/0',
    LABEL: 'ניהול קטלוג',
    ROUTER: '/admin/category-edit/:lvl1/:lvl2',
  },
  ADMIN_EDIT_HOME: {
    LINK: '/admin/homeEdit',
    LABEL: 'ניהול עמוד בית',
    ROUTER: '/admin/homeEdit',
  },
  ADMIN_EDIT_PRODUCT: {
    LINK: '/admin/products-edit/0/0',
    LABEL: 'ניהול קטלוג',
    ROUTER: '/admin/products-edit/:lvl1/:lvl2/:lvl3',
  },
  ADMIN_CLIENTS: {
    LINK: '/admin/ROLE_USER?page=1',
    LABEL: 'לקוחות',
    ROUTER: '/admin/:userRole',
  },
  ADMIN_AGENTS: {
    LINK: '/admin/ROLE_AGENT?page=1',
    LABEL: 'סוכנים',
    ROUTER: '/admin/:userRole',
  },
  ADMIN_NOTIFICATIONS: {
    LINK: `/admin/notification`,
    LABEL: 'הודעות',
    ROUTER: '/admin/notification',
  },
  HISTORY: {
    LINK: `/documentPage/history/${dateFrom}/${dateTo}`,
    LABEL: 'הסטוריית רכישה',
  },
  APPROVE: {
    LINK: `/documentPage/approve/${dateFrom}/${dateTo}`,
    LABEL: 'הזמנות לאישור',
  },

  AGENT_CLIENTS: {
    LINK: '/agentClients',
    LABEL: 'לקוחות',
    ROUTER: '/agentClients/:agentId',
  },
  AGENT_DASHBOARD: {
    LINK: ``,
    LABEL: 'דאשבורד',
    ROUTER: '/agentDashboard/:tab/:id',
  },
  AGNET_DASHBOARD: {
    LINK: `/documentPage/history/${dateFrom}/${dateTo}`,
    LABEL: 'מסמכים',
  },
  AGNET_DOCUMENT_AGENT: {
    LINK: '/agentDocument',
    LABEL: 'מסמכים',
  },
  AGNET_ORDER_AGENT: {
    LINK: '/agentQuote',
    LABEL: 'טיוטות/הזמנות',
  },
  AGNET_GVIYA: {
    LINK: '/gviya',
    LABEL: 'גביה',
  },
  AGNET_AGENT_STATISTICS: {
    LINK: '/agentStatistics',
    LABEL: 'סטטיסטיקה',
  },
  AGENT_DOCUMENT_OFFLINE: {
    LINK: '/offline',
    LABEL: 'מסמכי אופליין',
  },
}
