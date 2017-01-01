var gulp 		= require('gulp'),
	browserSync = require('browser-sync'),
	reload 		= browserSync.reload;

var filepaths = {
	jinja	: 'jinja_templates/*.html',
	css 	: 'static/css/*.css',
	js 		: 'static/js/*.js',
	angular : 'app/**/*.js',
	app_configuration: 'app.yaml'
}

gulp.task('default',function() {
	console.log('default task running');
});

gulp.task('reload:onsave', [], function() {

	browserSync.init({
    	proxy: "localhost:8080"
    });

	gulp.watch(filepaths.jinja, []).on('change', reload); 
	gulp.watch(filepaths.css, []).on('change', reload); 
	gulp.watch(filepaths.js, []).on('change', reload); 
	gulp.watch(filepaths.angular, []).on('change', reload); 
	gulp.watch(filepaths.app_configuration, []);
});




