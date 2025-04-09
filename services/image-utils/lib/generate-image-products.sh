#! /bin/bash

OCR_TO_BOOK_SCALE=2
LARGE_SIZE=1024
MEDIUM_SIZE=$(($LARGE_SIZE / 2))
SMALL_SIZE=$(($LARGE_SIZE / 4))
OCR_SIZE=$(($LARGE_SIZE * 2))

DESKEW_THRESHOLD=${DESKEW_THRESHOLD:-40%}

OCR_OPTS="--dpi 300 -l eng --psm 1 --oem 3 hocr"

# OCR Base options
IM_OCR_BASE_OPTS=$(cat <<EOF
-density 300 \
-alpha remove \
-fill black \
-fuzz 80% \
+opaque #FFFFFF \
-filter catrom \
-layers flatten \
-quality 100
EOF
)

BASE_IMAGE_OPTS=$(cat <<EOF
-quality 90 \
-alpha remove \
-layers flatten
EOF
)

TILED_TIF_OPTS=$(cat <<EOF
-define tiff:tile-geometry=256x256 \
-compress JPEG \
-alpha remove \
-resize 3072x \
-quality 90 \
-layers flatten
EOF
)

INPUT_FILE=$1
if [[ -z "$INPUT_FILE" ]]; then
  echo "Usage: $0 <input_file>"
  exit 1
fi

DIR=$2
if [[ -z "$DIR" ]]; then
  DIR=$(dirname "$INPUT_FILE")
fi

echo "Input file: $INPUT_FILE"
echo "Output directory: $DIR"
echo "Deskew threshold: $DESKEW_THRESHOLD"

mkdir -p "$DIR"

# Check if the input file is a TIFF image
if [[ "$INPUT_FILE" == *.tif || "$INPUT_FILE" == *.tiff ]]; then
  INPUT_FILE="${INPUT_FILE}[0]"
fi

SMALL_IMAGE="${DIR}/small.jpg"
MEDIUM_IMAGE="${DIR}/medium.jpg"
LARGE_IMAGE="${DIR}/large.jpg"
LARGE_DESKEW_IMAGE="${DIR}/large-deskew.jpg"
OCR_IMAGE="${DIR}/ocr.jpg"
OCR_DESKEW_IMAGE="${DIR}/ocr-deskew.jpg"
HOCR_IMAGE="${DIR}/ocr.hocr"
HOCR_DESKEW_IMAGE="${DIR}/ocr-deskew.hocr"
TILED_IMAGE="${DIR}/tiled.tif"
DESKEW_ANGLE_FILE="${DIR}/deskew-angle.txt"

# Generate small image
convert $INPUT_FILE -resize ${SMALL_SIZE}x $BASE_IMAGE_OPTS $SMALL_IMAGE

# Generate medium image
convert $INPUT_FILE -resize ${MEDIUM_SIZE}x $BASE_IMAGE_OPTS $MEDIUM_IMAGE

# Generate large image
convert $INPUT_FILE -resize ${LARGE_SIZE}x $BASE_IMAGE_OPTS $LARGE_IMAGE

# Generate large deskew image
convert $INPUT_FILE -resize ${OCR_SIZE}x -deskew $DESKEW_THRESHOLD $BASE_IMAGE_OPTS -resize ${LARGE_SIZE} $LARGE_DESKEW_IMAGE

# Generate OCR image
convert $INPUT_FILE -resize ${OCR_SIZE}x $IM_OCR_BASE_OPTS $OCR_IMAGE

# Generate OCR deskew image
convert $INPUT_FILE -resize ${OCR_SIZE}x -deskew $DESKEW_THRESHOLD $IM_OCR_BASE_OPTS $OCR_DESKEW_IMAGE

# Generate tiled tif image
convert $INPUT_FILE $TILED_TIF_OPTS ptif:$TILED_IMAGE

# get deskew angle
DESKEW_ANGLE=$(convert $INPUT_FILE -resize ${OCR_SIZE}x -deskew $DESKEW_THRESHOLD -format "%[deskew:angle]" info:)
echo "Deskew angle: $DESKEW_ANGLE"
echo $DESKEW_ANGLE > $DESKEW_ANGLE_FILE

# tessoract puts results in the current directory
cd $DIR

# Generate hOCR
tesseract $OCR_IMAGE ocr $OCR_OPTS

# Generate hOCR deskew
tesseract $OCR_DESKEW_IMAGE ocr-deskew $OCR_OPTS