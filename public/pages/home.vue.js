const Home = {
    props: ["maps"],
    data() {
        return {};
    },
    computed: {
        mapNumber: function (map) {
            for (let i = 0; i < 5; i++) {
                return this.maps.length <= (map - 1) * 5 + i;
            }
        },
    },
    mounted() {
        document.title = "BrawlStars+";
    },
    template: `   
<div v-if="maps && maps.length > 0">
    <div class="card mb-3">
        <img
            src="images/preview.png"
            height="300"
            class="card-img-top object-fit-contain"
            alt="BrawlStars+"
        />
        <div class="card-body">
            <h3 class="card-title">BrawlStars+</h3>
            <h5 class="card-title">Picker and CounterPicker</h5>
            <p class="card-text">
                A tool that is based on the statistics of matches of the power league allows you to determine the best
                brawler for the match.
            </p>
            <a href="#/app" class="btn btn-primary w-100">Try</a>
        </div>
    </div>

    <div class="card mb-3">
        <img
            src="images/discord.png"
            height="200"
            class="card-img-top object-fit-contain"
            alt="Discord BrawlStars+"
        />

        <div class="card-body">
            <a href="https://discord.gg/KdSPNhg6CB" target="_blank" class="btn btn-primary w-100">Join us on Discord</a>
        </div>
    </div>
    
    <div class="card mb-3">
        <div class="card-body">
            <h3 class="card-title">Match Statistics</h3>
            <p class="card-text">
                Statistics on matches about each hero both separately and against each other.
            </p>
            <div v-for="map in +(maps.length / 3).toFixed(0)" class="card-group my-3">
                <div v-show="(map - 1) * 3 + (i - 1) < maps.length" v-for="i in 3" class="card">
                    <img
                        :src="'images/maps/' + maps[(map - 1) * 3 + (i - 1)] + '.webp'"
                        class="card-img-top"
                        :alt="maps[(map - 1) * 3 + (i - 1)]"
                    />
                    <div class="card-body">
                        <a :href="'#/map/' + maps[(map - 1) * 3 + (i - 1)]" class="btn btn-primary w-100">{{maps[(map - 1) * 3 + (i - 1)]}}</a>
                    </div>
                </div>
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
