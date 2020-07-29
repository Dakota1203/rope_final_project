
import Employee from './components/Employee';
import Employees from './components/Employees';
import Priority from './components/Priority';
import Status from './components/Status';
import ReleaseTasks from './components/ReleaseTasks';
// import ReleaseTask from './components/ReleaseTask';
// import ReleaseTaskEdit from './components/ReleaseTaskEdit';
// import ReleaseTaskPostSection from './components/ReleaseTaskPostSection';

const appDiv = document.querySelector('.app');

export default function pagebuild() {
    // header()
    // footer()
    // home()
    showReleaseTasks();
    // showEmployeeList()
    // showStatus()
    // showPriority()    
}


function showReleaseTasks() {
    console.log(appDiv);
    fetch("https://localhost:44302/api/releaseTask")
        .then(response => response.json())
        .then(releaseTasks => {
            appDiv.innerHTML = ReleaseTasks(releaseTasks);
        })
        .catch(err => console.log(err))
}

function showEmployeeList() {
    fetch("https://localhost:44302/api/employee")
        .then(response => response.json())
        .then(employees => {
            appDiv.innerHTML = Employees(employees);
        })
        .catch(err => console.log(err))
}
// function showReleaseTask_ByPriority() {
//     const priorityReleaseTask = document.querySelectorAll(".releaseTask__item");
//     priorityReleaseTask.forEach(element => {
//         element.addEventListener('click', function () {
//             const priorityReleaseTaskId = element.id;
//             fetch()
//                 .then(response => response.json())
//                 .then( => appDiv.innerHTML = )
//                 .catch(err => console.log(err))
//         })
//     })

// }