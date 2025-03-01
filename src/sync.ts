import { Vault } from "obsidian";
import { parseCsvFile } from "./csv";
import { ObsidianPluginMtgSettings } from "./settings";
import {
	CardData,
	getCardDataByCode,
	MAX_SCRYFALL_BATCH_SIZE,
	ScryfallResponse,
} from "./scryfall";

export const syncFileIntoCollection = async (
	vault: Vault,
	settings: ObsidianPluginMtgSettings,
	filePath: string,
	cardList: string
): Promise<null> => {
	const cardStrs: string[] = cardList.split("//");
	var cardCount: Record<string, number> = {};
	var cards: CardData[] = [];
	await Promise.all(
		cardStrs.map(async (cardStr: string) => {
			const [set, number, count] = cardStr.split(":");
			if (set != "" && number != "" && count != "") {
				const data = await getCardDataByCode(set, number);
				if (data.id) {
					cards.push(data);
					cardCount[data.id] = Number(count);
				}
			}
		})
	);
	// Open and add to collection CSV saving the count, set, name, number and source file (and dedupe on all)

	return null;
};
