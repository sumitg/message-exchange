window.QuickLinksView = Backbone.View.extend({

	initialize : function() {
		console.log('Initializing Quick Links View');
		this.template = _.template(tpl.get('quicklinks'));
	},

	render : function(eventName) {
		$(this.el).html(this.template());
		return this;
	},

});