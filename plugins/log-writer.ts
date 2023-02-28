import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

let ACTUAL_FILES_DIR = path.resolve(__dirname, 'actual');

export function writeToLog(logFolderPath : string, logFileName : string, name : string, value : string | null){
	let logPath = path.resolve(logFolderPath, logFileName);
	let ws = fs.createWriteStream(logPath, {flags: "a"});
	csv.write([
		{"name": name, "value": value == null ? "" : value }
	], {headers: !fs.existsSync(logPath), includeEndRowDelimiter: true})
	.pipe(ws);
}

export function getLatestLogNumber(logFolderPath : string, logFileName : string) : number{
	let files = fs.readdirSync(logFolderPath);
	let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: "base"});
	files = files.filter(file => file.startsWith(path.parse(logFileName).name));
	files.sort(collator.compare);
	if (files.length > 0){
		let latest = files[files.length - 1];
		let latestFileName = path.parse(latest).name;
		let logNumMatch = latestFileName.match(/\d+$/);
		if (logNumMatch){
			return parseInt(logNumMatch[0]);
		}
	}
	return 0;
}

// writeToLog(ACTUAL_FILES_DIR, "foo.csv", "Expected1", "Value1");
// console.log(getLatestLogNumber(ACTUAL_FILES_DIR, "actual"));
