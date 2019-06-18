import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-localstorage";
// import { LocalStorageService } from "ngx-localstorage";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  localData: any;
  constructor(private _localStorageService: LocalStorageService) {
    this.localData = this._localStorageService.get("lockdata");
  }

  upsert(id: string, data: any) {
    this.localData[id] = { id, data };
  }
}
