import LoadableRoute from './loadableroute'
import {demoRoutes} from '@/demo/demoRoutes'
import {GlobalEnvParams} from '@/core/envconfig';

let routes = [
    {path: '/home', component: LoadableRoute(()=>import('@/views/home/index'))}
    ,{path: '/',  redirect: { path: '/home'}}
    ,{path: '/home/about', component: LoadableRoute(()=>import('@/views/about/index'))}
    ,{path: '/home/mqtt', component: LoadableRoute(()=>import('@/views/mqtt/index'))}
    ,{path: '/404', component: LoadableRoute(()=>import('@/views/page/404/index'))}
];

let notFound = [
    {path: '*', component: LoadableRoute(()=>import('@/views/page/404/index'))}
];

if (GlobalEnvParams.DEMO_MENU) {
    routes.push(...demoRoutes);
}

routes.push(...notFound);

export default routes;