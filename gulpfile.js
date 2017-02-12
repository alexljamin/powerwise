var gulp = require('gulp'),
    minifyCSS = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename')
    browserSync = require('browser-sync').create();
    del = require('del');

gulp.task('clean:docs', function(){
    del.sync(['./docs/*','!./docs/CNAME'])
})

gulp.task('browserSync', function(){
    browserSync.init({
        server:{
            baseDir: './docs',
        },  
        port: 8080
    })
});

gulp.task('sass', function(){
    gulp.src('./src/*.sass')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('./docs'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('copy-files', function(){
    gulp.src("./src/*.html")
        .pipe(gulp.dest('./docs'))
        .pipe(browserSync.reload({
            stream: true
        }))
    gulp.src("./src/assets/*.*")
        .pipe(gulp.dest('./docs/assets'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', function(){
    gulp.watch('./src/*.sass', ['sass'])
    gulp.watch('./src/*.html', ['copy-files'])
});

gulp.task('default', ['clean:docs', 'browserSync', 'sass', 'copy-files', 'watch']);