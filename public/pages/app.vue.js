const App = {
    props: ["maps"],
    data() {
        return {
            brawlers: [],
            map: [],
            allies: [],
            enemies: [],
            results: [],
            dot: "'",
        };
    },
    methods: {
        async getData() {
            this.brawlers = await (await fetch("/api/brawlers")).json();
        },
        async onChange() {
            if (this.map.length > 0) {
                this.results = await (
                    await fetch(
                        "/api/analyze?" +
                            new URLSearchParams({
                                map: this.map[0],
                                allies: this.allies,
                                enemies: this.enemies,
                            }),
                    )
                ).json();
            }
        },
        click(type, item) {
            let el;
            if (type === "map") {
                el = document.querySelector(`#${type}_${item.replaceAll(" ", "").replaceAll("'", "")}`);
            } else {
                el = document.querySelector(`#${type}_${item.replaceAll(".", "").replaceAll(" ", "")}`);
            }
            if (this[type].includes(item)) {
                this[type].splice(this[type].indexOf(item), 1);
                if (type === "map") {
                    this.allies = [];
                    this.enemies = [];
                }
                if (type === "allies" || type === "map") {
                    el.classList.remove("border-primary");
                } else {
                    el.classList.remove("border-danger");
                }
                el.classList.add("p-2");
                el.classList.remove("p-1");
                this.onChange();
                return;
            } else if (type === "map" && this.map.length > 0) {
                let old = document.querySelector(`#${type}_${this.map[0].replaceAll(" ", "").replaceAll("'", "")}`);
                old.classList.add("p-2");
                old.classList.remove("p-1");
                old.classList.remove("border-primary");
                this.map = [];
            } else if (
                !(type === "map") &&
                !(type === "allies" && this[type].length < 2) &&
                !(type === "enemies" && this[type].length < 3)
            ) {
                return;
            }
            if (type === "allies" || type === "map") {
                el.classList.add("border-primary");
            } else {
                el.classList.add("border-danger");
            }
            el.classList.remove("p-2");
            el.classList.add("p-1");
            this[type].push(item);
            this.onChange();
        },
        enter(type, item) {
            if (type === "map") {
                el = document.querySelector(`#${type}_${item.replaceAll(" ", "").replaceAll("'", "")}`);
            } else {
                el = document.querySelector(`#${type}_${item.replaceAll(".", "").replaceAll(" ", "")}`);
            }
            if (!this[type].includes(item)) {
                el.classList.add("border-warning");
            }
        },
        leave(type, item) {
            if (type === "map") {
                el = document.querySelector(`#${type}_${item.replaceAll(" ", "").replaceAll("'", "")}`);
            } else {
                el = document.querySelector(`#${type}_${item.replaceAll(".", "").replaceAll(" ", "")}`);
            }
            el.classList.remove("border-warning");
        },
    },
    beforeMount() {
        this.getData();
    },
    mounted() {
        document.title = "BrawlStars+ " + this.$route.name;
    },
    template: `
<div v-if="brawlers && maps && brawlers.length > 0 && maps.length > 0">
    <h5 class="text-center text-muted">There will be an update soon, which will take into account the strength of teams and the hero against each other on a certain map. <i class="bi bi-heart-fill"></i></h5>
    <h1 class="text-center">Map</h1>
    <div class="text-center">
        <img
            :id="'map_' + map.replaceAll(' ', '').replace(dot, '')"
            v-for="map in maps"
            :src="'images/maps/' + map + '.webp'"
            width="200"
            class="rounded p-2 border border-5"
            @click="click('map', map)"
            @mouseenter="enter('map', map)"
            @mouseleave="leave('map', map)"
            :alt="map"
        />
    </div>
    <div v-if="map.length > 0">
        <h1 class="text-center">Allies</h1>
        <div class="text-center">
            <img
                :id="'allies_' + brawler.replaceAll('.', '').replaceAll(' ', '')"
                v-for="brawler in brawlers"
                :src="'images/brawlers/' + brawler.at(0) +
            brawler.slice(1).toLowerCase() + '.webp'"
                width="100"
                class="rounded p-2 border border-5"
                @click="click('allies', brawler)"
                @mouseenter="enter('allies', brawler)"
                @mouseleave="leave('allies', brawler)"
                :alt="brawler"
            />
        </div>
        <h1 class="text-center">Enemies</h1>
        <div class="text-center">
            <img
                :id="'enemies_' + brawler.replaceAll('.', '').replaceAll(' ', '')"
                v-for="brawler in brawlers"
                :src="'images/brawlers/' + brawler.at(0) + brawler.slice(1).toLowerCase() + '.webp'"
                width="100"
                class="rounded p-2 border border-5"
                @click="click('enemies', brawler)"
                @mouseenter="enter('enemies', brawler)"
                @mouseleave="leave('enemies', brawler)"
                :alt="brawler"
            />
        </div>
        <div class="my-5">
            <h1 class="text-center">Best Brawlers</h1>
            <h5 class="text-center text-muted">The assessment is approximate and is based on the matches already played and some rules, which are purely author's. Statistics are not absolute, it all depends on you.</h5>
            <div class="text-center d-flex scroll" v-if="results && results.length > 0">
                <span v-for="brawler in results">
                    <img
                        :src="'images/brawlers/' + brawler[0].at(0) + brawler[0].slice(1).toLowerCase() + '.webp'"
                        width="100"
                        class="rounded p-2 border border-5"
                        :alt="brawler[0]"
                    />
                    <h5>{{brawler[1]}}%</h5>
                </span>
            </div>
        </div>
    </div>
</div>
<div v-else class="position-absolute top-50 start-50">
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>
`,
};
