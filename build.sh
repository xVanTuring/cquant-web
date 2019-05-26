#!/bin/bash
# https://developers.google.com/web/updates/2019/01/emscripten-npm
set -e
export OPTIMIZE="-O0"
export LDFLAGS="${OPTIMIZE}"
export CFLAGS="${OPTIMIZE}"
export CPPFLAGS="${OPTIMIZE}"
echo "============================================="
echo "Compiling wasm bindings"
echo "============================================="

mkdir -p dist

cd build
emcmake cmake ..
make
cp cquant.{js,wasm} ../dist
cp ../assets/* ../dist
echo "============================================="
echo "Compiling wasm bindings done"
echo "============================================="