import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService, WeatherData } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, TitleCasePipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  searchCity = 'Delhi';
  weather: WeatherData | null = null;
  loading = false;
  error = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeather();
  }

  fetchWeather(): void {
    if (!this.searchCity.trim()) return;
    this.loading = true;
    this.error = '';
    this.weatherService.getWeather(this.searchCity).subscribe({
      next: data => {
        this.weather = data;
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.message || 'City not found';
        this.loading = false;
      }
    });
  }

  getIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
