//����ȫ���ķ���
$(function(){
    $('#dowebok').fullpage({
        //����ÿһ��Ļ����ɫ
        sectionsColor:['#0da5d6', '#2AB561', '#DE8910', '#16BA9D', '#0DA5D6'],
        // ����ĳһ��֮�����
        afterLoad:function(link,index){
            // index ��ǰsection�ı��
            $('.section').removeClass('current');
            setTimeout(function(){
                $('.section').eq(index-1).addClass('current');
            },100);
        }
    });
});