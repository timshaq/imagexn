const gulp = require('gulp');
const del = require('del');
const imagemin = require('gulp-imagemin');
const rename = require("gulp-rename");
const imageResize = require('gulp-image-resize');

const src = {
    img: './src/**/*.{png,jpg,jpeg}',
}


const build = {
    img: './build/',
}

function compress () {
    return gulp.src(src.img)
        .pipe(gulp.dest(build.img))
}

function retina() {
    gulp.src(src.img)
    .pipe(imageResize({
        percentage: 200,
    }))
    .pipe(
        rename({
            suffix: "@2x"
        })
    )
    .pipe(gulp.dest(build.img))
    
    gulp.src(src.img)
    .pipe(imageResize({
        percentage: 300,
    }))
    .pipe(
        rename({
            suffix: "@3x"
        })
    )
    .pipe(gulp.dest(build.img))
    
    return gulp.src(src.img)
    .pipe(imageResize({
        percentage: 400,
    }))
    .pipe(
        rename({
            suffix: "@4x"
        })
    )
    .pipe(gulp.dest(build.img))
}

function clean() {
    return del([build.img])
}

gulp.task('build', gulp.series(clean, compress, retina));

gulp.task('clean', clean);
gulp.task('compress', compress);
gulp.task('retina', retina);