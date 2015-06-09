/**
 * Created by paul on 15/6/8.
 */

getLection = function (volumeSN, chapterSN) {
    // 打开数据库
    var db = window.sqlitePlugin.openDatabase({name: "bible.db", createFromLocation: 1});

    db.transaction(function(tx) {
        //单次查询Bible表
        var strSQL = "select ID as id,  Lection as lection, SoundEnd as soundend  from Bible  where  VolumeSN=" + volumeSN + " and ChapterSN=" + chapterSN + " order by ID;";

        tx.executeSql(strSQL, [],
            function(tx, res) {

                var lectionList =[];

                for(var i=0;i<res.rows.length;i++)
                {
                    var lectionItem = {};
                    lectionItem.sectionSN = i + 1;
                    lectionItem.lection = res.rows.item(i).lection;
                    console.log(res.rows.item(i).lection+"bible++++++++++");
                   // lectionItem.soundEnd = res.rows.item(i).soundend;
                    lectionList.push(lectionItem);
                    console.log(lectionList.length+"b+++++++++++___*******________");
                }
                //将查询结果存入Session
                Session.set('lectionList', lectionList);

            }, function(e) {
                console.log("ERROR: " + e.message);
            });
    });
}





