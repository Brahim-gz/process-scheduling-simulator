import ReactApexChart from "react-apexcharts";

const ApexChart = ({ result, processes }) => {
  const config = {
    series: [
      {
        data: processes.map((p) => {
          return {
            x: "Process " + p.pid,
            y: [result["TD" + p.pid], result["TF" + p.pid]],
            fillColor: "#008FFB",
          };
        }),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "rangeBar",
      },
      title: {
        text: "Timeline of Process Execution",
        align: "center",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false,
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          var label = opts.w.globals.labels[opts.dataPointIndex];
          return label + " : " + (val[1] - val[0]).toFixed(2) + "s";
        },
        style: {
          colors: ["#f3f4f5", "#fff"],
        },
      },
      xaxis: {
        type: "numeric",
        title: {
          text: "Time Units",
        },
      },
      yaxis: {
        show: false,
      },
      grid: {
        row: {
          colors: ["#f3f4f5", "#fff"],
          opacity: 1,
        },
      },
    },
  };

  return (
    <div id="chart" style={{ width: "60%" }}>
      <ReactApexChart
        options={config.options}
        series={config.series}
        type="rangeBar"
        height={450}
      />
    </div>
  );
};

export default ApexChart;
