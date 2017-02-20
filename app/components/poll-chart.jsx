import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import randomColor from 'randomcolor';

const PollChart = (props) => {
  const _formatOptions = () => {
    if(props.options!==undefined){
      let names = [];
      let votes = [];

      for(let i = 0; i<props.options.length;i++){
        names.push(props.options[i].name);
        votes.push(props.options[i].votes);
      }

      return {names: names, votes: votes};
    }

    return undefined;
  };

  const _getRandomColors = (count) => {
    //Uses base colors from angular-chart.js
    const BASE_COLORS = ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
    let colors = BASE_COLORS;

    if(count>colors.length){
      let needColors = count - colors.length;
      let temp = randomColor({count: needColors});
      colors = colors.concat(temp);
    }

    return colors;
  };

  let opts = _formatOptions();

  if(opts){
    var data = {
      labels: opts.names,
      datasets: [
          {
              data: opts.votes,
              backgroundColor: _getRandomColors(opts.names.length)
          }]
    };

    var options = {
      legend: {
        position: "bottom"
      }
    };

    var doughnut = <Doughnut data={data} options={options} width={500} height={500}/>;
  }
  
  return(
    <div className="col-lg-6">
      {doughnut}
    </div>
  );
}

export default PollChart;