# Gulp-4.0 Structure
Starter structure that must be modified to work with different folder structures.


## Gulp Dev Workflow Setup

### Steps

* If package.json is present

    `npm install`

**otherwise**

* Install Gulp Globally
    
    `npm install --global gulp`
    
* Install Gulp in dev env

    `npm install --save-dev gulp`
    
* Install browser-sync to automatically reload the browser on editing the *.php, *.css, *.scss, *.js, *.html or other files

    `npm install --save-dev browser-sync`
    
* Install gulp-autoprefixer to help prefix our css code

    `npm install --save-dev gulp-autoprefixer`
    
* Install gulp-changed to not track unchanged files but only changed ones

    `npm install --save-dev gulp-changed`
    
* Install gulp-clean-css to minify the css files
    
    `npm install --save-dev gulp-clean-css`

* Install gulp-concat to combine [concat] all our css files into one css files and same for javascript files to make the website load faster

    `npm install --save-dev gulp-concat`

* Install gulp-imagemin to compress production images

    `npm install --save-dev gulp-imagemin`

* Install gulp-line-ending-corrector to correct the line-ending for different OS platform

    `npm install --save-dev gulp-line-ending-corrector`
    
* Install gulp-sass

    `npm install --save-dev gulp-sass`
    
* Install gulp-sourcemaps

    `npm install --save-dev gulp-sourcemaps`
    
* Install gulp-uglify for minifying javascript

    `npm install --save-dev gulp-uglify`
    
* Create gulpfile.js in the directory. This is the file where every workflow setting happens.    
