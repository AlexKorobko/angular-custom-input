import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Country} from '../types/country.type';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private countriesURL = 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;callingCodes';

  constructor(private $http: HttpClient) { }

  getCountries(): Observable<Array<Country>> {
    return this.$http.get<Array<Country>>(this.countriesURL);
  }
}
