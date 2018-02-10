import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

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
   * @param {string} [position=UtilityProvider.toastPosition]
   * @param {number} [duration=UtilityProvider.toastDuration]
   * @param {string} [toastKind=UtilityProvider.toastKind]  The toastKind(toastError | toastSuccess | toastInfo)
   * @param {boolean} [showClose=false]
   * @memberof UtilityProvider
   */
  presentToast(
    message: string = "",
    toastKind: string = UtilityProvider.toastKind,
    position: string = UtilityProvider.toastPosition,
    duration: number = UtilityProvider.toastDuration,
    showClose: boolean = false
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
}
