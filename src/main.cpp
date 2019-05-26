#include "colorquant.h"
#include <emscripten/bind.h>
#include <iostream>
#include <memory>
#include <sstream>
#include <string>
using namespace emscripten;
std::string cquant(size_t ptr, int pixCount) {
  unsigned char *buf = (unsigned char *)ptr;
  std::shared_ptr<PIX> pix = std::make_shared<PIX>();
  pix->depth = 4;
  pix->n = pixCount;
  pix->pixs = (RGBA_Quad *)buf;
  auto cmap = pix_median_cut_quant(pix, 5, 5, 0);
  std::ostringstream stringStream;
  for (size_t i = 0; i < cmap->array->size(); i++) {
    stringStream << (int)cmap->array->at(i)->red << " "
                 << (int)cmap->array->at(i)->green << " "
                 << (int)cmap->array->at(i)->blue << " "
                 << (int)cmap->array->at(i)->count << "|";
  }
  return stringStream.str();
}
EMSCRIPTEN_BINDINGS(my_module) {
  function("cquant", &cquant, allow_raw_pointers());
}