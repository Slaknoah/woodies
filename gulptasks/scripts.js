import { src, dest } from 'gulp';
import compiler from 'webpack';
import webpack from 'webpack-stream';

const paths = {
    src: 'src/scripts/**/*.js',
    dest: 'dist/assets/scripts/'
}

const commonJS = () => {
    return src(paths.src, { sourcemaps: true })
            .pipe(webpack( 
                require('../webpack.config'), 
                compiler
            ))
            .pipe(dest(paths.dest))
}

export { paths, commonJS }

