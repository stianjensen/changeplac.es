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
    var end_time = Date.now() + interval * 1000;
    setInterval(function(){
        var delta = Math.round((end_time - Date.now()) / 1000);
        time_label.innerText = delta;
        if (delta <= 0) {
            end_time = Date.now() + interval * 1000;
            change_places_sound.currentTime = 0;
            change_places_sound.play();
            change_label.innerText = 'Chaaaaange places';
            setTimeout(function(){
                change_label.innerText = "";
            }, 6000);
        }
    }, 1000);
})();
