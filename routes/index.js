
var sql = require('node-sqlserver-unofficial');
var conn = "Driver={SQL Server Native Client 11.0};Server=tcp:pizgjft6r5.database.windows.net,1433;Database=AdvancedWebProgramming_DB;Uid=Advanced@pizgjft6r5;Pwd=Rhrmqdnpq1;Encrypt=yes;Connection Timeout=30;";


exports.selectStage = function (req, res) {
    var nstype = Number(req.param('nstype')) + 1;
       
    var select = "select s_script from stagesource where s_index = ?";
       sql.query(conn, select,[nstype], function(err, result, fields) {
            if (err)
            throw err;
                var script = result[0].s_script;
            res.send(script);
            });
}


exports.registerUser = function (req, res) {
    var name = req.param('name');
    
    var register = "Insert Into users(u_name, u_stage) values(?, 0)";
    sql.query(conn, register, [name], function (err, result, fields) {
        if (err) {
            if (err.code == 2627)
                res.send('이름이 이미 존재합니다. 다른이름을 선택하세요');
            else
                throw err;
        }
    });
}

exports.finishStage = function (req, res) {
    var name = req.param('name');
    var stage = Number(req.param('stage')) + 1;
    var record = Number(req.param('record'));

    var updateUser = "Update Users set u_stage = ? where u_name = ? and u_stage < ?";
    sql.query(conn, updateUser, [stage, name, stage], function (err, result, fields) {
        if (err) {
            res.send(err);
        }
    });

    var updateRanking = "Update stagesource set s_u_name = ?, s_record = ?, s_recordDate = SWITCHOFFSET(SYSDATETIMEOFFSET(),9*60) where s_index = ? and s_record > ?";
    sql.query(conn, updateRanking, [name, record, stage, record], function (err, result, fields) {
        if (err) {
            res.send(err);
        }
    });

}

exports.ranking = function (req, res) {
    var stage = Number(req.param('stage')) + 1;

    var getRanking = "Select s_u_name, s_record, s_recordDate from stagesource";

    sql.query(conn, getRanking, function (err, result, fields) {
        if (err) {
            res.send(err);
            throw (err);
        }
        
        res.send(result);
    });
}