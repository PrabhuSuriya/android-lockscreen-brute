import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "pattern",
  templateUrl: "./pattern.component.html",
  styleUrls: ["./pattern.component.scss"]
})
export class PatternComponent implements OnInit {
  @Input() pattern: number[];
  constructor() {}

  ngOnInit() {}
}
