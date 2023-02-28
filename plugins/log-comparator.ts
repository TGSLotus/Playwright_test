// const htmlCreator = require('html-creator');

import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const tableBuilder = require("table-builder")
var Table = require('table-builder');

/**
 * ==================== Configurations START ====================
 */
const LABELS_LANG = "JP";
let EXPECTED_FILEPATH = "D:\\AWS Projects\\Dev E\\GAIO\\GAIOTA\\Playwright\\tests\\expected\\expected.csv";
// let ACTUAL_FILES_DIR =  path.resolve(__dirname, 'actual');
let ACTUAL_FILES_DIR =  "D:\\AWS Projects\\Dev E\\GAIO\\GAIOTA\\Playwright\\tests\\actual-logs";

/**
 * ===================== Configurations END =====================
 */

/**
 * ===================== Command Line Parameter START =====================
 */
interface cmdParamStruct {
	expected_filepath: string,
	actual_files_dir: string
};

let cmdParams : any = {
	expected_filepath: "",
	actual_files_dir: ""
};

process.argv.forEach(function (val, index, array){
	console.log(`Index: ${index}, Value: ${val}`)
	// if (index == 1){
	// 	cmdParams["expected_filepath"] = val;
	// }else if (index == 2){
	// 	cmdParams["actual_files_dir"] = val;
	// }
});

if (cmdParams.hasOwnProperty("expected_filepath") && cmdParams["expected_filepath"] != ""){
	EXPECTED_FILEPATH = cmdParams["expected_filepath"];
}

if (cmdParams.hasOwnProperty("actual_files_dir") && cmdParams["actual_files_dir"] != ""){
	ACTUAL_FILES_DIR = cmdParams["actual_files_dir"];
}

console.log(`EXPECTED_FILEPATH: ${EXPECTED_FILEPATH}`);
console.log(`ACTUAL_FILES_DIR: ${ACTUAL_FILES_DIR}`);

/**
 * ===================== Command Line parameters END =====================
 */
let expectedCsv : string[] = [];

interface expectedRow {
	name: string,
	value: string
};

let overallResultPASS = true;
let outputJSONHeaders : {} = {};
let outputJSON : [{}] = [{}];
outputJSON.shift();

// initComparison();

async function initComparison(){
	let expectedCSV = await parseCSV(path.resolve(EXPECTED_FILEPATH), true);
	let expectedCsvRows : [expectedRow] = expectedCSV.csvRows;
	console.log(JSON.stringify(expectedCSV));
	let actualCSVs : {} = await parseActual();
	console.log(JSON.stringify(actualCSVs));

	let labels = localizationLabels(LABELS_LANG);

	(outputJSONHeaders as any)["paramName"] = labels["parameter-name"];
	(outputJSONHeaders as any)["expected"] = labels["expected"];

	let actualCsvKeys : string[] = [];

	for (let key in actualCSVs){
		actualCsvKeys.push(key);
		(outputJSONHeaders as any)[key.replace(" ", "_")] = key;
	}

	console.log(JSON.stringify(outputJSONHeaders));

	expectedCsvRows.forEach(function(val, idx, arr){
		let outputJSONValues : {} = {};
		let expectedName = val["name"];
		let expectedVal = val["value"];
		(outputJSONValues as any)["paramName"] = expectedName;
		(outputJSONValues as any)["expected"] = expectedVal;

		console.log(`Checking the expected value for ${expectedName}`);
		actualCsvKeys.forEach(function(key){
			let actualCsvRow : [expectedRow] = (actualCSVs as any)[key]["csvRows"];
			console.log(JSON.stringify(actualCsvRow));
			let filteredRow = actualCsvRow.find(actualRow => actualRow.name == expectedName);
			console.log("filtered row:");
			console.log(filteredRow);
			if (filteredRow == undefined){
				(outputJSONValues as any)[key.replace(" ", "_")] = `<span class='result-skip'><strong>${labels["skip"]}</strong></span>`;
			}else{
				let PASS_FAIL = filteredRow.value === expectedVal ? "PASS" : "FAIL";
				if (PASS_FAIL == "FAIL"){
					overallResultPASS = false;
				}
				let resultClass = PASS_FAIL == "PASS" ? "result-pass" : "result-fail";
				let resultHtml = `<span class="${resultClass}">${filteredRow.value}</span>`;		
				// (outputJSONValues as any)[key.replace(" ", "_")] = `${filteredRow.value}_${PASS_FAIL}`;
				(outputJSONValues as any)[key.replace(" ", "_")] = `${resultHtml}`;
			}
		});
		outputJSON.push(outputJSONValues);
	});
	// console.log("FINAL OUTPUT:?:::");
	// console.log(JSON.stringify(outputJSON));
	let outputTitlesJSON = {
		"overall-result": `<span class='${overallResultPASS ? 'overall-result-pass' : 'overall-result-fail'}'>${overallResultPASS ? "PASS" : "FAIL"}</span>`
	}

	let outputStyle = generateOutputStyles();
	let outputTitles = generateOutputTitles(outputTitlesJSON);
	let outputTableHTML = new Table(({'class': 'comparison-table'}))
	.setHeaders(outputJSONHeaders)
	.setData(outputJSON)
	.render();

	let outputHTML = `${outputStyle} ${outputTitles} ${outputTableHTML}`

	// console.log(
	// 	outputTableHTML
	// );

	fs.mkdir('../log-comparison-report', {recursive: true}, err => {
		if (err) console.error(err);
	});

	fs.writeFile('../log-comparison-report/output.html', `${outputHTML}`, err => {
		if (err) console.error(err);
	});
}



async function parseExpected(){
	let expectedCSV = await parseCSV(path.resolve(__dirname, 'expected.csv'));
	// console.log(JSON.stringify(expectedCSV));
}

async function parseActual(){
	let actualFolderPath = ACTUAL_FILES_DIR;
	// console.log(actualFolderPath);
	let actualFolderFiles = await getFolderFiles(actualFolderPath);
	let actualCSVs : {} = {};
	// actualCSVs.shift();
	return new Promise<{}>((resolve, reject) => {
		if (actualFolderFiles.length > 0){
			actualFolderFiles.forEach(function(val, idx, arr){
				parseCSV(path.resolve(actualFolderPath, val)).then(function(result){
					let actualCsvJson = {[val]: result};
					// console.log(JSON.stringify(actualCsvJson));
					// actualCSVs.push(actualCsvJson);
					(actualCSVs as any)[val] = {};
					(actualCSVs as any)[val] = result;
					if (idx === arr.length -1){
						resolve(actualCSVs);
					}
				});
			});
		}
	});
}

function getFolderFiles(folderPath : string) : Promise<string[]> {
	let fileList : string[] = [];
	
	return new Promise<string[]>((resolve, reject) => {
		fs.readdir(folderPath, (err, files) => {
			files.forEach(file => {
				if (file.endsWith('csv')){
					// console.log(file);
					fileList.push(file);
				}
			});
			resolve(fileList);
		});
	});	
}


function parseCSV(filepath : string, isExpectedFile : boolean = false) : Promise<{csvRows: any, expectedFile: boolean}>{
	let parsedCSV : string[] = [];
	
	return new Promise((resolve,reject) => {
		fs.createReadStream(path.resolve(filepath))
		.pipe(csv.parse({headers: true}))
		.on('error', error => {
			console.error(error);
			reject(error);
		})
		.on('data', row => {
			// console.log(row);
			parsedCSV.push(row);
		})
		.on('end', function(rowCount: number) {
			// console.log(`Parsed ${rowCount} rows`);
			// console.log(JSON.stringify(expectedCsv));
			resolve({csvRows : parsedCSV, expectedFile: isExpectedFile})
		});
	});
}

function localizationLabels(languageCode : string = 'JP'){
	let localization : any = {
		'JP': {
			'expected': '期待される結果',
			'overall-result': '全体的な結果',
			'parameter-name': 'パラメータ名',
			'skip': 'なし',
			'timestamp': 'タイムスタンプ',
			'title': 'タイトル'
		}, 'EN':{
			'expected': 'Expected',
			'overall-result': 'Overall Result',
			'parameter-name': 'Parameter Name',
			'skip': 'Skip',
			'timestamp': 'Timestamp',
			'title': 'Title',
		}
	};
	return localization[languageCode];
}

function generateOutputStyles(){
	let outputStyle = 
	`	
		<style>
		body{
			font-family:"ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro",Osaka, "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
		}
		.comparison-table{
			border-collapse: collapse;
		}
		.comparison-table td, th{
			border: 1px solid #ddd;
			padding: 8px;
		}

		.comparison-table td:has(> .result-fail){
			background-color: red;
		}

		.comparison-table td:has(> .result-skip){
			background-color: gray;
		}

		.overall-result-fail{
			color: red;
			font-weight: bold;			
		}
		.overall-result-pass{
			color: green;
			font-weight: bold;
		}
		.result-fail {
			font-weight: bold;
		}
		.result-pass {
			color: black;
		}
		</style>
	`;
	return outputStyle
}

function generateOutputTitles(outputTitlesJSON : any){
	let labels = localizationLabels(LABELS_LANG);
	let outputTitles =
	`
		<table>
			<tr><td><strong>${labels['title']}</strong></td><td>Log Comparison Output</td></tr>
			<tr><td><strong>${labels['timestamp']}</strong></td><td>${new Date().toISOString()}</td></tr>
			<tr><td><strong>${labels['overall-result']}</strong></td><td>${outputTitlesJSON["overall-result"]}</td></tr>
		</table>
	`;
	return outputTitles;
}