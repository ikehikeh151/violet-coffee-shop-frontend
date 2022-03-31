import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import {connect} from 'react-redux';

import './Dashboard.scoped.css';

import Header from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import {getChartData} from '../../utils/history';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      data: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            label: 'Income',
            data: [],
            backgroundColor: '#ffba33',
            borderRadius: 15,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        legend: {
          label: {
            fontSize: 14,
            fontFamily: 'Nunito Sans',
          },
        },
      },
    };
  }

  getChartData = () => {
    getChartData(this.props.token)
      .then((res) => {
        console.log(res.data.data.result);
        this.setState({chartData: res.data.data.result});
        this.setState({
          data: {
            ...this.state.data,
            datasets: [
              {
                ...this.state.data.datasets[0],
                data: [
                  res.data.data.result[0].total,
                  res.data.data.result[1].total,
                  res.data.data.result[2].total,
                  res.data.data.result[3].total,
                  res.data.data.result[4].total,
                  res.data.data.result[5].total,
                  res.data.data.result[6].total,
                ],
              },
            ],
          },
        });
      })
      .catch((err) => console.log({err}));
  };

  componentDidMount() {
    this.getChartData();
  }

  render() {
    return (
      <>
        <Header />
        <div className="dashboard-container">
          <h1>See how your store progress so far</h1>
          <div className="report-wrapper">
            <h2>Weekly</h2>
            <Bar
              data={this.state.data}
              options={this.state.chartOptions}
              height={'100px'}
            />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Dashboard);
