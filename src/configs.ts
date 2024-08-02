import {
  mdiAccount,
  mdiArrowDownRight,
  mdiArrowUpRight,
  mdiBell,
  mdiCash100, mdiCashCheck,
  mdiCog,
  mdiHelpCircle,
  mdiScaleUnbalanced
} from "@mdi/js";

const configs = {
  "sideMenuConfig": [
    {
      icon: mdiScaleUnbalanced,
      text: 'balance',
      route: '/home'
    },
    {
      icon: mdiArrowUpRight,
      text: 'incomes',
      route: '/incomes'
    },
    {
      icon: mdiArrowDownRight,
      text: 'expenses',
      route: '/expenses'
    },
    {
      icon: mdiCashCheck,
      text: 'check control',
      route: '/admin/check-control'
    },
    {
      icon: mdiCash100,
      text: 'checks',
      route: '/checks'
    },
    {
      icon: mdiBell,
      text: 'notifications',
      route: '/notifications'
    },
    {
      icon: mdiAccount,
      text: 'profile',
      route: '/profile'
    },
    {
      icon: mdiCog,
      text: 'settings',
      route: '/settings'
    },
    {
      icon: mdiHelpCircle,
      text: 'help',
      route: '/help'
    },
  ],

  headerConfig: {
    default: {
      name: 'default',
      color: '#FFFFFF',
      background: '#BDE0FE',
    },
    secondary: {
      name: 'secondary',
      color: '#2799FB',
      background: '#F1F9FE',
    }
  }

}

export default configs;
