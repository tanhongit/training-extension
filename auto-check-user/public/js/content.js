$(document).ready(function () {

    $.ajax({    //create an ajax request to display.php
        type: "GET",
        url: "http://localhost/php-training/for-extension/auto-check-presence.php",
        dataType: "html",   //expect html to be returned                
        success: function (response) {
            $("#responsecontainer").html(response);
            //alert(response);
        }
    });

    /* khởi tạo bộ lưu trữ nếu mở lần đầu*/
    chrome.storage.sync.get(function () {
        user = { "mssv": [] };
        chrome.storage.sync.set({
            "list": user
        });
    });
    /*----------------*/

    chrome.storage.sync.get(["list"], function (result) {
        console.log(result['list']['mssv']);
    });

    $("#load").click(function () {
        // console.log($('#mssv_user2').val());
        
        var get_input_mssv;
        var total_user_mssv = $('#total_user_mssv').val();
        console.log(total_user_mssv);

        for (var i = 1; i <= total_user_mssv; i++) {
            get_input_mssv = $('#mssv_user' + i).val();
            chrome.storage.sync.get(["list"], function (result) {
                var get_list = result['list'];
                get_list['mssv'].push(get_input_mssv);
                chrome.storage.sync.set({
                    "list": get_list
                });
            });
        }

    });
});