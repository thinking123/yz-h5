import Layout from '../components/Layout'

const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home')
const PageFilp = () => import(/* webpackChunkName: "Home" */ '../views/PageFlip')
const SharePage = () => import(/* webpackChunkName: "Home" */ '../views/SharePage')

export default [
    {
        path: '/', component: Layout,
        children: [
            {path: '/', redirect: {name: 'page'}},
            {path: '/share', name: 'share', component: SharePage,  meta: { title: '今天，我为邮储女性代言' }},
            {path: '/page', name: 'page', component: PageFilp,  meta: { title: '今天，我为邮储女性代言' }}
        ]
    },
]
