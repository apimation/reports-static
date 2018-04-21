$(document).ready(function() {
    var workerName = $(".worker-name");
    var workerContentContainer = $(".worker-content-container");

    workerName.on("click", function() {
        $(this).closest('.worker-container').find(workerContentContainer).toggle();
    });

    var variableHeader = $(".variable-header");
    var variableContainer = $(".variable-container");

    variableHeader.on("click", function() {
        variableContainer.toggle();
    });

    var failingCasesHeader = $(".failing-cases-header");
    var caseContainer = $(".case-container");

    failingCasesHeader.on("click", function() {
        caseContainer.toggle();
    });

    var reportCaseHeader = $(".report-case-header");
    var reportStepList = $(".report-step-list");

    reportCaseHeader.on("click", function() {
        $(this).closest('.report-case').find(reportStepList).toggle();
    });

    var headerSection = $(".header-section");
    var infoSection = $(".info-section");

    headerSection.on("click", function() {
        $(this).closest('.report-step').find(infoSection).toggle();
    });

    var assertTitle = $(".assert-title");
    var requestTitle = $(".request-title");
    var responseTitle = $(".response-title");
    var assertSection = $(".assert-section");
    var requestSection = $(".request-section");
    var responseSection = $(".response-section");

    assertTitle.on("click", function() {
        var assertParent = $(this).closest('.info-section');

        if (!assertParent.find(assertTitle).hasClass("active")) {
            assertParent.find(assertTitle).addClass("active");
            assertParent.find(requestTitle).removeClass("active");
            assertParent.find(responseTitle).removeClass("active"); 
            
            assertParent.find(assertSection).show();
            assertParent.find(requestSection).hide();
            assertParent.find(responseSection).hide();
        }
    });

    requestTitle.on("click", function() {
        var requestParent = $(this).closest('.info-section');

        if (!requestParent.find(requestTitle).hasClass("active")) {
            requestParent.find(assertTitle).removeClass("active");
            requestParent.find(requestTitle).addClass("active");
            requestParent.find(responseTitle).removeClass("active"); 
            
            requestParent.find(assertSection).hide();
            requestParent.find(requestSection).show();
            requestParent.find(responseSection).hide();
        }
    });

    responseTitle.on("click", function() {
        var responseParent = $(this).closest('.info-section');

        if (!responseParent.find(responseTitle).hasClass("active")) {
            responseParent.find(assertTitle).removeClass("active");
            responseParent.find(requestTitle).removeClass("active");
            responseParent.find(responseTitle).addClass("active"); 
            
            responseParent.find(assertSection).hide();
            responseParent.find(requestSection).hide();
            responseParent.find(responseSection).show();
        }
    });

    var performanceResultHeader = $(".performance-result-header");
    var performanceResultContainer = $(".performance-result-container");

    performanceResultHeader.on("click", function() {
        performanceResultContainer.toggle();
    });

    var rrmHeader = $(".rrm-header");
    var rrmContainer = $(".rrm-container");

    rrmHeader.on("click", function() {
        rrmContainer.toggle();
    });

    var data = {
        plotdata: '[[0,10,10],[0.01999991,NaN,20],[0.03999991,50,50],[0.05999991,20,NaN],[0.07999991,10,10],[0.09999991,NaN,3.264985],[0.11999991,NaN,2.248591],[0.13999991,NaN,6.746027],[0.1599999,NaN,3.378586],[0.1799999,NaN,2.878611],[0.19999991,NaN,5.70219],[0.21999991,NaN,5.362347],[0.2399999,NaN,5.198373],[0.2599999,NaN,5.720839],[0.2799999,NaN,2.680176],[0.29999992,NaN,3.170854],[0.3199999,NaN,4.261972],[0.3399999,NaN,6.299155],[0.35999992,NaN,2.481453],[0.3799999,NaN,5.496819],[0.39999992,NaN,5.008433],[0.4199999,NaN,4.849162],[0.4399999,NaN,6.20819],[0.45999992,NaN,3.908247],[0.4799999,NaN,4.175151],[0.4999999,NaN,4.845897],[0.5199999,NaN,4.461529],[0.5399999,NaN,1.88424],[0.5599999,NaN,5.658962],[0.5799999,NaN,4.439571],[0.5999999,NaN,5.027623],[0.6199999,NaN,1.299507],[0.6399999,NaN,1.76364],[0.6599999,NaN,2.372297],[0.6799999,NaN,4.432328],[0.6999999,NaN,3.755516],[0.7199999,NaN,4.776805],[0.7399999,NaN,2.779782],[0.75999993,NaN,6.635432],[0.7799999,NaN,4.30999],[0.7999999,NaN,5.189169],[0.81999993,NaN,5.838078],[0.8399999,NaN,3.245445],[0.8599999,NaN,5.9323],[0.87999994,NaN,2.597121],[0.8999999,NaN,4.406696],[0.9199999,NaN,6.777744],[0.93999994,NaN,3.608134],[0.9599999,NaN,5.860473],[0.9799999,NaN,2.593195],[0.9999999,NaN,4.289194],[1.0199999,NaN,4.521302],[1.04,NaN,4.923236],[1.06,NaN,4.965451],[1.0799999,NaN,2.630741],[1.0999999,NaN,1.920557],[1.1199999,NaN,6.484971],[1.1399999,NaN,2.604369],[1.16,NaN,5.520559],[1.18,NaN,1.986611],[1.1999999,NaN,4.617839],[1.2199999,NaN,4.231241]]'
    }

    var plotDataStr = data.plotdata;

    if (plotDataStr != "") {
        $('#rrm-graph-chart').show();
        plotDataStr = plotDataStr.replace(/NaN/g, '"NotANumber"');

        var plotdata = JSON.parse(plotDataStr);
        
        $.each(plotdata, function(index,data){
            $.each(data, function(innerIndex,innerVal){
                if (innerVal == "NotANumber") {
                    innerVal = NaN;
                    data[innerIndex] = innerVal;
                }
            });
            plotdata[index]=data;
        });
        
        var plot = new Dygraph(
            document.getElementById("rrm-graph-chart"),
            plotdata,
            {
                labels: [
                    'Seconds', 
                    'ERR', 
                    'OK'
                ],
                ylabel: 'Latency (ms)',
                xlabel: 'Seconds elapsed',
                showRoller: true,
                colors: [
                    '#FA7878', 
                    '#8AE234'
                ],
                legend: 'always',
                logscale: true,
                strokeWidth: 1.3
            }
        );
    }

    var pie = new d3pie("pieChart", {
        "size": {
            "canvasHeight": 270,
            "canvasWidth": 320,
            "pieOuterRadius": "100%"
        },
        "data": {
            "content": [
                {
                    "label": "200",
                    "value": 81
                },
                {
                    "label": "400",
                    "value": 19
                }
            ]
        },
        "labels": {
            "outer": {
                "pieDistance": 32
            },
            "mainLabel": {
                "fontSize": 11
            },
            "percentage": {
                "color": "#ffffff",
                "decimalPlaces": 0
            },
            "value": {
                "color": "#adadad",
                "fontSize": 11
            },
            "lines": {
                "enabled": true
            },
            "truncation": {
                "enabled": true
            }
        },
        "tooltips": {
            "enabled": true,
            "type": "placeholder",
            "string": "{label}: {value}, {percentage}%",
            "styles": {
                "fadeInSpeed": 112,
                "backgroundOpacity": 0.77
            }
        },
        "effects": {
            "pullOutSegmentOnClick": {
                "effect": "none"
            }
        },
        "misc": {
            "canvasPadding": {
                "top": 0,
                "right": 0,
                "bottom": 0,
                "left": 0
            }
        }
    });
}());