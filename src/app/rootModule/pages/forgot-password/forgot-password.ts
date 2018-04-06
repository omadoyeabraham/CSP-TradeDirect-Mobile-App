import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AccountActionsProvider } from "../../../sharedModule/services/account-actions/account-actions";
import { UtilityProvider } from "../../../sharedModule/services/utility/utility";

/**
 *
 *
 * @export
 * @class ForgotPasswordPage
 */
@IonicPage()
@Component({
  selector: "page-forgot-password",
  templateUrl: "forgot-password.html"
})
export class ForgotPasswordPage {
  public forgotPasswordForm: FormGroup;
  public username: FormControl;
  public verifyUsernameLoader: any;
  public sendResetLinkLoader: any;

  constructor(
    public navCtrl: NavController,
    public loadingController: LoadingController,
    public accountActionsProvider: AccountActionsProvider,
    public utilityProvider: UtilityProvider
  ) {
    this.username = new FormControl("", Validators.required);
    this.forgotPasswordForm = new FormGroup({
      username: this.username
    });
  }

  ionViewDidLoad() {}

  closeForgotPasswordPage() {
    this.navCtrl.pop();
  }

  /**
   * Verify the username, whose password the user is attempting to send a reset link for.
   *
   * @memberof ForgotPasswordPage
   */
  verifyUsername() {
    if (!this.forgotPasswordForm.valid) {
      return;
    }

    const username = this.username.value;
    this.presentVerifyUsernameLoader();

    this.accountActionsProvider.verifyUsername(username).subscribe(
      response => {
        this.dismissVerifyUsernameLoader();
        if (response.portalUserName && response.portalUserName === username) {
          // username is valid
          this.sendPasswordResetLink(
            username,
            response.emailAddress1,
            response.id,
            response.label
          );
        } else {
          // username is invalid
          this.utilityProvider.presentToast(
            "Invalid Username Provided",
            "toastError"
          );
        }
      },
      err => {
        this.dismissVerifyUsernameLoader();
        this.utilityProvider.presentToast(
          "Invalid Username Provided",
          "toastError"
        );
      }
    );
  }

  /**
   * Send the user a password reset link
   *
   * @param {string} username
   * @memberof ForgotPasswordPage
   */
  sendPasswordResetLink(username, email, id, label) {
    this.presentSendResetLinkLoader();
    this.accountActionsProvider
      .sendPasswordResetLink(username, email, id, label)
      .subscribe(
        response => {
          this.dismissSendResetLinkLoader();
          this.utilityProvider.presentToast(
            "Password reset link sent successfully",
            "toastSuccess"
          );
          this.closeForgotPasswordPage();
        },
        err => {
          this.dismissSendResetLinkLoader();
          this.utilityProvider.presentToast(
            "Unable to send reset link. Please try again",
            "toastError"
          );
        }
      );
  }

  /**
   * Create the verify loader to be presented
   *
   * @memberof ForgotPasswordPage
   */
  presentVerifyUsernameLoader(): void {
    this.verifyUsernameLoader = this.loadingController.create({
      content: "Verifying Username..."
    });

    this.verifyUsernameLoader.present();
  }

  /**
   * Create the send reset link loader to be presented
   *
   * @memberof ForgotPasswordPage
   */
  presentSendResetLinkLoader(): void {
    this.sendResetLinkLoader = this.loadingController.create({
      content: "Sending password reset link..."
    });

    this.sendResetLinkLoader.present();
  }

  dismissVerifyUsernameLoader() {
    if (this.verifyUsernameLoader) {
      this.verifyUsernameLoader.dismiss();
    }
  }

  dismissSendResetLinkLoader() {
    if (this.sendResetLinkLoader) {
      this.sendResetLinkLoader.dismiss();
    }
  }
}
