---
layout: page
title: People
permalink: /people
weight: 5
---


<div class="people">

{% for s in site.data.people %}
  <h1><strong>{{ s.section }}</strong></h1>

  <div class="card-columns">
    {% for p in s.members %}
    <div class="card border-0">

      <picture>
  	<source srcset="{{ p.image | replace: '.png', '.webp' }}" type="image/webp">
        <img class="card-img-top" src="{{ p.image }}" alt="Portrait of {{ p.name }}">
      </picture>

      <div class="card-body" style="padding: 0px;">
        <center>
        <h5 class="card-title">
	  {% if p.site %}	  
	  <a href='{{ p.site }}' target='_blank'>{{ p.name }}</a>
	  {% else %}
	  <a href='#'>{{ p.name }}</a>
	  {% endif %}
	  {% if p.pronouns %}
	  <br/>	  
	  <h6 class="text-muted">({{ p.pronouns }})</h6>
	  {% endif %}	  
	</h5>
	<div class="card-footer bg-transparent">
          <h6 class="text-muted">{{ p.title }}</h6>
          <div class="text-muted">{{ p.affiliation }}</div>
	  {% if p.coadvisor %}
          <div class="text-muted"><i>*Co-advised by {{ p.coadvisor }}</i></div>
	  {% endif %}	  
        </div>
	</center>	
      </div>
    </div>
    {% endfor %}
  </div>
{% endfor %}

</div>

<br/>
