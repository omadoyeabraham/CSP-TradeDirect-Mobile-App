import {
  initialStockbrokingPortfolioState,
  initialStockbrokingActivePortfolioState,
  intialStbActivePortflioMetaData
} from "../../models/initialState";
import { IPortfolio } from "../../../stockbrokingModule/models/portfolio.interface";
import stbPortfolioReducer, {
  stbActivePortfolioReducer,
  stbActivePortfolioMetaDataReducer
} from "./portfolios.reducer";
import {
  SaveStbPortfoliosToStore,
  SetActivePortfolioInStore,
  SetActivePortfolioMetaData
} from "../../actions/stockbroking/portfolios.actions";
import { IStockBrokingPortfolioState } from "../../models/index";

describe("Portfolio Reducer", () => {
  let initialStbPortfoliosState: IStockBrokingPortfolioState;
  let testPortfolio_one: IPortfolio;
  let testPortfolio_two: IPortfolio;

  beforeEach(() => {
    initialStbPortfoliosState = initialStockbrokingPortfolioState;
    testPortfolio_one = {
      accountNo: "0067483269",
      active: true,
      availableCash: { currency: "NGN", amount: "12304.5790000000" },
      availableCredit: { currency: "NGN", amount: "0.0000000000" },
      clearingHouseNo: "C5793022JH",
      costBasis: { currency: "NGN", amount: "1995.1019120000" },
      currentValuation: { currency: "NGN", amount: "2893.6000000000" },
      customerId: 2862,
      dateOpened: "2017-05-31T00:00:00+01:00",
      id: 3791,
      label: "JOHN DOE - DEMO ACCOUNT 1",
      marginCallValue: { currency: "NGN", amount: "0.0000000000" },
      marginEquityValue: { currency: "NGN", amount: "0.0000000000" },
      marginMinMaintainValue: { currency: "NGN", amount: "0.0000000000" },
      marginPortfolioValue: { currency: "NGN", amount: "0.0000000000" },
      marginTradingPower: { currency: "NGN", amount: "0.0000000000" },
      name: "0000022803",
      percGain: 45.035197580423,
      portfolioClass: "EXCHANGE",
      portfolioHoldings: [
        {
          costBasis: "2.501875000",
          gain: "-2.001875000",
          marketPrice: "0.50",
          marketValue: "1.0000",
          percentGain: "-80.01",
          priceValueMultiple: "1",
          quantityHeld: "2.00",
          securityExchange: "NSE",
          securityId: 313,
          securityLabel: "AFROMEDIA PLC",
          securityName: "AFROMEDIA",
          securitySector: "Media",
          securityType: "EQUITY",
          valuation: "1.0000",
          valueDate: "2018-02-12T00:00:00+01:00"
        },
        {
          costBasis: "6.915688000",
          gain: "4.484312000",
          marketPrice: "11.40",
          marketValue: "672.6000",
          percentGain: "64.84",
          priceValueMultiple: "1",
          quantityHeld: "59.00",
          securityExchange: "NSE",
          securityId: 102,
          securityLabel: "FBN HOLDINGS PLC",
          securityName: "FBNH",
          securitySector: "Financial Services",
          securityType: "EQUITY",
          valuation: "672.6000",
          valueDate: "2018-02-12T00:00:00+01:00"
        },
        {
          costBasis: "32.14981300",
          gain: "13.30018700",
          marketPrice: "45.45",
          marketValue: "1818.0000",
          percentGain: "41.37",
          priceValueMultiple: "1",
          quantityHeld: "40.00",
          securityExchange: "NSE",
          securityId: 253,
          securityLabel: "STANBIC IBTC  HOLDINGS PLC",
          securityName: "STANBIC",
          securitySector: "Financial Services",
          securityType: "EQUITY",
          valuation: "1818.0000",
          valueDate: "2018-02-12T00:00:00+01:00"
        },
        {
          costBasis: "1.937088000",
          gain: "0.102912000",
          marketPrice: "2.04",
          marketValue: "204.0000",
          percentGain: "5.313",
          priceValueMultiple: "1",
          quantityHeld: "100.00",
          securityExchange: "NSE",
          securityId: 270,
          securityLabel: "TRANSNATIONAL CORPORATION OF NIGERIA PLC",
          securityName: "TRANSCORP",
          securitySector: "Conglomerates",
          securityType: "EQUITY",
          valuation: "204.0000",
          valueDate: "2018-02-12T00:00:00+01:00"
        },
        {
          costBasis: "0.6824750000",
          gain: "0.6375250000",
          marketPrice: "1.32",
          marketValue: "198.0000",
          percentGain: "93.41",
          priceValueMultiple: "1",
          quantityHeld: "150.00",
          securityExchange: "NSE",
          securityId: 301,
          securityLabel: "WEMA BANK PLC.",
          securityName: "WEMABANK",
          securitySector: "Banking",
          securityType: "EQUITY",
          valuation: "198.0000",
          valueDate: "2018-02-12T00:00:00+01:00"
        }
      ],
      portfolioType: "EXCHANGE PT",
      securityExchange: "NSE"
    };
    testPortfolio_two = {
      accountNo: "0067483269",
      active: true,
      availableCash: { currency: "NGN", amount: "12304.5790000000" },
      availableCredit: { currency: "NGN", amount: "0.0000000000" },
      clearingHouseNo: "C5793022JH",
      costBasis: { currency: "NGN", amount: "1995.1019120000" },
      currentValuation: { currency: "NGN", amount: "2893.6000000000" },
      customerId: 2862,
      dateOpened: "2017-05-31T00:00:00+01:00",
      id: 3792,
      label: "JOHN DOE - DEMO ACCOUNT 1",
      marginCallValue: { currency: "NGN", amount: "0.0000000000" },
      marginEquityValue: { currency: "NGN", amount: "0.0000000000" },
      marginMinMaintainValue: { currency: "NGN", amount: "0.0000000000" },
      marginPortfolioValue: { currency: "NGN", amount: "0.0000000000" },
      marginTradingPower: { currency: "NGN", amount: "0.0000000000" },
      name: "0000022803",
      percGain: 45.035197580423,
      portfolioClass: "EXCHANGE",
      portfolioHoldings: [
        {
          costBasis: "2.501875000",
          gain: "-2.001875000",
          marketPrice: "0.50",
          marketValue: "1.0000",
          percentGain: "-80.01",
          priceValueMultiple: "1",
          quantityHeld: "2.00",
          securityExchange: "NSE",
          securityId: 313,
          securityLabel: "AFROMEDIA PLC",
          securityName: "AFROMEDIA",
          securitySector: "Media",
          securityType: "EQUITY",
          valuation: "1.0000",
          valueDate: "2018-02-12T00:00:00+01:00"
        },
        {
          costBasis: "6.915688000",
          gain: "4.484312000",
          marketPrice: "11.40",
          marketValue: "672.6000",
          percentGain: "64.84",
          priceValueMultiple: "1",
          quantityHeld: "59.00",
          securityExchange: "NSE",
          securityId: 102,
          securityLabel: "FBN HOLDINGS PLC",
          securityName: "FBNH",
          securitySector: "Financial Services",
          securityType: "EQUITY",
          valuation: "672.6000",
          valueDate: "2018-02-12T00:00:00+01:00"
        },
        {
          costBasis: "32.14981300",
          gain: "13.30018700",
          marketPrice: "45.45",
          marketValue: "1818.0000",
          percentGain: "41.37",
          priceValueMultiple: "1",
          quantityHeld: "40.00",
          securityExchange: "NSE",
          securityId: 253,
          securityLabel: "STANBIC IBTC  HOLDINGS PLC",
          securityName: "STANBIC",
          securitySector: "Financial Services",
          securityType: "EQUITY",
          valuation: "1818.0000",
          valueDate: "2018-02-12T00:00:00+01:00"
        },
        {
          costBasis: "1.937088000",
          gain: "0.102912000",
          marketPrice: "2.04",
          marketValue: "204.0000",
          percentGain: "5.313",
          priceValueMultiple: "1",
          quantityHeld: "100.00",
          securityExchange: "NSE",
          securityId: 270,
          securityLabel: "TRANSNATIONAL CORPORATION OF NIGERIA PLC",
          securityName: "TRANSCORP",
          securitySector: "Conglomerates",
          securityType: "EQUITY",
          valuation: "204.0000",
          valueDate: "2018-02-12T00:00:00+01:00"
        },
        {
          costBasis: "0.6824750000",
          gain: "0.6375250000",
          marketPrice: "1.32",
          marketValue: "198.0000",
          percentGain: "93.41",
          priceValueMultiple: "1",
          quantityHeld: "150.00",
          securityExchange: "NSE",
          securityId: 301,
          securityLabel: "WEMA BANK PLC.",
          securityName: "WEMABANK",
          securitySector: "Banking",
          securityType: "EQUITY",
          valuation: "198.0000",
          valueDate: "2018-02-12T00:00:00+01:00"
        }
      ],
      portfolioType: "EXCHANGE PT",
      securityExchange: "NSE"
    };
  });

  it("returns the initial state", () => {
    const action = {} as any;
    const state = stbPortfolioReducer(undefined, action);

    expect(state).toEqual(initialStbPortfoliosState);
  });

  it("should set the portfolios on SaveStbPortfoliosToStore", () => {
    const action = new SaveStbPortfoliosToStore([
      testPortfolio_one,
      testPortfolio_two
    ]);

    //TODO: fix typescript issue which warranted the as any
    const state = stbPortfolioReducer(initialStbPortfoliosState as any, action);

    expect(state).toEqual({
      3791: testPortfolio_one,
      3792: testPortfolio_two
    });
  });
});

// STB ACTIVE PORTFOLIO
describe("Stb Active Portfolio", () => {
  let initialActivePortfolio: IPortfolio;

  beforeEach(() => {
    initialActivePortfolio = initialStockbrokingActivePortfolioState;
  });

  it("returns the initial state", () => {
    const action = {} as any;
    const state = stbActivePortfolioReducer(undefined, action);

    expect(state).toEqual(initialActivePortfolio);
  });

  it("should set the active portfolio correctly", () => {
    const changedPortfolio = {
      ...initialActivePortfolio,
      name: "Changed portfolio"
    };
    const action = new SetActivePortfolioInStore(changedPortfolio);

    const state = stbActivePortfolioReducer(initialActivePortfolio, action);
    expect(state).toEqual(changedPortfolio);
  });
});

// STB ACTIVE PORTFOLIO METADATA
describe("Stb Active Portfolio MetaData", () => {
  it("returns the initial state", () => {
    const action = {} as any;
    const state = stbActivePortfolioMetaDataReducer(undefined, action);

    expect(state).toEqual(intialStbActivePortflioMetaData);
  });

  it("should set the metadata correctly", () => {
    const newMetaData = {
      ...intialStbActivePortflioMetaData,
      totalValue: 2893.6
    };
    const action = new SetActivePortfolioMetaData(
      initialStockbrokingActivePortfolioState
    );
    const state = stbActivePortfolioMetaDataReducer(
      intialStbActivePortflioMetaData,
      action
    );
    expect(state).toEqual({ ...newMetaData });
  });
});
