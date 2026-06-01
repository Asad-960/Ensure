const Jimp = require('jimp');

async function getColor() {
  try {
    const image = await Jimp.read('./public/images/ezgif-frame-001.jpg');
    const hex = image.getPixelColor(0, 0); // Top left
    const rgba = Jimp.intToRGBA(hex);
    
    // Convert to hex string
    const hexString = '#' + rgba.r.toString(16).padStart(2, '0') + 
                            rgba.g.toString(16).padStart(2, '0') + 
                            rgba.b.toString(16).padStart(2, '0');
    console.log("Top Left Color:", hexString);
    
    // Also check top middle, bottom left to ensure consistency
    const hex2 = image.getPixelColor(image.bitmap.width / 2, 0);
    const rgba2 = Jimp.intToRGBA(hex2);
    console.log("Top Middle Color:", '#' + rgba2.r.toString(16).padStart(2, '0') + rgba2.g.toString(16).padStart(2, '0') + rgba2.b.toString(16).padStart(2, '0'));
    
    const hex3 = image.getPixelColor(0, image.bitmap.height - 1);
    const rgba3 = Jimp.intToRGBA(hex3);
    console.log("Bottom Left Color:", '#' + rgba3.r.toString(16).padStart(2, '0') + rgba3.g.toString(16).padStart(2, '0') + rgba3.b.toString(16).padStart(2, '0'));
    
  } catch (err) {
    console.error(err);
  }
}

getColor();
