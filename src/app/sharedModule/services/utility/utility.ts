import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";
import moment from "moment";

/**
 * A collection of utility functions which can be used globally
 *
 * @export
 * @class UtilityProvider
 */
@Injectable()
export class UtilityProvider {
  public static toastDuration = 3000;
  public static toastPosition = "top";
  public static toastKind = "toastInfo";

  constructor(public toastCtrl: ToastController) {}

  /**
   *
   *
   * @param {string} [message=""]
   * @param {string} [toastKind=UtilityProvider.toastKind]  The toastKind(toastError | toastSuccess | toastInfo)
   * @param {number} [duration=UtilityProvider.toastDuration]
   * @param {boolean} [showClose=false]
   * @param {string} [position=UtilityProvider.toastPosition]
   * @memberof UtilityProvider
   */
  presentToast(
    message: string = "",
    toastKind: string = UtilityProvider.toastKind,
    duration: number = UtilityProvider.toastDuration,
    showClose: boolean = false,
    position: string = UtilityProvider.toastPosition
  ) {
    let toaster = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      showCloseButton: showClose,
      cssClass: toastKind
    });
    toaster.present();
  }

  /**
   * Convert an array of objects to a client side entity object map.
   * This aids the quick retrieval and lookup of data.
   *
   * @param {any} [sourceArray=[]] The array containing the objects to be converted to entities
   * @param {string} [entityKey='id'] The unique object key to be used as the primary key for each entity
   * @param {any} [oldStateEntities={}] Initial state entities, used because of redux so no state data is omitted
   * @export convertArrayToEntities
   */
  convertArrayToEntities<T>(
    sourceArray: Array<T> = [],
    entityKey = "id",
    oldStateEntities = {}
  ): { [entityKey: number]: T } {
    const entities = sourceArray.reduce(
      (entities: { [entityKey: number]: T }, arrayElement) => {
        return {
          ...entities,
          [arrayElement[entityKey]]: arrayElement
        };
      },
      {
        ...oldStateEntities
      }
    );

    return entities;
  }

  /**
   * Return the default startDate for cash account searches.
   * This date is the first of the month
   *
   * @return String
   */
  getDefaultCashStatementStartDate() {
    return moment().format("YYYY-MM-01");
  }

  /**
   * Return the default endDate for cash account searches.
   * This date is today
   *
   * @return String
   */
  getDefaultCashStatementEndDate() {
    return moment().format("YYYY-MM-DD");
  }
}
