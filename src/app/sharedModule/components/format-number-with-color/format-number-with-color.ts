import { Component, Input, OnInit } from "@angular/core";

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
export class FormatNumberWithColorComponent implements OnInit {
  @Input() data: any;
  @Input() showCurrency: boolean;

  absoluteValue: number;

  constructor() {}

  ngOnInit() {
    this.data = parseFloat(this.data);
    this.absoluteValue = Math.abs(this.data);
  }
}
