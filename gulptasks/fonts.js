import { src, dest } from 'gulp';

const paths = {
    src: 'src/fonts/**/*.{ttf,otf,woff2}',
    dest: 'dist/assets/fonts/'
}

const copy = () => src( paths.src ).pipe(dest( paths.dest ));

export { paths, copy }