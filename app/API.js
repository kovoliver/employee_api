import Conn from "./Conn.js";
import HTTP from "./HTTP.js";

class API extends HTTP {
    constructor() {
        super();
        this.conn = new Conn();
    }

    checkErrors(body) {
        const errors = [];
        const salary = parseInt(body.salary);

        if (body.firstName === undefined || body.firstName === null || body.firstName.length < 3)
            errors.push("First name must be at least 3 characters long!");
        if (body.lastName === undefined || body.lastName === null || body.lastName.length < 3)
            errors.push("Last name must be at least 3 characters long!");
        if (isNaN(salary) || salary < 0)
            errors.push("Invalid salary value!");

        if (errors.length !== 0)
            throw errors;
    }

    getEmployees() {
        this.get("/employees", async (req, res) => {
            try {
                const employees = await this.conn.query('SELECT * FROM employees');
                res.send(employees);
            } catch (err) {
                res.status(503).send({error:"Service unavailable!"});
            }
        });
    }

    getEmployee() {
        this.get("/employees/:id", async (req, res) => {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).send({ "message": "ID parameter is required and must be a number!" });
                return;
            }

            try {
                const employee = await this.conn.query(`SELECT * FROM employees 
                WHERE EmployeeID = ?`, [id]);

                if(employee.length > 0)
                    res.send(employee);
                else 
                    res.status(404).send({error:"This employee cannot be found!"});
            } catch (err) {
                res.status(503).send({error:"Service unavailable!"});
            }
        });
    }

    registerEmployee() {
        this.post("/employees", async (req, res) => {
            try {
                this.checkErrors(req.body);

                const result = await this.conn.query(`INSERT INTO employees
                (FirstName, LastName, Salary) VALUES(?,?,?)`, Object.values(req.body));

                if (result.affectedRows === 1) {
                    res.send({
                        employeeID: result.insertId,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        salary: req.body.salary
                    });
                } else {
                    res.status(500).send({error:"Something went wrong!"});
                }
            } catch (err) {
                res.status(400).send(err);
            }
        });
    }

    updateEmployee() {
        this.put("/employees/:id", async (req, res) => {
            const id = parseInt(req.params.id);

            if (isNaN(id)) {
                res.status(400).send({error:"The provided employeeID is incorrect!"});
                return;
            }

            try {
                this.checkErrors(req.body);
                const params = Object.values(req.body);
                params.push(id);

                const result = await this.conn.query(`UPDATE employees
                SET FirstName = ?, LastName = ?, Salary = ? 
                WHERE EmployeeID = ?`, params);

                if (result.affectedRows === 1) {
                    res.send({
                        employeeID: id,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        salary: req.body.salary
                    });
                } else {
                    res.status(404).send({error:"This employee cannot be found!"});
                }
            } catch (err) {
                res.status(400).send(err);
            }
        });
    }
}

export default API;