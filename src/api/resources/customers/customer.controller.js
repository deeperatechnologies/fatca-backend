
import sql from 'mssql';


var sqlConfig = {
    user: 'sa',
    password: 'cybex_sqlserver2018',
    server: '192.168.4.8',
    database: 'MACTEST11'
}


export default {
  async  getportfolio(req, res) {
        try {



            const YEAR = req.params.YEAR ;
            const COMPANYID = req.params.COMPANYID ;
            sql.connect(sqlConfig, async function () {
                var request = new sql.Request();
                const query =`
                SELECT YEAR ,
                NUMEROCLIENT,
                 COMPANY , 
                 sum(PORTFOLIO) as PORTFOLIO  
                 FROM 
   (SELECT 
       YEAR ,
        NUMEROCLIENT,
        'COMPANY' = case  WHEN NUMEROVALEUR not in (474,1570,617,618,619,885,1381) 
               then 99
                 else
                  NUMEROVALEUR 
                  END   ,
       SUM(Portfolio) 
        AS PORTFOLIO 
    from  (
    select YEAR(retropf.Datejour) as YEAR ,RETROPF.NUMEROCLIENT ,RETROPF.NUMEROVALEUR , (COURSCLOTURE * QUANTITEVALEUR ) as 'Portfolio' 
     from retropf  
     where day(retropf.datejour) = 31
    
     and month(retropf.datejour) =12 
     and year(retropf.datejour) = ${YEAR}
      
      
     and retropf.NUMEROCLIENT IN (select numcli from clients where nat ='dz')
    
   group by  retropf.NUMEROCLIENT,YEAR(retropf.Datejour),NUMEROVALEUR,QUANTITEVALEUR,COURSCLOTURE 
   
   )as REQ1 
   
   group by NUMEROCLIENT, YEAR ,NUMEROVALEUr) as req2  where company = ${COMPANYID}
   
   GROUP BY NUMEROCLIENT , COMPANY ,YEAR  
                   
           
           `

           await  request.query(query, function (err, recordset1) {
                    if (err) {res.status(500).send(err);
                        console.error(err)}
                        else {
                    res.json(recordset1);
                        }
                    sql.close() ;
                  
                });



            })
           
        }
        catch (ex) {
            res.send(ex);
        };
    },

 

    findAll(req,res) {

        try {

            sql.connect(sqlConfig, async function () {
                var request = new sql.Request();
                return  await request.query("sELECT * FROM CLIENTS where NAT='TN' ",function (err, recordset) {
                    if (err)  res.status(500).send(err);
                    res.end(JSON.stringify(recordset));
                sql.close()
                    
                });

               


            }) ;
            
        }
        catch (ex) {
            res.send(ex);
        };

       
    }

  
}

