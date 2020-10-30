<template>
  <div class="card card-custom">
    <div class="card-body">
      <div class="fc fc-ltr fc-unthemed">
        <div class="fc-toolbar fc-header-toolbar">
          <!-- <div class="fc-left">
              <div class="fc-button-group">
                <button
                  type="button"
                  class="fc-prev-button fc-button fc-button-primary"
                  aria-label="prev"
                >
                  <span class="fc-icon fc-icon-chevron-left"></span>
                </button>
                <button
                  type="button"
                  class="fc-next-button fc-button fc-button-primary"
                  aria-label="next"
                >
                  <span class="fc-icon fc-icon-chevron-right"></span>
                </button>
              </div>
              <button
                type="button"
                class="fc-today-button fc-button fc-button-primary"
                disabled=""
              >
                today
              </button>
            </div> -->
          <div class="fc-center">
            <h2>October 2020</h2>
          </div>
          <div class="fc-right">
            <div class="fc-button-group">
              <button
                type="button"
                class="fc-dayGridMonth-button fc-button fc-button-primary"
                @click="chooseCalendarType('Month')"
              >
                month
              </button>
              <button
                type="button"
                class="fc-listWeek-button fc-button fc-button-primary"
                @click="chooseCalendarType('Day')"
              >
                list
              </button>
            </div>
          </div>
        </div>
        <div class="fc-view-container">
          <div
            class="fc-view fc-dayGridMonth-view fc-dayGrid-view"
            :hidden="!isShowMonth"
          >
            <table class="">
              <thead class="fc-head">
                <tr>
                  <td class="fc-head-container fc-widget-header">
                    <div class="fc-row fc-widget-header">
                      <table class="">
                        <thead>
                          <tr>
                            <th class="fc-day-header fc-widget-header fc-sun">
                              <span>Sun</span>
                            </th>
                            <th class="fc-day-header fc-widget-header fc-mon">
                              <span>Mon</span>
                            </th>
                            <th class="fc-day-header fc-widget-header fc-tue">
                              <span>Tue</span>
                            </th>
                            <th class="fc-day-header fc-widget-header fc-wed">
                              <span>Wed</span>
                            </th>
                            <th class="fc-day-header fc-widget-header fc-thu">
                              <span>Thu</span>
                            </th>
                            <th class="fc-day-header fc-widget-header fc-fri">
                              <span>Fri</span>
                            </th>
                            <th class="fc-day-header fc-widget-header fc-sat">
                              <span>Sat</span>
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody class="fc-body">
                <tr>
                  <td class="fc-widget-content">
                    <div
                      class="fc-scroller fc-day-grid-container"
                      style="overflow: hidden; height: 710px"
                    >
                      <div class="fc-day-grid">
                        <div
                          class="fc-row fc-week fc-widget-content fc-rigid"
                          style="height: 118px"
                        >
                          <div class="fc-bg">
                            <table class="">
                              <tbody>
                                <tr>
                                  <td
                                    class="fc-day fc-widget-content fc-sun fc-other-month fc-past"
                                    data-date="2020-09-27"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-mon fc-other-month fc-past"
                                    data-date="2020-09-28"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-tue fc-other-month fc-past"
                                    data-date="2020-09-29"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-wed fc-other-month fc-past"
                                    data-date="2020-09-30"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-thu fc-past"
                                    data-date="2020-10-01"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-fri fc-past"
                                    data-date="2020-10-02"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-sat fc-past"
                                    data-date="2020-10-03"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="fc-content-skeleton">
                            <table>
                              <thead>
                                <tr>
                                  <td
                                    class="fc-day-top fc-sun fc-other-month fc-past"
                                    data-date="2020-09-27"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-09-27","type":"day"}'
                                      >27</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-mon fc-other-month fc-past"
                                    data-date="2020-09-28"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-09-28","type":"day"}'
                                      >28</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-tue fc-other-month fc-past"
                                    data-date="2020-09-29"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-09-29","type":"day"}'
                                      >29</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-wed fc-other-month fc-past"
                                    data-date="2020-09-30"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-09-30","type":"day"}'
                                      >30</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-thu fc-past"
                                    data-date="2020-10-01"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-01","type":"day"}'
                                      >1</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-fri fc-past"
                                    data-date="2020-10-02"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-02","type":"day"}'
                                      >2</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-sat fc-past"
                                    data-date="2020-10-03"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-03","type":"day"}'
                                      >3</a
                                    >
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td class="fc-event-container">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-event-danger fc-event-solid-warning fc-draggable fc-resizable"
                                    >
                                      <div class="fc-content">
                                        <span class="fc-title"
                                          >All Day Event</span
                                        >
                                      </div>
                                      <div
                                        class="fc-resizer fc-end-resizer"
                                      ></div>
                                    </a>
                                  </td>
                                  <td class="fc-event-container">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-event-primary fc-draggable fc-resizable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-title"
                                          >Company Trip</span
                                        >
                                      </div>
                                      <div
                                        class="fc-resizer fc-end-resizer"
                                      ></div>
                                    </a>
                                  </td>
                                  <td class="fc-event-container">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-not-end fc-event-light fc-event-solid-primary fc-draggable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-title"
                                          >ICT Expo 2017 - Product Release</span
                                        >
                                      </div>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div
                          class="fc-row fc-week fc-widget-content fc-rigid"
                          style="height: 118px"
                        >
                          <div class="fc-bg">
                            <table class="">
                              <tbody>
                                <tr>
                                  <td
                                    class="fc-day fc-widget-content fc-sun fc-past"
                                    data-date="2020-10-04"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-mon fc-past"
                                    data-date="2020-10-05"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-tue fc-past"
                                    data-date="2020-10-06"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-wed fc-past"
                                    data-date="2020-10-07"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-thu fc-past"
                                    data-date="2020-10-08"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-fri fc-past"
                                    data-date="2020-10-09"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-sat fc-past"
                                    data-date="2020-10-10"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="fc-content-skeleton">
                            <table>
                              <thead>
                                <tr>
                                  <td
                                    class="fc-day-top fc-sun fc-past"
                                    data-date="2020-10-04"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-04","type":"day"}'
                                      >4</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-mon fc-past"
                                    data-date="2020-10-05"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-05","type":"day"}'
                                      >5</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-tue fc-past"
                                    data-date="2020-10-06"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-06","type":"day"}'
                                      >6</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-wed fc-past"
                                    data-date="2020-10-07"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-07","type":"day"}'
                                      >7</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-thu fc-past"
                                    data-date="2020-10-08"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-08","type":"day"}'
                                      >8</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-fri fc-past"
                                    data-date="2020-10-09"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-09","type":"day"}'
                                      >9</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-sat fc-past"
                                    data-date="2020-10-10"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-10","type":"day"}'
                                      >10</a
                                    >
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td class="fc-event-container">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-not-start fc-end fc-event-light fc-event-solid-primary fc-draggable fc-resizable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-title"
                                          >ICT Expo 2017 - Product Release</span
                                        >
                                      </div>
                                      <div
                                        class="fc-resizer fc-end-resizer"
                                      ></div>
                                    </a>
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td class="fc-event-container">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-event-danger fc-draggable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-time">4p</span>
                                        <span class="fc-title"
                                          >Repeating Event</span
                                        >
                                      </div>
                                    </a>
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div
                          class="fc-row fc-week fc-widget-content fc-rigid"
                          style="height: 118px"
                        >
                          <div class="fc-bg">
                            <table class="">
                              <tbody>
                                <tr>
                                  <td
                                    class="fc-day fc-widget-content fc-sun fc-past"
                                    data-date="2020-10-11"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-mon fc-past"
                                    data-date="2020-10-12"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-tue fc-past"
                                    data-date="2020-10-13"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-wed fc-past"
                                    data-date="2020-10-14"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-thu fc-past"
                                    data-date="2020-10-15"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-fri fc-past"
                                    data-date="2020-10-16"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-sat fc-past"
                                    data-date="2020-10-17"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="fc-content-skeleton">
                            <table>
                              <thead>
                                <tr>
                                  <td
                                    class="fc-day-top fc-sun fc-past"
                                    data-date="2020-10-11"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-11","type":"day"}'
                                      >11</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-mon fc-past"
                                    data-date="2020-10-12"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-12","type":"day"}'
                                      >12</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-tue fc-past"
                                    data-date="2020-10-13"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-13","type":"day"}'
                                      >13</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-wed fc-past"
                                    data-date="2020-10-14"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-14","type":"day"}'
                                      >14</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-thu fc-past"
                                    data-date="2020-10-15"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-15","type":"day"}'
                                      >15</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-fri fc-past"
                                    data-date="2020-10-16"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-16","type":"day"}'
                                      >16</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-sat fc-past"
                                    data-date="2020-10-17"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-17","type":"day"}'
                                      >17</a
                                    >
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td></td>
                                  <td class="fc-event-container">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable fc-resizable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-title">Dinner</span>
                                      </div>
                                      <div
                                        class="fc-resizer fc-end-resizer"
                                      ></div>
                                    </a>
                                  </td>
                                  <td></td>
                                  <td class="fc-event-container">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-event-success fc-draggable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-time">1:30p</span>
                                        <span class="fc-title">Reporting</span>
                                      </div>
                                    </a>
                                  </td>
                                  <td></td>
                                  <td class="fc-event-container">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-time">4p</span>
                                        <span class="fc-title"
                                          >Repeating Event</span
                                        >
                                      </div>
                                    </a>
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div
                          class="fc-row fc-week fc-widget-content fc-rigid"
                          style="height: 118px"
                        >
                          <div class="fc-bg">
                            <table class="">
                              <tbody>
                                <tr>
                                  <td
                                    class="fc-day fc-widget-content fc-sun fc-past"
                                    data-date="2020-10-18"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-mon fc-past"
                                    data-date="2020-10-19"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-tue fc-past"
                                    data-date="2020-10-20"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-wed fc-past"
                                    data-date="2020-10-21"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-thu fc-past"
                                    data-date="2020-10-22"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-fri fc-past"
                                    data-date="2020-10-23"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-sat fc-past"
                                    data-date="2020-10-24"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="fc-content-skeleton">
                            <table>
                              <thead>
                                <tr>
                                  <td
                                    class="fc-day-top fc-sun fc-past"
                                    data-date="2020-10-18"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-18","type":"day"}'
                                      >18</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-mon fc-past"
                                    data-date="2020-10-19"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-19","type":"day"}'
                                      >19</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-tue fc-past"
                                    data-date="2020-10-20"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-20","type":"day"}'
                                      >20</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-wed fc-past"
                                    data-date="2020-10-21"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-21","type":"day"}'
                                      >21</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-thu fc-past"
                                    data-date="2020-10-22"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-22","type":"day"}'
                                      >22</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-fri fc-past"
                                    data-date="2020-10-23"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-23","type":"day"}'
                                      >23</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-sat fc-past"
                                    data-date="2020-10-24"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-24","type":"day"}'
                                      >24</a
                                    >
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div
                          class="fc-row fc-week fc-widget-content fc-rigid"
                          style="height: 118px"
                        >
                          <div class="fc-bg">
                            <table class="">
                              <tbody>
                                <tr>
                                  <td
                                    class="fc-day fc-widget-content fc-sun fc-past"
                                    data-date="2020-10-25"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-mon fc-past"
                                    data-date="2020-10-26"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-tue fc-past"
                                    data-date="2020-10-27"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-wed fc-past"
                                    data-date="2020-10-28"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-thu fc-today"
                                    data-date="2020-10-29"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-fri fc-future"
                                    data-date="2020-10-30"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-sat fc-future"
                                    data-date="2020-10-31"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="fc-content-skeleton">
                            <table>
                              <thead>
                                <tr>
                                  <td
                                    class="fc-day-top fc-sun fc-past"
                                    data-date="2020-10-25"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-25","type":"day"}'
                                      >25</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-mon fc-past"
                                    data-date="2020-10-26"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-26","type":"day"}'
                                      >26</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-tue fc-past"
                                    data-date="2020-10-27"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-27","type":"day"}'
                                      >27</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-wed fc-past"
                                    data-date="2020-10-28"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-28","type":"day"}'
                                      >28</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-thu fc-today"
                                    data-date="2020-10-29"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-29","type":"day"}'
                                      >29</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-fri fc-future"
                                    data-date="2020-10-30"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-30","type":"day"}'
                                      >30</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-sat fc-future"
                                    data-date="2020-10-31"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-10-31","type":"day"}'
                                      >31</a
                                    >
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td rowspan="5"></td>
                                  <td rowspan="5"></td>
                                  <td rowspan="5"></td>
                                  <td class="fc-event-container" colspan="2">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-event-primary fc-draggable fc-resizable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-title">Conference</span>
                                      </div>
                                      <div
                                        class="fc-resizer fc-end-resizer"
                                      ></div>
                                    </a>
                                  </td>
                                  <td class="fc-event-container">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-event-solid-danger fc-event-light fc-draggable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-time">5a</span>
                                        <span class="fc-title">Dinner</span>
                                      </div>
                                    </a>
                                  </td>
                                  <td rowspan="5"></td>
                                </tr>
                                <tr>
                                  <td class="fc-event-container" rowspan="4">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-event-solid-info fc-event-light fc-draggable fc-resizable"
                                      href="http://google.com/"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-title"
                                          >Click for Google</span
                                        >
                                      </div>
                                      <div
                                        class="fc-resizer fc-end-resizer"
                                      ></div>
                                    </a>
                                  </td>
                                  <td class="fc-event-container fc-limited">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-draggable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-time">10:30a</span>
                                        <span class="fc-title">Meeting</span>
                                      </div>
                                    </a>
                                  </td>
                                  <td class="fc-more-cell" rowspan="1">
                                    <div><a class="fc-more">+4 more</a></div>
                                  </td>
                                  <td class="fc-event-container" rowspan="4">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-event-primary fc-draggable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-time">7a</span>
                                        <span class="fc-title"
                                          >Birthday Party</span
                                        >
                                      </div>
                                    </a>
                                  </td>
                                </tr>
                                <tr class="fc-limited">
                                  <td class="fc-event-container">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-event-info fc-draggable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-time">12p</span>
                                        <span class="fc-title">Lunch</span>
                                      </div>
                                    </a>
                                  </td>
                                </tr>
                                <tr class="fc-limited">
                                  <td class="fc-event-container">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-event-warning fc-draggable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-time">2:30p</span>
                                        <span class="fc-title">Meeting</span>
                                      </div>
                                    </a>
                                  </td>
                                </tr>
                                <tr class="fc-limited">
                                  <td class="fc-event-container">
                                    <a
                                      class="fc-day-grid-event fc-h-event fc-event fc-start fc-end fc-event-info fc-draggable"
                                      data-original-title=""
                                      title=""
                                    >
                                      <div class="fc-content">
                                        <span class="fc-time">5:30p</span>
                                        <span class="fc-title">Happy Hour</span>
                                      </div>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div
                          class="fc-row fc-week fc-widget-content fc-rigid"
                          style="height: 120px"
                        >
                          <div class="fc-bg">
                            <table class="">
                              <tbody>
                                <tr>
                                  <td
                                    class="fc-day fc-widget-content fc-sun fc-other-month fc-future"
                                    data-date="2020-11-01"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-mon fc-other-month fc-future"
                                    data-date="2020-11-02"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-tue fc-other-month fc-future"
                                    data-date="2020-11-03"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-wed fc-other-month fc-future"
                                    data-date="2020-11-04"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-thu fc-other-month fc-future"
                                    data-date="2020-11-05"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-fri fc-other-month fc-future"
                                    data-date="2020-11-06"
                                  ></td>
                                  <td
                                    class="fc-day fc-widget-content fc-sat fc-other-month fc-future"
                                    data-date="2020-11-07"
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="fc-content-skeleton">
                            <table>
                              <thead>
                                <tr>
                                  <td
                                    class="fc-day-top fc-sun fc-other-month fc-future"
                                    data-date="2020-11-01"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-11-01","type":"day"}'
                                      >1</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-mon fc-other-month fc-future"
                                    data-date="2020-11-02"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-11-02","type":"day"}'
                                      >2</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-tue fc-other-month fc-future"
                                    data-date="2020-11-03"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-11-03","type":"day"}'
                                      >3</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-wed fc-other-month fc-future"
                                    data-date="2020-11-04"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-11-04","type":"day"}'
                                      >4</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-thu fc-other-month fc-future"
                                    data-date="2020-11-05"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-11-05","type":"day"}'
                                      >5</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-fri fc-other-month fc-future"
                                    data-date="2020-11-06"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-11-06","type":"day"}'
                                      >6</a
                                    >
                                  </td>
                                  <td
                                    class="fc-day-top fc-sat fc-other-month fc-future"
                                    data-date="2020-11-07"
                                  >
                                    <a
                                      class="fc-day-number"
                                      data-goto='{"date":"2020-11-07","type":"day"}'
                                      >7</a
                                    >
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="fc-view fc-listWeek-view fc-list-view fc-widget-content"
            :hidden="isShowMonth"
          >
            <div class="fc-scroller" style="overflow: hidden auto">
              <table class="fc-list-table">
                <tbody>
                  <tr class="fc-list-heading" data-date="2020-10-28">
                    <td class="fc-widget-header" colspan="3">
                      <a
                        class="fc-list-heading-main"
                        data-goto='{"date":"2020-10-28","type":"day"}'
                        >Saturday</a
                      ><a
                        class="fc-list-heading-alt"
                        style="float: right"
                        data-goto='{"date":"2020-10-28","type":"day"}'
                        >October 31, 2020</a
                      >
                    </td>
                  </tr>
                  <tr class="fc-list-item fc-event-primary">
                    <td class="fc-list-item-time fc-widget-content">
                      8.30 - 10.00
                    </td>
                    <td class="fc-list-item fc-event-solid-info fc-event-light">
                      <span class="fc-event-dot"></span>
                    </td>
                    <td class="fc-list-item-title fc-widget-content">
                      <a>Seans Süresi Geçti</a>
                    </td>
                  </tr>
                  <tr class="fc-list-item fc-event-primary">
                    <td class="fc-list-item-time fc-widget-content">
                      10.00 - 11.30
                    </td>
                    <td class="fc-list-item-marker fc-widget-content">
                      <span class="fc-event-dot"></span>
                    </td>
                    <td class="fc-list-item-title fc-widget-content">
                      <a>8 Randevu</a>
                      <div class="fc-description">
                        2 masa uygun.
                      </div>
                    </td>
                  </tr>
                  <tr class="fc-list-item fc-event-danger">
                    <td class="fc-list-item-time fc-widget-content">
                      11.30 - 13.00
                    </td>
                    <td class="fc-list-item-marker fc-widget-content">
                      <span class="fc-event-dot"></span>
                    </td>
                    <td class="fc-list-item-title fc-widget-content">
                      <a>Boş masa kalmamıştır.</a>
                    </td>
                  </tr>
                  <tr class="fc-list-item fc-event-primary">
                    <td class="fc-list-item-time fc-widget-content">
                      13.00 - 14.30
                    </td>
                    <td class="fc-list-item-marker fc-widget-content">
                      <span class="fc-event-dot"></span>
                    </td>
                    <td class="fc-list-item-title fc-widget-content">
                      <a>3 Randevu</a>
                      <div class="fc-description">
                        7 masa uygun.
                      </div>
                    </td>
                  </tr>
                  <tr class="fc-list-item fc-event-primary">
                    <td class="fc-list-item-time fc-widget-content">
                      14.30 - 16.00
                    </td>
                    <td class="fc-list-item-marker fc-widget-content">
                      <span class="fc-event-dot"></span>
                    </td>
                    <td class="fc-list-item-title fc-widget-content">
                      <a>5 Randevu</a>
                      <div class="fc-description">
                        5 masa uygun.
                      </div>
                    </td>
                  </tr>
                  <tr class="fc-list-item fc-event-primary">
                    <td class="fc-list-item-time fc-widget-content">
                      16.00 - 17.30
                    </td>
                    <td class="fc-list-item-marker fc-widget-content">
                      <span class="fc-event-dot"></span>
                    </td>
                    <td class="fc-list-item-title fc-widget-content">
                      <a>1 Randevu</a>
                      <div class="fc-description">
                        9 masa uygun.
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// const axios = require("axios").default;
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

export default {
  data() {
    return {
      isShowMonth: true
    };
  },
  methods: {
    chooseCalendarType(param) {
      if (param === "Month") {
        this.isShowMonth = true;
      } else {
        this.isShowMonth = false;
      }
    }
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Randevu Listeleme" }]);
  }
};
</script>
