import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'
import energy from '@/components/energy/energy'
import energyTwo from '@/components/energyTwo/energyTwo'
import checkingIn from '@/components/checkingIn/checkingIn'
import mycheckingIn from '@/components/mycheckingIn/mycheckingIn'
import listcheckingIn from '@/components/listcheckingIn/listcheckingIn'
import ktcontrol from '@/components/ktcontrol/ktcontrol'
import lightcontrol from '@/components/lightcontrol/lightcontrol'
import ledcontrol from '@/components/ledcontrol/ledcontrol'
import projectorcontrol from '@/components/projectorcontrol/projectorcontrol'
import application from '@/components/application/application'
import myassets from '@/components/myassets/myassets'
import addorder from '@/components/addorder/addorder'
import orderpending from '@/components/orderpending/orderpending'
import ordersystem from '@/components/ordersystem/ordersystem'
import mendtotal from '@/components/mendtotal/mendtotal'
import equipmenttotal from '@/components/equipmenttotal/equipmenttotal'
import Safeguard from '@/components/Safeguard/Safeguard'
import forge from '@/components/forge/forge'
import energyyeartotal from '@/components/energyyeartotal/energyyeartotal'
import cameralist from '@/components/cameralist/cameralist'
import error from '@/components/error/error'

Vue.use(Router);



export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/energyTwo',
      name: 'energyTwo',
      component: energyTwo	
    },
    {
      path: '/energy',
      name: 'energy',
      component: energy 
    },
    {
      path: '/checkingIn',
      name: 'checkingIn',
      component: checkingIn 
    },
    {
      path: '/mycheckingIn',
      name: 'mycheckingIn',
      component: mycheckingIn 
    },
    {
      path: '/listcheckingIn',
      name: 'listcheckingIn',
      component: listcheckingIn
    },
    {
      path: '/ktcontrol',
      name: 'ktcontrol',
      component: ktcontrol 
    },
    {
      path: '/lightcontrol',
      name: 'lightcontrol',
      component: lightcontrol 
    },
    {
      path: '/ledcontrol',
      name: 'ledcontrol',
      component: ledcontrol 
    },
    {
      path: '/projectorcontrol',
      name: 'projectorcontrol',
      component: projectorcontrol 
    },
    {
      path: '/application',
      name: 'application',
      component: application
    },
    {
      path: '/myassets',
      name: 'myassets',
      component: myassets 
    },
    {
      path: '/addorder',
      name: 'addorder',
      component: addorder 
    },
    {
      path: '/orderpending',
      name: 'orderpending',
      component: orderpending 
    },
    {
      path: '/ordersystem',
      name: 'ordersystem',
      component: ordersystem 
    },
    {
      path: '/mendtotal',
      name: 'mendtotal',
      component: mendtotal 
    },
    {
      path: '/equipmenttotal',
      name: 'equipmenttotal',
      component: equipmenttotal 
    },
    {
      path: '/Safeguard',
      name: 'Safeguard',
      component: Safeguard 
    },
    {
      path: '/forge',
      name: 'forge',
      component: forge 
    },
    {
      path: '/energyyeartotal',
      name: 'energyyeartotal',
      component: energyyeartotal 
    },
    {
      path: '/cameralist',
      name: 'cameralist',
      component: cameralist 
    },
    {
      path: '*',
      name: 'error',
      component: error 
    }
  ]
})









