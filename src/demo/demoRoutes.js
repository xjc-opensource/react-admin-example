import LoadableRoute from "@/router/loadableroute";

export const demoRoutes = [
    {path: '/demo/reudx', component: LoadableRoute(()=>import('./views/counter'))}
    ,{path: '/demo/tablelist', component: LoadableRoute(()=>import('./views/demotablelist'))}
    ,{path: '/demo/table', component: LoadableRoute(()=>import('./views/demotable'))}
];