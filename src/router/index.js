import Layout from '../components/Layout'

const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home')
const PageFilp = () => import(/* webpackChunkName: "Home" */ '../views/PageFlip')

export default [
    {
        path: '/', component: Layout,
        children: [
            {path: '/', redirect: {name: 'page'}},
            {path: '/home', name: 'home', component: Home,  meta: { title: '首页' }},
            {path: '/page', name: 'page', component: PageFilp,  meta: { title: '首页' }}
        ]
    },
]
