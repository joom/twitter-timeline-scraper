Timeline = {
	onLoad: function(e) {
		var onRender = new CustomEvent("onTimelineRender", {
			detail: {
				timeline: e.target
			}
		});
		document.dispatchEvent(onRender);
	},
	serialize: function(target) {
		var tDoc = target.contentWindow.document;

		var timeline = tDoc.querySelectorAll('[data-scribe="page:timeline"]');

		var headerTitle = tDoc.querySelectorAll('[data-scribe="section:header"] [data-scribe="element:title"]');

		var tweets = Array.prototype.slice.call(tDoc.querySelectorAll('[data-scribe="component:tweet"]'));

		return tweets.map(function(tweet) {
			var time = tweet.querySelectorAll('[data-scribe="element:mini_timestamp"]')[0].getAttribute('data-datetime');
			var avatar = tweet.querySelectorAll('[data-scribe="element:avatar"]')[0];

			var stats = tweet.querySelectorAll('[data-scribe="component:stats"]');
			var rt, fav;
			rt = fav = 0;
			if(stats.length > 0) {
				stats = stats[0];
				var rtCount = stats.querySelectorAll('[data-scribe="element:retweet_count"] strong');
				if(rtCount.length > 0) {
					rt = rtCount[0].innerText;
				}
				var favCount = stats.querySelectorAll('[data-scribe="element:favorite_count"] strong');
				if(favCount.length > 0) {
					fav = favCount[0].innerText;
				}
			}
		 	
			return {
				id: tweet.getAttribute('data-rendered-tweet-id'),
				user: {
					name: tweet.querySelectorAll('[data-scribe="element:name"]')[0].innerText,
					username: tweet.querySelectorAll('[data-scribe="element:screen_name"] b')[0].innerText,
					avatar: {
						x1: avatar.getAttribute('src'),
						x2: avatar.getAttribute('data-src-2x')
					}
				},
				text: tweet.querySelectorAll('.e-entry-title')[0].innerText,
				time: new Date(time),
				stats: {
					rt: parseInt(rt),
					fav: parseInt(fav)
				},
				retweeted: !!tweet.querySelectorAll('.retweet-credit').length,
				photo: !!tweet.querySelectorAll('.ic-pho').length,
				playable: !!tweet.querySelectorAll('.ic-pla').length
			};
		});
	}
};