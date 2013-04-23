window.HeaderView = Backbone.View.extend({

    initialize:function () {
        this.template = _.template(tpl.get('header'));
    },

    render:function (eventName) {
        $(this.el).html(this.template());
//        $('.navbar-search', this.el).append(this.searchresultsView.render().el);
        return this;
    },

    events:{
        "keyup .search-query":"search"
    },

    search:function (event) {
//        var key = event.target.value;
        var key = $('#searchText').val();
        console.log('search ' + key);
        this.searchResults.findByName(key);
        setTimeout(function () {
            $('#searchForm').addClass('open');
        });
    }

});