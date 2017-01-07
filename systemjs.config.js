/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/' // not being used, just for demonstration
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      'angular2/core': 'angular2/core/bundles/core.umd.js',
      'angular2/common': 'angular2/common/bundles/common.umd.js',
      'angular2/compiler': 'angular2/compiler/bundles/compiler.umd.js',
      'angular2/platform-browser': 'angular2/platform-browser/bundles/platform-browser.umd.js',
      'angular2/platform-browser-dynamic': 'angular2/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      'angular2/http': 'angular2/http/bundles/http.umd.js',
      'angular2/router': 'angular2/router/bundles/router.umd.js',
      'angular2/forms': 'angular2/forms/bundles/forms.umd.js',

      // other libraries
      'rxjs':                      'rxjs',
      // 'angular-in-memory-web-api': 'angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);