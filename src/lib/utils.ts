import type { Activity } from "../types/polymarket";

export function convertTimestampToDate(timestamp: number) {
	return new Date(timestamp * 1000).toLocaleString(undefined, {
		year: "numeric",
		month: "numeric",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
		timeZone: "UTC", // need to use UTC to guarantee consistent output
	});
}

export function volumeMetricsCalc(activityData: Activity[]): {
    buyCount: number;
    buyTotal: number;
    redeemCount: number;
    redeemTotal: number;
    difference: number;
} {
    if (!activityData || activityData.length === 0) {
        return {
            buyCount: 0,
            buyTotal: 0,
            redeemCount: 0,
            redeemTotal: 0,
            difference: 0,
        };
    }

    const buyActivities = activityData.filter(
        (a) => a.side === "BUY" || a.type === "TRADE",
    );
    const redeemActivities = activityData.filter((a) => a.type === "REDEEM");

    const buyTotal = buyActivities.reduce(
        (sum, a) => sum + (a.usdcSize || 0),
        0,
    );
    const redeemTotal = redeemActivities.reduce(
        (sum, a) => sum + (a.usdcSize || 0),
        0,
    );

    return {
        buyCount: buyActivities.length,
        buyTotal: Number(buyTotal.toFixed(2)),
        redeemCount: redeemActivities.length,
        redeemTotal: Number(redeemTotal.toFixed(2)),
        difference: Number((redeemTotal - buyTotal).toFixed(2)),
    };
};