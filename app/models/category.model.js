const sql = require("./db.js");

// Constructor
const category = function ( category ) {
  this.cat_name = category.cat_name;
  this.is_deleted = category.is_deleted;
  this.created_date = category.created_date;
  this.updated_date = category.updated_date;
};

category.getAll = result => {

    sql.query("SHOW COLUMNS FROM category", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log("Table Structure: ", res);
        result(null, res);
    });
};






category.updateById = (id, updatedcategory, result) => {
    sql.query( "UPDATE category SET ? WHERE id = ?",[updatedcategory, id], (error, response) => {
        if (error) {
            console.error(error);
            result(error, null);
            return;
        }

        if (response.affectedRows == 0) {

            result({ kind: "not_found" }, null);
            return;
        }
        
        result(null, { id: id, ...updatedcategory });
    }
    );
};



category.remove = (id, result) => {
    sql.query("DELETE FROM category WHERE id = ?", id, (error, response) => {
        if (error) {
            console.error(error);
            result(error, null);
            return;
        }

        if (response.affectedRows == 0) {

            result({ kind: "not_found" }, null);
            return;
        }
        
        result(null, response);
    });
};

module.exports = category;