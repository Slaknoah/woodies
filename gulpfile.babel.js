import { watch, parallel, series } from 'gulp';
import browserSync from 'browser-sync';

import clean from './gulptasks/clean';
import * as html from './gulptasks/html';
import * as styles from './gulptasks/styles';
import * as scripts from './gulptasks/scripts';
import * as images from './gulptasks/images';
import * as svgs from './gulptasks/svgs';

function watchFiles() {
    browserSync.init({ server: { baseDir: "./dist/" } });

    watch(styles.paths.common.src, styles.commonCSS);
    watch(styles.paths.layout.src, styles.layoutCSS);
    watch(styles.paths.layout.src, styles.pagesCSS);
    
    watch(scripts.paths.common.src, scripts.commonJS).on('change', browserSync.reload);
    watch(scripts.paths.pages.src, scripts.pagesJS).on('change', browserSync.reload);

    watch(images.paths.src, images.imgSquash).on('change', browserSync.reload);
    watch(images.paths.src, images.imgWebP).on('change', browserSync.reload);

    watch(svgs.paths.src, svgs.sprite).on('change', browserSync.reload);

    watch( html.paths.src, html.copy).on('change', browserSync.reload);
}
export { watchFiles as watch};

const build = series(
        clean, 
        html.copy,
        parallel(
            styles.commonCSS, 
            styles.layoutCSS, 
            styles.pagesCSS,

            scripts.commonJS,
            scripts.pagesJS,

            images.imgSquash,
            images.imgWebP,

            svgs.sprite
        ),
    );

export default build;