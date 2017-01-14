angular.module('dashboard').component('overview', {

    templateUrl: "/templates/dashboard/overview/main.html",

    bindings: {
        currentPage: '<',
        data: '=',
        graphDate: '='
    },

    controller: function ($timeout, Pages, $rootScope) {

        var self = this;
        
        self.graphDate = 'last_seven_days';

        var updateGraph = function () {

            self.graphData = [
                { key: "New Subscribers", bar: true, color: "#27cebc", values: [] },
                { key: "Total Subscriptions", color: "#000000", values: [] }
            ];

            var maxPlus  = 0;
            var maxTotal = 0;
            angular.forEach(self.data.subscription_timeline.dates, function (value, date) {
                self.graphData[0].values.push([date, value.plus]);
                self.graphData[1].values.push([date, value.total]);

                angular.forEach(self.graphData[0].values, function (point) {
                    maxPlus = Math.max(maxPlus, point[1]);
                });

                angular.forEach(self.graphData[1].values, function (point) {
                    maxTotal = Math.max(maxPlus, point[1]);
                });
            });

            maxPlus  = Math.ceil((maxPlus || 20) / 10) * 10;
            maxTotal = Math.ceil((maxTotal || 100) / 25) * 25;


            self.graphOptions = {
                chart: {
                    type: 'linePlusBarChart',
                    x: function (d, i) {
                        return i;
                    },
                    y: function (d, i) {
                        return d[1];
                    },
                    margin: {
                        top: 15,
                        bottom: 15,
                        left: 20
                    },
                    xAxis: {
                        tickFormat: function (d) {
                            var dx = self.graphData[0].values[d] && self.graphData[0].values[d][0] || 0;
                            return d3.time.format('%b %d')(new Date(dx));
                        }
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
        };

        var sections = ["#quick-access", "#subscriptions", "#subscriber-count", "#message-count", "#click-count"];

        self.refreshOthers = function (current) {
            angular.forEach(sections, function (section) {
                if (section != current) {
                    $(section).portlet({ refresh: true });
                }
            });
        };

        var done = 0;

        self.refreshSection = function () {
            if (++done != 5) {
                return;
            }
            done = 0;
            Pages.one($rootScope.page.id).customGET('stats', { graph_date: self.graphDate }).then(function (data) {
                self.data = data;
                updateGraph();
                angular.forEach(sections, function (section) {
                    $(section).portlet({ refresh: false });
                });
            });
        };

        self.refreshAll = function () {
            self.refreshOthers();
        };

        self.formattedDate = function () {
            switch (self.graphDate) {
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

});
