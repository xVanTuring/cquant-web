# https://gist.github.com/WesThorburn/00c47b267a0e8c8431e06b14997778e4
cmake_minimum_required(VERSION 3.8)
project(wabass LANGUAGES CXX)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

include_directories(color-quant/src)
add_subdirectory(color-quant)

add_executable(cquant ./src/main.cpp)

target_link_libraries(cquant LibColorQuant)

set_target_properties(cquant
PROPERTIES CXX_STANDARD 17
LINK_FLAGS "--bind -Os -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s MALLOC=emmalloc -s MODULARIZE=1 -s EXPORT_ES6=1")