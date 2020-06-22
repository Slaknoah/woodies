import { src, dest } from 'gulp';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import cleanSvg from 'gulp-cheerio-clean-svg';
import svgSprite from 'gulp-svg-sprite';


const paths = {
    sprite: {
        src: 'src/svg/**/*svg',
        dest: 'dist/assets/svg/'
    },
    copy: {
        src: 'src/svg-elements/**/*svg',
        dest: 'dist/assets/svg/'
    },
}

const sprite = () => {
    return src(paths.sprite.src)
            .pipe( svgmin({ js2svg: { pretty: true } }) )
            .pipe( cheerio(cleanSvg({
                removeComments: true,
            })))
            .pipe( svgSprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg",
                    }
                }
            }) )
            .pipe( dest(paths.sprite.dest) );
}

const copy = () => src( paths.copy.src ).pipe(dest( paths.copy.dest ));

export { paths, sprite, copy }