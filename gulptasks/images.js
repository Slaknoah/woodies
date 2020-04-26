import { src, dest, lastRun } from 'gulp';
import imagemin from 'gulp-imagemin';
import webp from "imagemin-webp";
import extReplace from "gulp-ext-replace"

const paths = {
    src: 'src/img/**/*.{jpg,jpeg,png,JPG}',
    dest: 'dist/assets/img/'
}

const imgSquash = () => {
    return src(paths.src, {since: lastRun(imgSquash)})
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ], {
                verbose: true
            }))
            .pipe(dest( paths.dest ));
}

const imgWebP = () => {
    return src(paths.src, {since: lastRun(imgWebP)})
            .pipe(imagemin([
                webp({
                    quality: 75
                })
            ]))
            .pipe(extReplace(".webp"))
            .pipe(dest( paths.dest ));
}

export { paths, imgSquash, imgWebP }