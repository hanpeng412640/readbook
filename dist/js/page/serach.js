define(["jquery","template"],function(r,s){var c=window.localStorage,n=JSON.parse(c.getItem("searcharr"))||[];r.ajax({url:"/book/searchkey",dataType:"json",success:function(e){s(r(".searchtext").html(),e,r(".searchresult"));e.ads.concat(n)}}),r(".search-btn").on("click",function(){var a=r.trim(r(this).prev().val());r.ajax({url:"/book/search",data:{title:a},dataType:"json",success:function(e){var t=e.items.filter(function(e,t){return new RegExp(a,"g").test(e.title)});t.length&&(n.push({ad_name:a}),c.setItem("searcharr",JSON.stringify(n))),console.log(t),r(".searchresult").html(""),s(r(".searchlist").html(),{items:t},r(".searchresult"))}})}),r(".back").on("click",function(){location.href="/"})});