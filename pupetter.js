const puppeteer = require('puppeteer')

!(async() => {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    //晴れる屋のサイトに遷移
    await page.goto('https://www.hareruyamtg.com/ja/products/search?cardset=242&rarity%5B0%5D=4&rarity%5B1%5D=3&foilFlg%5B0%5D=0&sort=price&order=DESC&page=1');

    //datasにitemNameの値を全て取得後、配列にして代入
    const datas = await page.evaluate(() => {
      const list = [...document.querySelectorAll('.itemName')];
      return list.map(data => data.textContent.trim());
    });

    //pricesにitemDetail__priceの値を全て取得後、配列にして代入
    const prices = await page.evaluate(() => {
      const list = [...document.querySelectorAll('.itemDetail__price')];
      return list.map(data => data.textContent);
    });

    //上位５枚のカード名と値段を表示
    for(let i = 0; i < 5; i++){
      console.log(`第${i + 1}位`);
      console.log(`${datas[i]} ${prices[i]}`);
    };

    browser.close()
  } catch(e) {
    console.error(e)
  }
})()