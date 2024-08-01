/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */


import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { VBtn } from 'vuetify/components';

import { createVuetify } from 'vuetify'

import CustomRoundedTextField from '@/components/CustomRoundedTextField.vue';
export default createVuetify({
  components: {
    VBtn,
    CustomRoundedTextField,
  },
  defaults: {
    VContainer: {
      style: {
        // height: '90vh',
        maxHeight: '80vh',
        padding: '0',
        margin: '0',
      },
    },
    VRow: {
      style: {
        // height: '60vh',
        maxHeight: '50vh',
        padding: '0',
        margin: '0',

      },
    },
    VCol: {
      style: {
        // height: '60vh',
        maxHeight: '60vh',
      },
    },
    VBtn: {
      elevation: 0,
      style:{
        // backgroundColor: '#2799FB',
        color: '#fff',
        height: '3rem',
        fontSize: '0.7rem',
      }
    },
    VSecondary: {
      elevation: 0,
      style:{
        backgroundColor: '#2799FB',
        color: '#fff',
        height: '3rem',
        fontSize: '0.7rem',
      }
    },
    VTextField: {
      props: {
        variant: 'outlined',
      },
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      dark: {
        colors: {
          primary: '#2799FB',
          secondary: '#BDE0FE',
          tertiary: '#F1F9FE',
          danger: '#F51E00',

        },
      },
    },
  },
})
