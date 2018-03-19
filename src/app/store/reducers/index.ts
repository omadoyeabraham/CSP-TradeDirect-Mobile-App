/**
 * Barrel file used to export functions and constants from the reducers folder.
 * Barrel files are used to reduce "import noise" in other files
 */

export * from "./root.reducer";
export * from "./auth/auth.reducers";
export * from "./user/user.reducer";
export * from "./error/error.reducer";
export * from "./selectedPage/selectedPage.reducer";

// STOCKBROKING
export * from "./stockbroking/portfolios.reducer";
export * from "./stockbroking/securities.reducer";
export * from "./stockbroking/tradeOrder.reducer";
export * from "./stockbroking/marketdata.reducer";
export * from "./stockbroking/sma.reducer";
export * from "./stockbroking/watchlist.reducer";

// FIXED INCOME
export * from "./fixedIncome/fixedIncome.reducer";

// Cash
export * from "./cash/cash.reducer";
