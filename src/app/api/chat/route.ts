import puppeteer from "puppeteer";
import parseChat from "@/util/parseChat";

export async function GET(req: Request) {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        slowMo: 100
    });
    const page = await browser.newPage();
    await page.setViewport({width: 1680, height: 1080});
    await page.goto("https://twitch.tv/kaicenat");

    // await chat?.screenshot({
    //     path: `./src/screenshots/${Date.now()}.png`,
    // });

    const chatHTML = await page.$eval(
        "#live-page-chat > div > div > div.Layout-sc-1xcs6mc-0.iTiPMO.chat-shell.chat-shell__expanded > div > div > section > div > div.Layout-sc-1xcs6mc-0.InjectLayout-sc-1i43xsx-0.chat-list--default.font-scale--default.iClcoJ > div.Layout-sc-1xcs6mc-0.InjectLayout-sc-1i43xsx-0.iWWhvN > div.scrollable-area > div.simplebar-scroll-content > div",
        (el) => el.innerHTML                 
    );

    await browser.close();

    const output = parseChat(chatHTML);
    console.log(output.messages.raw);
    console.log(output.messages.formatted);
    return Response.json(output.messages.formatted);
}
