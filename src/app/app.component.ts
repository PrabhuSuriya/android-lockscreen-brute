import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  patterns = [];
  dots = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  dotsStatus = [null, true, true, true, true, true, true, true, true, true];
  dotsLength = 4;
  constructor() {}

  ngOnInit() {
    //const seed = [[1], [2], [3], [4], [5], [6], [7], [8], [9]];
    const seed = this.getSeedFromDotStatus();
    this.seedPatterns(seed, this.dotsLength);
  }

  onFilter() {
    const seed = this.getSeedFromDotStatus();
    this.seedPatterns(seed, this.dotsLength);
  }
  getSeedFromDotStatus() {
    const seed = [];
    this.dotsStatus.forEach((x, i) => {
      if (i > 0 && x) {
        seed.push([i]);
      }
    });
    return seed;
  }

  seedPatterns(seed, length) {
    this.patterns = [];
    seed.forEach(x => {
      // _patterns.concat(this.getPatterns(x, 3));
      this.getPatterns(x, length);
    });
  }

  private updateList(value, evt) {
    console.log("%c USERLOG-label", "color: green", value, this.dotsStatus);
  }

  allowedNumber = [
    [], //0
    [2, 4, 5], //1
    [1, 4, 5, 6, 3], //2
    [2, 5, 6], //3
    [1, 2, 5, 8, 7], //4
    [1, 2, 3, 4, 6, 7, 8, 9], //5
    [3, 2, 5, 8, 9], //6
    [4, 5, 8], //7
    [7, 4, 5, 6, 9], //8
    [8, 5, 6] //9
  ];
  getPatterns(pattern: number[], level): number[][] {
    let result = [];
    const lastDigit = this.getLastDigit(pattern);
    const allowedDigits = this.allowedNumber[lastDigit].filter(
      x => pattern.indexOf(x) == -1
    );
    console.log("pattern", pattern);
    console.log("allowed", allowedDigits);

    if (level > 0) {
      allowedDigits.forEach(x => {
        console.log("next pattern", [...pattern, x], level - 1);
        const nextPatterns = this.getPatterns([...pattern, x], level - 1);
        console.log("nextPatterns", nextPatterns);
      });
    } else {
      console.log("final", pattern);
      this.patterns.push(pattern);
      return [pattern];
      console.log("fr", result);
    }
    console.log("result", result);
    return result;
  }

  getPatterns1(pattern: number[], dotsCount: number): number[][] {
    let result = [];
    const lastDigit = this.getLastDigit(pattern);
    const allowedDigits = this.allowedNumber[lastDigit].filter(
      x => pattern.indexOf(x) == -1
    );

    if (dotsCount == 1) {
      result = [pattern];
    } else {
      allowedDigits.forEach(x => {
        const nextPatterns = this.getPatterns1([...pattern, x], dotsCount - 1);
        if (dotsCount - 1 == 1) {
          result.push(nextPatterns);
        }
        console.log("nextPatterns", nextPatterns);
      });
    }

    return result;
  }

  getLastDigit(pattern: number[]): number {
    return pattern[pattern.length - 1];
  }
}
