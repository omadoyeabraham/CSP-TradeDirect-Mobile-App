import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";

/**
 * Generated class for the FormatNumberWithColorComponent component.
 *
 * This component is used to properly format and display numbers
 *   +ve numbers ---> Green color
 *   -ve numbers ---> Red color, wrapped in parenthesis
 *   0           ---> Blue color
 */
@Component({
  selector: "csmobile-format-number-with-color",
  templateUrl: "format-number-with-color.html"
})
export class FormatNumberWithColorComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() showCurrency: boolean;

  absoluteValue: number;

  constructor() {}

  ngOnInit() {
    this.data = parseFloat(this.data);
    this.absoluteValue = Math.abs(this.data);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setValues(changes.data.currentValue);
  }

  setValues(value) {
    this.data = parseFloat(value);
    this.absoluteValue = Math.abs(this.data);
  }
}
