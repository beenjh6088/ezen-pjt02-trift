function makeCharts() {
  // console.log(1)
  let eDoughnut = document.querySelector("#doughnut");
  let eLine = document.querySelector("#line");
  eLine.width = 600;
  eLine.height = 400;


  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const dataDomestic = [100, 150, 120, 180, 160, 200];
  const dataAbroad = [50, 90, 10, 60, 100, 300];
  let chartDoughnut = new Chart(eDoughnut, {
    type: 'pie',// bar line doughnut bubble scatter pie
    data: {
      labels: ['국내', '국외'],
      datasets: [
        {
          label: '여행',
          fill: false,
          backgroundColor: ['#E00D32', '#E0E0E0'],
          data: [5,2],
        }
      ],
    },
    options: {
      responsive: true, // 반응형 여부 (기본값 true)
      maintainAspectRatio: false, // 크기 고정
      plugins: {
        tooltip: { // 튤팁 스타일링
          enabled: true, // 튤팁 활성화 (기본값 true)
          backgroundColor: '#000', // 튤팁 색상
          padding: 10, // 튤팁 패딩
        },
        legend: { // 범례 스타일링
          display: true, // 범례 활성화 (기본값 true)
          position: 'top' // 범례 위치
        },
      },
      scales: { // x축과 y축에 대한 설정
        x: {
          display : false
        },
        y: {
          display : false
        }
      }
    }
  })
  let chartLine = new Chart(eLine, {
    type: 'line',
    data: {
        labels: months, // X 축 레이블 (월)
        datasets: [
          {
            label: '국내', // 데이터셋 레이블
            data: dataDomestic, // 데이터 배열
            backgroundColor: '#E00D32', // 그래프 영역 배경색
            // borderColor: '#E00D32', // 선 색상
            borderWidth: 2, // 선 두께
            pointRadius: 4, // 데이터 포인트 반지름
            pointBackgroundColor: '#E00D32', // 데이터 포인트 배경색
            // pointBorderColor: '#E00D32', // 데이터 포인트 테두리 색상
            pointHoverRadius: 6, // 호버 시 데이터 포인트 반지름
            // pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)', // 호버 시 데이터 포인트 배경색
            // pointHoverBorderColor: 'rgba(220, 220, 220, 1)', // 호버 시 데이터 포인트 테두리 색상
            pointHitRadius: 10, // 데이터 포인트 클릭 반경
            pointBorderWidth: 2 // 데이터 포인트 테두리 두께
          },
          {
            label: '국외', // 데이터셋 레이블
            data: dataAbroad, // 데이터 배열
            backgroundColor: '#E0E0E0', // 그래프 영역 배경색
            // borderColor: 'rgba(75, 192, 192, 1)', // 선 색상
            borderWidth: 2, // 선 두께
            pointRadius: 4, // 데이터 포인트 반지름
            // pointBackgroundColor: 'rgba(75, 192, 192, 1)', // 데이터 포인트 배경색
            // pointBorderColor: 'rgba(75, 192, 192, 1)', // 데이터 포인트 테두리 색상
            pointHoverRadius: 6, // 호버 시 데이터 포인트 반지름
            // pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)', // 호버 시 데이터 포인트 배경색
            // pointHoverBorderColor: 'rgba(220, 220, 220, 1)', // 호버 시 데이터 포인트 테두리 색상
            pointHitRadius: 10, // 데이터 포인트 클릭 반경
            pointBorderWidth: 2 // 데이터 포인트 테두리 두께
          },
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    // text: 'Month'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    // text: 'Value'
                }
            }
        }
    }
  });
}