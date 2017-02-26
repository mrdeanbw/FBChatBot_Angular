class OverviewController {
    constructor() {
        'ngInject';

        this.graphDate = 'last_seven_days';
        this.sections = ["#subscriptions", "#subscriber-count", "#message-count", "#click-count"];
        this.refreshedSectionCount = 0;
        this.$onInit = () => this._updateGraph();
    }

    _updateGraph() {
        this.graphData = [
            {key: "New Subscribers", bar: true, color: "#27cebc", values: []},
            {key: "Total Subscriptions", color: "#8381eb", values: []}
        ];

        let maxPlus = 0;
        let maxTotal = 0;

        angular.forEach(this.data.subscription_timeline.dates,
            (value, date) => {
                this.graphData[0].values.push([date, value.plus]);
                this.graphData[1].values.push([date, value.total]);
                angular.forEach(this.graphData[0].values, point => maxPlus = Math.max(maxPlus, point[1]));
                angular.forEach(this.graphData[1].values, point => maxTotal = Math.max(maxPlus, point[1]));
            }
        );

        maxPlus = Math.ceil((maxPlus || 20) / 10) * 10;
        maxTotal = Math.ceil((maxTotal || 100) / 25) * 25;

        this.graphOptions = {
            chart: {
                type: 'linePlusBarChart',
                x: (d, i) => i,
                y: (d, i) => d[1],
                margin: {
                    top: 15,
                    bottom: 15,
                    left: 20
                },
                xAxis: {
                    tickFormat: d => {
                        let dx = this.graphData[0].values[d] && this.graphData[0].values[d][0] || 0;
                        return d3.time.format('%b %d')(new Date(dx));
                    },
                    tickValues: d3.range(0, this.graphData[0].values.length, 1)
                },
                y1Axis: {
                    tickFormat: d3.format('d')
                },
                y2Axis: {
                    tickFormat: d3.format('d')
                },
                xScale: d3.time.scale(),
                showLegend: true,
                showXAxis: true,
                showYAxis: true,
                useInteractiveGuideline: true,
                bars: { // for bar chart
                    forceY: [0, maxPlus],
                    // yDomain: [0,1],
                    // yRange: [0,10]
                },
                lines: { // for line chart
                    forceY: [0, maxTotal],
                    // yDomain: [0,1],
                    // yRange: [0,10]
                }
            }
        };
    }


    refreshAllSectionsExceptForOne(exception) {
        angular.forEach(this.sections, section => {
            if (section != exception) {
                $(section).portlet({refresh: true});
            }
        });
    }

    refreshSection() {
        if (++this.refreshedSectionCount != this.sections.length) {
            return;
        }
        this.refreshedSectionCount = 0;
        this.bot.customGET('stats', {graph_date: this.graphDate}).then(
            data => {
                this.data = data;
                this._updateGraph();
                angular.forEach(this.sections, section => $(section).portlet({refresh: false}));
            }
        );
    }

    refreshAll() {
        this.refreshAllSectionsExceptForOne();
    }

    readableDate() {
        switch (this.graphDate) {
            case 'last_seven_days':
                return "Last 7 Days";
            case 'last_thirty_days':
                return "Last 30 Days";
            case 'this_month':
                return "This Month";
            case 'last_month':
                return "Last Month";
            default:
                return "";
        }
    };

}

export default{
    templateUrl: 'dashboard/overview/views/overview.html',
    bindings: {bot: '<', data: '<'},
    controller: OverviewController
}