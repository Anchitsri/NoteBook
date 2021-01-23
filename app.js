
        function getandupdate() {
            tit = document.getElementById('title').value;
            desc = document.getElementById('description').value;
            if(tit!=""||desc!=""){
            
                let d=new Date();            
                let date=d.getHours()+":"+d.getMinutes()+" On "+d.getDate()+"/ "+d.getMonth()+1+" / "+d.getFullYear();
                if (localStorage.getItem('itemsJson') == null) {
                    itemjsonarray = [];
                    itemjsonarray.push([tit, desc,date]);
                    localStorage.setItem('itemsJson', JSON.stringify(itemjsonarray));
                }
                else {
                    itemjsonarraystr = localStorage.getItem('itemsJson');
                    itemjsonarray = JSON.parse(itemjsonarraystr);
                    itemjsonarray.push([tit, desc,date]);
                    localStorage.setItem('itemsJson', JSON.stringify(itemjsonarray));
                }
                document.getElementById('title').value = null;
                document.getElementById('description').value = null;
                update();
            }
            else
            {
                     alert("Please Enter the Title and Description Of Your Note");
            }
    }
        function update() {

            if (localStorage.getItem('itemsJson') == null) {
                itemjsonarray = [];
                localStorage.setItem('itemsJson', JSON.stringify(itemjsonarray));
            }
            else {
                itemjsonarraystr = localStorage.getItem('itemsJson');
                itemjsonarray = JSON.parse(itemjsonarraystr);
            }
            let body = document.getElementById('tablebody');
            let str = "";
            itemjsonarray.forEach((element, index) => {
                str += `
                <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td>${element[2]}</td>
                <td><button class="btn btn-primary btn-sm" onclick="deleted(${index})">Delete</button></td>
                </tr>
            `;
            });
            body.innerHTML = str;
        };
        
        add = document.getElementById('add');
        add.addEventListener('click', getandupdate);
        update();
        
        function deleted(index) {
            console.log("deleting element at" + index);
            itemjsonarraystr = localStorage.getItem('itemsJson');
            itemjsonarray = JSON.parse(itemjsonarraystr);
            itemjsonarray.splice(index, 1);
            localStorage.setItem('itemsJson', JSON.stringify(itemjsonarray));
            update();
        };

        function clearstorage() {
            if (confirm("Do you really want to clear all?")) {
                localStorage.clear();
                update();
            }
        }

        let searchtxt = document.getElementById('searchtxt');
        searchtxt.addEventListener('input', function () {
            let maincard = document.getElementById("todocont");
            let v = searchtxt.value.toLowerCase();
            let tablebody = document.getElementById('tablebody');
            let tr=tablebody.getElementsByTagName('tr');
            let cardtxt;
            maincard.style.display = "none";
            let heading=document.getElementById('headingb');
                let newhtml= `   <h3 class="my-4 " id="headingb">Your Saved Items <button class="btn btn-primary" id="headingbtn"> Want to Add More</button></h3>`
                heading.innerHTML=newhtml;
              
                document.getElementById('headingbtn').addEventListener('click',function(){
                    location.reload();
                })
            Array.from(tr).forEach(function (element) {
                notetitletxt = element.getElementsByTagName('td')[0].innerText;
                notetxt = element.getElementsByTagName('td')[1].innerText;
                if (notetitletxt.includes(v)||notetxt.includes(v)) {
                   element.style.display='';
                }
                else {
                    element.style.display="none";

                }
            })
        })