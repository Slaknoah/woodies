import {src, dest} from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

const paths = {
    common: {
        src: 'src/scripts/common/**/*.js',
        dest: 'dist/assets/scripts/'
    },
    pages: {
        src: 'src/scripts/pages/**/*.js',
        dest: 'dist/assets/scripts/pages/'
    }
}

const commonJS = () => {
    return src(paths.common.src, { sourcemaps: true })
            .pipe(babel())
            .pipe(uglify())
            .pipe(concat('common.min.js'))
            .pipe(dest(paths.common.dest))
}

const pagesJS = () => {
    return src(paths.pages.src, { sourcemaps: true })
            .pipe(babel())
            .pipe(uglify())
            .pipe(dest(paths.pages.dest))
}

export { paths, commonJS, pagesJS }

