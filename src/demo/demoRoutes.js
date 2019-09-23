import LoadableRoute from "@/router/loadableroute";

export const demoRoutes = [
    {path: '/demo/reudx', component: LoadableRoute(()=>import('./views/counter'))}
    ,{path: '/demo/htmltext', component: LoadableRoute(()=>import('./views/demohtmltext'))}
    ,{path: '/demo/ref', component: LoadableRoute(()=>import('./views/demoref'))}
    ,{path: '/demo/tablesimple', component: LoadableRoute(()=>import('./views/demotablesimple'))}
    ,{path: '/demo/tablelist', component: LoadableRoute(()=>import('./views/demotablelist'))}
    ,{path: '/demo/table', component: LoadableRoute(()=>import('./views/demotable'))}
    ,{path: '/demo/tinymce', component: LoadableRoute(()=>import('./views/demotinymce'))}
];