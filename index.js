import API from "./app/API.js";

function main() {
    const api = new API();
    api.getEmployees();
    api.getEmployee();
    api.registerEmployee();
    api.updateEmployee();
}

main();