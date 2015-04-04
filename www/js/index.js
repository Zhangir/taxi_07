/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
$(document).ready(function () {
    var all,
        randomed;
    
    all = generateAll();
    randomed = generateRandomed(all);
    
    $("#generator").on("click", function (evt) {
        evt.preventDefault();
        randomed = doNext(all, randomed);
    });
});

function generateAll() {
    // Generates the array of "all" divs to work on
    var a = [];
    var divs = $(".hide > div.lightbox");
    for (var i = 1; i <= divs.length; i++) {
        a.push(i);
    }
    console.log("List of divs available to toggle: " + a);
    return a;
}

function generateRandomed(all) {
    // Randomizes the original array
    randomed = fisherYates(all);
    console.log("Setting randomized array: " + randomed);
    return randomed;
}

function doNext(all, randomed) {
    $(".lightbox, #last-div").hide();
    
    if (randomed.length < 1) {
        console.log("All lightboxes toggled, showing last, then starting over");
        $("#last-div").show();
        randomed = generateRandomed(all);
    } else {
        var next = randomed.shift();
        var selector = "#lightbox" + next;
        console.log("Showing " + selector);
        $(selector).show();
        console.log("What's left: " + randomed);
    }
    
    return randomed;
}

// Randomizes an array and returns the new one (doesn't modify original)
function fisherYates ( myArray ) {
  var return_arr = myArray.slice(0);
  var i = return_arr.length;
  if ( i == 0 ) return false;
  while ( --i ) {
     var j = Math.floor( Math.random() * ( i + 1 ) );
     var tempi = return_arr[i];
     var tempj = return_arr[j];
     return_arr[i] = tempj;
     return_arr[j] = tempi;
  }
  return return_arr;
}

//]]>  
