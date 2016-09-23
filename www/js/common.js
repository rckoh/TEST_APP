var db;

var loading = {
    
    //add loading page when calll
    startLoading:function(){
        $(".app").prepend("<div class='loadingPage'><div class='loadingFrame'><img class='loadingIcon' src='img/loading_large.gif'></img></div></div>");
    },
    
    //remove loading page when call
    endLoading:function(){
        $(".loadingPage").remove();
    }
};

var dbmanager = {
    initdb:function(){
        db = window.openDatabase("Database", "1.0", "Notification", 200000);
    },
    
//    createTable:function(){
//        db.transaction(createTableTransaction, this.errorExecuteSQL, this.successExecuteSQL);
//        
//        function createTableTransaction(tx){        
//
//            tx.executeSql('DROP TABLE NotificationList');
//            
////           tx.executeSql('CREATE TABLE IF NOT EXISTS NotificationList (issueID text PRIMARY KEY , issueDate text, ipAddress text, SysName text, SysContact text,SysLocation text,issueStatus text,read text)');    
//            
//        }
//    },
        
//        insertData:function(){
//            
// 
//            
//         db.transaction(function(tx){
//              
//             tx.executeSql('SELECT * FROM NotificationList', [], function(tx, result){
//            
//                 if(result.rows.length == 0){
//                       
//                       tx.executeSql('INSERT INTO NotificationList  (issueID, issueDate, ipAddress, SysName, SysContact, SysLocation, issueStatus, read) VALUES ("001", "2016/09/04 17:16:16","10.3.103.253","UPS01_KLIA_HGR6FF4","Administrator","SDF Room 4,1st Floor, HG6"," UPS Temperature Overrun (43.0C/109.4F)","false")');   
//                     
//                       tx.executeSql('INSERT INTO NotificationList  (issueID, issueDate, ipAddress, SysName, SysContact, SysLocation, issueStatus, read) VALUES ("002", "2015/12/31 17:16:16","10.3.103.253","UPS05_KLIA_TGHMN04","Administrator","SDF Room 4,1st Floor, HG6"," UPS Server Down (43.0C/109.4F)","false")');   
//                     
//                       tx.executeSql('INSERT INTO NotificationList  (issueID, issueDate, ipAddress, SysName, SysContact, SysLocation, issueStatus, read) VALUES ("003", "2015/01/02 17:16:16","10.3.103.253","UPS01_KLIA_AFRT6F4","Administrator","SDF Room 4,1st Floor, HG6"," UPS Not Responding (43.0C/109.4F)","false")');    
//
//                    }
//
//          }, this.errorExecuteSQL);
//        });
//},

     //select user profile data
    getUserProfileData:function(returnData){
        db.transaction(function(tx){
            
            tx.executeSql("SELECT * FROM userprof where username='"+userNameInput+"' and userpass='"+passwordInput+"' ", [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
         
    },
    
    
    getNotifyListData:function(returnData){
        db.transaction(function(tx){
           tx.executeSql('SELECT * FROM notifylist', [], function(tx, rs){
                returnData(rs);
          }, this.errorExecuteSQL);
        });
         
    },
    
    successExecuteSQL:function(){
        //success to executeSQL
        //alert("success");
    },
    
    errorExecuteSQL:function(err){
        //fail executeSQL
        alert("fail "+err.message);
    },

};

function onDeviceReady() {

    document.addEventListener("backbutton", onBackKeyDown, false);
    networkChecking();
}

function networkChecking(){

  if(navigator.network.connection.type == Connection.NONE){

      navigator.notification.alert("No internet connection.", function(){}, "Alert", "Ok");    
      return false;

  }else{ return true; }
}

function onExitConfirm(button) {
    if(button==2){
        return;
    }else if(button==1){
        navigator.app.exitApp();
    }else{
        
    }
}

function onSignOutConfirm(button) {
    if(button==2){
        return;
    }else if(button==1){
        window.location.href = "index.html";
    }else{
        
    }
}

function login(){
    
    var check = networkChecking();
    
    if(check == true){
        loading.startLoading();
         userNameInput=$("#username").val();
        passwordInput=$("#password").val();

        requestLogin(userNameInput, passwordInput);     
    }
   
};

function notifyshow(){

    dbmanager.getNotifyListData(function(returnData){
        alert(returnData.rows.length);
             if(returnData.rows.length>0){
                 var count = returnData.rows.length;
                    var contained_divs = '';

                for(var i=0;i<count;i++)
                {

                    contained_divs += '<div class="notifyview" id="'+returnData.rows.item(i).issueID +'"><label id="headline">'+ returnData.rows.item(i).issueDate +'</label> <label id="headline">'+ returnData.rows.item(i).SysName +' </label><label id="notifymsg">'+ returnData.rows.item(i).issueStatus +' </label></div>';

                }
                $('#notifybox').append(contained_divs);

            }   
        else{
            alert("Login failed. Username or password not matched");

        }
  });    



};

function appendDetail(num){
    currentnum = num;
            
     dbmanager.getNotifyListData(function(returnData){

     if(returnData.rows.length>0){

             $('#dt_detail').html(returnData.rows.item(num).issueDate);
             $('#ip_detail').html(returnData.rows.item(num).ipAddress);
             $('#sys_detail').html(returnData.rows.item(num).SysName);
             $('#syscon_detail').html(returnData.rows.item(num).SysContact);
             $('#syslc_detail').html(returnData.rows.item(num).SysLocation);
             $('#sts_detail').html(returnData.rows.item(num).issueStatus);
        }
    }); 
}
            

//special dedicated to get dmz key
function getUSPKeyFromDB(){
    var defer=$.Deferred();

    db.transaction(function(tx){
            tx.executeSql('SELECT * FROM userprof', [], function(tx, rs){
                defer.resolve(rs.rows);
          }, errorGetDMZKeyFromDB);
    });
    
    return defer.promise();
}
    