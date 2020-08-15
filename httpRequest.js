"use strict";

function post(url, contentType, params, func) {
    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", contentType);

    //Call a function when the state changes.
    http.onreadystatechange = function () {
        if (func != null && http.readyState == 4 && http.status == 200) {
            //Calling a function from it"s name as a String
            window[func](http.responseText);
        }
    }

    http.send(params);
}