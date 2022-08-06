import { readFileSync } from "fs";
import "jest";
import { join } from "path";
import { createCsvFile, filteringData, lineToObject } from "../src";

describe("csv exercise", () => {
    it("sould create file successfully", async () => {
        createCsvFile(join(__dirname, "/"), "test", ["color,name,brand"]);
        const path = join(__dirname, "./test.csv");
        const data = readFileSync(path, "utf8");
        expect(data.trim()).toEqual("color,name,brand");
    });

    it("should return correct object", () => {
        const object = lineToObject("ID426632,   Willa Hollow,   Intelligent Copper Knife,   4,  Hilll-Gorczany");
        expect(object.id).toEqual("ID426632");
        expect(object.quantity).toEqual(4);
    });

    it("should do the filtering", () => {
        const { csv1Data, csv2Data } = filteringData();
        expect(csv1Data.length).toEqual(csv2Data.length);
    });
});
