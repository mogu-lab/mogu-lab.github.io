// Adapted from https://observablehq.com/@aktraiser/radar-venn-loyalty

polygonCentroid = function (path) {
    let vertices = path.slice(0, path.length - 2).split(/(?=[LM])/).map(function(d){
	var pointsArray = d.slice(1, d.length).split(',');
	return [+pointsArray[0], +pointsArray[1]];
    });

    let a = 0, x = 0, y = 0, l = vertices.length;

    for (let i = 0; i < l; i++) {
	const s = i === l - 1 ? 0 : i + 1,
              v0 = vertices[i],
              v1 = vertices[s],
              f = (v0[0] * v1[1]) - (v1[0] * v0[1]);

	a += f;
	x += (v0[0] + v1[0]) * f;
	y += (v0[1] + v1[1]) * f;
    }

    const d = a * 3;

    return [x / d, y / d];
}


drawRadar = function(data, params) {
    const { height, width, margin, axisTick, vennRatio } = params;
    
    const axisName = [
	"Bayesian/Probabilistic Deep Learning",
	"Mental Health",
	"Patient/Clinician Interaction with AI",
    ];
    const venn = ["#FAA9B2", "#F8CD29", "#1D95BB"];
    
    const maxValue = 100;
    const angleSlice = Math.PI * 2 / 3;
    
    const lineStroke = "#201E1F";
    
    const svg = d3.create("svg")
	  .attr("width", "100%")
	  .attr("max-width", "620px")
	  .attr("height", "450px")
	  .attr("viewBox", [0, 0, width, height + (2 * margin)])
	  .style("border-radius", "12px")
    
    let placement =  {
	radius: (height - 2 * margin) / 2,
	xOffset: width / 2,
	yOffset: margin + (height / 2)
    };
    
    let rScale = d3.scaleLinear() 
	.domain([0, maxValue])
	.range([0, placement.radius])
    
    let radarLine = d3.lineRadial()
	.curve(d3.curveLinearClosed)
	.radius(d => rScale(d))
	.angle((d, i) => i * angleSlice)
    
    const axisGrid = svg.append("g")
	  .attr("class", "axisWrapper")
	  .attr('transform', `translate(${placement.xOffset}, ${placement.yOffset})`);
    
    // venn
    const vennRadius = (placement.radius / (axisTick * 2)) * axisTick * vennRatio;
    const transR = (placement.radius - vennRadius * 2) / 2;
    axisGrid.append("g")
	.attr("class", "venn")
	.selectAll("circle")
	.data(venn)
	.enter()
	.append("circle")
	.attr("cx", (d, i) => rScale(maxValue / 2) * Math.cos(angleSlice * i - Math.PI / 2))
	.attr("cy", (d, i) => rScale(maxValue / 2) * Math.sin(angleSlice * i - Math.PI / 2))
	.attr("r", vennRadius)
	.attr("fill", d => d)
	.attr("fill-opacity", 0.2)
	.attr("stroke", d => d)
	.attr("transform", (d, i) => 
            `translate(
              ${transR * Math.cos(angleSlice * i - Math.PI / 2)}, 
              ${transR * Math.sin(angleSlice * i - Math.PI / 2)})
            `)
    
    const tickData = new Array(axisTick)
	  .fill([])
	  .map((item, index) => {
	      let r = (maxValue / axisTick) * (index + 1);
	      return [r, r, r];
	  });
    
    // grid line
    axisGrid.append("g")
	.selectAll("g")
	.data(tickData)
	.enter().append("g")
	.attr("fill", "transparent")
	.attr("opacity", 0.3)
	.attr("stroke", lineStroke)
	.attr("stroke-dasharray", "5 5")
	.append("path")
	.attr("d", d => radarLine(d))
    
    // axis line
    let axisLine = axisGrid.selectAll(".axis-line")
	.data(axisName)
	.enter()
	.append("g")
	.attr("class", "axis-line");
    
    axisLine.append("line")
	.attr("x1", (d, i) => rScale(0) * Math.cos(angleSlice * i - Math.PI / 2))
	.attr("y1", (d, i) => rScale(0) * Math.sin(angleSlice * i - Math.PI / 2))
	.attr("x2", (d, i) => rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
	.attr("y2", (d, i) => rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
	.attr("stroke", lineStroke)
	.attr("opacity", 0.3);
    
    axisLine.append("circle")
	.attr("cx", (d, i) => rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
	.attr("cy", (d, i) => rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
	.attr("r", 3)
	.attr("stroke", "#201E1F");
    
    axisLine.append("text")
	.attr("x", (d, i) => rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
	.attr("y", (d, i) => rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
	.attr("dy", (d, i) => i > 0? 20: -10)
	.attr("text-anchor", "middle")
	.attr("fill", "rgba(32,30,31,1)")
	.style("font-size", 14)
	.text(d => d);
    
    const photoImgWidth = 48; 
    const shapeColor = "#CF141E";
    
    data().then(data => {
	// shape
	let shape = axisGrid.append("g")
	    .attr("class", "color-shape")
	    .append("path")
	    .attr("d", d => "M0,0L0,0L0,0Z")
	    .attr("stroke", shapeColor)
	    .attr("stroke-width", 2)
	    .attr("fill", shapeColor)
	    .attr("fill-opacity", 0.25);
	
	// photos
	const photoGroup = axisGrid.append("g")
	      .attr("class", "photo")
	      .selectAll("g")
	      .data(data.map(d => ({ ...d, center: polygonCentroid(radarLine(d.score)) })))
	      .enter()
              .append("g")
        
	const photos = photoGroup.append("image")
              .attr("x", (d) => d.center[0])
              .attr("y", (d) => d.center[1])
              .attr("xlink:href", d => d.photo)
              .attr("width", photoImgWidth)
              .attr("transform", `translate(${-photoImgWidth / 2}, ${-photoImgWidth / 2})`)
	
	const borders = photoGroup.append("circle")
              .attr("cx", (d) => d.center[0])
              .attr("cy", (d) => d.center[1])
              .attr("r", photoImgWidth / 2)
              .attr("fill", "none")
              .attr("stroke-width", 2)
              .attr("stroke", "#fff")

	photos.on("mouseenter", (curItem) => {
            borders
		.transition()
		.duration(1500) 
		.attr("stroke", (d) => curItem.photo === d.photo? "rgba(207,20,30,1)": "#fff");

            shape.datum(curItem)
		.transition()
		.duration(1500) 
		.attr("d", d => radarLine(d.score))
	})

    })

    return svg.node();
}

star = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Five-pointed_star.svg/800px-Five-pointed_star.svg.png";
triangle = "https://freepngimg.com/save/172344-triangle-silhouette-free-photo/2902x2172";

data = async () => ([
    { score: [0, 30, 70], description: "hola", photo: star },
    { score: [100, 10, 10], description: "hey", photo: triangle },
    { score: [0, 50, 50], description: "wassup", photo: star },
    { score: [2, 10, 100], description: "omg", photo: star },
    { score: [80, 30, 0], description: "hi", photo: star },
    { score: [100, 100, 1], description: "hello", photo: star }
]);


radar = drawRadar(data, { height: 450, width: 620, margin: 10, axisTick: 6, vennRatio: 1.3 });

d3.select('#research-directions').append(() => radar);
