import { readFileSync } from "fs";
import "jest";
import { join } from "path";
import { createCsvFile } from "../src";

describe("csv exercise", () => {
    it("sould create file successfully", async () => {
        createCsvFile(join(__dirname, "/"), "test", ["color,name,brand"]);
        const path = join(__dirname, "./test.csv");
        const data = readFileSync(path, "utf8");
        expect(data.trim()).toEqual("color,name,brand");
    });
});
