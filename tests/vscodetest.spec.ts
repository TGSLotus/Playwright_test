import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/?folder=/home/tim/DemoSample');
  await page.getByRole('checkbox', { name: '親フォルダー \'tim\' 内のすべてのファイルの作成者を信頼します' }).click();
  await page.getByRole('button', { name: 'はい、作成者を信頼します フォルダーを信頼してすべての機能を有効にする' }).click();
  await page.getByRole('tab', { name: 'QTGメニュー' }).locator('a').click();
  await page.locator('.monaco-tl-twistie').click();
  await page.locator('a').filter({ hasText: 'post_price.cpp' }).click({
    button: 'right'
  });
  await page.getByRole('menuitem', { name: 'テスト仕様の作成' }).click();
  await page.getByPlaceholder('テスト対象関数を選択').click();
  await page.getByPlaceholder('テスト対象関数を選択').fill('EPost');
  await page.getByRole('option', { name: 'PostPriceMain(EPostKind)' }).locator('a').click();
  await page.frameLocator('iframe.webview').frameLocator('#active-frame').getByRole('button', { name: 'テストセットの追加' }).click();
//   await page.frameLocator('iframe[name="\\39 23b7764-ed48-47b2-8414-bec63528ff29"]').frameLocator('#active-frame').getByText('Test').dblclick();
//   await page.frameLocator('iframe[name="\\39 23b7764-ed48-47b2-8414-bec63528ff29"]').frameLocator('#active-frame').getByText('Test').click();
//   await page.frameLocator('iframe.webview').frameLocator('#active-frame').getByRole('group', { name: 'テストセット一覧' }).getByRole('textbox').fill('Test 2');
  await page.frameLocator('iframe.webview').frameLocator('#active-frame').locator('div[data-rgcol="1"][data-rgrow="0"]').dblclick();
  await page.waitForTimeout(3000); 
  await page.frameLocator('iframe.webview').frameLocator('#active-frame').getByRole('group', { name: 'テストセット一覧' }).getByRole('textbox').fill('Hello World ABCD');
  //await page.frameLocator('iframe.webview').frameLocator('#active-frame').locator('div[data-rgcol="1"][data-rgrow="0"]').fill("Hello World");
  await page.waitForTimeout(3000);
});