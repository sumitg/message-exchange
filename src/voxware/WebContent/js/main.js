var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "settings":"settings",

    },

    initialize:function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);

        // Close the search dropdown on click anywhere in the UI
        $('body').click(function () {
            $('.dropdown').removeClass("open");
        });
    },

    home:function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!this.homeView) {
            var messageCollection = new MessageCollection();
//                                       setInterval(function () {
                                                   messageCollection.fetch({success: function() {
                                                                           console.log("fetched " + messageCollection.length + " messages successfully!");
                                                                           this.homeView = new HomeView({model: messageCollection}).render();
                                                                           $('#content').html(this.homeView.el);
                                                                           }});
                                       

//                                                   }, 5000);

        }
        // Since the quick links view never changes, we instantiate it and render it only once
        if (!this.quickLinksView) {
            this.quickLinksView = new QuickLinksView();
            this.quickLinksView.render();
        }
        $('#quicklinks').html(this.quickLinksView.el);

    },
                                       
   settings:function () {
   if (!this.settingsView) {
      var rrCollection = new ReqRespCollection();
      this.settingsView = new SettingsView({model: rrCollection}).render();
   }
   $('#content').html(this.settingsView.el);
   if (!this.quickLinksView) {
   this.quickLinksView = new QuickLinksView();
   this.quickLinksView.render();
   }
   $('#quicklinks').html(this.quickLinksView.el);
   }
                                       
                                       
});

tpl.loadTemplates(['home', 'header', 'quicklinks', 'settings'],
    function () {
        app = new AppRouter();
        Backbone.history.start();
    });