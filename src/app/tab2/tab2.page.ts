import { Component, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { GraphRequest } from '../models/graph-request';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  loaded = false;
  data: GraphRequest;

  @ViewChild('chart1') chart1;
  @ViewChild('chart2') chart2;
  @ViewChild('chart3') chart3;

  constructor(private httpService: HttpService) {}

  getUrl() {
    return this.httpService.url;
  }

  ionViewDidEnter() {
    this.httpService.getGraph().subscribe((data: GraphRequest) => {
      this.data = data;
      var graph1Data = data.graphData[0].data.sort(function sortDate(a, b) {
        return new Date(b.timestamp) < new Date(a.timestamp) ?  1 // if b should come earlier, push a to end
         : new Date(b.timestamp) > new Date(a.timestamp) ? -1 // if b should come later, push a to begin
         : 0;                   // a and b are equal
      });
      var graph2Data = data.graphData[1].data.sort(function sortDate(a, b) {
        return new Date(b.timestamp) < new Date(a.timestamp) ?  1 // if b should come earlier, push a to end
         : new Date(b.timestamp) > new Date(a.timestamp) ? -1 // if b should come later, push a to begin
         : 0;                   // a and b are equal
      });
      var graph3Data = data.graphData[2].data.sort(function sortDate(a, b) {
        return new Date(b.timestamp) < new Date(a.timestamp) ?  1 // if b should come earlier, push a to end
         : new Date(b.timestamp) > new Date(a.timestamp) ? -1 // if b should come later, push a to begin
         : 0;                   // a and b are equal
      });

      if (data.opCode == 1) {
        var chart1Labels = [];
        var chart1Values = [];
        var chart2Labels = [];
        var chart2Values = [];
        var chart3Labels = [];
        var chart3Values = [];

        graph1Data.forEach((element) => {
          chart1Labels.push(new Date(element.timestamp).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }));
          chart1Values.push(element.value);
        });

        graph2Data.forEach((element) => {
          chart2Labels.push(new Date(element.timestamp).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }));
          chart2Values.push(element.value);
        });

        graph3Data.forEach((element) => {
          chart3Labels.push(new Date(element.timestamp).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          }));
          chart3Values.push(element.value);
        });

        this.chart1 = new Chart(this.chart1.nativeElement, {
          type: 'line',
          data: {
            labels: chart1Labels,
            datasets: [
              {
                data: chart1Values,
                backgroundColor: 'rgb(80, 190, 40)', // array should have same number of elements as number of dataset
                borderColor: 'rgb(80, 190, 40)', // array should have same number of elements as number of dataset
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: data.graphData[0].parameter,
              },
            },
          },
        });

        this.chart2 = new Chart(this.chart2.nativeElement, {
          type: 'line',
          data: {
            labels: chart2Labels,
            datasets: [
              {
                data: chart2Values,
                backgroundColor: 'rgb(80, 40, 190)', // array should have same number of elements as number of dataset
                borderColor: 'rgb(80, 40, 190)', // array should have same number of elements as number of dataset
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: data.graphData[1].parameter,
              },
            },
          },
        });

        this.chart3 = new Chart(this.chart3.nativeElement, {
          type: 'line',
          data: {
            labels: chart3Labels,
            datasets: [
              {
                data: chart3Values,
                backgroundColor: 'rgb(190, 40, 80)', // array should have same number of elements as number of dataset
                borderColor: 'rgb(190, 40, 80)', // array should have same number of elements as number of dataset
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: data.graphData[2].parameter,
              },
            },
          },
        });

        this.loaded = true;

        // console.log(chart1Labels)
        // console.log(chart1Values)
        // console.log(chart2Labels)
        // console.log(chart2Values)
        // console.log(chart3Labels)
        // console.log(chart2Values)
      } else {
        alert('Error');
      }
    });
  }
}
