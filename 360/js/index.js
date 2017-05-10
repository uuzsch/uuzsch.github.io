//调用全屏的方法
$(function(){
    $('#dowebok').fullpage({
        //设置每一屏幕的颜色
        sectionsColor:['#0da5d6', '#2AB561', '#DE8910', '#16BA9D', '#0DA5D6'],
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