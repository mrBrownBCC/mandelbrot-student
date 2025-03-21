let maxIterations = 100;
let minReal = -1.8;
let maxReal = 1;
let minImag = -1;
let maxImag = 1;

function setup() {
  createCanvas(800, 600);
  setupDebugConsole();
  pixelDensity(1);
  noLoop();
  colorMode(HSB, 255);
}

function draw() {//no need to change anything here
  loadPixels();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

      let totalBrightness = 0;

      // Subpixel sampling loop (2x2 grid = 4 samples per pixel)
      for (let sx = 0; sx < 2; sx++) {
        for (let sy = 0; sy < 2; sy++) {

          // Subpixel offsets (0.25 and 0.75 ensure even sampling within each pixel)
          let xOffset = (sx + 0.5) / 2;
          let yOffset = (sy + 0.5) / 2;

          // Map the subpixel position to a point in the complex plane
          let a0 = map(x + xOffset, 0, width, minReal, maxReal);
          let b0 = map(y + yOffset, 0, height, minImag, maxImag);

          // Get the number of iterations for this sample
          let n = mandelbrotIterations(a0, b0, maxIterations);

          // Map the iteration count to a brightness value between 0 and 1
          let sampleBrightness = map(n, 0, maxIterations, 0, 1);
          if (n === maxIterations) sampleBrightness = 0; // Points inside the set

          totalBrightness += sampleBrightness;
        }
      }

      // Average brightness over the 4 subpixel samples
      let avgBrightness = totalBrightness / 4;

      // Convert brightness to a color using a gradient
      let col = brightToColor(avgBrightness);

      // Set the pixel color
      let pix = (x + y * width) * 4;
      pixels[pix + 0] = red(col);
      pixels[pix + 1] = green(col);
      pixels[pix + 2] = blue(col);
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
}

//ALL PROJECT CODE GOES WITHIN THIS FUNCTION
function mandelbrotIterations(a0, b0, maxIterations) {
  // Step 1: create three variables. Remember to use let! For example, let x = 5;
//         - 'a' and 'b', which start with the same values as 'a0' and 'b0'.
//         - 'n', a counter that tracks how many iterations (loops) have occurred. It starts at 0.

// Step 2: Set up a loop that continues as long as:
//         - The counter 'n' is less than maxIterations(defined at the top of this program), and
//         - The condition (a*a + b*b <= 4) is true 

// Step 4: Within the loop, calculate two new values using these equations:
//         - aa = (a*a) - (b*b)
//         - bb = 2*a*b

// Step 5: Update the values of 'a' and 'b':
//         - Set 'a' to (aa + a0)
//         - Set 'b' to (bb + b0)

// Step 6: Each time the loop runs, add 1 to the iteration counter 'n'.

// Step 7: After the loop ends, return the value of 'n'.
//         - This number tells you how many iterations occurred before the point "escaped" or reached maxIterations.
}

// Map a brightness value to a color (using HSB)
function brightToColor(brightness) {
  if (brightness === 0) return color(0);
  // Using the square root of brightness helps to enhance contrast
  return color(map(sqrt(brightness), 0, 1, 0, 255), 200, 255);
}


// Zoom in by clicking: the clicked point becomes the center of a new view
function mouseClicked() {
  console.log("test")
    let zoomFactor = 0.5; // Zoom in to half the current range

    // Convert the clicked pixel to complex plane coordinates
    let clickReal = map(mouseX, 0, width, minReal, maxReal);
    let clickImag = map(mouseY, 0, height, minImag, maxImag);

    // Calculate the new ranges for the complex plane
    let rangeReal = maxReal - minReal;
    let rangeImag = maxImag - minImag;
    let newRangeReal = rangeReal * zoomFactor;
    let newRangeImag = rangeImag * zoomFactor;

    // Center the new view at the clicked point
    minReal = clickReal - newRangeReal / 2;
    maxReal = clickReal + newRangeReal / 2;
    minImag = clickImag - newRangeImag / 2;
    maxImag = clickImag + newRangeImag / 2;

    redraw();
}

// Press 'R' to reset the Mandelbrot view to its original settings
function keyPressed() {
    if (key === 'r' || key === 'R') {
        minReal = -2.5;
        maxReal = 1;
        minImag = -1;
        maxImag = 1;
        redraw();
    }
}

module.exports = { mandelbrotIterations };