window.Message = Backbone.Model.extend({

	url : "data",

	defaults : {
		id : null,
        timestamp : null,
		request : "dummy",
        response : "none"
	}
});

window.MessageCollection = Backbone.Collection.extend({
	url : "data",
	model : Message,
                                                      
});