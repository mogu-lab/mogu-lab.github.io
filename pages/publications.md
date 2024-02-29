---
layout: page
title: Publications
permalink: /publications/
weight: 3
years: [2023, 2022, 2020, 2019]
---

# **Publications**


<div class="publications">
{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}
</div>


<br/>

