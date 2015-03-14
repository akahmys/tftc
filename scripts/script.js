$(function() {
  var ranking;
  var signList = [ "おひつじ座", "おうし座", "ふたご座", "かに座", "しし座", "おとめ座", "てんびん座", "さそり座", "いて座", "やぎ座", "みずがめ座", "うお座" ];

  var analysis = {
    data1: null,
    data2: null,
    data3: null,
    data4: null,
    data5: null,
    data6: null,
    data7: null,
    data8: null,
    data9: null,
    data10: null,
    data11: null,
    data12: null
  }

  function analyze(sign, year) {
    var data = ranking.filter(function(i) {
      if (i[0] == year) return true;
    });

    var data3 = data.length;
    var data1 = Date.UTC(data[0][0], data[0][1] - 1, data[0][2]);
    var data2 = Date.UTC(data[data3 - 1][0], data[data3 - 1][1] - 1, data[data3 - 1][2]);
    var data4 = (function() {
      var sum = 0;
      for (var i=0; i<data3; ++i) {
				sum += data[i][sign + 3];
			};
			return sum/data3;
		})();

		var buf1 = [0,0,0,0,0,0,0,0,0,0,0,0];
		for (var i=1; i<data3; ++i) {
			if (data[i][sign + 3] == data[i - 1][sign + 3]) {
				++buf1[data[i][sign + 3] - 1];
			}
		}
		var data5 = buf1[0];
		var data6 = buf1[11];

		var buf2 = [0,0,0,0,0,0,0,0,0,0,0,0];
		for (var i=0; i<data3; ++i) {
			++buf2[data[i][sign + 3] - 1];
		}
		var data7 = buf2[0];
		var data8 = buf2[11];
		var data9 = buf2[0] + buf2[1] + buf2[2] + buf2[3] + buf2[4] + buf2[5];
		var data10 = buf2[6] + buf2[7] + buf2[8] + buf2[9] + buf2[10] + buf2[11];

		var buf3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		for (var i=1; i<data3; ++i) {
			++buf3[data[i - 1][sign + 3] - data[i][sign + 3] + 11];
		}
		var data11 = buf3[0];
		var data12 = buf3[22];

		$.observable(analysis).setProperty("data1", Highcharts.dateFormat("%Y年%m月%d日から", data1));
		$.observable(analysis).setProperty("data2", Highcharts.dateFormat("%Y年%m月%d日まで", data2));
		$.observable(analysis).setProperty("data3", data3 + "日");
		$.observable(analysis).setProperty("data4", data4.toFixed(2) + "位");
		$.observable(analysis).setProperty("data5", data5 + "回");
		$.observable(analysis).setProperty("data6", data6 + "回");
		$.observable(analysis).setProperty("data7", data7 + "回 (" + (data7 / data3 * 100).toFixed(2) + "%)");
		$.observable(analysis).setProperty("data8", data8 + "回 (" + (data8 / data3 * 100).toFixed(2) + "%)");
		$.observable(analysis).setProperty("data9", data9 + "回 (" + (data9 / data3 * 100).toFixed(2) + "%)");
		$.observable(analysis).setProperty("data10", data10 + "回 (" + (data10 / data3 * 100).toFixed(2) + "%)");
		$.observable(analysis).setProperty("data11", data11 + "回");
		$.observable(analysis).setProperty("data12", data12 + "回");

		var chartData1 = [];
		for (var i=0; i<data3; ++i) {
			chartData1.push([Date.UTC(data[i][0], data[i][1] - 1, data[i][2]), data[i][sign + 3]]);
		}
		chart1.series[0].setData(chartData1);
		chart1.xAxis[0].setExtremes(Date.UTC(year, 0, 1), Date.UTC(year, 11, 31));
		chart1.setTitle({text: signList[sign] + " : " + year + "年"});

		chart2.series[0].setData(buf2);
		chart2.setTitle({text: signList[sign] + " : " + year + "年"});

		chart3.series[0].setData(buf3);
		chart3.setTitle({text: signList[sign] + " : " + year + "年"});
	}

  for (var i=new Date().getFullYear(); i>2004; --i) {
    $("select#year").append($("<option/>").attr({"value":i}).text(i + "年"));
  }

  $("#sign, #year").change(function() {
    analyze($("#sign").prop("selectedIndex"), $("#year").val());
  });

  var chart1 = new Highcharts.Chart(chartOptions1);
  var chart2 = new Highcharts.Chart(chartOptions2);
  var chart3 = new Highcharts.Chart(chartOptions3);

  $.link(true, "#analysis", analysis);

  $.getJSON("http://sloppyastrologer.appspot.com/jsonp?callback=?")
    .done(function(json) {
      ranking = json;
      analyze(0, new Date().getFullYear());
    })
    .fail(function() {
      alert("データの読み込みに失敗しました。");
    });
});