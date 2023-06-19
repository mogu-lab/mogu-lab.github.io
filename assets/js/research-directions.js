var sets = [
    {
	"sets": [0],
	"label": "Mental Health",
	"size": 100,
	"description": "How do we build expressive models that are transparent about the assumptions they make?",
    },
    {
	"sets": [1],
	"label": "Clinician/Patient Interaction with AI",
	"size": 100,
	"description": "wow",
    },
    {
	"sets": [2],
	"label": "Bayesian/Probabilistic Deep Learning",
	"size": 100,
	"description": "wow",
    },
    {
	"sets": [0, 1],
	"label": "Hi",
	"size": 30,
	"description": "wow",
    },
    {
	"sets": [0, 2],
	"size": 30,
	"description": "wow",
    },
    {
	"sets": [1, 2],
	"size": 30,
	"description": "wow",
    },
    {
	"sets": [0, 1, 2],
	"size": 15,
	"description": "wow",
    },
];

var chart = venn.VennDiagram()
    .width(450)
    .height(450);

var div = d3.select("#venn")
div.datum(sets).call(chart);

var tooltip = d3.select("body").append("div")
    .attr("class", "venntooltip");

div.selectAll("path")
    .style("stroke-opacity", 0)
    .style("stroke", "#fff")
    .style("stroke-width", 3)

div.selectAll("g")
    .on("mouseover", function(d, i) {
        // Sort all the areas relative to the current item
        venn.sortAreas(div, d);

        // Display a tooltip 
        tooltip.transition().duration(100).style("opacity", .9);
        tooltip.text(d.description);

        // Highlight the current path
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
            .style("stroke-opacity", 1);
    })

    .on("mousemove", function() {
        tooltip.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })

    .on("mouseout", function(d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
            .style("stroke-opacity", 0);
    });
