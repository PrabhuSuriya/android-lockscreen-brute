import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-localstorage";
// import { LocalStorageService } from "ngx-localstorage";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  localData: any = {};
  constructor(private _localStorageService: LocalStorageService) {
    this.localData = this.get();
  }

  upsert(id: string, data: any) {
    this.localData[id] = { id, data };
    this.put();
  }
  getdata(key: string) {
    const record = this.localData[key];
    return record ? record.data : {};
  }
  put() {
    this._localStorageService.set("lockdata", JSON.stringify(this.localData));
  }
  get() {
    const data =
      this._localStorageService.get("lockdata") || JSON.stringify({});
    return JSON.parse(data);
  }
}
