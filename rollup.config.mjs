import { defineConfig } from 'rollup';
import flatDts from 'rollup-plugin-flat-dts';
import sourcemaps from 'rollup-plugin-sourcemaps';
import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';

export default defineConfig({
  input: {
    primitives: './src/mod.ts',
  },
  plugins: [
    ts({
      typescript,
      tsconfig: 'tsconfig.main.json',
      cacheRoot: 'target/.rts2_cache',
    }),
    sourcemaps(),
  ],
  output: {
    dir: './dist',
    format: 'esm',
    sourcemap: true,
    entryFileNames: '[name].js',
    plugins: [
      flatDts({
        tsconfig: 'tsconfig.main.json',
        lib: true,
        file: 'primitives.d.ts',
        compilerOptions: {
          declarationMap: true,
        },
      }),
    ],
  },
});
