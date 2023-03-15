function parseURL(url) {
  var path = url.slice(1).split('/').filter(function(item) {
    return !!item;
  });
  if (path.length > 0) {
    return path.map(parseTime);
  } else {
    return [300];
  }
}

function parseTime(time) {
  if (isNaN(time)) {
    var re = /(?:(\d{1,2})h)?(?:(\d{1,2})m)?(?:(\d{1,2})s)?/;
    var result = re.exec(time);
    return (3600 * (+result[1] || 0)) +
      (60 * (+result[2] || 0)) +
      (+result[3] || 0);
  } else {
    return +time;
  }
}

function formatTime(time) {
  var seconds = time % 60;
  var minutes = ((time % 3600) / 60) | 0;
  var hours = (time / 3600) | 0;
  var output = '';
  if (hours > 0) {
    output += hours + 'h';
  }
  if (minutes > 0) {
    output += minutes + 'm';
  }
  if (seconds > 0) {
    output += seconds + 's';
  }
  return output || '0';
}

(function(){
  var change_places_sound = document.getElementById('change_places_sound');
  var change_label = document.getElementById('changeplaceholder');
  var time_label = document.getElementById('timeplaceholder');
  var title_tag = document.getElementsByTagName('title')[0];

  var interval = parseURL(window.location.hash);
  var counter = 0;
  var end_time = Date.now() + interval[counter] * 1000;
  setInterval(function(){
    var delta = Math.round((end_time - Date.now()) / 1000);
    if (delta < 0) {
      delta = 0;
    }
    time_label.textContent = formatTime(delta);
    title_tag.textContent = formatTime(delta) + " – Change plac.es";
    if (delta <= 0) {
      counter = (counter + 1) % interval.length;
      change_places_sound.currentTime = 0;
      change_places_sound.play();
      title_tag.textContent = change_label.textContent = 'Chaaaaange places';
      if (settings.get('alertsEnabled')) {
        alert('Change places!');
      }
      end_time = Date.now() + interval[counter] * 1000;
      setTimeout(function(){
        change_label.textContent = "";
      }, 6000);
    }
  }, 1000);

  var alertsEnabledControl = document.getElementById('alerts-enabled');
  if (settings.get('alertsEnabled')) {
    alertsEnabledControl.checked = true;
  }
  alertsEnabledControl.addEventListener('change', function(e) {
    settings.set('alertsEnabled', alertsEnabledControl.checked);
  });
})();
