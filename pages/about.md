---
layout: page
title: About
permalink: /about/
weight: 1
---

# **About**

<center>
<style>
.photo image {

}
</style>
<div id="research-directions"></div>
<script src="{{ '/assets/js/research-directions.js' | relative_url }}"></script>
<script>

data = async () => ([
    { score: [40, 40, 40], description: "what", photo: "{{ '/assets/img/venn/ALL-problem.png' | relative_url }}" },
    { score: [100, 10, 10], description: "hey", photo: "{{ '/assets/img/venn/DBL-problem.png' | relative_url }}" },
    { score: [10, 10, 100], description: "wassup", photo: "{{ '/assets/img/venn/HCI-problem.png' | relative_url }}" },
    { score: [10, 100, 10], description: "omg", photo: "{{ '/assets/img/venn/MH-problem.png' | relative_url }}" },
    { score: [100, 0, 100], description: "hi", photo: "{{ '/assets/img/venn/DBL-HCI-problem.png' | relative_url }}" },
    { score: [100, 100, 0], description: "hello", photo: "{{ '/assets/img/venn/DBL-MH-problem.png' | relative_url }}" },
    { score: [0, 100, 100], description: "hello", photo: "{{ '/assets/img/venn/HCI-MH-problem.png' | relative_url }}" },
]);


radar = drawRadar(data, { height: 450, width: 620, margin: 10, axisTick: 5, vennRatio: 1.2 });

d3.select('#research-directions').append(() => radar);

</script>
</center>


