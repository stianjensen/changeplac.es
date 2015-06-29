function parseURL(url) {
    var path = url.match(/.*\/([0-9]+)\/?.*/);
    if (path) {
        return +path[1];
    } else {
        return 300;
    }
}

(function(){
    var change_places_sound = document.getElementById('change_places_sound');
    var interval = parseURL(window.location.href);
    var change_label = document.getElementById('changeplaceholder');
    var time_label = document.getElementById('timeplaceholder');
    var title_tag = document.getElementsByTagName('title')[0];
    var end_time = Date.now() + interval * 1000;
    setInterval(function(){
        var delta = Math.round((end_time - Date.now()) / 1000);
        time_label.textContent = delta;
        title_tag.textContent = delta + " – Change plac.es";
        if (delta <= 0) {
            end_time = Date.now() + interval * 1000;
            change_places_sound.currentTime = 0;
            change_places_sound.play();
            title_tag.textContent = change_label.textContent = 'Chaaaaange places';
            if (settings.get('alertsEnabled')) {
                alert('Change places!');
            }
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
