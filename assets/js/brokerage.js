/**
 * Created by didi on 2015/12/4.
 */

function onStart(){
    jsonAjax(API.API_LIST.USER_BROKERAGE,{userid:getUserid()},function(data){
        if(data.status==1){
            //doTer(data,$('#balance'));
            $("#balance").html(data.data.balance);
            $("#b_day").html(data.data.day);
            $("#b_week").html(data.data.week);
            $("#b_month").html(data.data.month);
            $("#b_unpaid").html(data.data.unpaid);
            $("#b_paid").html(data.data.paid);
            $("#b_completed").html(data.data.completed);
        }

    });
}
$(".all-msg").on('click','.balance-down',function(){
    Interface('gotoshouyi');
});

$(".balance-btn").on('click',function(){
    Interface('gototixian');
});
