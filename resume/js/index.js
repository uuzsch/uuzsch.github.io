////调用全屏的方法
//$(function(){
//    $('#dowebok').fullpage({
//    });
//});


//调用全屏的方法
$(function(){
    $('#dowebok').fullpage({
        // 滚到某一屏之后调用
        afterLoad:function(link,index){
            // index 当前section的编号
            $('.section').removeClass('current');
            setTimeout(function(){
                $('.section').eq(index-1).addClass('current');
            },100);
        }
    });
});