import { BigDecimal } from '@vertex-protocol/client';
import { stringify } from 'csv-stringify/sync';

function downloadBlob(content: string, filename: string, contentType: string) {
  // Create a blob
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);

  // Create a link to download it
  const pom = document.createElement('a');
  pom.href = url;
  pom.setAttribute('download', filename);
  pom.click();
  pom.remove();
}

export type CsvFileName = `${string}.csv`;
export type CsvDataItem = Record<
  string,
  string | Date | BigDecimal | undefined
>;

/**
 * Downloads an array of objects as a .csv file.
 * @param data - The array of objects to download. All objects in the array must contain the same keys
 * @param filename - The name of the file to download.
 * @param headingNames - An object containing the names of the columns at the top.
 * @example
 * // Make sure all objects have the same keys.
 * const data = [
 *  {a:"ver", b:"tex"},
 *  {a:"42", b:"420"}
 * ]
 * const headingNames = {"a":"The first header", "b": "The second header"}
 * downloadCsv(data,"myFile.csv",headingNames)
 * // Downloads the following .csv file:
 * ```
 * The first header,the second header
 * ver,tex
 * 42,420
 * ```
 */
export function downloadCsv<TData extends CsvDataItem>(
  data: TData[],
  filename: CsvFileName,
  headingNames: Record<keyof TData, string>,
) {
  const contentType = 'text/csv;charset=utf-8;';
  const csvString = stringify(data, {
    columns: headingNames,
    header: true,
    cast: {
      date: (value: Date) => value.toISOString(),
      object: (value: any) => {
        if (value instanceof BigDecimal) {
          // specify base 10 so that exponential notation isn't used
          return value.toString(10);
        }
        throw new Error('Unsupported value type');
      },
    },
  });
  downloadBlob(csvString, filename, contentType);
}
