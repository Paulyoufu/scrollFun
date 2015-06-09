if (Meteor.isClient) {
    var index=0;//初始化经文索引值
    var s=0;     //计算diV中间位置的一个累加器  从第一个P标签开始计算进行累加直到150px(说明一下这个是人为高以定的)这个高变为止
    var k= 0;    //计算SCROLL bar 需要滚动多少到达位置。这个也是一个累加器
    var nextCharpter=1;    //这个是圣经章节数的记数器
Template.hello.rendered=function(){
       getLection(1,1);
   // console.log($("#sp1").text()+"mmmmmmmmmcccccccccmmmmmmmm");
   testDB(1,1);      //初始化页面显示创世记第1章1节
  //  console.log(testDB(1,1)+"len")
}

  Template.hello.events({
      'click #btnStart': function(){
      t=setTimeout(scrollB(),1000);   //实现滚动功能的函数
      },
      'click #btnStop': function() {
          clearTimeout(t);       // 暂停
      }
  });

    // TESTDB方法是显示经文 用的 一共有两个参数VSN代表章数，csn代表节数；每显示一章娈得调动此函数
    function testDB(vsn,csn) {

        //------------------------------------注----意---------------------------------------
        //-------------------------在iOS中，数据库文件必须放在www目录下-------------------------
        //-----在Xcode中，先将数据库文件放在Meteor项目的 “/Staging/www/” 目录下，部署程序即可-----
        //----------------------------------------------------------------------------------
        var db = window.sqlitePlugin.openDatabase({name: "bible.db", createFromLocation: 1});

        db.transaction(function(tx) {

            //单次查询BibleID表

            //单次查询Bible表
            var strSQL = "select ID as id,  Lection as lection  from Bible  where  VolumeSN="+vsn+" and ChapterSN="+csn+" order by ID;";

            tx.executeSql(strSQL, [],
                function(tx, res) {

                    //显示sql语句
                   console.log(strSQL);

                 //   console.log(" | " + "Bible Table" + " | " + "ID" + " | " + "Lection");
                   // var lectionList =[];
                  //  $("div").append("<p></p>") ;
                    for(var i=0;i<res.rows.length;i++)
                    {
                        $("div").append("<p>"+ res.rows.item(i).lection+"</p>");  //这个直接用JQEUERY写的就是在DIV里加载P标签用的
                    }
                    $("div").append("<p></p>") ;
                }, function(e) {
                   // console.log("ERROR: " + e.message);
                });
        });

    }
    scrollB=function(){

        if(index>=$("div p:last").index()){   //本章最后一节经文
           $("div p").empty(""); //清空 经文
            nextCharpter++;
          testDB(1,nextCharpter);//加载下一章经文
          k=0;s=0;
               //将累加清零；
            $("div p:first").addClass("green");
            clearTimeout(t);
           scrollStart();
        }
        else
        {
           scrollStart();
        }
        index++;
        setTimeout("scrollB()",1500);
    }

    scrollStart=function()
    {  console.log(index+"*****************************")
        //index=-1;
       // index++;
        if(s<=100)  //预设中心位置为150px  如果是手机屏window.screenHeight/2
        {
            s=s+$("div p:eq("+index+")").height();  //计算是否到了中心位置
         //   console.log(index+"index");
          //  console.log($("div p:eq("+index+")").height());
            $("div p").removeClass("blue");            //却除当前所有的P标签的前景色
            $("div p:eq("+index+")").addClass("blue");  //加载当前p标签的前景色
            $("div").scrollTop($("div p:eq(0)").position().top) ;   // goto top
        }
        else{
            $("div p").removeClass("blue");
            $("div p:eq("+index+")").addClass("blue");
            k+=$("div p:eq("+index+")").outerHeight(true)-15;    //scroll to center height
            console.log($("div p:eq("+index+")").outerHeight(true)+" 这个是高度");
            $("div").scrollTop(k) ;        // scroll

        }

    }







}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
