const routes = [
    { path: "/", name: "", component: Home },
    { path: "/app", name: "App", component: App },
    { path: "/map/:name", name: "Statistic", component: Maps },
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

const app = Vue.createApp({
    data() {
        return {
            maps: [],
        };
    },
    methods: {
        async getData() {
            this.maps = await (await fetch("/api/maps")).json();
        },
    },
    beforeMount() {
        this.getData();
    },
});
app.config.productionTip = false;

app.use(router);
app.component("cell", Cell);
app.mount("#app");
