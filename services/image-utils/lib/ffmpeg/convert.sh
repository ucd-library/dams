#! /bin/bash

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

BASE_CONFIG="-vf pad='ceil(iw/2)*2:ceil(ih/2)*2' -c:a aac -ar 48000 -c:v h264 -profile:v main -pix_fmt yuv420p -crf 20 -sc_threshold 0 -g 48 -keyint_min 48 -hls_flags single_file -hls_time 4 -hls_playlist_type vod -hls_segment_type fmp4"
INPUT_FILE=$1
RESOLUTION=$2

OUTPUT_DIR=$(dirname $INPUT_FILE)
filename=$(basename -- "$INPUT_FILE")
basename=$(echo "$INPUT_FILE" | cut -f 1 -d '.' | xargs basename)

BASE_DIR="$OUTPUT_DIR"
OUTPUT_DIR="$OUTPUT_DIR/stream"

if [ -d "$OUTPUT_DIR" ]; then
  echo "Directory $OUTPUT_DIR already exists.  Please delete and retry.";
  exit -1;
fi

echo $OUTPUT_DIR
mkdir -p $OUTPUT_DIR
cd $BASE_DIR

# checking for audio track
# https://stackoverflow.com/questions/21446804/find-if-video-file-has-audio-present-in-it
HAS_AUDIO=$(ffprobe -i ${INPUT_FILE} -show_streams -select_streams a -loglevel error)
if [ -z "$HAS_AUDIO" ]; then
  # add slient audio track to tmp file
  # https://trac.ffmpeg.org/wiki/Null
  ffmpeg -i ${INPUT_FILE} -f lavfi -i anullsrc -c:v copy -c:a aac -shortest ${BASE_DIR}/__tmp_${basename}_w_audio.mp4;
  INPUT_FILE=${BASE_DIR}/__tmp_${basename}_w_audio.mp4;
fi

if [[ -z $RESOLUTION ]]; then
  ffmpeg -threads 4 -hide_banner -y -i ${INPUT_FILE} \
    ${BASE_CONFIG} -b:v 800k -maxrate 856k -bufsize 1200k -b:a 96k -hls_segment_filename ${OUTPUT_DIR}/${basename}_360p.mp4 ${OUTPUT_DIR}/360p.m3u8 \
    ${BASE_CONFIG} -b:v 1400k -maxrate 1498k -bufsize 2100k -b:a 128k -hls_segment_filename ${OUTPUT_DIR}/${basename}_480p.mp4 ${OUTPUT_DIR}/480p.m3u8 \
    ${BASE_CONFIG} -b:v 2800k -maxrate 2996k -bufsize 4200k -b:a 128k -hls_segment_filename ${OUTPUT_DIR}/${basename}_720p.mp4 ${OUTPUT_DIR}/720p.m3u8 \
    ${BASE_CONFIG} -b:v 5000k -maxrate 5350k -bufsize 7500k -b:a 192k -hls_segment_filename ${OUTPUT_DIR}/${basename}_1080p.mp4 ${OUTPUT_DIR}/1080p.m3u8;

elif [[ $RESOLUTION == '360p' ]]; then
  ffmpeg -threads 4 -hide_banner -y -i ${INPUT_FILE} \
    ${BASE_CONFIG} -b:v 800k -maxrate 856k -bufsize 1200k -b:a 96k -hls_segment_filename ${OUTPUT_DIR}/${basename}_360p.mp4 ${OUTPUT_DIR}/360p.m3u8;

elif [[ $RESOLUTION == '480p' ]]; then
  ffmpeg -threads 4 -hide_banner -y -i ${INPUT_FILE} \
    ${BASE_CONFIG} -b:v 1400k -maxrate 1498k -bufsize 2100k -b:a 128k -hls_segment_filename ${OUTPUT_DIR}/${basename}_480p.mp4 ${OUTPUT_DIR}/480p.m3u8;

elif [[ $RESOLUTION == '720p' ]]; then
  ffmpeg -threads 4 -hide_banner -y -i ${INPUT_FILE} \
    ${BASE_CONFIG} -b:v 2800k -maxrate 2996k -bufsize 4200k -b:a 128k -hls_segment_filename ${OUTPUT_DIR}/${basename}_720p.mp4 ${OUTPUT_DIR}/720p.m3u8;

elif [[ $RESOLUTION == '1080p' ]]; then
  ffmpeg -threads 4 -hide_banner -y -i ${INPUT_FILE} \
    ${BASE_CONFIG} -b:v 5000k -maxrate 5350k -bufsize 7500k -b:a 192k -hls_segment_filename ${OUTPUT_DIR}/${basename}_1080p.mp4 ${OUTPUT_DIR}/1080p.m3u8;
fi

if [ -z "$HAS_AUDIO" ]; then
  rm ${INPUT_FILE};
fi

if [[ -z $RESOLUTION || $RESOLUTION == '1080p' ]]; then
  cp $SCRIPT_DIR/playlist.m3u8 $OUTPUT_DIR;
fi