import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "pattern-svg",
  templateUrl: "./pattern-svg.component.html",
  styleUrls: ["./pattern-svg.component.scss"]
})
export class PatternSvgComponent implements OnInit {
  @Input() pattern: number[];

  strokes: any[] = [];
  pointMap = [
    {},
    { x: 25, y: 25 },
    { x: 75, y: 25 },
    { x: 125, y: 25 },
    { x: 25, y: 75 },
    { x: 75, y: 75 },
    { x: 125, y: 75 },
    { x: 25, y: 125 },
    { x: 75, y: 125 },
    { x: 125, y: 125 }
  ];
  constructor() {}

  ngOnInit() {
    console.log("%c USERLOG-input", "color: green", this.pattern);
    for (let i = 0; i < this.pattern.length - 1; i++) {
      this.strokes.push({
        x1: this.pointMap[this.pattern[i]].x,
        y1: this.pointMap[this.pattern[i]].y,
        x2: this.pointMap[this.pattern[i + 1]].x,
        y2: this.pointMap[this.pattern[i + 1]].y
      });
    }
    console.log("%c USERLOG-strokes", "color: green", this.strokes);
  }
}
