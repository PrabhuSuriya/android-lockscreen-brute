import { Component } from "@angular/core";
import { StorageService } from "./storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  seed = [];
  patterns = [];
  mergedPatternAll = [];
  mergedPattern = [];
  dots = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  iconStatus = { ban: true, chk: true, thm: false, pot: false };
  loading = false;
  dotsStatus = [
    null,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ];
  dotsLength = 3;
  selectedSeed = [];
  cutomseed = '';
  constructor(private _localStorageService: StorageService) {}

  ngOnInit() {
    //const seed = [[1], [2], [3], [4], [5], [6], [7], [8], [9]];
    // const seed = this.getSeedFromDotStatus();
    // this.seedPatterns(seed, this.dotsLength);
    // this._localStorageService.upsert("12453", { ban: true });
    this.seed = this.getSeedFromDotStatus();
    console.log("%c USERLOG-seed", "color: green", this.seed);
  }
  onSelect(type: string) {
    this.dotsStatus = new Array(10).fill(type == "all");
  }

  updateSelectedSeed(seed){
    this.selectedSeed = seed;
    // this.selectedSeed = [1,3,4,5];
    console.log("%c USERLOG-seed", "color: green",seed, this.selectedSeed);
  }
  changeIcon(a, b) {}

  onIconFilter() {
    console.log("%c USERLOG-lat", "color: green", this.iconStatus);
    this.mergedPattern = this.mergedPatternAll.filter(
      x =>
        (!this.iconStatus.ban || !x.data.ban) &&
        (!this.iconStatus.chk || !x.data.chk) &&
        (!this.iconStatus.thm || !x.data.thm) &&
        (!this.iconStatus.pot || !x.data.pot)
    );
  }
  onFilter() {
    this.loading = true;
    //this.seed = this.getSeedFromDotStatus();
    this.seedPatterns(this.seed, this.dotsLength);
    this.mergedPattern = [];
    this.mergedPatternAll = [];
    this.patterns.forEach(x => {
      this.mergedPatternAll.push({
        pattern: x,
        data: Object.assign(
          { ban: false, chk: false, thm: false, pot: false },
          this._localStorageService.getdata(x.join(""))
        )
      });
    });
    this.onIconFilter();
    //this.mergedPattern = this.mergedPatternAll;
    this.loading = false;
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
    console.log("%c USERLOG-seed", "color: green", seed);
    this.patterns = [];
    seed.forEach(x => {
      // _patterns.concat(this.getPatterns(x, 3));
      this.getPatterns(x, length - x.length);
    });
  }

  addCustomSeed() {
    if (this.cutomseed) {
      this.seed.push(this.getSeedArray(this.cutomseed));
      if (this.cutomseed.length == 1) {
        this.dotsStatus[this.cutomseed] = true;
      }
      this.cutomseed = null;
    }
  }
  getSeedArray(seed) {
    return Array.from(`${seed}`, Number);
  }
  private updateList(dot, val) {
    console.log("%c USERLOG-label", "color: green", dot, val);
    if (val) {
      this.seed.push([dot]);
    } else {
      this.seed = this.seed.filter(x => x != dot);
    }
    if (dot.length == 1) {
      this.dotsStatus[dot] = val;
    }
  }

  // allowedNumber = [
  //   [], //0
  //   [2, 4, 5], //1
  //   [1, 4, 5, 6, 3], //2
  //   [2, 5, 6], //3
  //   [1, 2, 5, 8, 7], //4
  //   [1, 2, 3, 4, 6, 7, 8, 9], //5
  //   [3, 2, 5, 8, 9], //6
  //   [4, 5, 8], //7
  //   [7, 4, 5, 6, 9], //8
  //   [8, 5, 6] //9
  // ];
  allowedNumber = [
    [], //0
    [2, 4, 5, 6, 8], //1
    [1, 4, 5, 6, 7, 9], //2
    [2, 5, 6, 4, 8], //3
    [1, 2, 5, 8, 7, 3, 9], //4
    [1, 2, 3, 4, 6, 7, 8, 9], //5
    [3, 2, 5, 8, 9, 1, 7], //6
    [4, 5, 8, 2, 6], //7
    [7, 4, 5, 6, 9, 1, 3], //8
    [8, 5, 6, 2, 4] //9
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

  getLastDigit(pattern: number[]): number {
    return pattern[pattern.length - 1];
  }

  onIconChange(id: string, event) {
    console.log("%c USERLOG-label", "color: green", id, event);
    this._localStorageService.upsert(id, event);
  }
}
