import Layout from '../components/Layout'

const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home')

export default [
    {
        path: '/', component: Layout,
        children: [
            {path: '/', redirect: {name: 'home'}},
            {path: '/home', name: 'home', component: Home,  meta: { title: '首页' }}
        ]
    },
]
