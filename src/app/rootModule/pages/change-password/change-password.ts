import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { IAppState } from "../../../store/models";
import { AuthProvider } from "../../../sharedModule/services/auth/auth";
import { getUserState } from "../../../store";
import { UtilityProvider } from "../../../sharedModule/services/utility/utility";
import * as PAGES from "../../../sharedModule/pages.constants";

/**
 * Page for changing user passwords
 *
 * @type Container & Presentational component
 * @export
 * @class ChangePasswordPage
 */
@IonicPage()
@Component({
  selector: "page-change-password",
  templateUrl: "change-password.html"
})
export class ChangePasswordPage {
  private changePasswordForm: FormGroup;
  private currentPassword: FormControl;
  private newPassword: FormControl;
  private confirmPassword: FormControl;
  private passwordsDoNotMatch: boolean = false;
  private customerId: any;
  private changePasswordLoader: any;

  constructor(
    public navCtrl: NavController,
    public store: Store<IAppState>,
    public authProvider: AuthProvider,
    public utilityProvider: UtilityProvider,
    public loadingController: LoadingController
  ) {
    this.currentPassword = new FormControl("", Validators.required);
    this.newPassword = new FormControl("", Validators.required);
    this.confirmPassword = new FormControl("", Validators.required);

    this.changePasswordForm = new FormGroup({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    });
  }

  ionViewDidLoad() {
    this.store
      .select(getUserState)
      .subscribe(userData => (this.customerId = userData.id));
  }

  /**
   * Create the change password loader to be presented when the user is changing their password
   *
   * @memberof ChangePasswordPage
   */
  presentChangePasswordLoader(): void {
    this.changePasswordLoader = this.loadingController.create({
      content: "Changing Password..."
    });

    this.changePasswordLoader.present();
  }

  changePassword() {
    // Ensure that the username and password are provided before attempting to login
    if (!this.changePasswordForm.valid) {
      return;
    } else {
      if (this.newPassword.value !== this.confirmPassword.value) {
        this.passwordsDoNotMatch = true;
        return;
      } else {
        this.passwordsDoNotMatch = false;
      }

      // The form is valid, so dispatch the login action
      const credentials = {
        customerId: this.customerId,
        oldPassword: this.currentPassword.value,
        newPassword: this.newPassword.value
      };

      this.presentChangePasswordLoader();

      this.authProvider.changePassword(credentials).subscribe(
        response => {
          this.utilityProvider.presentToast(
            "Password changed successfully",
            "toastSuccess"
          );

          if (this.changePasswordLoader) {
            this.changePasswordLoader.dismiss();
          }

          this.navCtrl.push(PAGES.DASHBOARD_PAGE);
        },
        err => {
          console.log(err.error.status);

          if (this.changePasswordLoader) {
            this.changePasswordLoader.dismiss();
          }

          this.utilityProvider.presentToast(
            "Incorrect current password supplied",
            "toastError"
          );
        }
      );
    }
  }
}
