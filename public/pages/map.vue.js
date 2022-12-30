const Maps = {
    data() {
        return {
            data: {},
            brawlers: [],
            route: "",
        };
    },
    methods: {
        async getBrawlers() {
            this.brawlers = await (await fetch("/api/brawlers")).json();
        },
        async getData() {
            this.data = await (await fetch("/api/map/" + this.$route.params.name)).json();
        },
    },
    beforeMount() {
        this.getData();
        this.getBrawlers();
        setInterval(() => {
            this.getData();
        }, 10_000);
    },
    mounted() {
        this.route = this.$route.params.name;
        document.title = "BrawlStars+ " + this.$route.name + " - " + this.$route.params.name;
    },
    async beforeUpdate() {
        if (this.route !== this.$route.params.name) {
            let buffer = this.brawlers;
            this.brawlers = [];
            this.data = {};
            await this.getData();
            this.brawlers = buffer;
        }
        this.route = this.$route.params.name;
    },
    template: `   
<div v-if="brawlers && brawlers.length > 0 && data" class="scroll position-relative">
    <h1 class="container-fluid my-3">{{$route.params.name}} - {{data.TOTAL / 1000}} matches</h1>
    <table class="table table-striped border border-2">
        <thead>
            <tr class="text-center">
                <th scope="col" style="width: 10%">
                    <div>Hero</div>
                    <div>Pickrate</div>
                    <div>Winrate</div>
                    <div>
                        <span>total</span>
                        <span>/</span>
                        <span class="text-success">win</span>
                        <span>/</span>
                        <span class="text-danger">lose</span>
                        <span>/</span>
                        <span class="text-muted">draw</span>
                    </div>
                </th>
                <th class="border border-1" v-for="brawler in brawlers" scope="col">
                    <cell :data="{brawler, data}"></cell>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="text-center" v-for="brawler in brawlers">
                <th scope="row">
                    <cell :data="{brawler, data}"></cell>
                </th>
                <td class="border border-1" v-for="brawler_enemy in brawlers">
                    <div v-if="brawler != brawler_enemy">{{brawler}} vs {{brawler_enemy}}</div>
                    <div
                        v-if="brawler != brawler_enemy"
                        :class="+(data[brawler][brawler_enemy].win / (data[brawler][brawler_enemy].total - data[brawler][brawler_enemy].draw) * 100).toFixed(2) > 50 ? 'text-success' : 'text-danger'"
                    >
                        {{+(data[brawler][brawler_enemy].win / (data[brawler][brawler_enemy].total - data[brawler][brawler_enemy].draw) * 100).toFixed(2) ?
                        +(data[brawler][brawler_enemy].win / (data[brawler][brawler_enemy].total - data[brawler][brawler_enemy].draw) * 100).toFixed(2) : 0}}%
                    </div>
                    <div v-if="brawler != brawler_enemy">
                        <span>{{data[brawler][brawler_enemy].total}}</span>
                        <span>/</span>
                        <span class="text-success">{{data[brawler][brawler_enemy].win}}</span>
                        <span>/</span>
                        <span class="text-danger">{{data[brawler][brawler_enemy].lose}}</span>
                        <span>/</span>
                        <span class="text-muted">{{data[brawler][brawler_enemy].draw}}</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<div v-else class="position-absolute top-50 start-50">
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>
`,
};
