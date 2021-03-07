// order script
$(document).ready(function () {

    $("#LogoutBtn").click(() => {
      console.log("btn clicked")
      localStorage.setItem('loginStatus', false)
      location.assign("./index.html")
    })
  
    if (localStorage.getItem('loginStatus') == "false") {
  
      location.assign("./index.html")
    }
  
  
  
    let response;
    let TbodyDiv = document.getElementsByTagName("tbody")[1];
  
    const createTableRow = (data) => {
      var trWrapper = document.createElement('tr');
      trWrapper.classList.add('Homepage_TableRow');
      var tdID = document.createElement('td');
      tdID.classList.add('Homepage_SecondaryText');
      tdID.innerText = data.id
      var tdCustomer = document.createElement('td');
      tdCustomer.classList.add('Homepage_PrimaryText');
      tdCustomer.innerText = data.customerName;
      var tdDate = document.createElement('td');
      tdDate.classList.add('Homepage_PrimaryText');
      tdDate.innerText = data.orderDate;
      var tdDate_Break = document.createElement('br');
      var tdAmount = document.createElement('td');
      tdAmount.classList.add('Homepage_SecondaryText');
      tdAmount.innerText = `$${data.amount}`;
      var tdStatus = document.createElement('td');
      tdStatus.classList.add('Homepage_PrimaryText');
      tdStatus.innerText = data.orderStatus;
      var tdDate_Time = document.createElement('span');
      tdDate_Time.classList.add('Homepage_SecondaryText');
      tdDate_Time.innerText = data.orderTime;
  
      trWrapper.appendChild(tdID);
      trWrapper.appendChild(tdCustomer);
      trWrapper.appendChild(tdDate);
      trWrapper.appendChild(tdAmount);
      trWrapper.appendChild(tdStatus);
      tdDate.appendChild(tdDate_Break);
      tdDate.appendChild(tdDate_Time);
  
      return trWrapper
  
  
  
  
    }
  
  
  
  
  
  
  
  
    $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders', function (data, status) {
  
  
      response = data;
  
      response.map(item => {
        var trRows = createTableRow(item)
        TbodyDiv.appendChild(trRows)
      })
  
  
  
  
    })
    let mArr = ['new', 'packed', 'intransit', 'delivered'];
  
    $('input').click((e) => {
  
      let event = e.target;
      if (event.checked == true) {
        let localCount = 0;
        mArr.push(event.value)
        TbodyDiv.innerHTML = ''
        response.map(item => {
          if (mArr.includes(item.orderStatus.toLowerCase())) {
            TbodyDiv.append(createTableRow(item))
            localCount++
          }
        })
        $("#countVal").text(`Count : ${localCount} `);
  
      }
      else {
        let localCount = 0;
        for (let i = 0; i < mArr.length; i++) {
          if (event.value == mArr[i]) { mArr.splice(i, 1) }
        }
        TbodyDiv.innerHTML = ''
        response.map(item => {
          if (mArr.includes(item.orderStatus.toLowerCase())) {
            TbodyDiv.append(createTableRow(item))
            localCount++
          }
        })
        $("#countVal").text(`Count : ${localCount} `);
      }
  
    })
  
  
  
  })
