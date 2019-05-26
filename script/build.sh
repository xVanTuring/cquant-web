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
mkdir -p build
cd build
emcmake cmake ..
make
echo "============================================="
echo "Compiling wasm bindings done"
echo "============================================="