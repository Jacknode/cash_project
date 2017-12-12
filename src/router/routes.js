/**
 * Created by leibo on 17/11/29.
 */
import Login from '@/components/Login' //登录
import Home from '@/components/Home'  //首页
import CashUser from '@/components/CashUser'  //管理员用户信息
import DetailsSearch from '@/components/DetailsSearch'  //管理员明细查询
import demo from '@/components/demo'  //demo
import Withdrawal from '@/components/Withdrawal'  //管理员提现记录
import AutomaticMention from '@/components/AutomaticMention'  //管理员自动提现
export default [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    hidden: true,
    redirect: { name: 'Login' }
  },
  {
    path : '/home',
    component : Home,
    name : 'Home',
    children:[
      {
        path: 'cashUser',
        components: {
          default: Home,
          User: CashUser
        },
        name:'CashUser'
      },
      {
        path: 'detailsSearch',
        components: {
          default: Home,
          User: DetailsSearch
        },
        name:'DetailsSearch'
      },
      {
        path: 'withdrawal',
        components: {
          default: Home,
          User: Withdrawal
        },
        name:'Withdrawal'
      },
      {
        path: 'automaticMention',
        components: {
          default: Home,
          User: AutomaticMention
        },
        name:'AutomaticMention'
      },
      {
        path: 'demo',
        components: {
          default: Home,
          User: demo
        },
        name:'demo'
      }
    ]
  }
]
