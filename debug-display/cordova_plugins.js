cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/com.mtknn.tangova/www/tangova.js",
        "id": "com.mtknn.tangova.Tangova",
        "clobbers": [
            "Tangova"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-crosswalk-webview": "1.2.0",
    "com.mtknn.tangova": "0.0.2"
}
// BOTTOM OF METADATA
});