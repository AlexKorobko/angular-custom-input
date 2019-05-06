import {Component, forwardRef, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {CountriesService} from '../../services/countries.service';
import {Country} from '../../types/country.type';
import {Observable} from 'rxjs';
import {parsePhoneNumberFromString} from 'libphonenumber-js';

@Component({
  selector: 'app-phonepicker',
  templateUrl: './phonepicker.component.html',
  styleUrls: ['./phonepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhonepickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PhonepickerComponent),
      multi: true
    }
  ]
})
export class PhonepickerComponent implements OnInit, ControlValueAccessor {

  countries: Observable<Country[]>;

  public formGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required]),
    selectedCountry: new FormControl('', [Validators.required])
  });

  constructor(private $countries: CountriesService) {
    this.countries = this.$countries.getCountries();
  }

  ngOnInit(): void {
    this.countries.subscribe(countries => this.formGroup.setValue({selectedCountry: countries[0], phoneNumber: ''}));
  }

  onTouched: Function;

  @HostListener('click') onBlur() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  registerOnChange(fn: any): void {
    this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();

  }

  writeValue(obj: any): void {
    if(!obj || typeof obj !== 'object') {return}
    this.formGroup.setValue(obj)
  }

  validate(c: AbstractControl) {
    const {selectedCountry, phoneNumber} = c.value;
    const parsedPhone = phoneNumber ? parsePhoneNumberFromString(phoneNumber, selectedCountry['alpha2Code']) : null;
    return !!parsedPhone ? null : {
      invalidForm: {valid: false, message: "Phone field is invalid"}
    }
  }
}
