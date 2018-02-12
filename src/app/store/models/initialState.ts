import {
  IAuthState,
  IErrorState,
  IUserState,
  IStockBrokingState
} from "./index";

/**
 * The initial state to be used by various reducers in constructing the entire application state tree
 */

export const initialAuthState: IAuthState = {
  isAuthenticating: false,
  authenticated: false,
  failedAuthAttempts: 0
};

export const initialUserState: IUserState = {
  active: false,
  allowDebitBalance: false,
  birthDate: "",
  businessOfficeName: "",
  bvnCode: "",
  cashAcct: "",
  cashAcctBalance: "",
  cellPhone: "",
  channel: "",
  criminalConviction: false,
  customerGroupName: "",
  customerType: "",
  ecrmId: null,
  emailAddress1: "",
  employerAddress: "",
  employerName: "",
  enrollInContribScheme: false,
  firstName: "",
  forcePasswordReset: false,
  id: null,
  label: "",
  lastName: "",
  middleName: "",
  moneyLaunderingRisk: false,
  motherMaidenName: "",
  name: "",
  nationality: "",
  nexofKin: "",
  nexofKinEmailAddress: "",
  nextofKinAddress: "",
  nextofKinRelationship: "",
  partnerType: "",
  politicallyExposed: false,
  portalPasswordToken: "",
  portalUserName: "",
  primaryAddress1: "",
  primaryCity: "",
  primaryCountry: "",
  primaryState: "",
  secondaryAddress1: "",
  setttlementBankAccountName: "",
  setttlementBankAccountNumber: "",
  setttlementBankName: "",
  setttlementBankOpenDate: "",
  sex: "",
  termsAndCondAccepted: false,
  title: ""
};

export const initialErrorState: IErrorState = {
  authenticationErrorMessage: null
};

export const initialStockbrokingState: IStockBrokingState = {
  portfolios: []
};

export default {
  initialUserState,
  initialAuthState,
  initialErrorState,
  initialStockbrokingState
};
