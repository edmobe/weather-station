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

  @ViewChild('chart1') chart1;
  @ViewChild('chart2') chart2;
  @ViewChild('chart3') chart3;

  constructor(private httpService: HttpService) {
    this.httpService.getGraph().subscribe((data: GraphRequest) => {
      if (data.opCode == 1) {
        var chart1Labels = [];
        var chart1Values = [];
        var chart2Labels = [];
        var chart2Values = [];
        var chart3Labels = [];
        var chart3Values = [];

        data.graphData[0].data.forEach((element) => {
          chart1Labels.push(element.timestamp);
          chart1Values.push(element.value);
        });

        data.graphData[1].data.forEach((element) => {
          chart2Labels.push(element.timestamp);
          chart2Values.push(element.value);
        });

        data.graphData[2].data.forEach((element) => {
          chart3Labels.push(element.timestamp);
          chart3Values.push(element.value);
        });

        this.chart1 = new Chart(this.chart1.nativeElement, {
          type: 'line',
          data: {
            labels: chart2Labels,
            datasets: [
              {
                data: chart1Values,
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
                position: 'top',
              },
              title: {
                display: true,
                text: data.graphData[0].parameter,
              },
            },
          },
        });

        this.loaded = true;
      } else {
        alert('Error');
      }
    });
  }
}
