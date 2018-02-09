/**
 * Interface which defines the shape of the user 'slice' of the redux store.
 *
 * @export
 * @interface IUserState
 */
export interface IUserState {
  active: boolean;
  allowDebitBalance: boolean;
  birthDate: string;
  businessOfficeName: string;
  bvnCode: string;
  cashAcct: string;
  cashAcctBalance: string;
  cellPhone: string;
  channel: string;
  criminalConviction: boolean;
  customerGroupName: string;
  customerType: string;
  ecrmId: number;
  emailAddress1: string;
  employerAddress: string;
  employerName: string;
  enrollInContribScheme: boolean;
  firstName: string;
  forcePasswordReset: boolean;
  id: number;
  label: string;
  lastName: string;
  middleName: string;
  moneyLaunderingRisk: boolean;
  motherMaidenName: string;
  name: string;
  nationality: string;
  nexofKin: string;
  nexofKinEmailAddress: string;
  nextofKinAddress: string;
  nextofKinRelationship: string;
  partnerType: string;
  politicallyExposed: boolean;
  portalPasswordToken: string;
  portalUserName: string;
  primaryAddress1: string;
  primaryCity: string;
  primaryCountry: string;
  primaryState: string;
  secondaryAddress1: string;
  setttlementBankAccountName: string;
  setttlementBankAccountNumber: string;
  setttlementBankName: string;
  setttlementBankOpenDate: string;
  sex: string;
  termsAndCondAccepted: boolean;
  title: string;
}
