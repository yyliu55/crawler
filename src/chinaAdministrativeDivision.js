var http=require('http');
var cheerio=require('cheerio');

var url = 'http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201401/t20140116_501070.html';


/*************
分析从网页里抓取到的数据
**************/
function filterChapter(html){
    var courseData=[];
 
    var $ = cheerio.load(html);
    var TRS_Editor=$('.TRS_Editor p');
    TRS_Editor.each(function(target){
        var item=$(this);
        courseData.push(item.text());
    });
 
    return courseData;
}

function printCourseInfo(courseData){
    courseData.forEach(function(item){
        console.log(item+'\n');
    });
}


http.get(url,function(res){
    var html='';
 
    res.on('data',function(data){
        html+=data;
    })
 
    res.on('end',function(){
        var courseData = filterChapter(html);
        printCourseInfo(courseData);
    })
}).on('error',function(){
    console.log('获取数据出错');
})