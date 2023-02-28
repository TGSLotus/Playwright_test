import { test, expect } from '@playwright/test';

let scroll = async (args) => {
  const {direction, speed} = args;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const scrollHeight = () => document.body.scrollHeight;
  const start = direction === "down" ? 0 : scrollHeight();
  const shouldStop = (position) => direction === "down" ? position > scrollHeight() : position < 0;
  const increment = direction === "down" ? 100 : -100;
  const delayTime = speed === "slow" ? 50 : 10;
  console.error(start, shouldStop(start), increment)
  for (let i = start; !shouldStop(i); i += increment) {
      window.scrollTo(0, i);
      await delay(delayTime);
  }
};

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/?folder=/home/tim/DemoSample');
  await page.getByRole('button', { name: 'はい、作成者を信頼します フォルダーを信頼してすべての機能を有効にする' }).click();
//   await page.getByRole('menuitem', { name: 'アプリケーション メニュー' }).locator('div').click();
//   await page.locator('.action-menu-item').first().click();
//   await page.getByRole('menuitem', { name: 'フォルダーを開く... Ctrl+K Ctrl+O' }).click();
//   await page.getByRole('combobox', { name: '入力すると結果が絞り込まれます。 - フォルダーを開く' }).fill('/home/tim/DemoSample');
//   await page.getByRole('combobox', { name: '入力すると結果が絞り込まれます。 - フォルダーを開く' }).press('Enter');
//   await page.getByRole('combobox', { name: '入力すると結果が絞り込まれます。 - フォルダーを開く' }).press('Enter');
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
  await page.frameLocator('iframe[class="webview ready"]').frameLocator('#active-frame').getByRole('button', { name: 'テストセットの編集' }).click();
  await page.waitForTimeout(3000);
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('div[class="testScopeGridClass"]').hover();
  await page.waitForTimeout(5000);

  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('revogr-viewport-scroll').getByText('GetPricePostCard()').click();
  await page.mouse.wheel(0, 1000);
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('revogr-viewport-scroll').getByText('CPostLetterPack::SetSizeWeight(unsigned int, unsigned int)').click();
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('revogr-viewport-scroll').locator("#stubCheckBox25").click();
//   await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('revogr-viewport-scroll').locator('#stubCheckBox25').press('ArrowRight');

  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('div[data-rgcol="10"][data-rgrow="25"]').dblclick();
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox').fill('5');
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox').press('Enter');
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('div[data-rgcol="12"][data-rgrow="25"]').dblclick();
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox').fill('10');
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('textbox').press('Enter');
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('button', { name: 'コールツリー表示' }).click();
  await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').getByRole('button', { name: '+' }).click();
  await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator('#expandButton4').click();
  await page.getByRole('tab', { name: 'コールツリービュー: PostPriceMain(EPostKind).ts.json, エディター グループ 2' }).getByRole('button', { name: '閉じる (Ctrl+F4)' }).click();
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('tab', { name: 'テスト範囲入出力変数一覧' }).click();
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('button', { name: '入出力変数の自動追加' }).click();
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
  await expect(page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator("#ioVarNames")).toHaveText('g_Letter.m_eLetterKind');
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('vscode-panel-tab[id="common-tab-ecCombination"]').click();
  await page.waitForTimeout(1500);
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('svg').click();
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('option', {name: 'g_Letter.m_eLetterKind'}).click();
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('tab', {name: '動作パス'}).click();
  await page.waitForTimeout(3000);
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByText('A > B > B2 > D > I').click();
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
  await expect(page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator("#selectedControlPathOutput")).toHaveText('A > B > B1 > I');
  
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('button', { name: '組み合わせを生成する' }).click();
  await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').locator('vscode-checkbox[aria-label="A > B > B2 > D > I"]').click({force: true});
  await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('checkbox', { name: 'ePostKind' }).click();
  await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('checkbox', { name: 'g_Letter.m_oSize.m_uLength' }).click();
  await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('checkbox', { name: 'g_Letter.m_oSize.m_uWidth' }).click();
  await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('checkbox', { name: 'g_Letter.m_oSize.m_uHight' }).click();
  await expect(page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').locator("#generateCombinateNum")).toHaveText('54');
  await page.frameLocator('iframe[class="webview ready"]').nth(4).frameLocator('#active-frame').getByRole('button', { name: '組み合わせを生成する' }).click();

  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator("revogr-data[slot='data']").locator("div[class='rgRow']").locator("div[data-rgrow='0'][data-rgcol='6']").nth(1).dblclick();
  await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator('div[class="revo-dropdown-list top"]').locator("revo-list").locator("li").getByText("同値クラス1").click();
  await expect(page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').locator("div[class='rgRow']").locator("div[data-rgrow='0'][data-rgcol='6']").nth(1)).toHaveText("同値クラス1");

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


  //   await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator('div[class="ecCell-body"]').locator('.codicon codicon-add').click();
  // await page.getByRole('tab', { name: 'コントロールフロー図: PostPriceMain(EPostKind)' }).getByRole('button', { name: '閉じる (Ctrl+F4)' }).click(); TabView Close if needed (optional)
  // await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator('td[class="ioVarCell-body"]').getByText("g_Letter.m_eLetterKind").click();
  // await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').locator('div[class="ecCell-body"]').locator('.codicon codicon-add').click();
  // await page.frameLocator('iframe[class="webview ready"]').nth(1).frameLocator('#active-frame').getByRole('tab', { name: '同値クラス組み合わせ編集' }).click();
  // await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').getByRole('textbox').fill('g_Letter.m_elementKind');
  // await page.frameLocator('iframe[class="webview ready"]').nth(2).frameLocator('#active-frame').getByRole('textbox').press('Enter');

});
//ecTableRow-leftAddButton/locator('div[c]')  