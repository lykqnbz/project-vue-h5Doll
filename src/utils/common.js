(function(window, document, undefined) {
    "use strict";

    window.commonControl  = {
       getCookie:function(cookie_name){
         var data=[];
         if(window.localStorage.getItem(cookie_name)){
           data=JSON.parse(window.localStorage.getItem(cookie_name));
         }
         return data;
       },
      getDateYMD: function (AddDayCount) {
        var d, s;
        d = new Date();
        d.setDate(d.getDate() + AddDayCount);
        s = d.getFullYear() + "-";

        s += (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
        s += (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());

        return (s);
      },

    };
})(window, document);



