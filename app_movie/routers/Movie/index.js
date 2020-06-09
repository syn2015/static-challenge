export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    children: [{
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'nowPlaying',
            component: () => import('@/components/nowPlaying')
        },
        {
            path: 'comingSoon',
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        {
            path: 'detail/1/:movieId',
            // 命名路由使用components
            components: {
                default: () => import('@/components/nowPlaying'),
                detail: () => import('@/views/Movie/detail')
            },
            // 使用 props 将组件和路由解耦：
            //  对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
            props: {
                detail: true
            }
        },
        {
            path: 'detail/2/:movieId',
            // 命名路由使用components
            components: {
                default: () => import('@/components/ComingSoon'),
                detail: () => import('@/views/Movie/detail')

            },
            // 使用 props 将组件和路由解耦：
            //  对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
            props: {
                detail: true
            }
        },
        {
            path: '/movie',
            redirect: '/movie/nowPlaying'
        }
    ]
}