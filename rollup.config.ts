import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: `src/main.ts`,
  output: [
    { file: pkg.main, name: pkg.name, format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve(),
    sourceMaps(),
    terser(),
    filesize({ showMinifiedSize: false, showBrotliSize: true }),
  ],
};
