import { watch, parallel, series } from 'gulp';
import browserSync from 'browser-sync';

import clean from './gulptasks/clean';
import * as html from './gulptasks/html';
import * as fonts from './gulptasks/fonts';
import * as styles from './gulptasks/styles';
import * as scripts from './gulptasks/scripts';
import * as images from './gulptasks/images';
import * as svgs from './gulptasks/svgs';

function watchFiles() {
    browserSync.init({ server: { baseDir: "./dist/" } });

    watch(styles.paths.common.src, styles.commonCSS);
    watch(styles.paths.layout.src, styles.layoutCSS);
    watch(styles.paths.layout.src, styles.pagesCSS);
    
    watch(scripts.paths.src, scripts.commonJS).on('change', browserSync.reload);

    watch(images.paths.src, images.imgSquash).on('change', browserSync.reload);
    watch(images.paths.src, images.imgWebP).on('change', browserSync.reload);

    watch(svgs.paths.sprite.src, svgs.sprite).on('change', browserSync.reload);
    watch(svgs.paths.copy.src, svgs.copy).on('change', browserSync.reload);

    watch( html.paths.src, html.copy).on('change', browserSync.reload);

    watch( fonts.paths.src, fonts.copy).on('change', browserSync.reload);
}
export { watchFiles as watch};

const build = series(
        clean, 
        parallel(
            html.copy,

            fonts.copy,

            styles.commonCSS, 
            styles.layoutCSS, 
            styles.pagesCSS,

            scripts.commonJS,

            images.imgSquash,
            images.imgWebP,

            svgs.sprite,
            svgs.copy
        ),
    );

export default build;