import { fromEvent } from "rxjs";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  mergeMap,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";
const url = "https://api.github.com/search/users?q=";
const search = document.getElementById("search");

const stream$ = fromEvent(search, "input").pipe(
  map((e) => e.target.value),
  debounceTime(500),
  distinctUntilChanged(),
  switchMap((y) => ajax.getJSON(url + y)),
  map((i) => i.items),
  mergeMap((items) => items)
);
stream$.subscribe((val) => console.log(val));
