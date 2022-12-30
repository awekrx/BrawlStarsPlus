const Cell = {
    props: ["data"],
    template: `
<div style="width: 200px">{{data.brawler}}</div>
<div
    :class="+(data.data[data.brawler].TOTAL.total / data.data.TOTAL * 100).toFixed(2) > 2 ? 'text-success' : 'text-danger'"
>
    {{(data.data[data.brawler].TOTAL.total / data.data.TOTAL * 100).toFixed(2)}}%
</div>
<div
    :class="+(data.data[data.brawler].TOTAL.win / (data.data[data.brawler].TOTAL.total - data.data[data.brawler].TOTAL.draw) * 100).toFixed(2) > 50 ? 'text-success' : 'text-danger'"
>
    {{+(data.data[data.brawler].TOTAL.win / (data.data[data.brawler].TOTAL.total - data.data[data.brawler].TOTAL.draw) * 100).toFixed(2) ?
    +(data.data[data.brawler].TOTAL.win / (data.data[data.brawler].TOTAL.total - data.data[data.brawler].TOTAL.draw) * 100).toFixed(2) : 0}}%
</div>
<div>
    <span>{{data.data[data.brawler].TOTAL.total}}</span>
    <span>/</span>
    <span class="text-success">{{data.data[data.brawler].TOTAL.win}}</span>
    <span>/</span>
    <span class="text-danger">{{data.data[data.brawler].TOTAL.lose}}</span>
    <span>/</span>
    <span class="text-muted">{{data.data[data.brawler].TOTAL.draw}}</span>
</div>
`,
};
