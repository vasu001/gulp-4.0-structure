// App Name [Dir]
const appname = ''

// Development Folders & Files
const rootDir = `./${appname}/`
const scss = `${rootDir}scss/`
const js = `${rootDir}js/`
const image = `${rootDir}img/`

// Production Files Destination
const destDir = `./${appname}/dest/`
const jsDest = `${destDir}js/`
const cssDest = `${destDir}css/`
const imgDEST = `${destDir}img/`

// Require Dependencies for automation
const gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	lineec = require('gulp-line-ending-corrector'),
	changed = require('gulp-changed')

// Files to watch
const phpFileWatcher = `${rootDir}**/*.php`
const scssFileWatcher = `${scss}**/*.scss`
const htmlFileWatcher = `${rootDir}**/*.html`
const htmFileWatcher = `${rootDir}**/*.htm`

// Watch js files in given order
const jsSRCs = [
	`${js}PriorityOneFile.js`,
	`${js}PriorityTwoFile.js`,
	`${js}PriorityThirdFile.js`,
	`${js}PriorityFourFile.js`
]

// Watch css files in given order
const cssSRCs = [
	`${rootDir}CSSDir/FileOne.css`,
	`${rootDir}CSSDir/FileTwo.css`,
	`${rootDir}CSSDir/FileThree.css`,
	`${rootDir}FileFour.css`
]

// Watch Image Files inside image dir of rootDir
const imgSRCs = `${image}**/*`

/**
 * Watch main style.scss file that imports all other scss files and produce the output
 * 1. Define the source file to watch for gulp.src
 * 2. Init sourcemaps to set it to load sourcemaps for the style.scss
 * 3. Use gulp-sass to set output style of processed stylesheet
 * 4. Autoprefix the stylesheet
 * 5. Correct the line ending for different platform
 * 6. Write the sourcemaps
 * 7. Output the final processed file in the given destination folder.
 * @returns {*} style.css in root directory
 */
function css () {
	return gulp.src([`${scss}style.scss`])
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError()))
		.pipe(autoprefixer(['last 2 version']))
		.pipe(lineec())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(`${rootDir}`))
}

/**
 * This function takes the final generated css files and processes it in order of their priority to generate one final production ready minified stylesheet
 * @returns {*}
 */
function concat_css () {
	return gulp.src([`${cssSRCs}`])
		.pipe(sourcemaps.init({
			loadMaps: true,
			largeFiles: true
		}))
		.pipe(concat('style.min.css'))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write('./maps/'))
		.pipe(lineec())
		.pipe(gulp.dest(`${cssDest}`))
}

/**
 * This function takes the final generated js files and processes it in order of their priority to generate one final production ready minified js file
 *
 * @returns {*}
 */
function javascript () {
	return gulp.src(`${jsSRCs}`)
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(lineec())
		.pipe(gulp.dest(`${jsDest}`))
}

function imgmin () {
	return gulp.src(imgSRCs)
		.pipe(changed(imgDEST))
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.jpegtran({ progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 })
		]))
		.pipe(gulp.dest(imgDEST))
}

function watch () {
	browserSync.init({
		open: 'external',
		proxy: 'http://localhost/',
		port: 8080
	})
	gulp.watch([scssFileWatcher, gulp.series([css, concat_css])])
	gulp.watch([jsSRCs, javascript])
	gulp.watch([imgSRCs, imgmin])
	gulp.watch([phpFileWatcher, htmFileWatcher, htmlFileWatcher, `${cssDest}style.min.css`, `${jsDest}main.js`]).on('change', browserSync.reload)
}

exports.css = css
exports.concatCSS = concatCSS
exports.javascript = javascript
exports.watch = watch
exports.imgmin = imgmin

var build = gulp.parallel(watch)
gulp.task('default', build)