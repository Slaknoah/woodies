import { src, dest } from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';

const paths = {
    common: {
        src: 'src/styles/common/**/*.scss',
        dest: 'dist/assets/styles/common/'
    },
    layout: {
        src: 'src/styles/layout/**/*.scss',
        dest: 'dist/assets/styles/layout/'
    },
    pages: {
        src: 'src/styles/pages/**/*.scss',
        dest: 'dist/assets/styles/pages/'
    }
}

const styles = (source, destination) => {
    return src(source)
            .pipe(sass().on("error", sass.logError))
            .pipe(cleanCSS({ compatibility: 'ie8', debug: true }, (details) => {
                console.log(`${details.name}: ${details.stats.originalSize}`);
                console.log(`${details.name}: ${details.stats.minifiedSize}`);
            }))
            .pipe(dest(destination))
            .pipe(browserSync.stream());
}

const compileStyles = (source, destination, fileName) => {
    return src(source)
            .pipe(sass().on("error", sass.logError))
            .pipe(concat(fileName))
            .pipe(cleanCSS({ compatibility: 'ie8', debug: true }, (details) => {
                console.log(`${details.name}: ${details.stats.originalSize}`);
                console.log(`${details.name}: ${details.stats.minifiedSize}`);
            }))
            .pipe(dest(destination))
            .pipe(browserSync.stream());
}

const commonCSS = () => compileStyles(paths.common.src, paths.common.dest, 'common.css');
const layoutCSS = () => compileStyles(paths.layout.src, paths.layout.dest, 'layout.css');
const pagesCSS  = () => styles(paths.pages.src, paths.pages.dest);


export { paths, commonCSS, layoutCSS, pagesCSS }