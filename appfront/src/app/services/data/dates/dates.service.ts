import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {
  constructor() {
  }

  /**
   * Parses an API datetime string (ISO 8601, ex: "2025-03-12T07:00:25.092Z") to locale Date object.
   * @param dateString
   */
  public isoStringToDateTimeLocale(dateString: string): Date {
    return new Date(dateString);
  }

  /**
   * Parses an API date string (ISO 8601, ex: "2025-03-12") to locale Date object.
   * @param dateString
   */
  public isoStringToDateLocale(dateString: string): Date {
    return new Date(`${dateString}T00:00:00`);
  }

  /**
   * Returns, from a locale Date object, a locale string suitable for use in a datetime-local type input.
   * @param date
   */
  public dateTimeLocaleToInputString(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    const datePart = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timePart = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    return `${datePart}T${timePart}`;
  }

  /**
   * Returns, from a locale Date object, a locale string suitable for use in a date type input.
   * @param date
   */
  public dateLocaleToInputString(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  public inputStringToIsoString(inputString: string): string {
    return new Date(inputString).toISOString();
  }

  public inputStringToIsoDateString(inputString: string): string {
    return new Date(inputString).toISOString().split('T')[0];
  }
}
