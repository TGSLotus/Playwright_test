import { test, expect, Page } from '@playwright/test';
import { writeToLog, getLatestLogNumber } from "../plugins/log-writer"

const logFolder = `${__dirname}\\actual-logs`;
const logFileName = `actual_log${getLatestLogNumber(logFolder, 'actual_log') + 1}.csv`;
// test.describe('test', () => {
test.describe.configure({ mode: 'serial' });

	let page: Page;
	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
	});

	test(`シナリオ1～2 : VS Codeを開くとVS Codeのソースコードフォルダを開く`, async() => {
		await page.goto('http://localhost:8080/?folder=/home/reynald/DemoSample');
		await page.getByRole('button', { name: 'はい、作成者を信頼します フォルダーを信頼してすべての機能を有効にする' }).click();  
	});

	test(`シナリオ3 : QTGの設定を行う`, async() => {

	});

	test(`シナリオ4 : QTG解析用ソースコードの選択`, async() => {
		await page.getByRole('tab', { name: 'QTGメニュー' }).locator('a').click();
		const srcScanButton = await page.$("text='QTGプロジェクトの作成'");
		if (srcScanButton) {
			srcScanButton.click();
		}
		await page.locator('.monaco-tl-twistie').click();
		await page.getByRole('button', { name: '全て除外' }).click();
		await page.getByRole('button', { name: '全て追加' }).click();
		await page.getByRole('button', { name: 'コード解析の実行' }).click();
		await page.waitForTimeout(2000);
		// await page.screenshot({ path: 'playwright-report/1.png', fullPage: true });
		let vari1 = await page.locator('a').filter({hasText:'post_base.cpp'}).textContent();
		writeToLog(logFolder, logFileName, "Source name 1", vari1);
		await page.waitForTimeout(2000);
		let corno1 = page.locator('a').filter({hasText: `${vari1}`}).filter({hasText: 'check'}) ? "Yes" : "No";
		writeToLog(logFolder, logFileName, `Is_checked?_${vari1}`, corno1);
		await page.waitForTimeout(2000);
		
		let vari2 = await page.locator('a').filter({hasText:'post_base.hpp'}).textContent();
		writeToLog(logFolder, logFileName, "Source name 2", vari2);
		await page.waitForTimeout(2000);
		let corno2 = page.locator('a').filter({hasText: `${vari2}`}).filter({hasText: 'check'}) ? "Yes" : "No";
		writeToLog(logFolder, logFileName, `Is_checked?_${vari2}`, corno2);
		await page.waitForTimeout(2000);

		let vari3 = await page.locator('a').filter({hasText:'post_card.cpp'}).textContent();
		writeToLog(logFolder, logFileName, "Source name 3", vari3);
		await page.waitForTimeout(2000);
		let corno3 = page.locator('a').filter({hasText: `${vari3}`}).filter({hasText: 'check'}) ? "Yes" : "No";
		writeToLog(logFolder, logFileName, `Is_checked?_${vari3}`, corno3);
		await page.waitForTimeout(2000);

		let vari4 = await page.locator('a').filter({hasText:'post_card.hpp'}).textContent();
		writeToLog(logFolder, logFileName, "Source name 4", vari4);
		await page.waitForTimeout(2000);
		let corno4 = page.locator('a').filter({hasText: `${vari4}`}).filter({hasText: 'check'}) ? "Yes" : "No";
		writeToLog(logFolder, logFileName, `Is_checked?_${vari4}`, corno4);
		await page.waitForTimeout(2000);

		let vari5 = await page.locator('a').filter({hasText:'post_input.cpp'}).textContent();
		writeToLog(logFolder, logFileName, "Source name 5", vari5);
		await page.waitForTimeout(2000);
		let corno5 = page.locator('a').filter({hasText: `${vari5}`}).filter({hasText: 'check'}) ? "Yes" : "No";
		writeToLog(logFolder, logFileName, `Is_checked?_${vari5}`, corno5);
		await page.waitForTimeout(2000);
		
		let vari6 = await page.locator('a').filter({hasText:'post_input.hpp'}).textContent();
		writeToLog(logFolder, logFileName, "Source name 6", vari6);
		await page.waitForTimeout(2000);
		let corno6 = page.locator('a').filter({hasText: `${vari6}`}).filter({hasText: 'check'}) ? "Yes" : "No";
		writeToLog(logFolder, logFileName, `Is_checked?_${vari6}`, corno6);
		await page.waitForTimeout(2000);

		let vari7 = await page.locator('a').filter({hasText:'post_letter_ex.cpp'}).textContent();
		writeToLog(logFolder, logFileName, "Source name 7", vari7);
		await page.waitForTimeout(2000);
		let corno7 = page.locator('a').filter({hasText: `${vari7}`}).filter({hasText: 'check'}) ? "Yes" : "No";
		writeToLog(logFolder, logFileName, `Is_checked?_${vari7}`, corno7);
		await page.waitForTimeout(2000);

		let vari8 = await page.locator('a').filter({hasText:'post_letter_ex.hpp'}).textContent();
		writeToLog(logFolder, logFileName, "Source name 8", vari8);
		await page.waitForTimeout(2000);
		let corno8 = page.locator('a').filter({hasText: `${vari8}`}).filter({hasText: 'check'}) ? "Yes" : "No";
		writeToLog(logFolder, logFileName, `Is_checked?_${vari8}`, corno8);
		await page.waitForTimeout(2000);

		let vari9 = await page.locator('a').filter({hasText:'post_letter.cpp'}).textContent();
		writeToLog(logFolder, logFileName, "Source name 9", vari9);
		await page.waitForTimeout(2000);
		let corno9 = page.locator('a').filter({hasText: `${vari9}`}).filter({hasText: 'check'}) ? "Yes" : "No";
		writeToLog(logFolder, logFileName, `Is_checked?_${vari9}`, corno9);
		await page.waitForTimeout(2000);

		let vari10 = await page.locator('a').filter({hasText:'post_letter.hpp'}).textContent();
		writeToLog(logFolder, logFileName, "Source name 10", vari10);
		await page.waitForTimeout(2000);
		let corno10 = page.locator('a').filter({hasText: `${vari10}`}).filter({hasText: 'check'}) ? "Yes" : "No";
		writeToLog(logFolder, logFileName, `Is_checked?_${vari10}`, corno10);
		await page.waitForTimeout(2000);

		let vari11 = await page.locator('a').filter({hasText:'post_price.cpp'}).textContent();
		writeToLog(logFolder, logFileName, "Source name 11", vari11);
		await page.waitForTimeout(2000);
		let corno11 = page.locator('a').filter({hasText: `${vari11}`}).filter({hasText: 'check'}) ? "Yes" : "No";
		writeToLog(logFolder, logFileName, `Is_checked?_${vari11}`, corno11);
		await page.waitForTimeout(2000);
	});

	test(`シナリオ5 : テスト仕様書の作成`, async() => {
		await page.waitForSelector('div[class="notification-list-item-message"]', {state: 'hidden'});
		await page.getByRole('button', { name: '閉じる (Ctrl+F4)' }).click();
		await page.waitForSelector('button[name="閉じる (Ctrl+F4)"]', {state: 'hidden'});
		await page.locator('a').filter({ hasText: 'post_price.cpp' }).click({button: 'right'});
		await page.waitForTimeout(1000);
		await page.getByRole('menuitem', { name: 'テスト仕様の作成' }).dblclick();
		await page.getByPlaceholder('テスト対象関数を選択').fill('Epost');
		await page.getByRole('option', { name: 'PostPriceMain(EPostKind)' }).locator('a').click();
		await page.waitForSelector('.notification-toast-container',{state: 'detached'});
		// await page.waitForTimeout(3000);
		//await page.frameLocator('iframe[name="\\31 370b85c-0204-4f54-bdf8-90da16b33c3e"]').frameLocator('#active-frame').getByText('テスト対象設定').click();
		await page.frameLocator('iframe[class="webview ready"]').frameLocator('#active-frame').getByRole('button', { name: 'テストセットの追加' }).click();
		await page.frameLocator('iframe[class="webview ready"]').frameLocator('#active-frame').locator('div[data-rgcol="1"][data-rgrow="0"]').dblclick();
		await page.frameLocator('iframe[class="webview ready"]').frameLocator('#active-frame').getByRole('group', { name: 'テストセット一覧' }).getByRole('textbox').press('Control+a');
		await page.frameLocator('iframe[class="webview ready"]').frameLocator('#active-frame').getByRole('group', { name: 'テストセット一覧' }).getByRole('textbox').fill('Test Spec 1');
		await page.frameLocator('iframe[class="webview ready"]').frameLocator('#active-frame').getByRole('group', { name: 'テストセット一覧' }).getByRole('textbox').press('Enter');
		await page.frameLocator('iframe[class="webview ready"]').frameLocator('#active-frame').locator('.rgRow > div:nth-child(3)').dblclick();
		await page.frameLocator('iframe[class="webview ready"]').frameLocator('#active-frame').getByRole('group', { name: 'テストセット一覧' }).getByRole('textbox').fill('結合操作確認');
		await page.frameLocator('iframe[class="webview ready"]').frameLocator('#active-frame').getByRole('group', { name: 'テストセット一覧' }).getByRole('textbox').press('Enter');
		await page.frameLocator('iframe[class="webview ready"]').frameLocator('#active-frame').locator('span').nth(1).click();
		// await page.waitForSelector('結合',{state: 'visible'});
		await page.waitForTimeout(3000);
		await page.frameLocator('iframe[class="webview ready"]').frameLocator('#active-frame').locator('li').filter({hasText: "結合"}).click();
	});

	test(`シナリオ6 : テスト セットの編集`, async() => {
		await page.frameLocator('iframe[class="webview ready"]').frameLocator('#active-frame').getByRole('button', { name: 'テストセットの編集' }).click();
		await page.waitForTimeout(3000);
		// Check 6 buttons
	});

	test(`シナリオ7 : テスト セットの編集 ー 試験範囲設定`, async() => {
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('div[class="testScopeGridClass"]').hover();
		await page.waitForTimeout(5000);
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('revogr-viewport-scroll').getByText('GetPricePostCard()').click();
		await page.mouse.wheel(0, 1000);
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('revogr-viewport-scroll').getByText('CPostLetterPack::SetSizeWeight(unsigned int, unsigned int)').click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('revogr-viewport-scroll').locator("#stubCheckBox25").click();
		// Check column 6 and column 7 value
	});

	test(`シナリオ8 : テスト セットの編集　ー テスト範囲設定`, async() => {
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('div[data-rgcol="10"][data-rgrow="25"]').dblclick();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox').fill('5');
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox').press('Enter');
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('div[data-rgcol="12"][data-rgrow="25"]').dblclick();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox').fill('10');
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox').press('Enter');
	});

	test(`シナリオ9 : テスト セットの編集　ー テスト範囲`, async() => {
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('button', { name: 'コールツリー表示' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').getByRole('button', { name: '+' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator('#expandButton4').click();
		await page.getByRole('tab', { name: 'コールツリービュー: PostPriceMain(EPostKind).ts.json, エディター グループ 2' }).getByRole('button', { name: '閉じる (Ctrl+F4)' }).click();
	});

	test(`シナリオ10 : VS Codeのソースコードフォルダを開く`, async() => {
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('tab', { name: 'テスト範囲入出力変数一覧' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('button', { name: '入出力変数の自動追加' }).click();
	});

	test(`シナリオ11 : テスト セットの編集　ー テスト仕様設定`, async() => {
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('tab', { name: '入出力変数のデータ仕様編集' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('#ioVarTable').getByText('有効な値範囲').click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('group', { name: '入出力変数の一覧' }).getByRole('button', { name: 'データ型から有効な値範囲を設定する' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox', { name: 'フィルタ文字列' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox', { name: 'フィルタ文字列' }).fill('ePostKind');
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox', { name: 'フィルタ文字列' }).press('Enter');
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('#ioVarTable').filter({hasText: "ePostKind"}).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('.jumpToCodeButton > .codicon').click();
		await page.getByRole('tab', { name: 'post_price.cpp、プレビュー' }).getByRole('button', { name: '閉じる (Ctrl+F4)' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('tab', { name: '同値クラス編集' }).click();
		await page.waitForTimeout(5000);
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('button', { name: '同値クラスを分析する' }).click();
		await page.waitForTimeout(2000);
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('td[class="ioVarCell"]').filter({hasText: 'ePostKind'}).click();
		await page.waitForTimeout(2000);
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('tr[class="ecTableRow ecTableRow-selected"]').filter({hasText: "同値クラス1"}).click();
		await page.waitForTimeout(2000);
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('group', {name: '選択中の同値クラスのデータ仕様'}).getByRole('button', {name: "下限-/代表値/上限+ を自動入力する"}).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox', { name: 'フィルタ文字列' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox', { name: 'フィルタ文字列' }).fill('g_Letter.m_eLetterKind');
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox', { name: 'フィルタ文字列' }).press('Enter');
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('td[class="ioVarCell"]').filter({hasText: 'g_Letter.m_eLetterKind'}).nth(1).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('tr[class="ecTableRow ecTableRow-selected"]').locator('vscode-button[class="ecTableRow-rightAddButton"]').click();
		await page.waitForTimeout(1500);
		let var1 = await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator("#ioVarNames").textContent();
		writeToLog(logFolder, logFileName, "Variable Name 1", var1);
		await expect(page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator("#ioVarNames")).toHaveText('g_Letter.m_eLetterKind');
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('vscode-panel-tab[id="common-tab-ecCombination"]').click();
		await page.waitForTimeout(1500);
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('svg').click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('option', {name: 'g_Letter.m_eLetterKind'}).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('tab', {name: '動作パス'}).click();
		await page.waitForTimeout(3000);
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByText('A > B > B2 > D > I').click();
		let var2 = await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator("#selectedControlPathOutput").textContent();
		writeToLog(logFolder, logFileName, "Control Path 1", var2);
		await expect(page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator("#selectedControlPathOutput")).toHaveText('A > B > B2 > D > I');
		await page.waitForTimeout(3000);
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('group', { name: '出力に関する入力変数／動作パス／同値クラス組み合わせ' }).getByRole('tab', { name: '同値クラス組み合わせ' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('button', { name: '組み合わせを生成する' }).click();
	//   await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').getByRole('checkbox', { name: 'A > B > B1 > I' }).click();
		// page.pause();
		await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').locator('vscode-checkbox[aria-label="A > B > B1 > I"]').click({force: true});
		await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('checkbox', { name: '動作パスに関する入力変数のみ表示する' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('checkbox', { name: 'ePostKind' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('button', { name: '組み合わせを生成する' }).click();
	
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator("div[class='rgRow']").locator("div[data-rgrow='0'][data-rgcol='1']").getByText('同値クラス2').click();
		let var3 = await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator("#selectedControlPathOutput").textContent();
		writeToLog(logFolder, logFileName, "Control Path 2", var3);
		await expect(page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator("#selectedControlPathOutput")).toHaveText('A > B > B1 > I');
		
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('button', { name: '組み合わせを生成する' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').locator('vscode-checkbox[aria-label="A > B > B2 > D > I"]').click({force: true});
		await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('checkbox', { name: 'ePostKind' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('checkbox', { name: 'g_Letter.m_oSize.m_uLength' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('checkbox', { name: 'g_Letter.m_oSize.m_uWidth' }).click();
		await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('checkbox', { name: 'g_Letter.m_oSize.m_uHight' }).click();
		let var4 = await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').locator("#generateCombinateNum").textContent();
		writeToLog(logFolder, logFileName, "Combination Number", var4);
		await expect(page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').locator("#generateCombinateNum")).toHaveText('54');
		await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('button', { name: '組み合わせを生成する' }).click();
	
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator("revogr-data[slot='data']").locator("div[class='rgRow']").locator("div[data-rgrow='0'][data-rgcol='6']").nth(1).dblclick();
		await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('div[class="revo-dropdown-list top"]').locator("revo-list").locator("li").getByText("同値クラス1").click();
		let var5 = await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator("div[class='rgRow']").locator("div[data-rgrow='0'][data-rgcol='6']").nth(1).textContent();
		writeToLog(logFolder, logFileName, "Equivalence Class Name 1", var5);
		await expect(page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator("div[class='rgRow']").locator("div[data-rgrow='0'][data-rgcol='6']").nth(1)).toHaveText("同値クラス1");
	});

	test(`シナリオ12 : テスト セットの編集　ー テスト ケースを作成する`, async() => {
	// Scenario#12 START
	await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('vscode-panel-tab[id="common-tab-testcase"]').click();
	await page.waitForTimeout(1500);
	await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('vscode-button[id="autoGenerateButton"]').click();
	await page.waitForTimeout(1500);
	await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').locator('input[type="checkbox"][id="modelValue"]').check();
	await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').locator('input[type="checkbox"][id="lowerValue"]').check();
	await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').locator('input[type="checkbox"][id="upperValue"]').check();
	await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').locator('button[id="previewButton"]').click();
	await page.waitForTimeout(5000);
	});

	test(`シナリオ13 : QTG 出力ファイルの収集`, async() => {
		const downloadPromise = page.waitForEvent('download');
		try{
			await page.goto('http://localhost:8080/download?downloadFolder=/home/reynald/DemoSample/DemoSample/qtg-dummy-output');
		}catch(e){}
		const download = await downloadPromise;
		// Wait for the download process to complete
		console.log(await download.path());
		// Save downloaded file somewhere
		await download.saveAs('C:\\Users\\user1.gaio\\OneDrive - pk.gec\\GAIO\\Playwright\\Playwright\\downloads\\' + download.suggestedFilename());
	});

// });

/*
test('test', async ({ page }) => {
//   await page.getByRole('menuitem', { name: 'アプリケーション メニュー' }).locator('div').click();
//   await page.locator('.action-menu-item').first().click();
//   await page.getByRole('menuitem', { name: 'フォルダーを開く... Ctrl+K Ctrl+O' }).click();
//   await page.getByRole('combobox', { name: '入力すると結果が絞り込まれます。 - フォルダーを開く' }).fill('/home/tim/DemoSample');
//   await page.getByRole('combobox', { name: '入力すると結果が絞り込まれます。 - フォルダーを開く' }).press('Enter');
//   await page.getByRole('combobox', { name: '入力すると結果が絞り込まれます。 - フォルダーを開く' }).press('Enter');

//   await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('revogr-viewport-scroll').locator('#stubCheckBox25').press('ArrowRight');

  //   await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator('div[class="ecCell-body"]').locator('.codicon codicon-add').click();
  // await page.getByRole('tab', { name: 'コントロールフロー図: PostPriceMain(EPostKind)' }).getByRole('button', { name: '閉じる (Ctrl+F4)' }).click(); TabView Close if needed (optional)
  // await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator('td[class="ioVarCell-body"]').getByText("g_Letter.m_eLetterKind").click();
  // await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator('div[class="ecCell-body"]').locator('.codicon codicon-add').click();
  // await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('tab', { name: '同値クラス組み合わせ編集' }).click();
  // await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').getByRole('textbox').fill('g_Letter.m_elementKind');
  // await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').getByRole('textbox').press('Enter');

});
//ecTableRow-leftAddButton/locator('div[c]')  */