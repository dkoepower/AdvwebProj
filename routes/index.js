
var sql = require('node-sqlserver-unofficial');
var conn = "Driver={SQL Server Native Client 11.0};Server=tcp:pizgjft6r5.database.windows.net,1433;Database=AdvancedWebProgramming_DB;Uid=Advanced@pizgjft6r5;Pwd=Rhrmqdnpq1;Encrypt=yes;Connection Timeout=30;";

exports.index = function (req, res) {
    var select = "select * from tasks where completed = 0";
    sql.query(conn, select, function (err, items) {
        if (err)
            res.render(err);
        res.render('index', { title: 'My ToDo List ', tasks: items });
    });
};

exports.updateItem = function (req, res) {
    var item = req.body.item;
    if (item) {
        var insert = "insert into tasks (name, category, created, completed) values (?, ?, GETDATE(), 0)";
        sql.query(conn, insert, [item.name, item.category], function (err) {
            if (err)
                throw err;
            res.redirect('/');
        });
    } else {
        var completed = req.body.completed;
        if (!completed.forEach)
            completed = [completed];
        var update = "update tasks set completed = 1 where id in (" + completed.join(",") + ")";
        sql.query(conn, update, function (err) {
            if (err)
                throw err;
            res.redirect('/');
        });
    }
}