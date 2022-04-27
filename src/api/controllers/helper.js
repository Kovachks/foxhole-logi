const executeFactory = connection => (
    query,
    parameters = []
) => (
    new Promise((resolve, reject) => {
        queryHelper(query, parameters, connection, (err, res) => {

            if (err) {
                reject(err)
            }
            resolve(res)
        })    
    })
)

const executeTransactionFactory = connection => (
    query,
    parameters
) => (
    new Promise((resolve, reject) => {
        connection.getConnection((err, conn) => {
            if (err) {
                reject(err)
            }

            queryHelper(query, parameters, conn, (err, result) => {
                if (err) {
                    return conn.rollback(() => {
                        conn.release()
                        reject(err)
                    })
                }

                conn.commit(err => {
                    if (err) {
                        return conn.rollback(() => {
                            conn.release()
                            reject(err)
                        })
                    }
                    conn.release()
                    resolve(result)
                })
            })
        })
    })
)

const queryHelper = (query, parameters, conn, cb) => {
    conn.query(query, parameters, cb)
}


module.exports = {
    executeFactory,
    executeTransactionFactory,
    queryHelper
}