import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from "@angular/core";

@Component({
  selector: "pattern-svg",
  templateUrl: "./pattern-svg.component.html",
  styleUrls: ["./pattern-svg.component.scss"]
})
export class PatternSvgComponent implements OnInit, OnChanges {
  @Input() pattern: number[];
  @Input() data: any;
  @Output() change = new EventEmitter(null);

  strokes: any[] = [];
  points: any[] = [];
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
    this.initPattern();
  }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.initPattern();
  }
  initPattern() {
    console.log("%c USERLOG-input", "color: green", this.pattern);
    this.strokes = [];
    this.points = this.pattern.map(p => {
      return { ...this.pointMap[p] };
    });
    console.log("%c USERLOG-points", "color: green", this.points);
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
  onClick(type: string) {
    this.data[type] = !this.data[type];
    this.change.emit(this.data);
  }
}
