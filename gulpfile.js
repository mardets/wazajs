//Load all the required objects which will be used by
//all the functions exposed
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var browserify = require('browserify');
var watchify = require('watchify');
//var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var serve   = require('browser-sync');
var merge         = require('merge-stream');
var sync = require('run-sequence');
var browser = require('browser-sync');
//var stylus = require('gulp-stylus');
var templateCache = require('gulp-template-cache');
var path = require('path');
var yargs = require('yargs');
var template = require('gulp-template');
var rename = require('gulp-rename');

var src = './www'; //your code source

var paths = {
  blankComponents: path.join(__dirname, 'scaffold', 'component/**/*.**'),
  blankServices: path.join(__dirname, 'scaffold', 'service/**/*.**'),
  viewFiles: src + '/**/*.html', //path to html files
  tsFiles: src + '/**/*.ts' //path to ts files
};

var browserify = browserify({
    basedir: '.',
    debug: true,
    entries: ['www/main.ts'], 
    cache: {},
    packageCache: {}
}).plugin(tsify);

function bundle() {
    return browserify
        .transform('babelify', {
            extensions: ['.ts']
        })
        .bundle()
        .on('error', interceptErrors)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("build"));
}

// That Object is used to intercept errors
// (variable declaration, object which doesn't exist, etc..)
var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);
  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  console.log('Error at :' + error);
  // Keep gulp from hanging on this task
  this.emit('end');
};

// That Object is used to notify errors
var build = (source, output, cb) => {
	return gulp.src([source])
	  .on('error', interceptErrors)
	  .pipe(cb)
		.pipe(gulp.dest(output));
}

const resolveToComponents = (glob = '') => {
  return path.join(src, '', glob); // src/{glob}
};

const resolveToServices = (glob = '') => {
  return path.join(src, '', glob); // src/{glob}
};

const name = yargs.argv.name;
const parent = yargs.argv.parent || '';
const route = !!yargs.argv.route;

/**
 * Change temp name containing '-' char
 * @param {String} val - value of the temp name
 */
var changeVal = (val) => {
  if (val.includes('-')) {
    return val.slice(0, val.indexOf('-')) + cap(val.substr(val.indexOf('-') + 1));
  }
  return val;
};

/**
 * Set temp name containing '-' char to parent name
 * @param {String} val - value of the temp name
 */
var SetToParentVal = (val) => {
  if (val.includes('-')) {
    return val.slice(0, val.indexOf('-'));
  }
  return val;
};

/**
 * Change temp name containing '-' char
 * @param {String} val - value of the temp name
 */
var componentPath = (val) => {
  val = '';
  return val;
};

/**
 * Set temp name to upcase
 * @param {String} val - value of the temp name
 */
var cap = (val) => {
  if (val.includes('-')) {
    var newVal = val.charAt(0).toUpperCase() + val.slice(1);
    return changeVal(newVal);
  }
  return val.charAt(0).toUpperCase() + val.slice(1);
};

const generateComponent = () => {
  const destPathComponent = path.join(resolveToComponents(''), parent, name);
  gulp.src(paths.blankComponents)
    .pipe(template({
      name: name,
      parent: parent,
      upParent: cap(parent),
      upName: cap(name).replace(cap(name).charAt(0), cap(name).charAt(0).toLowerCase()),
      upCaseName: cap(name),
      route
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPathComponent));
};

const generateService = () => {
  const destPathService = path.join(resolveToServices(''), parent, name);
  gulp.src(paths.blankServices)
    .pipe(template({
      name: name,
      upCaseName: cap(name),
      route
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPathService));
};

gulp.task('component', () => {
  generateComponent(); // Web components
});

gulp.task('service', () => {
  generateService(); // Web components
});

// That task allows to identify all test source 
// and report errors in case using mocha
gulp.task('test', () => {
  return gulp.src(['test/www/test/unit/**/*.spec.js'], { read: false })
     .pipe(mocha({ reporter: 'spec' }))
     //.on('error', util.log);
})

gulp.task('browserify', function() {
  return bundle();
});

//task which allows to minify all the css existing file in 
// a file which will be named 'app.css' to the 'build' directory
gulp.task('css', () => {
  return gulp.src(['public/stylesheets/*.css'])
	  .on('error', interceptErrors)
	  .pipe(concat('app.min.css'))
	  .pipe(minifyCss())
	  .pipe(gulp.dest('build/css'));
  
})

gulp.task('templates', function() {
  return gulp.src(paths.viewFiles)
    .pipe(templateCache())
    .pipe(gulp.dest(src + '/view'));
});

//watch all the files, we use in development
// by integrating the task 'test' created for the mocha
// reporter so that to log errors
gulp.task('watchTests', () => {
  gulp.watch([
    'app.js',
    'models/**/*.js',
    'controllers/**/*.js',
    'services/**/*.js',
    'helpers/*.js',
    'test/integration/*.spec.js'], ['test']);
})

gulp.task('unitTests', () => {
  gulp.watch([
    'test/www/main/application/**/*.js',
    'test/www/main/core/**/*.js',
    'test/www/main/provider/**/*.js',
    'test/www/test/unit/**/*.spec.js'], ['test']);
})

gulp.task('server', () => {
  serve({
    port: process.env.PORT || 5000,
    open: false,
    server: { baseDir: './build' }
  });
});

gulp.task('watcher', function() {
  gulp.watch([paths.tsFiles, paths.viewFiles], ['browserify', 'templates', browser.reload]);
  gulp.watch(['lib/**/*.ts'], ['browserify']);
});


//Start the server with watching mode
gulp.task('default', (done) => {
  sync('browserify', 'server', 'watcher', done);
})
