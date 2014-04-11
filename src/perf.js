
timing = window.performance.timing;
perf = window.performance;

timers = {};
function startTimer(name){
  timers[name] = {start: perf.now(), end: -1};
}
function endTimer(name){
  if (timers[name]){
    timers[name].end = perf.now();
  }
}

startTimer('DOMComponentsLoaded');

function renderTimers(){
  var frag = document.createDocumentFragment();
  Object.keys(timers).forEach(function(name){
    var timer = timers[name];
    if (timer.end != -1){
      var li = document.createElement('li');
      li.textContent = name + ' ' + (Math.round((timer.end - timer.start) * 10)/10) + 'ms';
      frag.appendChild(li);
    }
  });
  document.getElementById('results').appendChild(frag.cloneNode(true));
}

setTimeout(function(){
  timers["Total"] = { end: timing.loadEventEnd, start: timing.navigationStart };
  timers["OnLoad"] = { end: timing.loadEventEnd, start: timing.loadEventStart };
  timers["DOMLoad"] = { end: timing.domComplete, start: timing.domLoading };
  renderTimers();
}, 500);
