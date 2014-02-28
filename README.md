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
In order to get the the serialized object, you need to call Timeline.serialize, and pass the iframe created by the embedded timeline as a parameter to that function. If you don't want to deal with that, adding an event to listen for onTimelineRender should work better for you:
```javascript
document.addEventListener('onTimelineRender', function(e) {
	var data = Timeline.serialize(e.detail.timeline);
	console.log(data);
});
```
You can see the example.html file to see how it is used.

Example output is in this format:
```json
{
    "id": "439123783694028800",
    "user": {
        "name": "Alex Sexton",
        "username": "SlexAxton",
        "avatar": {
            "x1": "https://pbs.twimg.com/profile_images/378800000335373005/bfe543e85a3f28e646543a14208a865a_normal.jpeg",
            "x2": "https://pbs.twimg.com/profile_images/378800000335373005/bfe543e85a3f28e646543a14208a865a_bigger.jpeg"
        }
    },
    "text": "JavaScript: The Good Farts.\n\n(I've been holding on to this tweet for 22 months)",
    "time": "2014-02-27T19:44:03.000Z",
    "stats": {
        "rt": 51,
        "fav": 46
    },
    "retweeted": true,
    "photo": false,
    "playable": false
}
```