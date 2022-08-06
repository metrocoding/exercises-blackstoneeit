import { createWriteStream } from "fs";
import { groupBy } from "lodash";
import { join } from "path";
import { createInterface } from "readline";

console.clear();

const readLine = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

readLine.on("line", (line) => rows.push(lineToObject(line)));
readLine.on("close", () => {
    const { csv1Data, csv2Data } = filteringData();

    createCsvFile(join(__dirname, "/"), "0_input_sample", csv1Data);
    createCsvFile(join(__dirname, "/"), "1_input_sample", csv2Data);
    console.log("files created in src/ directory ✅");
});

const rows: any[] = [];
export const lineToObject = (line: string) => {
    const array = line.split(",").map((s) => s.trim());
    return {
        id: array[0],
        area: array[1],
        name: array[2],
        quantity: Number(array[3]),
        brand: array[4],
    };
};

export const filteringData = () => {
    const groupByName = groupBy(rows, "name");
    const totalRows = rows.length;

    const csv1Data: string[] = [];
    const csv2Data: string[] = [];

    Object.keys(groupByName).forEach((name) => {
        let count = 0;
        groupByName[name].forEach((c) => (count += c.quantity));

        csv1Data.push(`${name}, ${count / totalRows}`);

        const groupByBrand = groupBy(groupByName[name], "brand");
        let size = 0;
        let popularBrand = "";
        Object.keys(groupByBrand).forEach((br) => {
            const s = groupByBrand[br].length;
            if (s > size) {
                size = s;
                popularBrand = br;
            }
        });
        csv2Data.push(`${name}, ${popularBrand}`);
    });

    return { csv1Data, csv2Data };
};

export const createCsvFile = (path: string, name: string, data: string[]) => {
    const writeStream = createWriteStream(path + name + ".csv");
    for (const item of data) writeStream.write(item + "\n");
};
