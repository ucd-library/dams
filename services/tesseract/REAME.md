Image Utilities

# ImageMagick Scripts

convert -density 150 Agricola_1912.pdf -deskew 40% -quality 90 -resize 1024x\> output.jpg

convert -density 150 PUG-GRB-vol4.pdf -quality 100  -alpha remove -resize 1024x\> output.jpg

convert -density 150 PUG-GRB-vol4.pdf -define tiff:tile-geometry=128x128 -compress jpeg  -quality 100  -alpha remove -resize 1024x\> ptif:output_%d.tif

convert -density 300 Agricola_1912.pdf[10] -fill black -fuzz 30% +opaque "#FFFFFF" -deskew 40% -trim +repage -filter catrom -sigmoidal-contrast 10,50%  output-10.tiff