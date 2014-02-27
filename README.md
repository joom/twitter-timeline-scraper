twitter-timeline-scraper
========================

JavaScript scraper for Twitter embedded timelines.

When you copy and paste the code you get from Twitter, you have to replace this:
```html
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

```
... with this, in order to have an onTimelineRender event:
```html
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";js.setAttribute('onload', "twttr.events.bind('rendered',function(e) {Timeline.onLoad(e)});");fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

```

You can see the example.html file to see how it is used.