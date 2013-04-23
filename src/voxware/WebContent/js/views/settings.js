 (function($) {
  
  window.SettingsView = Backbone.View.extend({
                                                          
  events : {
  'click button#add' : 'addItem'
  },
  
  initialize : function() {
  console.log('Initializing Settings View');
  _.bindAll(this, 'render', 'appendItem', 'addItem');
  this.template = _.template(tpl.get('settings'));
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
  $('tbody', this.el).append("<tr><td>"+message.get("request")+"</td><td>"+message.get("response")+"</td></tr>");
  },
  
  addItem : function() {
  var rr = new ReqResp();
  rr.set({
          request : document.getElementById('request').value,
          response : document.getElementById('response').value
          });
  this.model.add(rr);
  Backbone.sync("update", this.model, null);
  }
  });
  })(jQuery);