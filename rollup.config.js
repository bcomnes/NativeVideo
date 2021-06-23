import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'

function plugins () {
  return [
    resolve({ browser: true }),
    commonjs(),
    json(),
    globals(),
    builtins()
  ]
}

const OUTPUT_DIR = 'dist'

export default [
  {
    input: [
      'src/background/background.js',
      'src/popup/popup.js',
      'src/options/options.js'
    ],
    plugins: plugins(),
    output: {
      dir: OUTPUT_DIR,
      entryFileNames: '[name]/[name].js',
      format: 'es',
      chunkFileNames: 'chunks/[format]-[name]-[hash].js',
      sourcemap: true,
      globals: 'browser'
    }
  },
  {
    input: ['src/content/content.js'],
    plugins: plugins(),
    output: {
      dir: OUTPUT_DIR,
      entryFileNames: '[name]/[name].js',
      format: 'umd',
      name: 'gitMutual'
    }
  }
]
