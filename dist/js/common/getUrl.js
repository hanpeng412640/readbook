define(function(){return function(r){var n=location.search.substr(1).split("&"),s="";return n.map(function(n,t){var i=n.split("=")[0];r==i&&(s=n.split("=")[1])}),s}});