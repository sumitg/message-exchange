(function($) {
	
	window.HomeView = Backbone.View.extend({

		initialize : function() {
			console.log('Initializing Home View');
			_.bindAll(this, 'render', 'appendItem');
			this.template = _.template(tpl.get('home'));
			this.model.bind('add', this.appendItem);
		},

		render : function(eventName) {
			$(this.el).html(this.template());
		    for ( var int = 0; int < this.model.length; int++) {
				this.appendItem(this.model.at(int));
			}
		    return this;
		},

		appendItem : function(message) {
			$('tbody', this.el).append("<tr><td>"+message.get("timestamp")+"</td><td>"+message.get("request")+"</td><td>" + message.get("response")+ "</td></tr>");
		}
	});
})(jQuery);
