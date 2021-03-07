$(document).ready(function () {


    if (localStorage.getItem('loginStatus') == "false") {

        location.assign("./index.html")
    }
    $("#logoutBtn").click(() => {
        localStorage.setItem('loginStatus', false)
        location.assign("./index.html")
    })
    let TbodyDiv = document.getElementsByTagName("tbody")[0];

    let count = 0;

// table
    const ProductTableRow = (data) => {
        var trWrapper = document.createElement('tr');
        trWrapper.classList.add('ProductListingPage_TableRow');
        var tdID = document.createElement('td');
        tdID.classList.add('ProductListingPage_SecondaryText');
        tdID.innerText = data.id
        var tdProductName = document.createElement('td');
        tdProductName.classList.add('ProductListingPage_PrimaryText');
        tdProductName.innerText = data.medicineName;
        var tdProductBrand = document.createElement('td');
        tdProductBrand.classList.add('ProductListingPage_SecondaryText');
        tdProductBrand.innerText = data.medicineBrand;

        var tdExpiry_Date = document.createElement('td');
        tdExpiry_Date.classList.add('ProductListingPage_PrimaryText');
        tdExpiry_Date.innerText = data.expiryDate;
        var tdUnit_Price = document.createElement('td');
        tdUnit_Price.classList.add('ProductListingPage_SecondaryText');
        tdUnit_Price.innerText = `$${data.unitPrice}`;
        var tdStock = document.createElement('td');
        tdStock.classList.add('ProductListingPage_SecondaryText');
        tdStock.innerText = data.stock;

        trWrapper.appendChild(tdID);
        trWrapper.appendChild(tdProductName);
        trWrapper.appendChild(tdProductBrand);
        trWrapper.appendChild(tdExpiry_Date);
        trWrapper.appendChild(tdUnit_Price);
        trWrapper.appendChild(tdStock);


        return trWrapper




    }

    let response;
    $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products', function (data, status) {
        response = data;

        response.map(item => {
            var trRows = ProductTableRow(item)
            count++;
            TbodyDiv.appendChild(trRows)
        })
        $("#countVal").text(`Count : ${count} `);
    })
    let currentDate = new Date().getTime();
    const ExpiryBox = document.getElementById("productExpired")
    ExpiryBox.onclick = () => {
        count = 0;
        if (ExpiryBox.checked == false) {
            for (let i = 0; i < response.length; i++) {
                var output = new Date(response[i].expiryDate).getTime()
                var row = document.getElementsByClassName("ProductListingPage_TableRow");
                if (LowStockBox.checked) {
                    if (output > currentDate) {
                        row[i].style.display = "";
                        count++;
                    }
                    else {
                        row[i].style.display = "none";
                    }
                }
                else if (LowStockBox.checked == false) {
                    if (output > currentDate && response[i].stock > 100) {
                        row[i].style.display = "";
                        count++;

                    }
                    else {
                        row[i].style.display = "none";
                    }
                }




                else {
                    row[i].style.display = "none";
                }
            }
            $("#countVal").text(`Count : ${count} `);
        }

        else if (ExpiryBox.checked == true) {

            var row = document.getElementsByClassName("ProductListingPage_TableRow");
            for (let i = 0; i < row.length; i++) {

                if (LowStockBox.checked) {
                    row[i].style.display = ""
                    count++;
                }
                else if (LowStockBox.checked == false) {
                    if (response[i].stock > 100) {
                        row[i].style.display = ""
                        count++;
                    }
                    else {
                        row[i].style.display = "none"
                    }

                }



            }

            $("#countVal").text(`Count : ${count} `);

        }


    }
    const LowStockBox = document.getElementById("lowStock")

    LowStockBox.onclick = () => {
        count = 0;
        if (LowStockBox.checked == true) {

            var row = document.getElementsByClassName("ProductListingPage_TableRow");
            count = 0;
            for (let i = 0; i < row.length; i++) {

                if (ExpiryBox.checked) {
                    row[i].style.display = ""
                    count++;
                }
                else if (ExpiryBox.checked == false) {
                    var output = new Date(response[i].expiryDate).getTime()
                    if (output > currentDate) {
                        row[i].style.display = ""
                        count++;
                    }
                    else {
                        row[i].style.display = "none"
                    }
                }
            }
            $("#countVal").text(`Count : ${count} `);
        }

        else if (LowStockBox.checked == false) {
            count = 0;
            var row = document.getElementsByClassName("ProductListingPage_TableRow");
            for (let i = 0; i < row.length; i++) {
                if (ExpiryBox.checked) {

                    var row = document.getElementsByClassName("ProductListingPage_TableRow");
                    if (response[i].stock > 100) {
                        row[i].style.display = ""
                        count++;
                    }
                    else {
                        row[i].style.display = "none"
                    }
                }
                else if (ExpiryBox.checked == false) {
                    var output = new Date(response[i].expiryDate).getTime()
                    if (output > currentDate && response[i].stock > 100) {
                        row[i].style.display = "";
                        count++;

                    }
                    else {
                        row[i].style.display = "none";
                    }
                }

            }

            $("#countVal").text(`Count : ${count} `);

        }


    }
});
