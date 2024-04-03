---
layout: page
title: Research
permalink: /research
weight: 2
remote_projects: 
  - git-for-wizards
  - arduino-visitor-counter
---

# **Research**

Our research is focused on developing **new machine learning methods** to help us better **understand, predict and prevent suicide** and related behaviors. For **effective** and **responsible** uses of our methods in this domain, they must satisfy several desiderata:

1. **Transparency and Uncertainty:** Our methods must make their assumptions explicit so that they can be questioned and revised when the method does not meet its needs. Our methods must also provide some notion of “uncertainty” corresponding to the limits of their “knowledge.” To satisfy this desiderata, we often take a probabilistic/Bayesian approach.

2. **Faithfulness:** For our modeling assumptions to be reasonable and our uncertainty to be useful downstream, our methods must be grounded in domain expertise. We therefore adopt a collaborative approach that actively involves domain experts throughout model and inference development. This ensure that our models and inference techniques accurately reflect the nuances and complexities of the domain.

3. **Socio-technical System:** Developing principled methods that are grounded in domain expertise is not enough without understanding how these systems would be used in *context*. As such, it is important to us to understand the needs, constraints, and challenges faced by our end-users and stakeholders. By considering this broader sociotechnical context, we hope to anticipate potential pitfalls – whether ethical, social, cultural, etc. – and to address them proactively. 

Our research therefore lies in the various **intersections** of these three areas: 
* Deep Bayesian and Probabilistic Machine Learning
* Clinical Psychology
* Clinician/Patient-AI Interaction


<!-- <img src="/assets/img/research-interests.svg" /> -->

<br/>


<!--
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


# **Projects**

{% include research/index.html %}
-->