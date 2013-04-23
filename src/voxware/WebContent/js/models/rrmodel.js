window.ReqResp = Backbone.Model.extend({

	url : "reqresp",

	defaults : {
		request : "dummy",
        response : "none"
	}
});

window.ReqRespCollection = Backbone.Collection.extend({
	url : "reqresp",
	model : ReqResp,
                                                      
  save: function(){
  Backbone.sync('save', this, {
                success: function(){
                console.log('messages saved!');
                }
                });
  }
});