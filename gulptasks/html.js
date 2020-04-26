import { src, dest } from 'gulp';

const paths = {
    src: 'src/**/*.html',
    dest: 'dist/'
}

const copy = () => src( paths.src ).pipe(dest( paths.dest ));

export { paths, copy }