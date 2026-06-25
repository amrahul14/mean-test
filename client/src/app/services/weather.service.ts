import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiUrl = `${environment.apiUrl}/weather`;

  constructor(private http: HttpClient) {}

  getWeather(city = 'Delhi'): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.apiUrl}?city=${encodeURIComponent(city)}`);
  }
}
