import SmartView from './smart.js';
import {getGenresFrequencies, filterFilmsByPeriod} from '../utils/statistics.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {PeriodFilter} from '../utils/const.js';
import {getUserRank} from '../utils/user.js';

const createTotalDurationTemplate = (totalDuration) => {
  if (totalDuration > 0) {
    const totalDurationHour = Math.trunc(totalDuration / 60);
    const totalDurationMinutes = Math.ceil(totalDuration / 60 % 1 * 60);
    const hoursDurationTemplate = totalDurationHour > 0 ? `${totalDurationHour} <span class="statistic__item-description">h</span>` : ``;
    const minutesDurationTemplate = totalDurationMinutes > 0 ? `${totalDurationMinutes} <span class="statistic__item-description">m</span>` : ``;
    return `${hoursDurationTemplate} ${minutesDurationTemplate}`;
  } else {
    return `0 <span class="statistic__item-description">m</span>`;
  }
};

const getTopGenre = (films) => {
  const genres = getGenresFrequencies(films);
  const maxValue = Math.max(...Object.values(genres));
  return Object.keys(genres).find((genre) => genres[genre] === maxValue);
};

const createStatisticsTemplate = (films) => {
  const initValue = 0;
  const totalDurationTime = films.reduce((acc, film) => acc + film.runtime, initValue);
  const totalDurationTemplate = createTotalDurationTemplate(totalDurationTime);
  const topGenre = getTopGenre(films);
  const userRank = getUserRank(films.length);

  return (`<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${userRank}</span>
      </p>
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="${PeriodFilter.ALL_TIME}" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${PeriodFilter.TODAY}">
        <label for="statistic-today" class="statistic__filters-label">Today</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${PeriodFilter.WEEK}">
        <label for="statistic-week" class="statistic__filters-label">Week</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${PeriodFilter.MONTH}">
        <label for="statistic-month" class="statistic__filters-label">Month</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${PeriodFilter.YEAR}">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${films.length}<span class="statistic__item-description">${films.length > 1 ? `movies` : `movie`}</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalDurationTemplate}</p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${films.length ? topGenre : ``}</p>
        </li>
      </ul>
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>
    `
  );
};

const renderStatisticsChart = (statisticsCtx, films) => {
  const BAR_HEIGHT = 50;
  statisticsCtx.height = BAR_HEIGHT * Object.keys(getGenresFrequencies(films)).length;
  return new Chart(statisticsCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(getGenresFrequencies(films)),
      datasets: [{
        data: Object.values(getGenresFrequencies(films)),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`,
        barThickness: 24,
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
    }
  });

};
export default class Statistics extends SmartView {
  constructor(films) {
    super();

    this.siteMainElement = document.querySelector(`.main`);
    this._films = [...films].filter((film) => film.isWatched);
    // this._user = user;

    this._statsChart = null;
    this._currentPeriod = PeriodFilter.ALL_TIME;

    this._periodChangeHandler = this._periodChangeHandler.bind(this);
    this._setPeriodChangeHandler(this._periodChangeHandler);
  }

  init() {
    this._setChart(this._currentPeriod);
  }

  getTemplate() {
    return createStatisticsTemplate(this._films);
  }


  removeElement() {
    super.removeElement();

    if (this._statsChart !== null) {
      this._statsChart.destroy();
      this._statsChart = null;
    }
  }

  _setPeriodChangeHandler(callback) {
    this._callback.periodChange = callback;
    this.getElement()
  .querySelectorAll(`.statistic__filters-input`)
  .forEach((input) => input.addEventListener(`change`, this._periodChangeHandler));
  }

  _periodChangeHandler(evt) {
    this._currentPeriod = evt.target.value;

    this._setChart(this._currentPeriod);
  }

  _setChart(period) {
    if (this._statsChart !== null) {
      this._statsChart.destroy();
      this._statsChart = null;
    }

    const filteredFilms = filterFilmsByPeriod(period, this._films);
    const statisticsCtx = this.getElement().querySelector(`.statistic__chart`);

    this._statsChart = renderStatisticsChart(statisticsCtx, filteredFilms);

  }
}
