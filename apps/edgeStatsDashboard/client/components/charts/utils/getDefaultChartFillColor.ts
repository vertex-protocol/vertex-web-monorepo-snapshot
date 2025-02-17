/**
 * Generates a dynamic fill color based on a given index.
 *
 * This function creates visually distinct colors by cycling through hues on the HSL spectrum.
 * The hue values start at 200° (approximately blue) and progress incrementally based on the index.
 * The hue wraps around if it exceeds 360°, ensuring continuous cycling of colors.
 *
 * - Hue is calculated using the formula: `(index * incrementDeg + 200) % 360`
 * - Saturation is fixed at 72%, providing vibrant colors.
 * - Lightness is fixed at 67%, ensuring the colors are neither too dark nor too bright.
 *
 * @param index - The index used to determine the hue value for the generated color.
 * @param incrementDeg - The degree by which the hue increments with each index (default is 15).
 * @returns A string representing the generated color in HSL format, e.g., "hsl(200, 72%, 67%)".
 */
function generateChartFillColor(index: number, incrementDeg: number): string {
  // Increment hue based on the index and starting at 200° (blue), cycling within 0-360°.
  const hue = (index * incrementDeg + 200) % 360;

  // Return the color in HSL format with fixed saturation and lightness values.
  return `hsl(${hue}, 72%, 67%, 1)`;
}

/**
 * Determines the default fill color for a chart.
 *
 * If a specific color is provided, it returns that color. Otherwise:
 * - If the color is undefined, a dynamically generated color is returned based on the index.
 * - If the color is null, no color is returned.
 *
 * The generated colors ensure visual distinction across a dataset by dividing the hue spectrum
 * evenly based on the total number of data items.
 *
 * @param color - A predefined color string, or undefined/null.
 * @param index - The position of the item in the dataset, used for generating the color.
 * @param dataLength - The total number of data items, used to evenly distribute hues.
 * @returns A color string (either predefined or dynamically generated) or undefined for null inputs.
 */
export function getDefaultChartFillColor(
  color: string | undefined | null,
  index: number,
  dataLength: number,
): string | undefined {
  // Calculate the hue increment based on the dataset size for evenly distributed colors.
  const colorIncrementDeg = Math.floor(360 / dataLength);

  if (color === null) {
    // Return undefined if the color is explicitly null.
    return;
  }

  if (color === undefined) {
    // Generate a dynamic color if no predefined color is provided.
    return generateChartFillColor(index, colorIncrementDeg);
  }

  // Return the predefined color if it is not null or undefined.
  return color;
}
