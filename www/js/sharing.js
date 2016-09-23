
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//------------------------------------------------------------------------
//init custom sharing sheet
var sharing={

    initShareSheet:function(){
        $(".app").append("<div id='sharesheetbg' class='sharesheetbg'></div>");
        $("#sharesheetbg").append("<div id='sharesheet' class='sharesheet'></div>");
        $("#sharesheetbg").append("<button id='closeBtn' class='closeBtn'></button>");
        $("#sharesheet").append("<ul></ul>");
        $("#sharesheet ul").append("<li style='border:none;'>Share with</li>");
//        $("#sharesheet ul").append("<li onclick='sharing.emailShare();'><img src='img/emailapp.png'/><span>Email</span></li>");
//        $("#sharesheet ul").append("<li onclick='sharing.facebookShare();'><img src='img/fbapp.png'/><span>Facebook</span></li>");
        $("#sharesheet ul").append("<li onclick='sharing.whatsappShare();'><img src='img/whatsapp.png'/><span>Whatsapp</span></li>");
        
        $("#closeBtn").click(function(){
            sharing.closeShareSheet();
        });
    },
    
    closeShareSheet:function(){
        $("#sharesheetbg").remove();
    },

    
    whatsappShare:function(){

//        var getDMZKeyFromDbProcess=getDMZKeyFromDB();
//        $.when(getDMZKeyFromDbProcess).done(function(data){
//            var sharingpage=$("#sharingpage").val();
//            
//            if(sharingpage=='product'){
//                var baseurl=data.item(0).BASEURL; 
//                var websiteLink=$("#websitelink a").attr("href");
//                websiteLink= baseurl+websiteLink.substring(1, websiteLink.length);
//
//                window.plugins.socialsharing.shareViaWhatsApp(null, null, websiteLink,   function() {
//                    app.closeShareSheet();
//                }, function(errormsg){
//                    navigator.notification.alert(errormsg, function(){}, "MDeC eSolutions", "Ok");
//                });
//            }
//            else{
//                var baseurl=data.item(0).BASEURL; 
//                var title=$("#companyName").text();
//                
//                title="msc-company/"+title.replace(/\s+/g, '-');
//                var websiteLink= baseurl+title;
//                
//                window.plugins.socialsharing.shareViaWhatsApp(null, null, websiteLink,   function() {
//                    app.closeShareSheet();
//                }, function(errormsg){
//                    navigator.notification.alert(errormsg, function(){}, "MDeC eSolutions", "Ok");
//                });
//            }
//        });
    },
    

}



