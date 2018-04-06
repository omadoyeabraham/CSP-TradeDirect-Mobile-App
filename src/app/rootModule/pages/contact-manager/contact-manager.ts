import { Component } from "@angular/core";
import { IonicPage, NavController, LoadingController } from "ionic-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { IAppState } from "../../../store/models";
import { getUserState } from "../../../store";
import { AccountActionsProvider } from "../../../sharedModule/services/account-actions/account-actions";
import { UtilityProvider } from "../../../sharedModule/services/utility/utility";
import * as PAGES from "../../../sharedModule/pages.constants";

@IonicPage()
@Component({
  selector: "page-contact-manager",
  templateUrl: "contact-manager.html"
})
export class ContactManagerPage {
  public contactManagerForm: FormGroup;
  public managerName: FormControl;
  public managerEmail: FormControl;
  public subject: FormControl;
  public message: FormControl;
  public username: string;
  public contactManagerLoader: any;

  constructor(
    public navCtrl: NavController,
    public store: Store<IAppState>,
    public accountActionsProvider: AccountActionsProvider,
    public utilityProvider: UtilityProvider,
    public loadingController: LoadingController
  ) {
    this.managerName = new FormControl({
      value: "CardinalStone Partners",
      disabled: true
    });
    this.managerEmail = new FormControl({
      value: "abraham.omadoye@cardinalstone.com",
      disabled: true
    });
    this.subject = new FormControl("", Validators.required);
    this.message = new FormControl("", Validators.required);

    this.contactManagerForm = new FormGroup({
      managerName: this.managerName,
      managerEmail: this.managerEmail,
      subject: this.subject,
      message: this.message
    });
  }

  ionViewDidLoad() {
    this.store
      .select(getUserState)
      .subscribe(userData => (this.username = userData.label));
  }

  /**
   * Create the contact manager loader to be presented when the user is sending a message
   *
   * @memberof ContactManagerPage
   */
  presentContactManagerLoader(): void {
    this.contactManagerLoader = this.loadingController.create({
      content: "Sending Message..."
    });

    this.contactManagerLoader.present();
  }

  contactManager() {
    const contactMessage = {
      subject: this.subject.value,
      message: this.message.value,
      email: this.managerEmail.value,
      userName: this.username
    };

    this.presentContactManagerLoader();

    this.accountActionsProvider.contactManager(contactMessage).subscribe(
      response => {
        if (this.contactManagerLoader) {
          this.contactManagerLoader.dismiss();
        }

        this.utilityProvider.presentToast(
          "Message sent to account manager",
          "toastSuccess"
        );
      },
      err => {
        console.log(err);

        if (this.contactManagerLoader) {
          this.contactManagerLoader.dismiss();
        }

        if (err.status === 200) {
          this.utilityProvider.presentToast(
            "Message sent to account manager",
            "toastSuccess"
          );
          this.navCtrl.push(PAGES.DASHBOARD_PAGE);
        } else {
          this.utilityProvider.presentToast(
            "Unable to send message, please try again",
            "toastError"
          );
        }
      }
    );
  }
}
