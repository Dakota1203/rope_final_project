// import Employee from './components/Employee';
// import Priority from './components/Priority';
// import Status from './components/Status';
import apiActions from './api/apiActions';
import ReleaseTasks from './components/ReleaseTasks';
import ReleaseTask from './components/ReleaseTask';
import ReleaseTaskEdit from './components/ReleaseTaskEdit';
// import ReleaseTaskPostSection from './components/ReleaseTaskPostSection';
import Header from './components/Header';
// import Footer from './components/Footer';
import moment from "moment";


const appDiv = document.querySelector('.app');
const appDivLeft = document.querySelector('.appLeft');
const appDivRight = document.querySelector('.appRight');


export default function pagebuild() {
    header()
    // footer()
    //navHome()
    showReleaseTasks();

    // showStatus()
    // showPriority()    
}

function header() {
    const header = document.querySelector('.header');
    header.innerHTML = Header();
}
// function footer() {
//     const footerElement = document.querySelector('.footer');
//     footerElement.innerHTML = Footer();
// }

function navHome() {
    const homeButton = document.querySelector('.nav__home');
    homeButton.addEventListener('click', function () {
        console.log('navhome');
        appDiv.innerHTML = showReleaseTasks();
    })
}

function showReleaseTasks() {
    fetch("https://localhost:44302/api/releaseTask")
        .then(response => response.json())
        .then(releaseTasks => {
            appDivLeft.innerHTML = ReleaseTasks(releaseTasks);
            //releaseTaskNameButton();
            highlightSelectedRow();
        })
        .catch(err => console.log(err))
    const releaseTaskEndpoint = `https://localhost:44302/api/releaseTask/1`;
    const releaseTaskCallback = releaseTask => {
        appDivRight.innerHTML = ReleaseTask(releaseTask);
    };
    apiActions.getRequest(releaseTaskEndpoint, releaseTaskCallback);
    
}
function releaseTaskNameButton() {
    const releaseTaskItem = document.querySelectorAll('.releaseTask__info');
    releaseTaskItem.forEach(element => {
        element.addEventListener('click', function () {
            const releaseTaskId = element.id;
            const releaseTaskEndpoint = `https://localhost:44302/api/releaseTask/${releaseTaskId}`;
            const releaseTaskCallback = releaseTask => {
                appDivRight.innerHTML = ReleaseTask(releaseTask);
            };
            apiActions.getRequest(releaseTaskEndpoint, releaseTaskCallback);
        })
    })
}

function getStatusName(statusId) {
    const statusEndpoint = `https://localhost:44302/api/status/${statusId}`;
    fetch(`https://localhost:44302/api/status/${statusId}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

appDivRight.addEventListener('click', function () {
    if (event.target.classList.contains('edit__releaseTaskButton')) {
        const ReleaseTaskEditSection = document.querySelector('.releaseTask__detailsInfo');
        const releaseTaskId = event.target.parentElement.querySelector('.edit__releaseTaskButton').id;
        apiActions.getRequest(
            `https://localhost:44302/api/releaseTask/${releaseTaskId}`,
            releaseTaskEdit => {
                ReleaseTaskEditSection.innerHTML = ReleaseTaskEdit(releaseTaskEdit);
            }
        )
    }
})

appDivRight.addEventListener('click', function(){
    if (event.target.classList.contains('edit-releaseTask__submit')){
        console.log('in task save');
        const releaseTaskId = event.target.parentElement.querySelector('.edit-releaseTask__id').value;
        const name = event.target.parentElement.querySelector('.edit-releaseTask__name').value;
        const description = event.target.parentElement.querySelector('.edit-releaseTask__description').value;
        const statusID = 1;
        const priorityID = 1;
        const dueTime = Date.now();
        const employeeID = 1;
        const isVisible = true;
        var lastModifiedTime = new Date();
        console.log('rawtime');
        console.log(lastModifiedTime);
        let newdate2 = lastModifiedTime.toISOString().slice(0,19).replace('T', ' ');
        const newdate1 = moment(lastModifiedTime).format();
        const newdate = lastModifiedTime.toUTCString();
        const harddate = "2020-08-03 18:29:41"
        
        console.log('newtime');
        console.log(newdate);

        const releaseEdit = {
            id: releaseTaskId,
            Name: name,
            Description: description,
            CurrentDueTime: "08-19-2020 23:15:00",
            CreatedDate: "08-19-2020 23:15:00",
            IsVisible: isVisible,
            LastModifiedDate: newdate2,
            CurrentStatusID: statusID,
            CurrentPriorityID: priorityID,
            AssignedEmployeeID: employeeID
        };
        console.log(releaseEdit);

        const releaseTaskEndpoint = `https://localhost:44302/api/releaseTask/${releaseTaskId}`;
        console.log('before save');
        apiActions.putRequest2(
            releaseTaskEndpoint,
            releaseEdit
        )
        console.log('after save');
        //without the alert the page reposts with old data, even though it did save
        alert('Changes Saved');

        //Reload the Left Table
        fetch("https://localhost:44302/api/releaseTask")
        .then(response => response.json())
        .then(releaseTasks => {
            appDivLeft.innerHTML = ReleaseTasks(releaseTasks);
            //releaseTaskNameButton();
            highlightSelectedRow();
        })
        .catch(err => console.log(err))

        //Reload the Right Table
        const releaseTaskCallback = releaseTask => {
             appDivRight.innerHTML = ReleaseTask(releaseTask);
        };
        apiActions.getRequest(releaseTaskEndpoint, releaseTaskCallback);
        console.log('after get req');

        //highlightSpecificRow(2);


    }
})

// function changePriorityColor() {
    
//     var priorityThreshold = ${priority.id },
//         priorityColor = document.querySelector('.priorityLevel');
    
//     function changeColor(val) {
//         var color = "green";
    
//         if (val = 3) {
//             color = "yellow"
//         }
//         if (val = 2) {
//             color = "orange";
//         }
//         if (val = 1) {
//             color = "red";
//         }
    
//         priorityColor.style.color = color;
//     }
// }

// changeColor(colorThreshold);

//  function rowHighlightHandler(row){
//      alert('row index='+row.rowIndex);
//  }


function highlightSelectedRow() {
    var table = document.getElementById('table1Id');
    var cells = table.getElementsByTagName('td');

    for (let i = 0; i < cells.length; i++) {
        var cell = cells[i];
        cell.onclick = function () {
            var rowId = this.parentNode.rowIndex;
            var rowsNotSelected = table.getElementsByTagName('tr');
            for (var row = 1; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "white";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "rgb(173, 204, 209)";
            rowSelected.className += " selected";

            const releaseTaskId = rowSelected.cells[0].innerHTML;
            const releaseTaskEndpoint = `https://localhost:44302/api/releaseTask/${releaseTaskId}`;
            const releaseTaskCallback = releaseTask => {
                appDivRight.innerHTML = ReleaseTask(releaseTask);
            };
            apiActions.getRequest(releaseTaskEndpoint, releaseTaskCallback);

        }
    }
}

function highlightSpecificRow(rowId){
    console.log('in spec row highligh');
    console.log(rowId);
    var table = document.getElementById('table1Id');
    console.log(table);
    var cells = table.getElementsByTagName('td');
    var rowSelected = table.getElementsByTagName('tr')[rowId];
    console.log(rowSelected);
    rowSelected.style.backgroundColor = "rgb(173, 204, 209)";
    rowSelected.className += " selected";

}
