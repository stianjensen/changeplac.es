(function(window) {
    var settings = JSON.parse(window.localStorage.settings || "{}");

    window.settings = {
        set: function(key, value) {
            settings[key] = value;
            window.localStorage.settings = JSON.stringify(settings);
        },
        get: function(key) {
            return settings[key];
        }
    };
})(window);
