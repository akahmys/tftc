var chartOptions1 = {
  chart: { renderTo: "chart1" },
  title: {
    text: "おひつじ座",
    style: { fontSize: "1em" }
  },
  xAxis: {
    title: { text: "日付" },
    type: "datetime",
    dateTimeLabelFormats: { month: "%m/%d" },
    min: Date.UTC(2005, 0, 1),
    max: Date.UTC(2005, 11, 31)
  },
  yAxis: {
    title: { text: "順位" },
    tickInterval: 1,
    max: 12,
    min: 1,
    reversed: true
  },
  tooltip: {
    formatter: function() {
      return Highcharts.dateFormat("%m月%d日 ", this.x) + Highcharts.numberFormat(this.y, 0) + "位";
    }
  },
  legend: { enabled: false },
  plotOptions: {
    series: {
      marker: { enabled: true }
    }
  },
  series: [
    { data: null }
  ]
};

var chartOptions2 = {
  chart: {
    type: "column",
    renderTo: "chart2"
  },
  title: {
    text: "おひつじ座",
    style: { fontSize: "1em" }
  },
  xAxis: {
    title: { text: "順位", },
    categories: [ "1位", "2位", "3位", "4位", "5位", "6位", "7位", "8位", "9位", "10位", "11位", "12位" ]
  },
  yAxis: {
    title: { text: "回数", }
  },
  tooltip: {
    formatter: function() {
      return Highcharts.numberFormat(this.y, 0) + "回";
    }
  },
  legend: { enabled: false },
  series: [
    { data: null }
  ]
};

var chartOptions3 = {
  chart: {
    type: "column",
    renderTo: "chart3"
  },
  title: {
    text: "おひつじ座",
    style: { fontSize: "1em" }
  },
  xAxis: {
    title: { text: "順位変動" },
    categories: [ "-11", "-10", "-9", "-8", "-7", "-6", "-5", "-4", "-3", "-2", "-1", "0", "+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9", "+10", "+11" ]	},
  yAxis: {
    title: { text: "回数" }
  },
  tooltip: {
    formatter: function() {
      return Highcharts.numberFormat(this.y, 0) + "回";
    }
  },
  legend: { enabled: false },
  series: [ { data: null } ]
};