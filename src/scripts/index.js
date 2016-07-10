(function(){
	var rssChannelList = 
	[
		{channelName: "Netflix",channelUrl:"http://techblog.netflix.com/feeds/posts/default?alt=rss"},
		{channelName: "AirBNB", channelUrl:"http://nerds.airbnb.com/code/feed/"},
		{channelName: "Google", channelUrl:"http://feeds.feedburner.com/GDBcode"},
		{channelName: "Square", channelUrl:"http://feeds.feedburner.com/corner-squareup-com"},
		{channelName: "Facebook", channelUrl:"https://code.facebook.com/posts/rss"},
		{channelName: "Twitter",channelUrl:"https://blog.twitter.com/api/blog.rss?name=engineering"},
		{channelName: "Medium", channelUrl:"https://medium.com/feed/medium-eng"},
		{channelName: "Dropbox", channelUrl:"https://blogs.dropbox.com/tech/feed/"},
		{channelName: "ACM", channelUrl:"http://queue.acm.org/rss/feeds/queuecontent.xml"},
	];

	var rssChannelItemList = 
	[

	]
	google.load("feeds", "1");

	var app=angular.module("rssFeeds",["ngMaterial","ngMessages","ngSanitize"]);
	app.controller("mainPageController", function(){
		var self = this;
		this.rssChannelList = rssChannelList;
		this.rssChannelItemList = rssChannelItemList;

		this.channelClick = function(channel){
			var feed = new google.feeds.Feed(channel.channelUrl);
			feed.load(function(result) {
				if (!result.error) {
					self.rssChannelItemList = [];
					self.rssChannelItemList = result.feed.entries;
				}
			});
		}

	});

	//Directive for displaying a channel item's snippet view
	app.directive("itemSnippet", function(){
		return {
			restrict : 'E',
			templateUrl : './src/itemSnippetView.html',
			link: function(scope){
				scope.isHovered = false;
				scope.hoverIn = function() {
					scope.isHovered = true;
				};

				scope.hoverOut = function() {
					scope.isHovered = false;
				};
			},
			scope : {
				item:"=src"
			}
		}
	});
})();
