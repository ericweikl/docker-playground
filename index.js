"use strict";

Terminal.bindKeys = function() {};
Terminal.cursorBlink = false;
var terminal = new Terminal(100, 30);
terminal.open();

var process = function(events) {
  var e, duration, stop = false, listener;
  while (!stop && events.length > 0) {
    e = events.shift();
    switch (e.act) {
      case "WRITE":
        terminal.write(e.data);
        break;
      case "ECHO":
        terminal.write(e.data.slice(0, 1));
        if (e.data.length > 0) {
          events.unshift({act: "ECHO", data: e.data.slice(1)})
          setTimeout(function() { process(events); }, 30 + Math.random() * 180);
          stop = true;
        }
        break;
      case "PAUSE":
        duration = e.duration * 1000;
        if (duration > 10) {
          setTimeout(function() { process(events); }, duration);
          stop = true;
        }
        break;
      case "PROMPT":
        listener = function(ev) {
          if (ev.keyCode === 13 || ev.keyCode === 34) {
            document.removeEventListener('keydown', listener);
            setTimeout(function() { process(events); }, 200);
          }
          ev.stopPropagation();
        }
        document.addEventListener('keydown', listener);
        stop = true;
        break;
      case "CLOSE":
        break;
    }
  }
}

var xhr = new XMLHttpRequest();

xhr.onload = function() {
  var obj = JSON.parse(this.responseText);
  process(obj.events);
};

xhr.open("get", "session.pias");
xhr.send();
